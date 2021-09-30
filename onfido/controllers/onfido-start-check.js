const BaseController = require("hmpo-form-wizard").Controller;
const { Onfido, Region } = require("@onfido/api");
const debug = require("debug")("selfie:onfido-start-check");
// const PassThrough = require("stream").PassThrough;
const {PassThrough, Readable} = require('stream')

const onfido = new Onfido({
  apiToken: process.env.ONFIDO_API_TOKEN,
  // Supports Region.EU, Region.US and Region.CA
  region: Region.EU,
});

class OnfidoStartCheckController extends BaseController {
  async saveValues(req, res, next) {
    const applicant = req.sessionModel.get('onfidoApplicant')

    try {
      // > The following reports have not been enabled for your account: facial_similarity
      const check = await onfido.check.create({
        applicantId: applicant.id,
        reportNames: ["document", "facial_similarity_photo"],
      });

      req.sessionModel.set("applicationId", applicant.id);
      req.sessionModel.set("checkId", check.id);

    } catch (error) {
      console.log(error.message);
      return next(error);
    }

    super.saveValues(req, res, next);
  }
}

module.exports = OnfidoStartCheckController;
