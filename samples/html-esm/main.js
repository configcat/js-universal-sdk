import * as configcat from "./configcat.esm.es2017.min.js";

// Setting log level to Info to show detailed feature flag evaluation
var logger = configcat.createConsoleLogger(configcat.LogLevel.Info);

var configCatClient = configcat.getClient('PKDVCLf-Hq-h-kCzMp-L7Q/HhOWfwVtZ0mb30i9wi17GQ', configcat.PollingMode.AutoPoll, {
  pollIntervalSeconds: 2,
  logger: logger
});
// You can instantiate the client with different polling modes. See the Docs: https://configcat.com/docs/sdk-reference/js/#polling-modes

configCatClient.getValueAsync("isAwesomeFeatureEnabled", false).then(function (value) {
  console.log("isAwesomeFeatureEnabled: " + value);
});

var userObject = new configcat.User("#SOME-USER-ID#", "configcat@example.com");
// Read more about the User Object: https://configcat.com/docs/sdk-reference/js/#user-object
configCatClient.getValueAsync("isPOCFeatureEnabled", false, userObject).then(function (value) {
  console.log("isPOCFeatureEnabled: " + value);
});