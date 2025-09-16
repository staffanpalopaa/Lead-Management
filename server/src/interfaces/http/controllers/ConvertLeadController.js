import express from 'express';
import ConvertLeadCommand from '../../../domain/command/ConvertLeadCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id, accountId, contactId, opportunityName, conversionNotes, convertedBy } = req.body;

    const result = await ConvertLeadCommand.execute({
      id,
      accountId,
      contactId,
      opportunityName,
      conversionNotes,
      convertedBy,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/convert-lead',
  router,
};