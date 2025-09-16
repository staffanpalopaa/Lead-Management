class Lead {
  constructor({
    id,
    firstName,
    lastName,
    email,
    phone,
    companyName,
    leadSource,
    notes,
    status,
    qualificationNotes,
    budgetEstimate,
    nextSteps,
    qualificationDate,
    accountId,
    contactId,
    opportunityName,
    conversionNotes,
    convertedBy
  }) {
    // Validate required fields based on critical business data, following the example's spirit.
    // OpenAPI spec does not specify 'required', so this assumes essential fields for a Lead.
    if (!id) throw new Error('Lead ID is required.');
    if (!firstName) throw new Error('First name is required.');
    if (!lastName) throw new Error('Last name is required.');
    if (!email) throw new Error('Email is required.');

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.companyName = companyName;
    this.leadSource = leadSource;
    this.notes = notes;
    this.status = status;
    this.qualificationNotes = qualificationNotes;
    this.budgetEstimate = budgetEstimate;
    this.nextSteps = nextSteps;
    this.qualificationDate = qualificationDate;
    this.accountId = accountId;
    this.contactId = contactId;
    this.opportunityName = opportunityName;
    this.conversionNotes = conversionNotes;
    this.convertedBy = convertedBy;
  }

  toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      companyName: this.companyName,
      leadSource: this.leadSource,
      notes: this.notes,
      status: this.status,
      qualificationNotes: this.qualificationNotes,
      budgetEstimate: this.budgetEstimate,
      nextSteps: this.nextSteps,
      qualificationDate: this.qualificationDate,
      accountId: this.accountId,
      contactId: this.contactId,
      opportunityName: this.opportunityName,
      conversionNotes: this.conversionNotes,
      convertedBy: this.convertedBy
    };
  }
}

export default Lead;