const MongoLib = require('../lib/mongo');

class GuisadosService {
constructor(){
  this.collection = 'guisados';
  this.mongoDB = new MongoLib();
}

  async getGuisados({ tags }){
    const query = tags && { tags: { $in: tags } };
    const guisados = await this.mongoDB.getAll(this.collection, query)
    return guisados || []
  }

  async getGuisado({ guisadoId }){
    const guisado = await this.mongoDB.get(this.collection, guisadoId);
    return guisado || {};
  }

  async createGuisado({ guisado }){
    const createdGuisadoId = await this.mongoDB.create(this.collection, guisado);
    return createdGuisadoId;
  }

  async updateGuisado({ guisadoId, guisado } = {}){
    const updatedGuisadoId = await this.mongoDB.update(this.collection, guisadoId, guisado);
    return updatedGuisadoId;
  }

  async deleteGuisado({ guisadoId }){
    const deletedGuisadoId = await this.mongoDB.delete(this.collection, guisadoId);
    return deletedGuisadoId;
  }

/*   async patchGuisado(){
    const patchedGuisadoId = await Promise.resolve(guisadoMock[0].id);
    return patchedGuisadoId;
  } */
}

module.exports = { GuisadosService };