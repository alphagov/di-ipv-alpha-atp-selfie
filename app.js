const { setup } = require("hmpo-app");
const { router } = setup({
  config: { APP_ROOT: __dirname },
});

router.use("/selfie", require("./selfie/router"));
