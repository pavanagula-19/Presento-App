import mongoose, { Document, Schema } from "mongoose";

export interface ISharedNote extends Document {
  noteId: mongoose.Schema.Types.ObjectId; 
  sharedWith: string; 
  sharedBy: string;
  createdAt: Date;    
}

const SharedNoteSchema: Schema = new Schema(
  {
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: "Note", required: true },
    sharedWith: { type: String, required: true }, 
    sharedBy: { type: String, required: true },   
  },
  { timestamps: true }
);

export default mongoose.model<ISharedNote>("SharedNote", SharedNoteSchema);
