const BaseController = require("hmpo-form-wizard").Controller;
const debug = require("debug")("idemia:document-upload");

class DocumentUpload extends BaseController {
  // Multi Part forms have multiple streams of data within the same POST body
  // busboy-body-parser puts them into req.files
  // This file data is saved into the sessionModel to be used later
  process(req, res, next) {
    if (req.files && req.files["document-file"]) {
      debug("storeMultiPartFormData: storing in document");
      req.sessionModel.set("documentData", req.files["document-file"]);
    }

    super.process(req, res, next);
  }
}

module.exports = DocumentUpload;
