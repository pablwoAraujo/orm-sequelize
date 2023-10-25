const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router.get("/pessoas", PessoaController.findAllActives);
router.get("/pessoas/all", PessoaController.findAll);
router.get("/pessoas/:id", PessoaController.findById);
router.post("/pessoas", PessoaController.create);
router.put("/pessoas/:id", PessoaController.update);
router.delete("/pessoas/:id", PessoaController.delete);
router.post("/pessoas/:id/restore", PessoaController.restore);
router.get("/pessoas/:estudanteId/matricula", PessoaController.findAllRegistrationNumberByPerson);
router.get("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.findRegistrationNumberById);
router.post("/pessoas/:estudanteId/matricula", PessoaController.createRegistrationNumber);
router.put("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.updateRegistrationNumber);
router.delete("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.deleteRegistrationNumber);
router.post("/pessoas/:estudanteId/matricula/:matriculaId/restore", PessoaController.restoreRegistrationNumber);
router.put("/pessoas/cancel/:id", PessoaController.cancel);
module.exports = router;
