Feature: Lead Management

  Scenario: Given: SalesRep has access to the CRM system. When: SalesRep creates a new Lead with contact details. Then: Lead Created event is recorded, and the Lead is added to the system.
    Given SalesRep has access to the CRM system
    When SalesRep creates a new Lead with contact details
    Then Lead Created event is recorded, and the Lead is added to the system