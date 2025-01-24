const sql_database = require("../config/database-sql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await sql_database
      .promise()
      .execute("SELECT * FROM users WHERE email = ?", [email]);

    console.log("Query result:", rows);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
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
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const query =
      "SELECT id, first_name, last_name, email, created_at FROM users";
    const [users] = await sql_database.execute(query);

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const query =
      "SELECT id, first_name, last_name, email, created_at FROM users WHERE id = ?";
    const [user] = await sql_database.execute(query, [id]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json({ user: user[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const query =
      "UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?";
    const [result] = await sql_database.execute(query, [
      first_name,
      last_name,
      email,
      hashedPassword || null,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM users WHERE id = ?";
    const [result] = await sql_database.execute(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
