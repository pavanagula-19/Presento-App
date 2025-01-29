import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteDetailProps {
  note: Note;
  onClose: () => void;
}

export default function NoteDetail({ note, onClose }: NoteDetailProps) {
  const [content, setContent] = React.useState<string>(note.content);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  return (
    <div className="note-detail">
      <button onClick={onClose}>Close</button>
      <h2>{note.title}</h2>
      <ReactQuill value={content} onChange={handleContentChange} />
    </div>
  );
}
