const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Rota de login
router.post("/login", authController.authLogin);
router.post("/logout", authController.authLogout);

module.exports = router;
