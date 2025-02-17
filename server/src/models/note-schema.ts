import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  userId: string;
  title: string;
  subject: string;
  createdAt: Date;
  wishlist: boolean;
  content: Record<string, any>;
}

const NoteSchema: Schema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  subject: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  wishlist: { type: Boolean, default: false },
  content: { type: Object, required: true },
});

export default mongoose.model<INote>("Note", NoteSchema);
