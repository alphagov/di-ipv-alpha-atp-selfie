module.exports = {
  "/": {
    reset: true,
    resetJourney: true,
    entryPoint: true,
    skip: true,
    next: "verification-type",
  },
  "/verification-type": {
    fields: ["facialVerificationType"],
    next: [
      { field: "facialVerificationType", value: "exif", next: "/selfie/exif" },
      "not-available",
    ],
  },
  "/not-available": {}
};
