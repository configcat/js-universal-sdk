import * as path from "https://deno.land/std@0.224.0/path/mod.ts";
// @deno-types="npm:@types/mocha"
import "npm:mocha/browser-entry.js";
import { initPlatform } from "../helpers/platform";
import { isTestSpec } from "../index";
import { ConfigCatClient } from "#lib/ConfigCatClient";
import { AutoPollOptions, LazyLoadOptions, ManualPollOptions } from "#lib/ConfigCatClientOptions";
import { IConfigCatClient, IDenoAutoPollOptions, IDenoLazyLoadingOptions, IDenoManualPollOptions, getClient } from "#lib/deno";
import { FetchApiConfigFetcher, IConfigCatKernel, IConfigFetcher } from "#lib/index.pubternals.full";

// Based on: https://dev.to/craigmorten/testing-your-deno-apps-with-mocha-4f35

const options: Mocha.MochaOptions = {};

for (let i = 0; i < Deno.args.length; i++) {
  const key = Deno.args[i++];
  if (!key.startsWith("--") || i >= Deno.args.length) break;
  const value = Deno.args[i];
  options[key.substring(2) as keyof Mocha.MochaOptions] = value;
}

// Browser-based Mocha requires `window.location` to exist.
const location = "http://localhost:0";
(window as any).location = new URL(location);

// In order to use `describe` etc. we need to set Mocha to `bdd` mode.
// We also need to set the reporter to `spec` (though other options
// are available) to prevent Mocha using the default browser reporter
// which requires access to a DOM.
mocha.setup({ ...options, ui: "bdd", reporter: "spec" });

// Ensure there are no leaks in our tests.
mocha.checkLeaks();

const sdkVersion = "0.0.0-test";
const sdkType = "ConfigCat-Deno";

export const createConfigFetcher = (): IConfigFetcher => new FetchApiConfigFetcher();

export const createClientWithAutoPoll = (sdkKey: string, options?: IDenoAutoPollOptions, setupKernel?: (kernel: IConfigCatKernel) => IConfigCatKernel): IConfigCatClient => {
  const configCatKernel: IConfigCatKernel = (setupKernel ?? (k => k))({ configFetcher: createConfigFetcher(), sdkType, sdkVersion });
  return new ConfigCatClient(new AutoPollOptions(sdkKey, configCatKernel.sdkType, configCatKernel.sdkVersion, options, configCatKernel.defaultCacheFactory, configCatKernel.eventEmitterFactory), configCatKernel);
};

export const createClientWithManualPoll = (sdkKey: string, options?: IDenoManualPollOptions, setupKernel?: (kernel: IConfigCatKernel) => IConfigCatKernel): IConfigCatClient => {
  const configCatKernel: IConfigCatKernel = (setupKernel ?? (k => k))({ configFetcher: createConfigFetcher(), sdkType, sdkVersion });
  return new ConfigCatClient(new ManualPollOptions(sdkKey, configCatKernel.sdkType, configCatKernel.sdkVersion, options, configCatKernel.defaultCacheFactory, configCatKernel.eventEmitterFactory), configCatKernel);
};

export const createClientWithLazyLoad = (sdkKey: string, options?: IDenoLazyLoadingOptions, setupKernel?: (kernel: IConfigCatKernel) => IConfigCatKernel): IConfigCatClient => {
  const configCatKernel: IConfigCatKernel = (setupKernel ?? (k => k))({ configFetcher: createConfigFetcher(), sdkType, sdkVersion });
  return new ConfigCatClient(new LazyLoadOptions(sdkKey, configCatKernel.sdkType, configCatKernel.sdkVersion, options, configCatKernel.defaultCacheFactory, configCatKernel.eventEmitterFactory), configCatKernel);
};

export const pathJoin = (...segments: string[]): string => path.join(...segments);

export const readFileUtf8 = (path: string): string => Deno.readTextFileSync(path);

initPlatform({
  pathJoin,
  readFileUtf8,
  createConfigFetcher,
  createClientWithAutoPoll,
  createClientWithManualPoll,
  createClientWithLazyLoad,
  getClient
});

/* Discover and load tests */

const testDir = path.resolve(path.dirname(path.fromFileUrl(import.meta.url)), "..");

async function* enumerateFiles(dir: string): AsyncIterableIterator<string> {
  for await (const entry of Deno.readDir(dir)) {
    if (entry.isDirectory) {
      yield* enumerateFiles(path.join(dir, entry.name));
    }
    else if (entry.isFile) {
      yield path.join(dir, entry.name);
    }
  }
}

for await (const file of enumerateFiles(testDir)) {
  const [isTest, segments] = isTestSpec(file, "deno");
  if (isTest) {
    await import("../" + segments.join("/"));
  }
}

// And finally we run our tests, passing the onCompleted hook and setting some globals.
mocha.run(failures => failures > 0 ? Deno.exit(1) : Deno.exit(0))
  .globals(["onerror"]);
