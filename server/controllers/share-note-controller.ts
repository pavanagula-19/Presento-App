import { Response } from "express";
import SharedNote, { ISharedNote } from "../models/share-note-schema";
import User from "../models/user-schema"; 
import { AuthenticatedRequest } from "../config/types";

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

    // Check if the recipient user exists in MongoDB
    const recipientUser = await User.findOne({ email: sharedWith });

    if (!recipientUser) {
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
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user || !req.user.email) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const email = req.user.email;

    // Find shared notes in MongoDB
    const sharedNotes = await SharedNote.find({ sharedBy: req.user.id });

    if (sharedNotes.length === 0) {
      res.status(200).json({ sharedNotes: [] });
      return;
    }

    // Fetch the users who shared the notes
    const sharedByIds = sharedNotes.map((note) => note.sharedBy.toString());
    const users = await User.find({ _id: { $in: sharedByIds } }).select("_id email");

    // Create a mapping of user ID to email
    const userIdToEmailMap: Record<string, string> = {};
    users.forEach((user) => {
      userIdToEmailMap[user._id.toString()] = user.email;
    });

    // Replace `sharedBy` ID with corresponding email
    const notesWithEmails = sharedNotes.map((note) => ({
      ...note.toObject(),
      sharedBy: userIdToEmailMap[note.sharedBy.toString()] || note.sharedBy,
    }));

    res.status(200).json({ sharedNotes: notesWithEmails });
  } catch (error) {
    console.error("Error fetching shared notes:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteSharedNote = async (
  req: AuthenticatedRequest,
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
