import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  imageUrl: string;
  bookUrl: string;
  wishlist: { user: mongoose.Types.ObjectId; added: boolean }[]; 
}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    bookUrl: { type: String, required: true },
    wishlist: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        added: { type: Boolean, default: false }, 
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IBook>("Book", BookSchema);
