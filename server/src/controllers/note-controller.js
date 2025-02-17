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
exports.deleteNote = exports.updateNote = exports.getNotesByUser = exports.createNote = void 0;
const note_schema_1 = __importDefault(require("../models/note-schema"));
const user_schema_1 = __importDefault(require("../models/user-schema"));
const validateUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_schema_1.default.findById(userId);
        return user !== null;
    }
    catch (error) {
        console.error("Error validating userId:", error);
        throw error;
    }
});
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, title, subject, wishlist, content } = req.body;
        const isValidUser = yield validateUserId(userId);
        if (!isValidUser) {
            res
                .status(400)
                .json({ error: "Invalid userId. User not found in MongoDB." });
            return;
        }
        const newNote = new note_schema_1.default({
            userId,
            title,
            subject,
            wishlist,
            content,
        });
        const savedNote = yield newNote.save();
        res
            .status(201)
            .json({ message: "Note created successfully", note: savedNote });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createNote = createNote;
const getNotesByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const isValidUser = yield validateUserId(userId);
        if (!isValidUser) {
            res
                .status(400)
                .json({ error: "Invalid userId. User not found in MongoDB." });
            return;
        }
        const notes = yield note_schema_1.default.find({ userId });
        res.status(200).json({ notes });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getNotesByUser = getNotesByUser;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, subject, wishlist, content } = req.body;
        const updatedNote = yield note_schema_1.default.findByIdAndUpdate(id, { title, subject, wishlist, content }, { new: true });
        if (!updatedNote) {
            res.status(404).json({ message: "Note not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "Note updated successfully", note: updatedNote });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedNote = yield note_schema_1.default.findByIdAndDelete(id);
        if (!deletedNote) {
            res.status(404).json({ message: "Note not found" });
            return;
        }
        res.status(200).json({ message: "Note deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteNote = deleteNote;
