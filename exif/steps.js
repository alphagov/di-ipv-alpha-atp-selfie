const doneController = require("./controllers/done");
const passportDetails = require("./controllers/passport-details");
const exifDisplayController = require("./controllers/exif-display");

module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    next: "passport-details",
  },
  "/passport-details": {
    fields: [
      "passportNumber",
      "surname",
      "givenNames",
      "dateOfBirth",
      "issueDate",
      "expiryDate",
    ],
    controller: passportDetails,
    next: "face-upload",
  },

  "/face-upload": {
    fields: ["faceFileUpload"],
    next: "face-comparison",
  },
  "/face-uploaded": {
    entryPoint: true,
    skip: true,
    noPost: true,
    next: ["exif-display"],
  },
  "/exif-display": {
    entryPoint: true,
    controller: exifDisplayController,
    next: [{ fn: "compareFaces", next: "face-match" }, "face-no-match"],
  },
  "/face-match": {
    entryPoint: true,
    prereq: ["face-comparison", "exif-comparison"],
    next: ["done"],
  },
  "/face-no-match": {
    entryPoint: true,
    prereqs: ["/selfie/face-comparison"],
    next: ["done"],
  },
  "/not-available": {},
  "/done": {
    controller: doneController,
    entryPoint: true,
    skip: true,
    next: "/ipv/next?source=selfie"
  },
};
