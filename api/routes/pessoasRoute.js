const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");
const MatriculaController = require('../controllers/MatriculaController')

const router = Router();

router.get("/pessoas", PessoaController.findAll);
router.get("/pessoas/all", PessoaController.findAllRecords);
router.get("/pessoas/:id", PessoaController.findById);
router.post("/pessoas", PessoaController.create);
router.put("/pessoas/:id", PessoaController.update);
router.delete("/pessoas/:id", PessoaController.delete);
router.post("/pessoas/:id/restore", PessoaController.restore);
router.get("/pessoas/:estudanteId/matricula", MatriculaController.findAllRegistrationNumberByPerson);
router.get("/pessoas/:estudanteId/matricula/:matriculaId", MatriculaController.findRegistrationNumberById);
router.post("/pessoas/:estudanteId/matricula", MatriculaController.createRegistrationNumber);
router.put("/pessoas/:estudanteId/matricula/:matriculaId", MatriculaController.updateRegistrationNumber);
router.delete("/pessoas/:estudanteId/matricula/:matriculaId", MatriculaController.deleteRegistrationNumber);
router.post("/pessoas/:estudanteId/matricula/:matriculaId/restore", MatriculaController.restoreRegistrationNumber);
router.put("/pessoas/cancel/:id", PessoaController.cancel);
module.exports = router;
