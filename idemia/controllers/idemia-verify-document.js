const BaseController = require("hmpo-form-wizard").Controller;
const debug = require("debug")("selfie:idemia-verify-document");
const axios = require("axios");
const FormData = require("form-data");

const instance = axios.create({
  baseURL: `${process.env.IDEMIA_URL}/gips/v1`,
  timeout: 5000,
  headers: { apikey: process.env.IDEMIA_API_TOKEN },
});

instance.interceptors.request.use((request) => {
  debug("request");
  debug("Starting Request", JSON.stringify(Object.keys(request), null, 2));
  debug("Properties", request.data, null, 2);
  return request;
});

instance.interceptors.response.use((response) => {
  debug("response");
  debug("Response:", JSON.stringify(Object.keys(response), null, 2));
  return response;
});

class IdemiaVerifyDocumentController extends BaseController {
  async saveValues(req, res, next) {
    debug("saveValues");
    const identity = req.sessionModel.get("idemiaIdentity");

    try {
      const captureDetails = {
        jurisdiction: "GBR",
        documentType: "PASSPORT",
        source: "OTHER",
      };

      debug(req.sessionModel.get("documentData"));

      const document = req.sessionModel.get("documentData");
      const form = new FormData();

      form.append("DocumentFront", document.data);
      form.append("DocumentCaptureDetails", Buffer.from(JSON.stringify(captureDetails)));

      debug(form);

      const verify = await instance.post(
        `/identities/${identity.id}/id-documents/capture`,
        form,
        { headers: { ...form.getHeaders() } }
      );
      debug(verify.data);
    } catch (error) {
      console.log(error.message);
      return next(error);
    }

    super.saveValues(req, res, next);
  }
}

module.exports = IdemiaVerifyDocumentController;
