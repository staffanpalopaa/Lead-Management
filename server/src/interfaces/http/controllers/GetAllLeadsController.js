import express from 'express';
import GetAllLeadsReadModel from '../../../domain/readmodel/GetAllLeadsReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const leads = await GetAllLeadsReadModel.query();
    res.status(200).json(leads);
  } catch (err) {
    // For unhandled internal errors, 500 is more appropriate than 400
    res.status(500).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-all-leads',
  router,
};