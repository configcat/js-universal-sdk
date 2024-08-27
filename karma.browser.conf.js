const enableCoverage = process.env.TEST_BROWSER_COVERAGE?.toLowerCase() === "true";

module.exports = function(config) {
  config.set({
    frameworks: ["mocha", "chai", "webpack"],

    files: [
      { pattern: "test/browser/index.ts", watched: false },
      { pattern: "test/data/**", included: false, watched: false, served: true }
    ],

    preprocessors: {
      ["test/**/*.ts"]: ["webpack", "sourcemap"]
    },

    mime: {
      "text/x-typescript": ["ts", "tsx"]
    },

    webpack: new require("./webpack.karma.browser.config.js").constructor({ enableCoverage }),
    webpackMiddleware: {
      noInfo: true
    },

    client: {
      mocha: {
        timeout: 30000
      }
    },

    ...(enableCoverage
      ? {
        coverageReporter: {
          // specify a common output directory
          dir: "coverage/browser",
          reporters: [
            { type: "text-summary" },
            { type: "lcov", subdir: "report-lcov" },
            { type: "lcovonly", subdir: ".", file: "report-lcovonly.txt" },
          ]
        }
      }
      : {}
    ),

    reporters: [
      "progress",
      ...(enableCoverage ? ["coverage"] : [])
    ],

    singleRun: true
  });
};
