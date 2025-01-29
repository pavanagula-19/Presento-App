import mongoose, { Document, Schema } from "mongoose";

export interface ISharedNote extends Document {
  noteId: string;
  sharedWith: string; 
  sharedBy: string; 
  createdAt: Date;
}

const SharedNoteSchema: Schema = new Schema({
  noteId: { type: String, required: true },
  sharedWith: { type: String, required: true },
  sharedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ISharedNote>("SharedNote", SharedNoteSchema);