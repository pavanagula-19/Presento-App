"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getAllBooks = exports.updateWishlist = void 0;
const library_book_schema_1 = __importDefault(require("../models/library-book-schema"));
const updateWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, wishlist } = req.body;
        console.log(req.params);
        const { bookId } = req.params;
        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }
        const book = yield library_book_schema_1.default.findById(bookId);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        const userWishlist = book.wishlist.find((item) => item.user.toString() === userId);
        if (userWishlist) {
            userWishlist.added = wishlist;
        }
        else {
            book.wishlist.push({ user: userId, added: wishlist });
        }
        yield book.save();
        res.status(200).json({
            message: "Wishlist updated successfully",
            book,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateWishlist = updateWishlist;
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield library_book_schema_1.default.find();
        res.json(books);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBooks = getAllBooks;
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, imageUrl, bookUrl } = req.body;
    const book = new library_book_schema_1.default({ title, author, imageUrl, bookUrl });
    try {
        const newBook = yield book.save();
        res.status(201).json(newBook);
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield library_book_schema_1.default.findById(req.params.id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.imageUrl = req.body.imageUrl || book.imageUrl;
        book.bookUrl = req.body.bookUrl || book.bookUrl;
        book.wishlist =
            req.body.wishlist !== undefined ? req.body.wishlist : book.wishlist;
        const updatedBook = yield book.save();
        res.json(updatedBook);
    }
    catch (error) {
        next(error);
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield library_book_schema_1.default.findByIdAndDelete(req.params.id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        res.json({ message: "Book deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBook = deleteBook;
