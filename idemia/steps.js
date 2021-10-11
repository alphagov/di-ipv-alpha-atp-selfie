// const doneController = require("./controllers/done");
// const documentUploadController = require("./controllers/document-upload");
// const photoUploadController = require("./controllers/photo-upload");
// const onfidoStartCheckController = require("./controllers/onfido-start-check");
// const onfidoCheckStatusController = require("./controllers/onfido-check-status");
// const onfidoCreateApplicantController = require("./controllers/onfido-create-applicant");
// const onfidoUploadController = require("./controllers/onfido-upload");
const idemiaCreateIdentityController = require("./controllers/idemia-create-identity");
const idemiaConsentController = require("./controllers/idemia-consent");
const idemiaVerifyDocumentController = require("./controllers/idemia-verify-document");
const documentUploadController = require("./controllers/document-upload");
const photoUploadController = require("./controllers/photo-upload");
const doneController = require("./controllers/done");

module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    next: "info",
  },
  "/info": {
    next: "idemia-create-identity",
  },
  "/idemia-create-identity": {
    controller: idemiaCreateIdentityController,
    skip: true,
    next: "idemia-consent",
  },
  "/idemia-consent": {
    controller: idemiaConsentController,
    next: "document-upload"
  },
  "/document-upload": {
    controller: documentUploadController,
    fields: ["document", "document-file"],
    next: "idemia-verify-document",
  },
  "/idemia-verify-document": {
    controller: idemiaVerifyDocumentController,
    next: "idemia-check-identity-status",
  },
  "/idemia-check-identity-status": {
    next: "photo-upload",
  },
  "/photo-upload": {
    entryPoint: true,
    controller: photoUploadController,
    next: "idemia-verify-selfie",
  },
  "/idemia-verify-selfie": {
    next: "onfido-create-applicant",
  },
  "/idemia-check-status": {
    next:"idemia-check-identity-status-final"
  },
  "/idemia-proof": {
    next: "done"
  },
  "/done": {
    controller: doneController,
    skip: true,
    next: "/ipv/next?source=selfie",
  },
};
