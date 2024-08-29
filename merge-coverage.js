"use strict";

const COVERAGE_PATH = "coverage";

const path = require("path");
const fs = require("fs");
const glob = require("glob");
const libCoverage = require("istanbul-lib-coverage");
const libReport = require("istanbul-lib-report");
const reports = require("istanbul-reports");

process.chdir(__dirname);

// Based on: https://medium.com/@kushmisra7/one-report-for-all-test-cases-easily-merging-multiple-tests-reports-b0f5e5211a2a

console.log("Merging coverage-final.json files...");

const coverageMap = libCoverage.createCoverageMap({});

for (const file of glob.globIterateSync(COVERAGE_PATH + "/**/coverage-final.json", { absolute: true })) {
  const json = fs.readFileSync(file);
  coverageMap.merge(JSON.parse(json));
}

console.log("Building lcov.info...");

const reportContext = libReport.createContext({
  dir: path.join(COVERAGE_PATH),
  defaultSummarizer: "nested",
  coverageMap,
});

reports.create("lcov").execute(reportContext);

console.log("Done.");
