import express from 'express';
import QualifyLeadCommand from '../../../domain/command/QualifyLeadCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Extract all fields from req.body as per OpenAPI specification
    const { id, status, qualificationNotes, budgetEstimate, nextSteps, qualificationDate } = req.body;

    // Basic validation for 'id' as it's essential for an update operation,
    // and semantic validation for 'status' as per GWT description.
    if (!id) {
        return res.status(400).json({ message: 'Lead ID is required to qualify a lead.' });
    }
    // GWT: "SalesRep updates the Lead status to qualified after evaluation."
    // This implies that for this specific 'qualify-lead' endpoint, the status provided must be 'Qualified'.
    if (status !== 'Qualified') {
        return res.status(400).json({ message: 'The status must be "Qualified" when qualifying a lead.' });
    }

    const result = await QualifyLeadCommand.execute({
      id,
      status,
      qualificationNotes,
      budgetEstimate,
      nextSteps,
      qualificationDate,
    });
    res.status(200).json(result); // OpenAPI specifies 200 for success
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/qualify-lead', // As per OpenAPI path
  router,
};