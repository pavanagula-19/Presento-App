import express, { Router } from "express";
import {
  createNote,
  getNotesByUser,
  updateNote,
  deleteNote,
} from "../controllers/note-controller";

const router: Router = express.Router();
router.post("/", createNote);
router.get("/:userId", getNotesByUser);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
