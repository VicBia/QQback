const express = require("express");
const router = express.Router();
const talonsController = require("../controllers/talonsController");
const authenticateToken = require("../middlewares/authMiddleware"); // Middleware de autenticação

// Rotas
router
  .route("/api/talons")
  .get(authenticateToken, talonsController.listTalons)
  .post(authenticateToken, talonsController.registerTalon);
router
  .route("/api/talons/:id_talon")
  .put(authenticateToken, talonsController.editTalon)
  .delete(authenticateToken, talonsController.deleteTalon);

module.exports = router;
