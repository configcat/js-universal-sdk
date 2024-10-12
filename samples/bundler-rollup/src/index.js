import * as configcat from "@configcat/sdk/browser";

function addComponent(value) {
  const element = document.createElement("div");

  element.innerHTML = "isAwesomeFeatureEnabled: " + value;

  document.body.appendChild(element);
}

const logger = configcat.createConsoleLogger(configcat.LogLevel.Info); // Setting log level to Info to show detailed feature flag evaluation

// You can instantiate the client with different polling modes. See the Docs: https://configcat.com/docs/sdk-reference/js/#polling-modes
const configCatClient = configcat.getClient("PKDVCLf-Hq-h-kCzMp-L7Q/HhOWfwVtZ0mb30i9wi17GQ", configcat.PollingMode.AutoPoll, { pollIntervalSeconds: 2, logger: logger });

configCatClient.getValueAsync("isAwesomeFeatureEnabled", false)
  .then(value => addComponent(value));
