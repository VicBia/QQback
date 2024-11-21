const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");

// Rota protegida
router.get("/me", authenticateToken, (req, res) => {
  res
    .status(200)
    .json({ message: "Você acessou uma rota protegida!", user: req.user });
});

module.exports = router;
