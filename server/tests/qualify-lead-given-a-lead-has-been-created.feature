Feature: Lead Management

  Scenario: Given: A Lead has been created. When: SalesRep updates the Lead status to qualified after evaluation. Then: Lead Qualified event is recorded, and the Lead's status is updated.
    Given A Lead has been created.
    When SalesRep updates the Lead status to qualified after evaluation.
    Then Lead Qualified event is recorded, and the Lead's status is updated.