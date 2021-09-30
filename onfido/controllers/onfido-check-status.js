const BaseController = require("hmpo-form-wizard").Controller;
const { Onfido, Region } = require("@onfido/api");
const debug = require("debug")("selfie:onfido-check");

const onfido = new Onfido({
  apiToken: process.env.ONFIDO_API_TOKEN,
  // Supports Region.EU, Region.US and Region.CA
  region: Region.EU,
});


class OnfidoCheckStatus extends BaseController {
  async getValues(req, res, next) {
    try {
      const check = await onfido.check.find(req.sessionModel.get("checkId"));

      // Check is not pending, or held up
      if (check.status === "complete") {
        // No problems with verification
        if (check.result === "clear") {
          debug('Check is clear')
          req.sessionModel.set("checkResult", check.result);
          req.sessionModel.set("check", check);
        }
      }
      if (check.status !== "in_progress") {
        req.sessionModel.set("checkResult", check.result);
        req.sessionModel.set("check", check);
      }

      debug(req.sessionModel.toJSON());
      debug(check);
    } catch (error) {
      // if (error instanceof OnfidoApiError) {
      //   // An error response was received from the Onfido API, extra info is available.
      //   console.log(error.message);
      //   console.log(error.type);
      //   console.log(error.isClientError());
      // } else {
      // No response was received for some reason e.g. a network error.
      console.log(error.message);
      return next(error);
      // }
    }

    super.getValues(req, res, next);
  }
}

module.exports = OnfidoCheckStatus;
