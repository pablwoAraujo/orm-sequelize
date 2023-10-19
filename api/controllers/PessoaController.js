const database = require("../models");

class PessoaController {
  static async findAll(req, res) {
    try {
      const allPeople = await database.Pessoas.findAll();
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
}

module.exports = PessoaController;
