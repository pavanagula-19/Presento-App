import { Response } from "express";
import SharedNote, { ISharedNote } from "../models/share-note-schema";
import User from "../models/user-schema";
import { AuthenticatedRequest } from "../config/types";

export const createSharedNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { noteId, sharedWith } = req.body;
    
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const sharedBy = req.user.id;

    const recipientEmail = sharedWith.toLowerCase();

    const recipientUser = await User.findOne({ email: recipientEmail });

    if (!recipientUser) {
      res.status(404).json({ error: "User not found. Cannot share note." });
      return;
    }

    const existingSharedNote = await SharedNote.findOne({ noteId, sharedWith: recipientEmail });

    if (existingSharedNote) {
      res.status(400).json({ message: "Note is already shared with this user" });
      return;
    }

    const newSharedNote: ISharedNote = new SharedNote({
      noteId,
      sharedWith: recipientEmail,
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

export const getSharedNotes = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const sharedNotes = await SharedNote.find({ sharedBy: req.user.id });

    res.status(200).json({ sharedNotes });
  } catch (error) {
    console.error("Error fetching shared notes:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getReceivedNotes = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const receivedNotes = await SharedNote.find({ sharedWith: req.user.email.toLowerCase() })
      .populate({
        path: "noteId",
        select: "title content", 
      });

    res.status(200).json({ receivedNotes });
  } catch (error) {
    console.error("Error fetching received notes:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};


export const deleteSharedNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedSharedNote = await SharedNote.findByIdAndDelete(id);

    if (!deletedSharedNote) {
      res.status(404).json({ message: "Shared note not found" });
      return;
    }

    res.status(200).json({ message: "Shared note deleted successfully" });
  } catch (error) {
    console.error("Error deleting shared note:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};
