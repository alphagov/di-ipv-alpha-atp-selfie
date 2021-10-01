const { setup } = require("hmpo-app");

const redisConfig = require('./lib/redis')()

const loggerConfig = {
  console: true,
  consoleJSON: true,
  app: false,
};

const sessionConfig = {
  cookieName: "service_session",
  secret: process.env.SESSION_SECRET
};

const { router } = setup({
  config: { APP_ROOT: __dirname },
  port: process.env.PORT || 3000,
  logs: loggerConfig,
  redis: redisConfig,
  session: sessionConfig,
  urls: {
    public: "/selfie/public",
  },
  dev: true
});

router.use(/.*upload$/, require("busboy-body-parser")({ limit: "5mb" }));


router.use("/selfie", require("./selfie/router"));
router.use("/selfie/exif", require("./exif/router"));
router.use("/selfie/onfido", require("./onfido/router"));
router.use("/selfie/idemia", require("./idemia/router"));
