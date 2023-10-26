const Services = require("./Services");
const database = require("../models");

class PessoasService extends Services {
  constructor() {
    super("Pessoas");
    this.matriculas = new Services("Matriculas");
  }

  // Métodos específicos do controlador de Pessoas

  async findAllRecords(where = {}) {
    return database[this.modelName]
      .scope("allRecords")
      .findAll({ where: { ...where } });
  }

  async cancelPersonAndRegistrations(id) {
    return database.sequelize.transaction(async (transaction) => {
      await super.update({ ativo: false }, id, transaction);

      await this.matriculas.updateMany(
        { status: "cancelado" },
        { estudante_id: Number(id) },
        transaction
      );
    });
  }
}

module.exports = PessoasService;
