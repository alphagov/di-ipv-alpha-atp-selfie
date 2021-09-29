const HmpoFormWizard = require("hmpo-form-wizard");
const debug = require('debug')('selfie:router');

const steps = require("./steps");
const fields = require("./fields");

const router = new HmpoFormWizard(steps, fields, {
  name: "exif",
  journeyName: "ipv",
  templatePath: "exif"
});

router.use('/upload', require('busboy-body-parser')({limit: '5mb'}),(req, res,next) => {
  if(!req.files || !req.files.faceFileUpload) {
    debug('No files uploaded')
    return res.redirect('/selfie/exif/face-upload')
  }

  req.session['hmpo-wizard-selfie'].uploadedImage = req.files.faceFileUpload.data.toString('base64')
  debug('Face file uploaded')
  res.redirect('/selfie/exif/exif-display')
})

module.exports = router
