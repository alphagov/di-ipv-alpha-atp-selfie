const BaseController = require("hmpo-form-wizard").Controller;
const { Onfido, Region } = require("@onfido/api");
const debug = require("debug")("selfie:onfido-upload");
// const PassThrough = require("stream").PassThrough;
const {PassThrough, Readable} = require('stream')

const onfido = new Onfido({
  apiToken: process.env.ONFIDO_API_TOKEN,
  // Supports Region.EU, Region.US and Region.CA
  region: Region.EU,
});

class OnfidoUploadController extends BaseController {
  async saveValues(req, res, next) {
    const applicant = req.sessionModel.get('onfidoApplicant')
    try {
      const documentData = req.sessionModel.get('documentData')

      const documentBufferStream = new PassThrough();
      documentBufferStream.end(Buffer.from(documentData.data.data));

      const documentUpload = await onfido.document.upload({
        applicantId: applicant.id,
        file: {
          contents: documentBufferStream,
          filepath: documentData.name,
          contentType: documentData.mimetype,
        },
        type: "driving_licence",
      });

      const photoData = req.sessionModel.get('photoData')

      const photoBufferStream = new PassThrough();
      photoBufferStream.end(Buffer.from(photoData.data.data));

      const photoUpload = await onfido.livePhoto.upload({
        applicantId: applicant.id,
        file: {
          contents: photoBufferStream,
          filepath: photoData.name,
          contentType: photoData.mimetype,
        },
      })
    } catch (error) {
      console.log(error.message);
      return next(error);
    }

    super.saveValues(req, res, next);
  }
}

module.exports = OnfidoUploadController;
