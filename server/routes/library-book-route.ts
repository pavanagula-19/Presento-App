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

router.put("/:bookId", updateBook);

router.patch("/:bookId/wishlist", updateWishlist);

router.delete("/:bookId", deleteBook);

export default router;
