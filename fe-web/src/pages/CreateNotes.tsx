import Quill from "quill";
import "quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNoteRequest,
  updateNoteRequest,
  fetchNotesRequest,
} from "../redux/slices/note-slice";
import { selectUserInfo } from "../redux/selectors/user-selector";
import { selectNodeId, selectNote } from "@/redux/selectors/note-selector";
import { useTheme } from "../components/themed-context";
Quill.register("modules/imageResize", ImageResize);

const TextEditor: React.FC = () => {
  const currentNoteId = useSelector(selectNodeId);
  const currentNote = useSelector(selectNote(currentNoteId));
  const quillRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Quill | null>(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFloatingToolbar, setShowFloatingToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!user?.id) return;
    dispatch(fetchNotesRequest(user.id));
  }, [dispatch, user]);

  useEffect(() => {
    if (editorRef.current || !quillRef.current) return;

    editorRef.current = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          [{ font: [] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: [] }],
          ["link", "image", "video"],
          ["clean"],
        ],
        imageResize: {
          displaySize: true,
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },
      },
    });

    if (currentNote?.content) {
      editorRef.current.setContents(currentNote.content);
      setTitle(currentNote.title || "");
      setSubject(currentNote.subject || "");
    }

    editorRef.current.on("selection-change", (range) => {
      if (range && range.length > 0) {
        const editorBounds = editorRef.current!.getBounds(range.index);
        if (!editorBounds) return;
        setToolbarPosition({
          top: editorBounds.top - 40,
          left: editorBounds.left,
        });
        setShowFloatingToolbar(true);
      } else {
        setShowFloatingToolbar(false);
      }
    });
  }, [currentNote]);

  const openSaveModal = () => setIsModalOpen(true);
  const closeSaveModal = () => setIsModalOpen(false);

  const handleSave = () => {
    if (!editorRef.current || !title.trim() || !subject.trim()) {
      alert("Please enter both title and subject before saving.");
      return;
    }

    const content = editorRef.current.getContents();

    if (currentNoteId) {
      dispatch(
        updateNoteRequest({
          noteId: currentNoteId,
          userId: user?.id,
          title,
          subject,
          content: content?.ops,
        })
      );
    } else {
      dispatch(
        createNoteRequest({
          userId: user?.id,
          title,
          subject,
          content: content?.ops,
        })
      );
    }

    closeSaveModal();
  };

  return (
    <div
      className={`relative w-full ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`ql-toolbar ql-snow sticky top-0 z-10 border-b shadow-sm px-4 py-2 flex items-center justify-between ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-300"
        }`}
      >
        <input
          type="text"
          placeholder="Document Title"
          className={`border-none outline-none text-lg font-semibold w-1/2 ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={openSaveModal}
          className={`px-4 py-2 rounded-md ${
            theme === "dark" ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          Save
        </button>
      </div>

      <div
        ref={quillRef}
        className={`w-full px-10 pt-16 pb-20 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
        style={{ minHeight: "100vh", overflowY: "auto" }}
      ></div>

      {showFloatingToolbar && (
        <div
          className={`absolute shadow-lg border rounded-md px-2 py-1 flex space-x-2 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-300"
          }`}
          style={{
            top: `${toolbarPosition.top}px`,
            left: `${toolbarPosition.left}px`,
          }}
        >
          <button
            onClick={() => {
              const format = editorRef.current!.getFormat();
              editorRef.current!.format("bold", !format.bold);
            }}
            className={`px-2 py-1 hover:bg-gray-200 rounded ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            B
          </button>

          <button
            onClick={() => {
              const format = editorRef.current!.getFormat();
              editorRef.current!.format("italic", !format.italic);
            }}
            className={`px-2 py-1 hover:bg-gray-200 rounded ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            I
          </button>

          <button
            onClick={() => {
              const format = editorRef.current!.getFormat();
              editorRef.current!.format("underline", !format.underline);
            }}
            className={`px-2 py-1 hover:bg-gray-200 rounded ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            U
          </button>

          <button
            onClick={() => {
              const format = editorRef.current!.getFormat();
              editorRef.current!.format(
                "color",
                format.color === "#ff0000" ? false : "#ff0000"
              );
            }}
            className={`px-2 py-1 hover:bg-gray-200 rounded ${
              theme === "dark" ? "text-red-500" : "text-red-500"
            }`}
          >
            A
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className={`p-6 rounded-lg shadow-lg w-96 ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Save Note</h2>
            <input
              type="text"
              placeholder="Title"
              className={`border p-2 w-full mb-2 ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-white text-black"
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Subject"
              className={`border p-2 w-full mb-4 ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-white text-black"
              }`}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={closeSaveModal}
                className={`px-4 py-2 mr-2 border rounded-md ${
                  theme === "dark"
                    ? "border-gray-600 text-white"
                    : "border-gray-300 text-black"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={`px-4 py-2 rounded-md ${
                  theme === "dark"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
