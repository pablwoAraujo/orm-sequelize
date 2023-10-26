// const { where } = require("sequelize");
// const database = require("../models");

const { PessoasService } = require("../services");
const pessoasService = new PessoasService();

class PessoaController {
  static async findAll(req, res) {
    try {
      const allPeople = await pessoasService.findAll();
      return res.status(200).json(allPeople);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findAllRecords(req, res) {
    try {
      const allPeople = await pessoasService.findAllRecords();
      return res.status(200).json(allPeople);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findById(req, res) {
    const { id } = req.params;
    try {
      const person = await pessoasService.findById(id);
      return res.status(200).json(person);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async create(req, res) {
    const person = req.body;
    try {
      const registered = await pessoasService.create(person);
      return res.status(200).json(registered);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const info = req.body;
    try {
      await pessoasService.update(info, id);
      const updatedPerson = await pessoasService.findById(id);

      return res.status(200).json(updatedPerson);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await pessoasService.delete(id);
      return res.status(200).json({ message: `id ${id} deleted.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restore(req, res) {
    const { id } = req.params;
    try {
      await pessoasService.restore(id);
      return res.status(200).json({ message: `id ${id} restored.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cancel(req, res) {
    const { id } = req.params;
    try {
      await pessoasService.cancelPersonAndRegistrations(id);

      return res
        .status(200)
        .json({ message: `matrículas ref. estudante ${id} canceladas.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;
