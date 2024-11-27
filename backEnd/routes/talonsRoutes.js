const express = require("express");
const router = express.Router();
const talonsController = require("../controllers/talonsController");
const authenticateMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticação

// Rotas
router
  .route("/api/talons")
  .get(authenticateMiddleware, talonsController.listTalons)
  .post(authenticateMiddleware, talonsController.registerTalon);
router
  .route("/api/talons/:id_talon")
  .put(authenticateMiddleware, talonsController.editTalon)
  .delete(authenticateMiddleware, talonsController.deleteTalon);

module.exports = router;
