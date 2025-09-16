Feature: Lead Management
  As a Sales Representative
  I want to convert a qualified lead
  So that it becomes an Account, Contact, and Opportunity

  Scenario: Given: A Lead has been qualified. When: SalesRep converts the Lead into an Account, Contact, and Opportunity. Then: Lead Converted event is recorded, and the Lead becomes an Opportunity.
    Given A Lead has been qualified.
    When SalesRep converts the Lead into an Account, Contact, and Opportunity.
    Then Lead Converted event is recorded, and the Lead becomes an Opportunity.