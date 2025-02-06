import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  imageUrl: string;
  bookUrl: String;
  wishlist: boolean;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  bookUrl: {type: String, required: true},
  wishlist: { type: Boolean, default: false },
});

export default mongoose.model<IBook>("Book", BookSchema);
