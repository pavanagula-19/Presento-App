import Quill from "quill";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNoteRequest } from "../redux/slices/note-slice";
import { selectUserInfo } from "../redux/selectors/user-selector";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const TextEditor: React.FC = () => {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Quill | null>(null);
  const dispatch = useDispatch();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const user = useSelector(selectUserInfo);

  useEffect(() => {
    if (editorRef.current || !quillRef.current) return;

    editorRef.current = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }], 
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
      },
    });

    editorRef.current.setContents([
      {
        insert: "Welcome to the enhanced text editor!\n",
      },
    ]);
  }, []);

  const getEditorContent = () => {
    setIsPopoverOpen(true);
  };

  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContents();
      const noteData = {
        userId: user?.id,
        title,
        subject,
        content: content?.ops,
      };
      dispatch(createNoteRequest(noteData));
      setIsPopoverOpen(false); 
      setTitle(""); 
      setSubject("");
    }
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Notes</h1>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              onClick={getEditorContent}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md"
            >
              Save
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter note title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter note subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsPopoverOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div
        ref={quillRef}
        className="border rounded-lg shadow-md p-2"
        style={{ height: "400px" }}
      ></div>
    </div>
  );
};

export default TextEditor;
