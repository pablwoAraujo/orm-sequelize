const { MatriculasService } = require("../services");
const matriculasService = new MatriculasService();

class MatriculaController {
  static async findAllRegistrationNumberByPerson(req, res) {
    const { estudanteId } = req.params;
    try {
      const where = { estudante_id: Number(estudanteId) };
      const matriculas = await matriculasService.findAll(where);

      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findRegistrationNumberById(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const where = {
        id: Number(matriculaId),
        estudante_id: Number(estudanteId),
      };
      const matriculas = await matriculasService.findOne(where);

      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createRegistrationNumber(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const registered = await matriculasService.create(novaMatricula);
      return res.status(200).json(registered);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateRegistrationNumber(req, res) {
    const { matriculaId } = req.params;
    const info = req.body;
    try {
      await matriculasService.update(info, matriculaId);
      const updatedRegistrationNumber = await matriculasService.findById(
        matriculaId
      );

      return res.status(200).json(updatedRegistrationNumber);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteRegistrationNumber(req, res) {
    const { matriculaId } = req.params;
    try {
      await matriculasService.delete(matriculaId);
      return res.status(200).json({ message: `id ${matriculaId} deleted.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restoreRegistrationNumber(req, res) {
    const { matriculaId } = req.params;
    try {
      await matriculasService.restore(matriculaId);
      return res.status(200).json({ message: `id ${matriculaId} restored.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = MatriculaController;
