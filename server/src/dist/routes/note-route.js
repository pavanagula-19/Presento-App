"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_controller_1 = require("../controllers/note-controller");
const router = express_1.default.Router();
router.post("/", note_controller_1.createNote);
router.get("/:userId", note_controller_1.getNotesByUser);
router.put("/:id", note_controller_1.updateNote);
router.delete("/:id", note_controller_1.deleteNote);
exports.default = router;
