import express, { Router } from "express";
import * as userController from "../controllers/user-controller";
import { authenticate } from "../middleware/authenticate";

const router: Router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", authenticate, userController.getAllUsers);
router.get("/:id", authenticate, userController.getUserById);
router.put("/:id", authenticate, userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);

export default router;
