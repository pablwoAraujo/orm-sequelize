//routes/turmasRoute.js

const { Router } = require("express");
const TurmaController = require("../controllers/TurmaController");

const router = Router();
router
  .get("/turmas", TurmaController.findAll)
  .get("/turmas/:id", TurmaController.findById)
  .post("/turmas", TurmaController.create)
  .put("/turmas/:id", TurmaController.update)
  .delete("/turmas/:id", TurmaController.delete)
  .post("/turmas/:id/restore", TurmaController.restore);
module.exports = router;
