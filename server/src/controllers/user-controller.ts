import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user-schema";


interface UserDocument extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}


export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in environment variables");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}, "first_name last_name email createdAt").sort({
      createdAt: -1,
    });

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, "first_name last_name email createdAt");

    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, password, role } = req.body;

    // Define an update object that only includes fields that exist in the schema
    const updatedUserData: Partial<UserDocument> = {
      first_name,
      last_name,
      email,
      role,
    };

    // Only update password if provided
    if (password) {
      updatedUserData.password = await bcrypt.hash(password, 10);
    }

    // Find and update the user
    const user = await User.findByIdAndUpdate(id, updatedUserData, { new: true });

    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    res.status(200).json({ message: "User Updated Successfully", user });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
