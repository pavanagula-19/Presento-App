import { Request, Response } from "express";
import SharedNote, { ISharedNote } from "../models/share-note-schema";
import pool from "../config/database-sql";
import { RowDataPacket } from "mysql2";
import { AuthenticatedRequest } from "../middleware/authenticate";

export const createSharedNote = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { noteId, sharedWith } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const sharedBy = req.user.id;

    console.log("Attempting to share note with:", sharedWith);

    const [rows] = await pool
      .promise()
      .query<RowDataPacket[]>("SELECT email FROM users WHERE email = ?", [
        sharedWith,
      ]);

    if (rows.length === 0) {
      res.status(404).json({ error: "User not found. Cannot share note." });
      return;
    }

    const newSharedNote: ISharedNote = new SharedNote({
      noteId,
      sharedWith,
      sharedBy,
    });

    const savedSharedNote = await newSharedNote.save();
    res.status(201).json({
      message: "Note shared successfully",
      sharedNote: savedSharedNote,
    });
  } catch (error) {
    console.error("Error sharing note:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getSharedNotes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.params;

    const sharedNotes = await SharedNote.find({ sharedWith: email });

    if (sharedNotes.length === 0) {
      res.status(200).json({ sharedNotes: [] });
      return;
    }

    const sharedByIds = sharedNotes.map((note) => note.sharedBy.toString());

    const [rows] = await pool
      .promise()
      .query<RowDataPacket[]>("SELECT id, email FROM users WHERE id IN (?)", [
        sharedByIds,
      ]);

    const userIdToEmailMap: Record<string, string> = {};
    (rows as RowDataPacket[]).forEach((row) => {
      userIdToEmailMap[row.id] = row.email;
    });

    const notesWithEmails = sharedNotes.map((note) => {
      return {
        ...note.toObject(),
        sharedBy: userIdToEmailMap[note.sharedBy.toString()] || note.sharedBy,
      };
    });

    res.status(200).json({ sharedNotes: notesWithEmails });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteSharedNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedSharedNote = await SharedNote.findByIdAndDelete(id);

    if (!deletedSharedNote) {
      res.status(404).json({ message: "Shared note not found" });
      return;
    }

    res.status(200).json({ message: "Shared note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
