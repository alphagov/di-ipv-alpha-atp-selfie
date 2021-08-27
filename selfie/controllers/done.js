const BaseController = require("hmpo-form-wizard").Controller;
const jwt = require("jsonwebtoken");
const axios = require("axios");

const backendATP = process.env.BASIC_INFO_API ||
  "https://di-ipv-generic-atp-service.london.cloudapps.digital/process";

class DoneController extends BaseController {
  async saveValues(req, res, next) {
    const identityVerificationData = {
      type: "SELFIE",
      strength: 4,
      validity: 0,
      attributes: {
        facialVerification: req.sessionModel.get('facialVerification')
      },
    };
    
    const { data: output } = await axios.post(backendATP, identityVerificationData);
    const decoded = jwt.decode(output);

    identityVerificationData.validation = {
      genericDataVerified: decoded.genericDataVerified,
    };

    identityVerificationData.jws = output;
    identityVerificationData.atpResponse = decoded;

    const identityVerification = {
      data: identityVerificationData,
      score: req.sessionModel.get('facialVerification') ? 4 : 0
    }

    req.session.sessionData = req.session.sessionData || {};
    req.session.sessionData.identityVerification = req.session.sessionData.identityVerification || [];
    req.session.sessionData.identityVerification.push(identityVerification);

    super.saveValues(req, res, next);
  }
}

module.exports = DoneController;
