const BaseController = require("hmpo-form-wizard").Controller;
const { Onfido, Region } = require("@onfido/api");
const debug = require("debug")("selfie:onfido-create-applicant");
// const PassThrough = require("stream").PassThrough;
const {PassThrough, Readable} = require('stream')

const onfido = new Onfido({
  apiToken: process.env.ONFIDO_API_TOKEN,
  // Supports Region.EU, Region.US and Region.CA
  region: Region.EU,
});

class OnfidoCreateApplicantController extends BaseController {
  async saveValues(req, res, next) {
    debug('saveValues')
    try {
      const applicant = await onfido.applicant.create({
        firstName: req.sessionModel.get("givenNames"),
        lastName: req.sessionModel.get("surname"),
      });

      debug(applicant)
      req.sessionModel.set('onfidoApplicant', applicant)

    } catch (error) {
      console.log(error.message);
      return next(error);
    }

    super.saveValues(req, res, next);
  }
}

module.exports = OnfidoCreateApplicantController;
