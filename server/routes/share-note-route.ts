
import express, { Router } from "express";
import {
  createSharedNote,
  getSharedNotes,
  deleteSharedNote,
} from "../controllers/share-note-controller";
import { authenticate } from "../middleware/authenticate";

const router: Router = express.Router();

router.post("/", authenticate, createSharedNote);
router.get("/:userId", authenticate, getSharedNotes);
router.delete("/:id", authenticate, deleteSharedNote);

export default router;