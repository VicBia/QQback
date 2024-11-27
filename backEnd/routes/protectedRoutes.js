const express = require("express");
const router = express.Router();
const authenticateMiddleware = require("../middlewares/authMiddleware");

// Rota protegida TESTE
router.get("/me", authenticateMiddleware, (req, res) => {
  res
    .status(200)
    .json({ message: "Você acessou uma rota protegida!", user: req.user });
});

module.exports = router;
