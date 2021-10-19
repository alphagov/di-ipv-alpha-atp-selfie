const BaseController = require("hmpo-form-wizard").Controller;
const { Onfido, Region } = require("@onfido/api");
const debug = require("debug")("selfie:onfido-create-web-token");
// const PassThrough = require("stream").PassThrough;
const {PassThrough, Readable} = require('stream')

const onfido = new Onfido({
  apiToken: process.env.ONFIDO_API_TOKEN,
  // Supports Region.EU, Region.US and Region.CA
  region: Region.EU,
});

class OnfidoCreateWebTokenController extends BaseController {
  async saveValues(req, res, next) {
    debug('saveValues')
    const applicant = req.sessionModel.get('onfidoApplicant')


    try {
      const sdkToken = await onfido.sdkToken.generate({
        applicantId: applicant.id,
        referrer: "http://di-ipv-frontend/**",
      });

      req.sessionModel.set('onfidoSDKToken', sdkToken)

    } catch (error) {
      console.log(error.message);
      return next(error);
    }

    super.saveValues(req, res, next);
  }
}

module.exports = OnfidoCreateWebTokenController;
