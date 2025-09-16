import express from 'express';
import CreateLeadCommand from '../../../domain/command/CreateLeadCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const result = await CreateLeadCommand.execute(req.body);
    // OpenAPI specification for /create-lead post method defines '200' as success response.
    res.status(200).json(result);
  } catch (err) {
    // According to rules, only status codes 200 and 400 are allowed.
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/create-lead',
  router,
};