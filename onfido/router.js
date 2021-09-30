const express = require("express");
const HmpoFormWizard = require("hmpo-form-wizard");
const debug = require("debug")("selfie:onfido:router");

const path = require('path')
const steps = require("./steps");
const fields = require("./fields");

const router = express.Router();

// router.use("/upload", require("busboy-body-parser")({ limit: "5mb" }));

router.use(
  require("hmpo-form-wizard")(steps, fields, {
    name: "onfido",
    journeyName: "ipv",
    templatePath: "onfido"
  })
);

// router.use('/upload', require('busboy-body-parser')({limit: '5mb'}),(req, res,next) => {
//   debug(Object.keys(req.body))
//   debug(Object.keys(req.files))
//   if(!req.files || !req.files.fileUpload) {
//     debug('No files uploaded')
//     return res.redirect(req.headers.referer)
//   }
//
//   if(!req.body || !req.body.formFileType) {
//     debug('No file type specified')
//     return res.redirect(req.headers.referer)
//   }
//
//   debug(req.files.fileUpload)
//   req.session['hmpo-wizard-onfido'][req.body.formFileType] = req.files.fileUpload.data.toString('base64')
//   debug('Onfido File uploaded')
//
//   res.redirect(req.body.formReturnPath)
// })

module.exports = router;
