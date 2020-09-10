const { compileSassTargets } = require("../../tools/utils/compile-scss");

const targets = {
  "main": "src/styles/main.scss",
};

module.exports = compileSassTargets(targets);
