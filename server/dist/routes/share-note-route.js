"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const share_note_controller_1 = require("../controllers/share-note-controller");
const authenticate_1 = require("../middleware/authenticate");
const router = express_1.default.Router();
router.post("/", authenticate_1.authenticate, share_note_controller_1.createSharedNote);
router.get("/sent", authenticate_1.authenticate, share_note_controller_1.getSharedNotes);
router.get("/received", authenticate_1.authenticate, share_note_controller_1.getReceivedNotes);
router.delete("/:id", authenticate_1.authenticate, share_note_controller_1.deleteSharedNote);
exports.default = router;
