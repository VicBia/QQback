const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const authenticateMiddleware = require("../middlewares/authMiddleware");
const acessMiddleware = require("../middlewares/acessMiddleware");

// Rotas da loja (store)
router
  .route("/api/store")
  .get(
    authenticateMiddleware,
    acessMiddleware(["store"]),
    storeController.listStore
  )
  .post(
    authenticateMiddleware,
    acessMiddleware(["store"]),
    storeController.registerStore
  );

router
  .route("/api/store/:id_store")
  .put(
    authenticateMiddleware,
    acessMiddleware(["store"]),
    storeController.editStore
  )
  .delete(
    authenticateMiddleware,
    acessMiddleware(["store"]),
    storeController.deleteStore
  );

module.exports = router;
