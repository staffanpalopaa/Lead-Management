import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'qualify-lead-given-a-lead-has-been-created.feature'));

const CURRENT_DATE_YYYY_MM_DD = '2025-09-16';

defineFeature(feature, test => {
  let leadId;
  let qualifyLeadResponse;

  test(
    'Given: A Lead has been created. When: SalesRep updates the Lead status to qualified after evaluation. Then: Lead Qualified event is recorded, and the Lead\'s status is updated.',
    ({ given, when, then }) => {
      given('A Lead has been created.', async () => {
        leadId = `L-${Date.now()}`;
        const createLeadRequest = {
          id: leadId,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          companyName: "Acme Corp",
          leadSource: "Web",
          notes: "Initial inquiry from website"
        };

        const response = await request(app)
          .post('/api/v1/create-lead')
          .send(createLeadRequest)
          .expect(200);

        expect(response.body.id).toEqual(leadId);
        expect(response.body.firstName).toEqual("John");
        expect(response.body.lastName).toEqual("Doe");
      });

      when('SalesRep updates the Lead status to qualified after evaluation.', async () => {
        const qualifyLeadRequest = {
          id: leadId,
          status: "Qualified",
          qualificationNotes: "Strong potential, good budget.",
          budgetEstimate: "100000",
          nextSteps: "Schedule a follow-up call.",
          qualificationDate: CURRENT_DATE_YYYY_MM_DD
        };

        qualifyLeadResponse = await request(app)
          .post('/api/v1/qualify-lead')
          .send(qualifyLeadRequest);
      });

      then('Lead Qualified event is recorded, and the Lead\'s status is updated.', async () => {
        expect(qualifyLeadResponse.statusCode).toBe(200);
        expect(qualifyLeadResponse.body.id).toEqual(leadId);
        expect(qualifyLeadResponse.body.status).toEqual("Qualified");
        expect(qualifyLeadResponse.body.qualificationNotes).toEqual("Strong potential, good budget.");
        expect(qualifyLeadResponse.body.budgetEstimate).toEqual("100000");
        expect(qualifyLeadResponse.body.nextSteps).toEqual("Schedule a follow-up call.");
        expect(qualifyLeadResponse.body.qualificationDate).toEqual(CURRENT_DATE_YYYY_MM_DD);
      });
    }
  );
});