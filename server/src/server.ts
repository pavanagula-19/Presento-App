import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import MongoDB from "./config/database-mongodb";
import userRoute from "./routes/user-route";
import notesRoute from "./routes/note-route";
import shareRoute from "./routes/share-note-route";
import libraryRoute from "./routes/library-book-route";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

MongoDB();

app.use(
  cors({
    origin: "https://presento-notes-app.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/notes", notesRoute);
app.use("/api/shared/notes", shareRoute);
app.use("/api/library/books", libraryRoute);

app.listen(PORT, () => {
  console.log(`Server live at port ${PORT}`);
});
