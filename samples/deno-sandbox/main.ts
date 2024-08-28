import { createConsoleLogger, getClient } from "../../lib/esm/index.pubternals.js";
import { LogLevel, PollingMode, User } from "../../lib/esm/index.js";
import { FetchApiConfigFetcher } from "../../lib/esm/shared/FetchApiConfigFetcher.js";

// Creating the ConfigCat client instance using the SDK Key
const client = getClient(
  "PKDVCLf-Hq-h-kCzMp-L7Q/HhOWfwVtZ0mb30i9wi17GQ",
  PollingMode.AutoPoll,
  {
    // Setting log level to Info to show detailed feature flag evaluation
    logger: createConsoleLogger(LogLevel.Info),
    setupHooks: hooks => hooks
      .on("clientReady", () => console.log("Client is ready!"))
  },
  {
    configFetcher: new FetchApiConfigFetcher(),
    sdkType: "ConfigCat-Deno",
    sdkVersion: "0.0.0-sample"
  });

try {
  // Creating a user object to identify the user (optional)
  const user = new User("<SOME USERID>");
  user.country = "US";
  user.email = "configcat@example.com";
  user.custom = {
    "subscriptionType": "Pro",
    "role": "Admin",
    "version": "1.0.0"
  };

  // Accessing feature flag or setting value
  const value = await client.getValueAsync("isPOCFeatureEnabled", false, user);
  console.log(`isPOCFeatureEnabled: ${value}`);
}
finally {
  client.dispose();
}

Deno.exit();
