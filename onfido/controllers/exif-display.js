const BaseController = require("hmpo-form-wizard").Controller;
const exifr = require("exifr");

class ExifDisplayController extends BaseController {
  async getValues(req, res, next) {
    req.sessionModel.set(
      "passportMetadata",
      await exifr.parse(req.sessionModel.get("passportImage"))
    );
    req.sessionModel.set(
      "uploadedMetadata",
      await exifr.parse(req.sessionModel.get("uploadedImage"))
    );

    super.getValues(req, res, next);
  }

  saveValues(req, res, next) {
    const passportMetadata = req.sessionModel.get("passportMetadata");
    const uploadedMetadata = req.sessionModel.get("uploadedMetadata");

    if (
      !passportMetadata?.ImageDescription ||
      !uploadedMetadata?.ImageDescription
    ) {
      req.sessionModel.set("facialVerification", false);
    } else if (
      passportMetadata.ImageDescription !== uploadedMetadata.ImageDescription
    ) {
      req.sessionModel.set("facialVerification", false);
    } else {
      req.sessionModel.set("facialVerification", true);
    }

    super.saveValues(req, res, next);
  }

  compareFaces(req) {
    return req.sessionModel.get("facialVerification") === true;
  }
}
module.exports = ExifDisplayController;
