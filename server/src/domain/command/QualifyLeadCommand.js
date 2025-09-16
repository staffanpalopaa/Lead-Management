import Lead from '../entity/Lead.js';
import db from '../../infrastructure/db/index.js';

class QualifyLeadCommand {
  static async execute({ id, status, qualificationNotes, budgetEstimate, nextSteps, qualificationDate }) {
    // 1. Find the existing Lead
    const existingLeadData = await db.findById('Lead', id);

    if (!existingLeadData) {
      throw new Error(`Lead with ID ${id} not found.`);
    }

    // 2. Create a Lead entity instance from existing data
    const lead = new Lead(existingLeadData);

    // 3. Update the Lead's properties based on the qualification
    // As per GWT: "SalesRep updates the Lead status to qualified after evaluation."
    // The controller ensures 'status' is 'Qualified' for this endpoint.
    lead.status = status;
    lead.qualificationNotes = qualificationNotes;
    lead.budgetEstimate = budgetEstimate;
    lead.nextSteps = nextSteps;
    lead.qualificationDate = qualificationDate;

    // 4. Persist the updated Lead
    const updatedLeadData = await db.update('Lead', id, lead.toJSON());

    if (!updatedLeadData) {
        throw new Error(`Failed to update Lead with ID ${id}.`);
    }

    return updatedLeadData;
  }
}

export default QualifyLeadCommand;