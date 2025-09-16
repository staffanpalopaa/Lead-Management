import Lead from '../entity/Lead.js';
import db from '../../infrastructure/db/index.js';

class ConvertLeadCommand {
  static async execute({ id, accountId, contactId, opportunityName, conversionNotes, convertedBy }) {
    if (!id) {
      throw new Error('Lead ID is required for conversion.');
    }

    const existingLeadData = await db.findById('Lead', id);

    if (!existingLeadData) {
      throw new Error(`Lead with ID ${id} not found.`);
    }

    const lead = new Lead(existingLeadData); // Rehydrate the Lead entity

    if (lead.status !== 'Qualified') {
      throw new Error(`Lead with ID ${id} must be 'Qualified' to be converted.`);
    }

    // Apply conversion details and update status
    const updates = {
      status: 'Converted',
      accountId: accountId,
      contactId: contactId,
      opportunityName: opportunityName,
      conversionNotes: conversionNotes,
      convertedBy: convertedBy,
    };

    // Assuming the Lead entity has a method to apply updates or db.update handles it
    const updatedLeadData = await db.update('Lead', id, updates);

    return updatedLeadData;
  }
}

export default ConvertLeadCommand;