require("dotenv").config();
const { compileWebpackTargets } = require("../../tools/utils/compile-webpack");

const targets = {
  "main": "src/scripts/main.js",
  "service-worker": "src/scripts/service-worker.js",
};

module.exports = compileWebpackTargets(targets);
