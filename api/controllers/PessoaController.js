const { where } = require("sequelize");
const database = require("../models");

class PessoaController {
  static async findAllActives(req, res) {
    try {
      const allPeople = await database.Pessoas.findAll();
      return res.status(200).json(allPeople);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findAll(req, res) {
    try {
      const allPeople = await database.Pessoas.scope("allRecords").findAll();
      return res.status(200).json(allPeople);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findById(req, res) {
    const { id } = req.params;
    try {
      const allPeople = await database.Pessoas.findOne({
        where: { id },
      });
      return res.status(200).json(allPeople);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async create(req, res) {
    const person = req.body;
    try {
      const registered = await database.Pessoas.create(person);
      return res.status(200).json(registered);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const info = req.body;
    try {
      await database.Pessoas.update(info, { where: { id } });
      const updatedPerson = await database.Pessoas.findOne({
        where: { id },
      });
      return res.status(200).json(updatedPerson);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.destroy({ where: { id } });
      return res.status(200).json({ message: `id ${id} deleted.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restore(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.restore({ where: { id } });
      return res.status(200).json({ message: `id ${id} restored.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cancel(req, res) {
    const { id } = req.params;
    try {
      database.sequelize.transaction(async transaction => {
        await database.Pessoas.update(
          { ativo: false },
          { where: { id: Number(id) },
          transaction }
        );
  
        await database.Matriculas.update(
          { status: "cancelado" },
          { where: { estudante_id: Number(id) },
          transaction }
        );
      })
      
      return res
        .status(200)
        .json({ message: `matrículas ref. estudante ${id} canceladas.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  // CRUD da Matrícula:

  static async findAllRegistrationNumberByPerson(req, res) {
    const { estudanteId } = req.params;
    try {
      // Maneira tradicional
      // const allRegistrationNumber = await database.Matriculas.findAll({
      //   where: {
      //     estudante_id: Number(estudanteId),
      //   },
      // });

      // Trabalhando com o escopo da associação
      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(estudanteId) },
      });

      const matriculas = await pessoa.getAulasComStatusConfirmado();
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findRegistrationNumberById(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const allPeople = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res.status(200).json(allPeople);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createRegistrationNumber(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const registered = await database.Matriculas.create(novaMatricula);
      return res.status(200).json(registered);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateRegistrationNumber(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const info = req.body;
    try {
      await database.Matriculas.update(info, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      const updatedRegistrationNumber = await database.Matriculas.findOne({
        where: { id: Number(matriculaId) },
      });
      return res.status(200).json(updatedRegistrationNumber);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteRegistrationNumber(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.destroy({
        where: {
          id: Number(matriculaId),
          estudante_id: estudanteId,
        },
      });
      return res.status(200).json({ message: `id ${matriculaId} deleted.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restoreRegistrationNumber(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.restore({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res.status(200).json({ message: `id ${matriculaId} restored.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;
