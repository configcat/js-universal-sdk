/* Public types for end users */

// List types here which are part of the public API of platform-specific SDKs, thus, should be exposed to end users.
// These exports should be re-exported in the entry module of each platform-specific SDK!

export { PollingMode } from "./ConfigCatClientOptions.js";

export type { IAutoPollOptions, ILazyLoadingOptions, IManualPollOptions, IOptions } from "./ConfigCatClientOptions.js";

export { DataGovernance } from "./ConfigCatClientOptions.js";

export type { IConfigCatLogger, LogEventId, LogMessage } from "./ConfigCatLogger.js";

export { LogLevel } from "./ConfigCatLogger.js";

export { FormattableLogMessage } from "./ConfigCatLogger.js";

export type { IConfigCatCache } from "./ConfigCatCache.js";

export type {
  ConditionTypeMap, ICondition, IConditionUnion, IConfig, IPercentageOption, IPrerequisiteFlagCondition, ISegment, ISegmentCondition, ISetting, ISettingUnion, ISettingValueContainer, ITargetingRule, IUserCondition, IUserConditionUnion, SettingTypeMap, SettingValue, UserConditionComparisonValueTypeMap, VariationIdValue
} from "./ProjectConfig.js";

export { PrerequisiteFlagComparator, SegmentComparator, SettingType, UserComparator } from "./ConfigJson.js";

export type { IConfigCatClient, IConfigCatClientSnapshot } from "./ConfigCatClient.js";

export { SettingKeyValue } from "./ConfigCatClient.js";

export type { IEvaluationDetails, SettingTypeOf } from "./RolloutEvaluator.js";

export type { UserAttributeValue } from "./User.js";

export { User } from "./User.js";

export type { FlagOverrides } from "./FlagOverrides.js";

export { OverrideBehaviour } from "./FlagOverrides.js";

export { ClientCacheState, RefreshResult } from "./ConfigServiceBase.js";

export type { HookEvents, IProvidesHooks } from "./Hooks.js";

export * as ConfigJson from "./ConfigJson.js";
