import express, { Router } from "express";
import {
  createSharedNote,
  getSharedNotes,
  getReceivedNotes,
  deleteSharedNote,
} from "../controllers/share-note-controller";
import { authenticate } from "../middleware/authenticate";

const router: Router = express.Router();

router.post("/", authenticate, createSharedNote);

router.get("/sent", authenticate, getSharedNotes);

router.get("/received", authenticate, getReceivedNotes);

router.delete("/:id", authenticate, deleteSharedNote);

export default router;
