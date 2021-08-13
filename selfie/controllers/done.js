const BaseController = require("hmpo-form-wizard").Controller;
const jwt = require("jsonwebtoken");
const axios = require("axios");

const backendATP =
  "https://di-ipv-generic-atp-service.london.cloudapps.digital/process";

class DoneController extends BaseController {
  async saveValues(req, res, next) {
    const identityVerification = {
      type: "UK_PASSPORT",
      strength: 4,
      validity: 0,
      attributes: {
        facialVerification: req.sessionModel.get('facialVerification')
      },
    };

    const { data: output } = await axios.post(backendATP, identityVerification);
    const decoded = jwt.decode(output);

    identityVerification.validation = {
      genericDataVerified: decoded.genericDataVerified,
    };

    identityVerification.jws = output;
    identityVerification.atpResponse = decoded;

    req.session.identityVerification = req.session.identityVerification || [];
    req.session.identityVerification.push(identityVerification);

    super.saveValues(req, res, next);
  }
}

module.exports = DoneController;
