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
  logs: loggerConfig,
  redis: redisConfig,
  session: sessionConfig,
  urls: {
    public: "/selfie/public",
  }
});

router.use("/selfie", require("./selfie/router"));
