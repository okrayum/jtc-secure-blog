// routes/auth.js
const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user");

// User register
router.post("/register", UserController.Register);

// User login
router.post("/login", UserController.Login);

// User change password
router.put("/update/:userId", UserController.Update);

module.exports = router;
