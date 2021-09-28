const BaseController = require("hmpo-form-wizard").Controller;
const debug = require('debug')('selfie:photo-upload')

class PhotoUpload extends BaseController {
    // Multi Part forms have multiple streams of data within the same POST body
    // busboy-body-parser puts them into req.files
    // This file data is saved into the sessionModel to be used later
    process(req, res, next) {
        if(req.files && req.files['photo-file']) {
            debug('storeMultiPartFormData: storing in photo')
            req.sessionModel.set('photoData', req.files['photo-file'])
        }

        super.process(req, res, next)
    }

}

module.exports = PhotoUpload;
