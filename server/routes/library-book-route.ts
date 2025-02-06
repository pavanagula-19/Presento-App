import express, { Router } from "express";
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  updateWishlist,
} from "../controllers/library-book-controller";

const router: Router = express.Router();

router.get("/", getAllBooks);
router.post("/", createBook);
router.put("/:id", updateBook);
router.patch("/:id/wishlist", updateWishlist);
router.delete("/:id", deleteBook);

export default router;
