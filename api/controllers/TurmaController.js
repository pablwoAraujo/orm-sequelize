const database = require("../models");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

class TurmaController {
  static async findAll(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};

    data_inicial || data_final ? (where.data_inicio = {}) : null;
    data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null;
    data_final ? (where.data_inicio[Op.lte] = data_final) : null;

    try {
      const todasAsTurmas = await database.Turmas.findAll({ where });
      return res.status(200).json(todasAsTurmas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findById(req, res) {
    const { id } = req.params;
    try {
      const turma = await database.Turmas.findOne({
        where: { id },
      });
      return res.status(200).json(turma);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async create(req, res) {
    const turma = req.body;
    try {
      const registered = await database.Turmas.create(turma);
      return res.status(200).json(registered);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const info = req.body;
    try {
      await database.Turmas.update(info, { where: { id } });
      const updatedTurma = await database.Turmas.findOne({
        where: { id },
      });
      return res.status(200).json(updatedTurma);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await database.Turmas.destroy({ where: { id } });
      return res.status(200).json({ message: `id ${id} deleted.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restore(req, res) {
    const { id } = req.params;
    try {
      await database.Turmas.restore({ where: { id } });
      return res.status(200).json({ message: `id ${id} restored.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findRegistrationNumberByClass(req, res) {
    const { id } = req.params;
    try {
      const matriculas = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: Number(id),
          status: "confirmado",
        },
        limit: 20,
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findFullClasses(req, res) {
    const lotacao = 4;
    try {
      const turmasLotadas = await database.Matriculas.findAndCountAll({
        where: {
          status: "confirmado",
        },
        attributes: ["turma_id"],
        group: ["turma_id"],
        having: Sequelize.literal(`count(turma_id)  >= ${lotacao}`),
      });
      return res.status(200).json(turmasLotadas.count);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = TurmaController;
