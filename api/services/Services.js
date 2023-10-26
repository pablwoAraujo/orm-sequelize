const database = require("../models");

class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async findAll(where = {}) {
    return database[this.modelName].findAll({
      where: { ...where },
    });
  }

  async findOne(where = {}) {
    return database[this.modelName].findOne({
      where: { ...where },
    });
  }

  async findById(id) {
    return database[this.modelName].findOne({
      where: { id: Number(id) },
    });
  }

  async create(data) {
    return database[this.modelName].create(data);
  }

  async update(data, id, transaction = {}) {
    return database[this.modelName].update(
      data,
      { where: { id: id } },
      transaction
    );
  }

  async updateMany(data, where, transaction = {}) {
    return database[this.modelName].update(
      data,
      { where: { ...where } },
      transaction
    );
  }

  async delete(id) {
    return database[this.modelName].destroy({ where: { id: Number(id) } });
  }

  async restore(id) {
    return database[this.modelName].restore({ where: { id: Number(id) } });
  }
}

module.exports = Services;
