"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const library_book_controller_1 = require("../controllers/library-book-controller");
const router = express_1.default.Router();
router.get("/", library_book_controller_1.getAllBooks);
router.post("/", library_book_controller_1.createBook);
router.put("/:bookId", library_book_controller_1.updateBook);
router.patch("/:bookId/wishlist", library_book_controller_1.updateWishlist);
router.delete("/:bookId", library_book_controller_1.deleteBook);
exports.default = router;
