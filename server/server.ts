import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import MongoDB from "./config/database-mongodb";
import userRoute from "./routes/user-route";
import notesRoute from "./routes/note-route";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

MongoDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/notes", notesRoute);

app.listen(PORT, () => {
  console.log(`Server live at port ${PORT}`);
});
