module.exports = {
  resultType: {
    type:"radios",
    items: [
        "clear",
        "consider",
        "caution",
        "suspected",
        "rejected"
    ]
  },
  breakdown: {
    type: "radios",
    items: [
      "imageIntegrity",
      "visualAuthenticity",
      "dataValidation",
      "dataConsistency",
    ],
    validate: ["required"],
  },
  subBreakdownImageIntegrity: {
    type: "radios",
    items: [
        "supportedDocument",
        "imageQuality"
    ],
    validate: "required"
  },
  subBreakdownVisualAuthenticity: {
    type: "radios",
    items: [
      "fonts",
      "securityFeatures",
      "faceDetection"
    ],
    validate: "required"
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
  "document-file": {},
  document: {},
  livePhoto: {},
  integrationType: {
    "type": "radios",
    items: [
        "api",
        "onfido"
    ]
  }
};
