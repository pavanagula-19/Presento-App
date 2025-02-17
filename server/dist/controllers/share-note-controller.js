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
exports.deleteSharedNote = exports.getReceivedNotes = exports.getSharedNotes = exports.createSharedNote = void 0;
const share_note_schema_1 = __importDefault(require("../models/share-note-schema"));
const user_schema_1 = __importDefault(require("../models/user-schema"));
const createSharedNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { noteId, sharedWith } = req.body;
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const sharedBy = req.user.id;
        const recipientEmail = sharedWith.toLowerCase();
        const recipientUser = yield user_schema_1.default.findOne({ email: recipientEmail });
        if (!recipientUser) {
            res.status(404).json({ error: "User not found. Cannot share note." });
            return;
        }
        const existingSharedNote = yield share_note_schema_1.default.findOne({ noteId, sharedWith: recipientEmail });
        if (existingSharedNote) {
            res.status(400).json({ message: "Note is already shared with this user" });
            return;
        }
        const newSharedNote = new share_note_schema_1.default({
            noteId,
            sharedWith: recipientEmail,
            sharedBy,
        });
        const savedSharedNote = yield newSharedNote.save();
        res.status(201).json({
            message: "Note shared successfully",
            sharedNote: savedSharedNote,
        });
    }
    catch (error) {
        console.error("Error sharing note:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.createSharedNote = createSharedNote;
const getSharedNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const sharedNotes = yield share_note_schema_1.default.find({ sharedBy: req.user.id });
        res.status(200).json({ sharedNotes });
    }
    catch (error) {
        console.error("Error fetching shared notes:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.getSharedNotes = getSharedNotes;
const getReceivedNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const receivedNotes = yield share_note_schema_1.default.find({ sharedWith: req.user.email.toLowerCase() })
            .populate({
            path: "noteId",
            select: "title content",
        });
        res.status(200).json({ receivedNotes });
    }
    catch (error) {
        console.error("Error fetching received notes:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.getReceivedNotes = getReceivedNotes;
const deleteSharedNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedSharedNote = yield share_note_schema_1.default.findByIdAndDelete(id);
        if (!deletedSharedNote) {
            res.status(404).json({ message: "Shared note not found" });
            return;
        }
        res.status(200).json({ message: "Shared note deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting shared note:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.deleteSharedNote = deleteSharedNote;
