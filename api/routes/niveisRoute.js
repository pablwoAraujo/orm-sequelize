const { Router } = require("express");
const NivelController = require("../controllers/NivelController");

const router = Router();
router
  .get("/niveis", NivelController.findAll)
  .get("/niveis/:id", NivelController.findById)
  .post("/niveis", NivelController.create)
  .put("/niveis/:id", NivelController.update)
  .delete("/niveis/:id", NivelController.delete)
  .post("/niveis/:id/restore", NivelController.restore);
module.exports = router;
