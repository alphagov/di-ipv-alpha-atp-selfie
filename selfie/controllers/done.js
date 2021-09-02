const BaseController = require("hmpo-form-wizard").Controller;
const jwt = require("jsonwebtoken");
const axios = require("axios");

const backendATP = process.env.BASIC_INFO_API ||
  "https://di-ipv-generic-atp-service.london.cloudapps.digital/process";

class DoneController extends BaseController {
  async saveValues(req, res, next) {
    const verificationData = {
      type: "SELFIE_CHECK",
      strength: 4,
      validity: 0,
      attributes: {
        facialVerification: req.sessionModel.get('facialVerification')
      },
    };
    
    const { data: output } = await axios.post(backendATP, verificationData);
    const decoded = jwt.decode(output);

    verificationData.validation = {
      genericDataVerified: decoded.genericDataVerified,
    };

    verificationData.jws = output;
    verificationData.atpResponse = decoded;

    const identityVerification = {
      type: verificationData.type,
      verificationData,
    }

    req.session.sessionData = req.session.sessionData || {};
    req.session.sessionData.identityVerification = req.session.sessionData.identityVerification || [];
    req.session.sessionData.identityVerification.push(identityVerification);

    super.saveValues(req, res, next);
  }
}

module.exports = DoneController;
