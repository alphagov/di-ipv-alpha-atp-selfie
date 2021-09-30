const doneController = require("./controllers/done");
const documentUploadController = require("./controllers/document-upload");
const photoUploadController = require("./controllers/photo-upload");
const onfidoStartCheckController = require("./controllers/onfido-start-check");
const onfidoCheckStatusController = require("./controllers/onfido-check-status");
const onfidoCreateApplicantController = require("./controllers/onfido-create-applicant");
const onfidoUploadController = require("./controllers/onfido-upload");

module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    next: "info",
  },
  "/info": {
    next: "name",
  },
  // "/result-types": {
  //   fields: ["resultType"],
  //   next: [
  //     { field: "resultType", value: "clear", next: "name" },
  //     "breakdown",
  //   ],
  // },
  // "/breakdown": {
  //   fields: ["breakdown"],
  //   next: [
  //     { imageIntegrity: "image-integrity" },
  //     { visualAuthenticity: "visual-authenticity" },
  //     "document-upload",
  //   ],
  // },
  "/name": {
    fields: ["surname", "givenNames"],
    next: "integration-type",
  },
  "/integration-type": {
    fields: ["integrationType"],
    next: ["gds-style"],
  },
  "/gds-style": {
    next: "document-upload",
  },
  "/document-upload": {
    controller: documentUploadController,
    fields: ["document", "document-file"],
    next: "document-uploaded",
  },
  "/document-uploaded": {
    next: "photo-upload",
  },
  "/photo-upload": {
    entryPoint: true,
    controller: photoUploadController,
    next: "photo-uploaded",
  },
  "/photo-uploaded": {
    next: "onfido-create-applicant",
  },
  "/onfido-create-applicant": {
    controller: onfidoCreateApplicantController,
    skip: true,
    next: "onfido-upload",
  },
  "/onfido-upload": {
    controller: onfidoUploadController,
    skip: true,
    next: "onfido-start-check",
  },
  "/onfido-start-check": {
    skip: true,
    controller: onfidoStartCheckController,
    next: "check-status",
  },
  "/check-status": {
    controller: onfidoCheckStatusController,
    next: [
      {
        fn: (req) => req.sessionModel.get("checkResult") === "clear",
        next: "check-confirmed",
      },
      "check-unconfirmed",
    ],
  },
  "/check-confirmed": {
    next: "done",
  },

  "/check-unconfirmed": {},
  "/done": {
    controller: doneController,
    skip: true,
    next: "/ipv/next?source=selfie",
  },
  // "/run-check": {
  //   controller: onfidoRunCheckController
  // },
  // "/passport-details": {
  //   fields: [
  //     "passportNumber",
  //     "surname",
  //     "givenNames",
  //     "dateOfBirth",
  //     "issueDate",
  //     "expiryDate",
  //   ],
  //   controller: passportDetails,
  //   next: "face-upload",
  // },
  // "/document-upload": {
  //   fields: ["documentFileUpload"],
  //   next: "face-comparison",
  // },
  //
  // "/face-upload": {
  //   fields: ["faceFileUpload"],
  //   next: "face-comparison",
  // },
  // "/face-uploaded": {
  //   entryPoint: true,
  //   skip: true,
  //   noPost: true,
  //   next: ["exif-display"],
  // },
  // "/exif-display": {
  //   entryPoint: true,
  //   controller: exifDisplayController,
  //   next: [{ fn: "compareFaces", next: "face-match" }, "face-no-match"],
  // },
  // "/face-match": {
  //   entryPoint: true,
  //   prereq: ["face-comparison", "exif-comparison"],
  //   next: ["done"],
  // },
  // "/face-no-match": {
  //   entryPoint: true,
  //   prereqs: ["/selfie/face-comparison"],
  //   next: ["done"],
  // },
  // "/not-available": {},
  // "/done": {
  //   controller: doneController,
  //   entryPoint: true,
  //   skip: true,
  //   next: "/ipv/next?source=selfie"
  // },
};
