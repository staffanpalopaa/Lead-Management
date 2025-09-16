import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'convert-lead-given-a-lead-has-been-qualified.feature'));

defineFeature(feature, test => {
  let leadId;
  let createLeadResponse;
  let qualifyLeadResponse;
  let convertLeadResponse;

  const accountId = 'ACC-UUID-76a5f2a7';
  const contactId = 'C-UUID-76a5f2a7';
  const opportunityName = 'Tech Solutions Software Project X';
  const conversionNotes = 'Converted after successful demo and follow-up on 2025-09-16.';
  const convertedBy = 'SalesRep-007';

  test(
    'Given: A Lead has been qualified. When: SalesRep converts the Lead into an Account, Contact, and Opportunity. Then: Lead Converted event is recorded, and the Lead becomes an Opportunity.',
    ({ given, when, then }) => {
      given('A Lead has been qualified.', async () => {
        const createLeadRequest = {
          id: 'L-76a5f2a7',
          firstName: 'Alice',
          lastName: 'Smith',
          email: 'alice.smith@example.com',
          companyName: 'Tech Solutions Inc.',
          leadSource: 'Referral',
          notes: 'Potential client for new software, referred by partner.',
        };

        createLeadResponse = await request(app)
          .post('/api/v1/create-lead')
          .send(createLeadRequest)
          .expect(200);

        leadId = createLeadResponse.body.id;

        const qualifyLeadRequest = {
          id: leadId,
          status: 'Qualified',
          qualificationNotes: 'Strong budget, clear requirements for product X.',
          budgetEstimate: '150000',
          nextSteps: 'Schedule product demo for next week.',
          qualificationDate: '2025-09-16', // Current date part
        };

        qualifyLeadResponse = await request(app)
          .post('/api/v1/qualify-lead')
          .send(qualifyLeadRequest)
          .expect(200);

        expect(qualifyLeadResponse.body.status).toBe('Qualified');
        expect(qualifyLeadResponse.body.id).toBe(leadId);
      });

      when('SalesRep converts the Lead into an Account, Contact, and Opportunity.', async () => {
        const convertLeadRequest = {
          id: leadId,
          accountId: accountId,
          contactId: contactId,
          opportunityName: opportunityName,
          conversionNotes: conversionNotes,
          convertedBy: convertedBy,
        };

        convertLeadResponse = await request(app)
          .post('/api/v1/convert-lead')
          .send(convertLeadRequest)
          .expect(200);
      });

      then('Lead Converted event is recorded, and the Lead becomes an Opportunity.', async () => {
        expect(convertLeadResponse.status).toBe(200);
        expect(convertLeadResponse.body).toBeDefined();

        expect(convertLeadResponse.body.id).toBe(leadId);
        expect(convertLeadResponse.body.status).toBe('Converted'); // As per business logic for conversion
        expect(convertLeadResponse.body.accountId).toBe(accountId);
        expect(convertLeadResponse.body.contactId).toBe(contactId);
        expect(convertLeadResponse.body.opportunityName).toBe(opportunityName);
        expect(convertLeadResponse.body.conversionNotes).toBe(conversionNotes);
        expect(convertLeadResponse.body.convertedBy).toBe(convertedBy);
      });
    }
  );
});