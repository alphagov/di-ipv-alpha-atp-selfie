const BaseController = require("hmpo-form-wizard").Controller;
const debug = require("debug")("selfie:idemia-consent");
const axios = require("axios");

const instance = axios.create({
  baseURL: `${process.env.IDEMIA_URL}/gips/v1`,
  timeout: 5000,
  headers: { apikey: process.env.IDEMIA_API_TOKEN },
});

instance.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})

instance.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(Object.keys(response), null, 2))
  return response
})


class IdemiaCreateIdentityController extends BaseController {
  async saveValues(req, res, next) {
    debug("saveValues");

    const identity = req.sessionModel.get('idemiaIdentity')
    debug(identity)


    try {
      const payload = [
        {
          "approved": true,
          "type": "PORTRAIT"
        }
      ];

      const consent = await instance.post(
        `/identities/${identity.id}/consents`,
          payload,
          { headers: { "Content-Type": "application/json" } }
      );
      debug(consent.data);
    } catch (error) {
      console.log(error.message);
      return next(error);
    }

    super.saveValues(req, res, next);
  }
}

module.exports = IdemiaCreateIdentityController;

