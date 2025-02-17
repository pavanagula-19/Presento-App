import mongoose, { Document, Schema } from "mongoose";

export interface ISharedNote extends Document {
  noteId: mongoose.Schema.Types.ObjectId;
  sharedWith: string; 
  sharedBy: mongoose.Schema.Types.ObjectId; 
  createdAt: Date;
}

const SharedNoteSchema: Schema = new Schema(
  {
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: "Note", required: true },
    sharedWith: { type: String, required: true, lowercase: true }, 
    sharedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },   
  },
  { timestamps: true }
);

export default mongoose.model<ISharedNote>("SharedNote", SharedNoteSchema);
