"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_schema_1 = __importDefault(require("../models/user-schema"));
const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;
        const existingUser = await user_schema_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new user_schema_1.default({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role,
        });
        await newUser.save();
        res.status(201).json({ message: "User Created Successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_schema_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User Not Found" });
            return;
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid Credentials" });
            return;
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing in environment variables");
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
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
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.login = login;
const getAllUsers = async (req, res) => {
    try {
        const users = await user_schema_1.default.find({}, "first_name last_name email createdAt").sort({
            createdAt: -1,
        });
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await user_schema_1.default.findById(id, "first_name last_name email createdAt");
        if (!user) {
            res.status(404).json({ message: "User Not Found" });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, password, role } = req.body;
        // Define an update object that only includes fields that exist in the schema
        const updatedUserData = {
            first_name,
            last_name,
            email,
            role,
        };
        // Only update password if provided
        if (password) {
            updatedUserData.password = await bcrypt_1.default.hash(password, 10);
        }
        // Find and update the user
        const user = await user_schema_1.default.findByIdAndUpdate(id, updatedUserData, { new: true });
        if (!user) {
            res.status(404).json({ message: "User Not Found" });
            return;
        }
        res.status(200).json({ message: "User Updated Successfully", user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await user_schema_1.default.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({ message: "User Not Found" });
            return;
        }
        res.status(200).json({ message: "User Deleted Successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteUser = deleteUser;
