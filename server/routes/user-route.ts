import express, { Router } from "express";
import * as userController from "../controllers/user-controller";

const router: Router = express.Router();

router.post("/register", userController.register);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.login);

export default router;