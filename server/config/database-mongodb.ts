import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.DB_URI) {
      console.error("Error: MongoDB URI is missing in .env file");
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
