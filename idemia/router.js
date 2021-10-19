const express = require("express");
// const debug = require("debug")("selfie:onfido:router");

const steps = require("./steps");
const fields = require("./fields");

const router = express.Router();

router.use(
  require("hmpo-form-wizard")(steps, fields, {
    name: "idemia",
    journeyName: "ipv",
    templatePath: "idemia"
  })
);

module.exports = router;
