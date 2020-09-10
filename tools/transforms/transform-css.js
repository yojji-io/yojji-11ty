const path = require("path");
const postcss = require("postcss");

module.exports = async function (value, outputPath) {

  if (outputPath.indexOf(".css") > -1) {
    const data = await postcss([
      // require("autoprefixer"),
      // require("cssnano")
      require('tailwindcss')('./tailwind.config.js'),
    ])
    .process(value)
    .then(result => result.css);
    return data;
  }
  return value;
};
