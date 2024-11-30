const express = require("express");
const router = express.Router();
const talonsController = require("../controllers/talonsController");
const authenticateMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticação
const acessMiddleware = require("../middlewares/acessMiddleware");

// Rotas
router
  .route("/api/talons")
  .get(
    authenticateMiddleware,
    acessMiddleware(["stock"]),
    talonsController.listTalons
  )
  .post(
    authenticateMiddleware,
    acessMiddleware(["stock", "maintenance"]),
    talonsController.registerTalon
  );
router
  .route("/api/talons/:id_talon")
  .put(
    authenticateMiddleware,
    acessMiddleware(["stock"]),
    talonsController.editTalon
  )
  .delete(
    authenticateMiddleware,
    acessMiddleware(["stock"]),
    talonsController.deleteTalon
  );

module.exports = router;
