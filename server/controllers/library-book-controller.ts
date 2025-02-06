import { Request, Response, NextFunction } from "express";
import Book from "../models/library-book-schema";




export const updateWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { wishlist } = req.body; 

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { wishlist },
      { new: true, runValidators: true } 
    );

    if (!updatedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.json(updatedBook); 
  } catch (error) {
    next(error); 
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { title, author, imageUrl, bookUrl } = req.body;
  const book = new Book({ title, author, imageUrl, bookUrl });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.imageUrl = req.body.imageUrl || book.imageUrl;
    book.bookUrl = req.body.bookUrl || book.bookUrl;
    book.wishlist =
      req.body.wishlist !== undefined ? req.body.wishlist : book.wishlist;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.json({ message: "Book deleted" });
  } catch (error) {
    next(error);
  }
};
