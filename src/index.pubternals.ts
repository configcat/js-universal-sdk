import { ConfigCatClient } from "./ConfigCatClient.js";
import type { IConfigCatClient, IConfigCatKernel } from "./ConfigCatClient.js";
import type { OptionsForPollingMode, PollingMode } from "./ConfigCatClientOptions.js";
import type { IConfigCatLogger, LogLevel } from "./ConfigCatLogger.js";
import { ConfigCatConsoleLogger } from "./ConfigCatLogger.js";
import type { OverrideBehaviour } from "./FlagOverrides.js";
import { FlagOverrides, MapOverrideDataSource } from "./FlagOverrides.js";
import type { SettingValue } from "./ProjectConfig.js";

// The exports in this module are also exposed on the public API surface but not intended for end users.
// Backward compatibility is not guaranteed.

/**
 * Returns an instance of `ConfigCatClient` for the specified SDK Key.
 * @remarks This method returns a single, shared instance per each distinct SDK Key.
 * That is, a new client object is created only when there is none available for the specified SDK Key.
 * Otherwise, the already created instance is returned (in which case the `pollingMode`, `options` and `configCatKernel` arguments are ignored).
 * So, please keep in mind that when you make multiple calls to this method using the same SDK Key, you may end up with multiple references to the same client object.
 * @param sdkKey SDK Key to access the ConfigCat config.
 * @param pollingMode The polling mode to use.
 * @param options Options for the specified polling mode.
 */
export function getClient<TMode extends PollingMode>(sdkKey: string, pollingMode: TMode, options: OptionsForPollingMode<TMode> | undefined | null, configCatKernel: IConfigCatKernel): IConfigCatClient {
  return ConfigCatClient.get(sdkKey, pollingMode, options, configCatKernel);
}

/**
 * Disposes all existing `ConfigCatClient` instances.
 */
export function disposeAllClients(): void {
  ConfigCatClient.disposeAll();
}

/**
 * Creates an instance of `ConfigCatConsoleLogger`.
 * @param logLevel Log level (the minimum level to use for filtering log events).
 * @param eol The character sequence to use for line breaks in log messages. Defaults to "\n".
 */
export function createConsoleLogger(logLevel: LogLevel, eol?: string): IConfigCatLogger {
  return new ConfigCatConsoleLogger(logLevel, eol);
}

/**
 * Creates an instance of `FlagOverrides` that uses a map data source.
 * @param map The map that contains the overrides.
 * @param behaviour The override behaviour.
 * Specifies whether the local values should override the remote values
 * or local values should only be used when a remote value doesn't exist
 * or the local values should be used only.
 * @param watchChanges If set to `true`, the input map will be tracked for changes.
 */
export function createFlagOverridesFromMap(map: { [name: string]: NonNullable<SettingValue> }, behaviour: OverrideBehaviour, watchChanges?: boolean): FlagOverrides {
  return new FlagOverrides(new MapOverrideDataSource(map, watchChanges), behaviour);
}

/* Public types for platform-specific SDKs */

// List types here which are required to implement the platform-specific SDKs but shouldn't be exposed to end users.

export type { IConfigCatKernel };

export type { FetchErrorCauses, IConfigFetcher, IFetchResponse } from "./ConfigFetcher.js";

export { FetchError, FetchResult, FetchStatus } from "./ConfigFetcher.js";

export type { OptionsBase } from "./ConfigCatClientOptions.js";

export type { IConfigCache } from "./ConfigCatCache.js";

export { ExternalConfigCache, InMemoryConfigCache } from "./ConfigCatCache.js";

export type { IEventEmitter, IEventProvider } from "./EventEmitter.js";

export { XmlHttpRequestConfigFetcher } from "./browser/XmlHttpRequestConfigFetcher.js";

export { FetchApiConfigFetcher } from "./shared/FetchApiConfigFetcher.js";
