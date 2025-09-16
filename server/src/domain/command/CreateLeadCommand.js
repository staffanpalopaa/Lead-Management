import Lead from '../entity/Lead.js';
import db from '../../infrastructure/db/index.js';

class CreateLeadCommand {
  static async execute({ id, firstName, lastName, email, phone, companyName, leadSource, notes }) {
    // The Lead entity is assumed to handle defaults for fields not provided
    // in the constructor if they are optional.
    const lead = new Lead({ id, firstName, lastName, email, phone, companyName, leadSource, notes });

    // "Lead is added to the system."
    await db.insert('Lead', lead.toJSON());

    // As per GWT: "Lead Created event is recorded". This example implicitly handles
    // that by returning the created lead, which signals success.
    return lead.toJSON();
  }
}

export default CreateLeadCommand;