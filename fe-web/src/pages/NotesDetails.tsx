import { Button } from "@/components/ui/button";
import { saveCurrentNoteId } from "@/redux/slices/note-slice";
import { PATH } from "@/routes";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Note {
  _id: string;
  title: string;
  content: string;
}

interface NoteDetailProps {
  note: Note;
  onClose: () => void;
}

export default function NoteDetail({ note, onClose }: NoteDetailProps) {
  const [content, setContent] = React.useState<string>(note.content);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  return (
    <div className="note-detail relative p-4 border rounded-lg shadow-md bg-white">
      <div className="absolute top-4 right-4 flex space-x-4">
        <button className="bg-gray-200 px-4 py-2 rounded" onClick={onClose}>
          Close
        </button>
        <Button
          onClick={() => {
            dispatch(saveCurrentNoteId(note?._id));
            navigate(PATH.CREATENOTES);
          }}
        >
          Edit
        </Button>
      </div>

      <h2 className="mt-12 text-xl font-semibold">{note.title}</h2>
      <ReactQuill value={content} onChange={handleContentChange} className="mt-4" />
    </div>
  );
}
