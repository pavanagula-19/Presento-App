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
    <div className="note-detail">
      <button onClick={onClose}>Close</button>
      <Button
        onClick={() => {
          dispatch(saveCurrentNoteId(note?._id));
          navigate(PATH.CREATENOTES);
        }}
      >
        Edit
      </Button>
      <h2>{note.title}</h2>
      <ReactQuill value={content} onChange={handleContentChange} />
    </div>
  );
}
