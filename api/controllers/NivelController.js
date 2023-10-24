const database = require("../models");

class NivelController {
  static async findAll(req, res) {
    try {
      const todosOsNiveis = await database.Niveis.findAll();
      return res.status(200).json(todosOsNiveis);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findById(req, res) {
    const { id } = req.params;
    try {
      const nivel = await database.Niveis.findOne({
        where: { id },
      });
      return res.status(200).json(nivel);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async create(req, res) {
    const nivel = req.body;
    try {
      const registered = await database.Niveis.create(nivel);
      return res.status(200).json(registered);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const info = req.body;
    try {
      await database.Niveis.update(info, { where: { id } });
      const updatedNivel = await database.Niveis.findOne({
        where: { id },
      });
      return res.status(200).json(updatedNivel);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await database.Niveis.destroy({ where: { id } });
      return res.status(200).json({ message: `id ${id} deleted.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restore(req, res) {
    const { id } = req.params;
    try {
      await database.Niveis.restore({ where: { id } });
      return res.status(200).json({ message: `id ${id} restored.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = NivelController;
