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
import { Button } from "@/components/ui/button";

Quill.register("modules/imageResize", ImageResize);

const TextEditor: React.FC = () => {
  const currentNoteId = useSelector(selectNodeId);
  const currentNote = useSelector(selectNote(currentNoteId));
  const quillRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Quill | null>(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


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
  }, [currentNote]);

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

    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full bg-white text-black">
    <div className="ql-toolbar ql-snow sticky top-0 z-10 border-b shadow-sm px-4 py-2 flex items-center justify-between bg-white border-gray-300">
      <input
        type="text"
        placeholder="Document Title"
        className="border-none outline-none text-lg font-semibold w-1/2 bg-white text-black"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <Button
  onClick={() => setIsModalOpen(true)}
  className=" px-6 py-2 rounded-lg bg-gray-900 text-black hover:bg-gray-800 transition"
>
  Save
</Button>

    </div>
  
    <div ref={quillRef} className="w-full px-10 pt-16 pb-20 bg-white text-black" style={{ minHeight: "100vh" }}></div>
  

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="p-6 rounded-lg shadow-lg w-96 bg-white text-black">
            <h2 className="text-lg font-semibold mb-4">Save Note</h2>
            <input
              type="text"
              placeholder="Title"
              className="border p-2 w-full mb-2 bg-white text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Subject"
              className="border p-2 w-full mb-4 bg-white text-black"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
           <div className="flex justify-end space-x-2">
  <button
    onClick={() => setIsModalOpen(false)}
    className="px-4 py-2 border rounded-md border-gray-300 text-black bg-white hover:bg-gray-100 transition"
  >
    Cancel
  </button>
  <button
    onClick={handleSave}
    className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition"
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