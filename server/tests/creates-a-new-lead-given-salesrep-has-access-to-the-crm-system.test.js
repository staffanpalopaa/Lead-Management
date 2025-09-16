import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, './creates-a-new-lead-given-salesrep-has-access-to-the-crm-system.feature'));

defineFeature(feature, test => {
  let createLeadResponse;
  let newLeadId;
  const createdLeadData = {
    id: `L-${Date.now()}`,
    firstName: 'Alice',
    lastName: 'Wonder',
    email: 'alice.wonder@example.com',
    phone: '111-222-3333',
    companyName: 'Wonderland Inc',
    leadSource: 'Referral',
    notes: 'Met at convention, interested in partnership',
  };

  test(
    'Given: SalesRep has access to the CRM system. When: SalesRep creates a new Lead with contact details. Then: Lead Created event is recorded, and the Lead is added to the system.',
    ({ given, when, then }) => {
      given('SalesRep has access to the CRM system', async () => {
        // No specific API interaction needed for this 'Given' step as it's a precondition of access.
        // The test implicitly assumes the user (SalesRep) has the necessary permissions.
        expect(true).toBe(true);
      });

      when('SalesRep creates a new Lead with contact details', async () => {
        createLeadResponse = await request(app)
          .post('/api/v1/create-lead')
          .send(createdLeadData);

        newLeadId = createLeadResponse.body.id;
      });

      then('Lead Created event is recorded, and the Lead is added to the system', async () => {
        expect(createLeadResponse.statusCode).toBe(200);
        expect(createLeadResponse.body).toBeDefined();

        // Assert response body conforms to Lead schema
        expect(createLeadResponse.body.id).toBe(newLeadId);
        expect(createLeadResponse.body.firstName).toBe(createdLeadData.firstName);
        expect(createLeadResponse.body.lastName).toBe(createdLeadData.lastName);
        expect(createLeadResponse.body.email).toBe(createdLeadData.email);
        expect(createLeadResponse.body.companyName).toBe(createdLeadData.companyName);
        expect(createLeadResponse.body.status).toBeDefined(); // Status is assigned by the system upon creation, typically 'New'
        
        // Optional fields should also be present if provided in the request
        expect(createLeadResponse.body.phone).toBe(createdLeadData.phone);
        expect(createLeadResponse.body.leadSource).toBe(createdLeadData.leadSource);
        expect(createLeadResponse.body.notes).toBe(createdLeadData.notes);

        // Verify the lead actually exists in the system by fetching all leads
        const getAllLeadsResponse = await request(app)
          .get('/api/v1/get-all-leads');

        expect(getAllLeadsResponse.statusCode).toBe(200);
        expect(Array.isArray(getAllLeadsResponse.body)).toBe(true);

        const foundLead = getAllLeadsResponse.body.find(lead => lead.id === newLeadId);
        expect(foundLead).toBeDefined();
        expect(foundLead.firstName).toBe(createdLeadData.firstName);
        // ... and other assertions for the foundLead as necessary
      });
    }
  );
});