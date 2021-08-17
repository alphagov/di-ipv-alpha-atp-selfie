module.exports = {
  passportNumber: {
    type: "text",
    // validate: ["required"],
  },
  surname: {
    type: "text",
    // validate: ["required"],
    journeyKey: "surname",
  },
  givenNames: {
    type: "text",
    // validate: ["required"],
    journeyKey: "givenNames",
  },
  dateOfBirth: {
    type: "date",
    journeyKey: "dateOfBirth",
    validate: ["date"],
  },
  issueDate: {
    type: "date",
    validate: ["date"],
    // validate: ["required"],
  },
  expiryDate: {
    type: "date",
    validate: ["date"],
    // validate: ["required"],
  },
  facialVerificationType: {
    type: "radios",
    items: ["exif", "onfido","idemia"],
    validate: ["required"],
  },
  faceFileUpload: {
    type: "govUKFileUpload"
  }
};
