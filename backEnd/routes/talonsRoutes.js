const express = require("express");
const router = express.Router();
const talonsController = require("../controllers/talonsController");

// Rotas
router
  .route("/api/talons")
  .get(talonsController.listTalons)
  .post(talonsController.registerTalon);
router
  .route("/api/talons/:id_talon")
  .put(talonsController.editTalon)
  .delete(talonsController.deleteTalon);

module.exports = router;
