const fs = require('fs')
const path = require('path')
const passportPath = "./data/passport-page-2020.jpg"

const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);

class PassportDetailsController extends DateController {
// TODO - Make a request to a backend to pretend to validate the passport details
// What does a passport not found error message look like?

    saveValues(req, res, next) {

        super.saveValues(req, res, () => {
            const passportImage = fs.readFileSync(passportPath)

            req.sessionModel.set("passportImage", passportImage.toString('base64'))

            next()
        })
    }


}
module.exports = PassportDetailsController;
