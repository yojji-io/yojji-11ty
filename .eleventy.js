const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const del = require("del");

// Import filters
const dateFilter = require("./tools/filters/date-filter.js");
const markdownFilter = require("./tools/filters/markdown-filter.js");
const w3DateFilter = require("./tools/filters/w3-date-filter.js");

// Import transforms
const htmlMinTransform = require("./tools/transforms/html-min-transform.js");
const parseTransform = require("./tools/transforms/parse-transform.js");
const criticalCSSTransform = require("./tools/transforms/critical-css-transform.js");

// Import data files
const site = require("./src/_data/site.js");

module.exports = function (config) {
  // Cleanup before every build
  const dirToClean = "dist/*";
  del(dirToClean);

  // Filters
  config.addFilter("dateFilter", dateFilter);
  config.addFilter("markdownFilter", markdownFilter);
  config.addFilter("w3DateFilter", w3DateFilter);

  // Transforms
  config.addTransform("parse", parseTransform);
  if (site.criticalCSS) {
    config.addTransform("critical-css", criticalCSSTransform);
  } else {
    // Critical will also minify
    config.addTransform("htmlmin", htmlMinTransform);
  }
  config.addTransform("postcss", require("./tools/transforms/transform-css.js"));

  // Custom collections
  const now = new Date();
  const livePosts = (post) => post.date <= now && !post.data.draft;
  // config.addCollection("posts", (collection) => {
  //   return [
  //     ...collection.getFilteredByGlob("./src/posts/*.md").filter(livePosts),
  //   ].reverse();
  // });


  site.langs
    .forEach((lang) => {
      config.addCollection(`posts_${lang.id}`, (collection) => {
        return [
          ...collection
            .getFilteredByGlob(
              `./src/${
                lang.id === site.defaultLang ? "" : `${lang.id}/`
              }posts/*.md`
            )
            .filter(livePosts),
        ].reverse();
      });
    });

  // Passthrough
  config.addPassthroughCopy({ "src/images": "/images" });
  // config.addPassthroughCopy({ "src/vendor": "/" });

  // Plugins
  config.addPlugin(syntaxHighlight);

  // Watch for changes to my source files
  if (config.addWatchTarget) {
    config.addWatchTarget("src/styles");
    config.addWatchTarget("src/scripts");
    config.addWatchTarget("src/vendor");
  } else {
    console.log(
      "A future version of 11ty will allow live-reloading of JS and Sass. You can update 11ty with the next release to get these features."
    );
  }

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    // passthroughFileCopy: true
  };
};
