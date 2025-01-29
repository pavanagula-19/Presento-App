import { Request, Response } from "express";
import Note, { INote } from "../models/note-schema";
import pool from "../config/database-sql";
import { RowDataPacket } from "mysql2";

const validateUserId = async (userId: string): Promise<boolean> => {
  try {
    const [rows] = await pool
      .promise()
      .query<RowDataPacket[]>("SELECT id FROM users WHERE id = ?", [userId]);
    return rows.length > 0;
  } catch (error) {
    console.error("Error validating userId:", error);
    throw error;
  }
};

export const createNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, title, subject, wishlist, content } = req.body;

    const isValidUser = await validateUserId(userId);
    if (!isValidUser) {
      res
        .status(400)
        .json({ error: "Invalid userId. User not found in MySQL." });
      return;
    }

    const newNote: INote = new Note({
      userId,
      title,
      subject,
      wishlist,
      content,
    });

    const savedNote = await newNote.save();
    res
      .status(201)
      .json({ message: "Note created successfully", note: savedNote });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getNotesByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    const isValidUser = await validateUserId(userId);
    if (!isValidUser) {
      res
        .status(400)
        .json({ error: "Invalid userId. User not found in MySQL." });
      return;
    }

    const notes = await Note.find({ userId });
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title,  subject, wishlist, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, subject, wishlist, content },
      { new: true }
    );

    if (!updatedNote) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
