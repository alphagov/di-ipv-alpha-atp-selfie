const BaseController = require("hmpo-form-wizard").Controller;
const debug = require("debug")("selfie:idemia-create-identity");
const axios = require("axios");

const instance = axios.create({
  baseURL: `${process.env.IDEMIA_URL}/gips/v1`,
  timeout: 5000,
  headers: { apikey: process.env.IDEMIA_API_TOKEN },
});

class IdemiaCreateIdentityController extends BaseController {
  async saveValues(req, res, next) {
    debug("saveValues");

    try {
      const identity = await instance.post(
        `/identities`,
        {},
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      debug(identity.data);

      req.sessionModel.set("idemiaIdentity", identity.data);
    } catch (error) {
      console.log(error.message);
      return next(error);
    }

    super.saveValues(req, res, next);
  }
}

module.exports = IdemiaCreateIdentityController;
