// const doneController = require("./controllers/done");
// const documentUploadController = require("./controllers/document-upload");
// const photoUploadController = require("./controllers/photo-upload");
// const onfidoStartCheckController = require("./controllers/onfido-start-check");
// const onfidoCheckStatusController = require("./controllers/onfido-check-status");
// const onfidoCreateApplicantController = require("./controllers/onfido-create-applicant");
// const onfidoUploadController = require("./controllers/onfido-upload");

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
  // "/name": {
  //   fields: ["surname", "givenNames"],
  //   next: "integration-type",
  // },
  // "/integration-type": {
  //   fields: ["integrationType"],
  //   next: ["gds-style"],
  // },
  // "/gds-style": {
  //   next: "document-upload",
  // },
  // "/document-upload": {
  //   controller: documentUploadController,
  //   fields: ["document", "document-file"],
  //   next: "document-uploaded",
  // },
  // "/document-uploaded": {
  //   next: "photo-upload",
  // },
  // "/photo-upload": {
  //   entryPoint: true,
  //   controller: photoUploadController,
  //   next: "photo-uploaded",
  // },
  // "/photo-uploaded": {
  //   next: "onfido-create-applicant",
  // },
  // "/onfido-create-applicant": {
  //   controller: onfidoCreateApplicantController,
  //   skip: true,
  //   next: "onfido-upload",
  // },
  // "/onfido-upload": {
  //   controller: onfidoUploadController,
  //   skip: true,
  //   next: "onfido-start-check",
  // },
  // "/onfido-start-check": {
  //   skip: true,
  //   controller: onfidoStartCheckController,
  //   next: "check-status",
  // },
  // "/check-status": {
  //   controller: onfidoCheckStatusController,
  //   next: [
  //     {
  //       fn: (req) => req.sessionModel.get("checkResult") === "clear",
  //       next: "check-confirmed",
  //     },
  //     "check-unconfirmed",
  //   ],
  // },
  // "/check-confirmed": {
  //   next: "done",
  // },
  //
  // "/check-unconfirmed": {},
  // "/done": {
  //   controller: doneController,
  //   skip: true,
  //   next: "/ipv/next?source=selfie",
  // },
};
