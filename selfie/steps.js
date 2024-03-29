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
      { field: "facialVerificationType", value: "onfidoSandbox", next: "/selfie/onfido" },
      { field: "facialVerificationType", value: "idemia", next: "/selfie/idemia" },
      "not-available",
    ],
  },
  "/not-available": {}
};
