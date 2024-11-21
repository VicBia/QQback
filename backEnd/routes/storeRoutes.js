const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");

// Rotas
router
  .route("/api/store")
  .get(storeController.listStore)
  .post(storeController.registerStore);
router
  .route("/api/store/:id_store")
  .put(storeController.editStore)
  .delete(storeController.deleteStore);

module.exports = router;
