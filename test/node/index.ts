import "mocha";
import * as fs from "fs";
import * as path from "path";
import { ConfigCatClient } from "#lib/ConfigCatClient";
import { AutoPollOptions, LazyLoadOptions, ManualPollOptions } from "#lib/ConfigCatClientOptions";
import type { IConfigCatKernel, IConfigFetcher } from "#lib/index.pubternals";
import type { IConfigCatClient, INodeAutoPollOptions, INodeLazyLoadingOptions, INodeManualPollOptions } from "#lib/node";
import { getClient } from "#lib/node";
import { NodeHttpConfigFetcher } from "#lib/node/NodeHttpConfigFetcher";
import { initPlatform } from "../helpers/platform";

const sdkVersion = "0.0.0-test";
const sdkType = "ConfigCat-Node";

export const createConfigFetcher = (): IConfigFetcher => new NodeHttpConfigFetcher();

export const createClientWithAutoPoll = (sdkKey: string, options?: INodeAutoPollOptions, setupKernel?: (kernel: IConfigCatKernel) => IConfigCatKernel): IConfigCatClient => {
  const configCatKernel: IConfigCatKernel = (setupKernel ?? (k => k))({ configFetcher: createConfigFetcher(), sdkType, sdkVersion });
  return new ConfigCatClient(new AutoPollOptions(sdkKey, configCatKernel.sdkType, configCatKernel.sdkVersion, options, configCatKernel.defaultCacheFactory, configCatKernel.eventEmitterFactory), configCatKernel);
};

export const createClientWithManualPoll = (sdkKey: string, options?: INodeManualPollOptions, setupKernel?: (kernel: IConfigCatKernel) => IConfigCatKernel): IConfigCatClient => {
  const configCatKernel: IConfigCatKernel = (setupKernel ?? (k => k))({ configFetcher: createConfigFetcher(), sdkType, sdkVersion });
  return new ConfigCatClient(new ManualPollOptions(sdkKey, configCatKernel.sdkType, configCatKernel.sdkVersion, options, configCatKernel.defaultCacheFactory, configCatKernel.eventEmitterFactory), configCatKernel);
};

export const createClientWithLazyLoad = (sdkKey: string, options?: INodeLazyLoadingOptions, setupKernel?: (kernel: IConfigCatKernel) => IConfigCatKernel): IConfigCatClient => {
  const configCatKernel: IConfigCatKernel = (setupKernel ?? (k => k))({ configFetcher: createConfigFetcher(), sdkType, sdkVersion });
  return new ConfigCatClient(new LazyLoadOptions(sdkKey, configCatKernel.sdkType, configCatKernel.sdkVersion, options, configCatKernel.defaultCacheFactory, configCatKernel.eventEmitterFactory), configCatKernel);
};

export const pathJoin = (...segments: string[]): string => path.join(...segments);

export const readFileUtf8 = (path: string): string => fs.readFileSync(path, "utf8");

initPlatform({
  pathJoin,
  readFileUtf8,
  createConfigFetcher,
  createClientWithAutoPoll,
  createClientWithManualPoll,
  createClientWithLazyLoad,
  getClient
});

/* eslint-disable @typescript-eslint/no-require-imports */
require("..");
require("./ClientTests.nb");
require("./HttpTests.nb");
