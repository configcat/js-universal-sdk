import './style.css'
import { createApp } from './main'
import * as configcat from "@configcat/sdk/browser";

const logger = configcat.createConsoleLogger(configcat.LogLevel.Info); // Setting log level to Info to show detailed feature flag evaluation

const configCatClient = configcat.getClient("PKDVCLf-Hq-h-kCzMp-L7Q/HhOWfwVtZ0mb30i9wi17GQ", configcat.PollingMode.AutoPoll, { pollIntervalSeconds: 2, logger: logger });
// You can instantiate the client with different polling modes. See the Docs: https://configcat.com/docs/sdk-reference/js/#polling-modes

new Promise<void>(resolve => setTimeout(() => resolve(), 3000))
    .then(() => configCatClient.waitForReady())
    .then(() => {
        const { app } = createApp(false, configCatClient)

        app.mount('#app')
    });
