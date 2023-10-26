// const database = require("../models");

const Services = require("../services/Services");
const niveisService = new Services("Niveis");

class NivelController {
  static async findAll(req, res) {
    try {
      const todosOsNiveis = await niveisService.findAll();
      return res.status(200).json(todosOsNiveis);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findById(req, res) {
    const { id } = req.params;
    try {
      const nivel = await niveisService.findById(id);
      return res.status(200).json(nivel);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async create(req, res) {
    const data = req.body;
    try {
      const registered = await niveisService.create(data);
      return res.status(200).json(registered);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const info = req.body;
    try {
      await niveisService.update(info, id);
      const updatedNivel = await niveisService.findById(id);

      return res.status(200).json(updatedNivel);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await niveisService.delete(id);
      return res.status(200).json({ message: `id ${id} deleted.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restore(req, res) {
    const { id } = req.params;
    try {
      await niveisService.restore(id);
      return res.status(200).json({ message: `id ${id} restored.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = NivelController;
