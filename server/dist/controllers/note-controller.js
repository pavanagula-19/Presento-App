"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNotesByUser = exports.createNote = void 0;
const note_schema_1 = __importDefault(require("../models/note-schema"));
const user_schema_1 = __importDefault(require("../models/user-schema"));
const validateUserId = async (userId) => {
    try {
        const user = await user_schema_1.default.findById(userId);
        return user !== null;
    }
    catch (error) {
        console.error("Error validating userId:", error);
        throw error;
    }
};
const createNote = async (req, res) => {
    try {
        const { userId, title, subject, wishlist, content } = req.body;
        const isValidUser = await validateUserId(userId);
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
        const savedNote = await newNote.save();
        res
            .status(201)
            .json({ message: "Note created successfully", note: savedNote });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createNote = createNote;
const getNotesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const isValidUser = await validateUserId(userId);
        if (!isValidUser) {
            res
                .status(400)
                .json({ error: "Invalid userId. User not found in MongoDB." });
            return;
        }
        const notes = await note_schema_1.default.find({ userId });
        res.status(200).json({ notes });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getNotesByUser = getNotesByUser;
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, subject, wishlist, content } = req.body;
        const updatedNote = await note_schema_1.default.findByIdAndUpdate(id, { title, subject, wishlist, content }, { new: true });
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
};
exports.updateNote = updateNote;
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await note_schema_1.default.findByIdAndDelete(id);
        if (!deletedNote) {
            res.status(404).json({ message: "Note not found" });
            return;
        }
        res.status(200).json({ message: "Note deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteNote = deleteNote;
