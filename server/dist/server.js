"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_mongodb_1 = __importDefault(require("./config/database-mongodb"));
const user_route_1 = __importDefault(require("./routes/user-route"));
const note_route_1 = __importDefault(require("./routes/note-route"));
const share_note_route_1 = __importDefault(require("./routes/share-note-route"));
const library_book_route_1 = __importDefault(require("./routes/library-book-route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
(0, database_mongodb_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/user", user_route_1.default);
app.use("/api/notes", note_route_1.default);
app.use("/api/shared/notes", share_note_route_1.default);
app.use("/api/library/books", library_book_route_1.default);
app.listen(PORT, () => {
    console.log(`Server live at port ${PORT}`);
});
