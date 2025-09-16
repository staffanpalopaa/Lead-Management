import db from '../../infrastructure/db/index.js';

class GetAllLeadsReadModel {
  static async query() {
    return await db.findAll('Lead');
  }
}

export default GetAllLeadsReadModel;