import { Request, Response } from "express";
import sql_database from "../config/database-sql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
    await sql_database.execute(query, [
      first_name,
      last_name,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const [rows]: any = await sql_database
      .promise()
      .execute("SELECT * FROM users WHERE email = ?", [email]);

    console.log("Query result:", rows);

    if (!rows || rows.length === 0) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    const user: User = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const query =
      "SELECT id, first_name, last_name, email, created_at FROM users";
    const [users]: any = await sql_database.execute(query);

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const query =
      "SELECT id, first_name, last_name, email, created_at FROM users WHERE id = ?";
    const [user]: any = await sql_database.execute(query, [id]);

    if (user.length === 0) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    res.status(200).json({ user: user[0] });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const query =
      "UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?";
    const [result]: any = await sql_database.execute(query, [
      first_name,
      last_name,
      email,
      hashedPassword || null,
      id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM users WHERE id = ?";
    const [result]: any = await sql_database.execute(query, [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
