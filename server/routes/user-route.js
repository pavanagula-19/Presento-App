const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.post("/register", userController.register);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.login);

module.exports = router;
