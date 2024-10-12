import type { IConfigCatClient } from "../ConfigCatClient";
import type { IAutoPollOptions, ILazyLoadingOptions, IManualPollOptions } from "../ConfigCatClientOptions";
import { PollingMode } from "../ConfigCatClientOptions";
import { getClient as getClientCommon } from "../index.pubternals";
import { FetchApiConfigFetcher } from "../shared/FetchApiConfigFetcher";
import CONFIGCAT_SDK_VERSION from "../Version";

/**
 * Returns an instance of `ConfigCatClient` for the specified SDK Key.
 * @remarks This method returns a single, shared instance per each distinct SDK Key.
 * That is, a new client object is created only when there is none available for the specified SDK Key.
 * Otherwise, the already created instance is returned (in which case the `pollingMode` and `options` arguments are ignored).
 * So, please keep in mind that when you make multiple calls to this method using the same SDK Key, you may end up with multiple references to the same client object.
 * @param sdkKey SDK Key to access the ConfigCat config.
 * @param pollingMode The polling mode to use.
 * @param options Options for the specified polling mode.
 */
export function getClient<TMode extends PollingMode | undefined>(sdkKey: string, pollingMode?: TMode, options?: OptionsForPollingMode<TMode>): IConfigCatClient {
  return getClientCommon(sdkKey, pollingMode ?? PollingMode.AutoPoll, options,
    {
      configFetcher: new FetchApiConfigFetcher(),
      sdkType: "ConfigCat-Deno",
      sdkVersion: CONFIGCAT_SDK_VERSION
    });
}

export { createConsoleLogger, createFlagOverridesFromMap, disposeAllClients } from "../index.pubternals";

/** Options used to configure the ConfigCat SDK in the case of Auto Polling mode. */
export interface IDenoAutoPollOptions extends IAutoPollOptions {
}

/** Options used to configure the ConfigCat SDK in the case of Lazy Loading mode. */
export interface IDenoLazyLoadingOptions extends ILazyLoadingOptions {
}

/** Options used to configure the ConfigCat SDK in the case of Manual Polling mode. */
export interface IDenoManualPollOptions extends IManualPollOptions {
}

export type OptionsForPollingMode<TMode extends PollingMode | undefined> =
  TMode extends PollingMode.AutoPoll ? IDenoAutoPollOptions :
  TMode extends PollingMode.ManualPoll ? IDenoManualPollOptions :
  TMode extends PollingMode.LazyLoad ? IDenoLazyLoadingOptions :
  TMode extends undefined ? IDenoAutoPollOptions :
  never;

export * from "..";
