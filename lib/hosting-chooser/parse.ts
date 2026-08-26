import {
  CAPACITY_EVIDENCE_OPTIONS,
  COMPLIANCE_OPTIONS,
  HOSTING_CRITICALITY_OPTIONS,
  HOSTING_PLATFORM_OPTIONS,
  HOSTING_WORKLOAD_OPTIONS,
  PROJECT_STAGE_OPTIONS,
  TRI_STATE_OPTIONS,
} from "./options";
import type {
  HostingChooserInput,
  HostingChooserSearchParams,
} from "./types";

const QUERY_KEY_ALIASES = {
  stage: ["stage"],
  platform: ["platform"],
  workload: ["workload"],
  customControl: ["customControl", "custom-control", "custom_control"],
  opsCapability: ["opsCapability", "ops-capability", "ops_capability"],
  evidence: ["evidence"],
  criticality: ["criticality"],
  compliance: ["compliance"],
} as const;

function isUrlSearchParams(
  source: HostingChooserSearchParams,
): source is URLSearchParams {
  return typeof (source as URLSearchParams).get === "function";
}

function firstValue(
  source: HostingChooserSearchParams,
  aliases: readonly string[],
): string | undefined {
  for (const key of aliases) {
    if (isUrlSearchParams(source)) {
      const value = source.get(key);
      if (value !== null) {
        return value;
      }
      continue;
    }

    const value = source[key];
    if (Array.isArray(value)) {
      if (value[0] !== undefined) {
        return value[0];
      }
      continue;
    }

    if (value !== undefined) {
      return value;
    }
  }

  return undefined;
}

function parseOption<const Option extends string>(
  rawValue: string | undefined,
  options: readonly Option[],
  fallback: Option,
): Option {
  const normalized = rawValue?.trim().toLowerCase();
  return options.includes(normalized as Option)
    ? (normalized as Option)
    : fallback;
}

/**
 * Converts form/search parameters into a complete, safe input object.
 * Missing and unrecognised values become `unknown`; they are never coerced to
 * a negative answer.
 */
export function parseHostingChooserInput(
  source: HostingChooserSearchParams,
): HostingChooserInput {
  return {
    stage: parseOption(
      firstValue(source, QUERY_KEY_ALIASES.stage),
      PROJECT_STAGE_OPTIONS,
      "unknown",
    ),
    platform: parseOption(
      firstValue(source, QUERY_KEY_ALIASES.platform),
      HOSTING_PLATFORM_OPTIONS,
      "unknown",
    ),
    workload: parseOption(
      firstValue(source, QUERY_KEY_ALIASES.workload),
      HOSTING_WORKLOAD_OPTIONS,
      "unknown",
    ),
    customControl: parseOption(
      firstValue(source, QUERY_KEY_ALIASES.customControl),
      TRI_STATE_OPTIONS,
      "unknown",
    ),
    opsCapability: parseOption(
      firstValue(source, QUERY_KEY_ALIASES.opsCapability),
      TRI_STATE_OPTIONS,
      "unknown",
    ),
    evidence: parseOption(
      firstValue(source, QUERY_KEY_ALIASES.evidence),
      CAPACITY_EVIDENCE_OPTIONS,
      "unknown",
    ),
    criticality: parseOption(
      firstValue(source, QUERY_KEY_ALIASES.criticality),
      HOSTING_CRITICALITY_OPTIONS,
      "unknown",
    ),
    compliance: parseOption(
      firstValue(source, QUERY_KEY_ALIASES.compliance),
      COMPLIANCE_OPTIONS,
      "unknown",
    ),
  };
}
