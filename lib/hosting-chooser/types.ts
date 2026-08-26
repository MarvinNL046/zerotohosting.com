export type ProjectStage = "existing" | "new" | "unknown";

export type HostingPlatform =
  | "hosted-builder"
  | "wordpress"
  | "static"
  | "cms"
  | "custom-app"
  | "unknown";

export type HostingWorkload =
  | "public-cacheable"
  | "commerce-booking"
  | "membership-logins"
  | "workers-services"
  | "large-media"
  | "unknown";

export type TriStateAnswer = "yes" | "no" | "unknown";

export type CapacityEvidence =
  | "proven-limit"
  | "capacity-errors"
  | "only-slow"
  | "none"
  | "unknown";

export type HostingCriticality = "standard" | "high" | "unknown";

export type ComplianceRequirement =
  | "standard"
  | "regulated-or-residency"
  | "unknown";

export interface HostingChooserInput {
  stage: ProjectStage;
  platform: HostingPlatform;
  workload: HostingWorkload;
  customControl: TriStateAnswer;
  opsCapability: TriStateAnswer;
  evidence: CapacityEvidence;
  criticality: HostingCriticality;
  compliance: ComplianceRequirement;
}

export type HostingChooserField = keyof HostingChooserInput;

export type RecommendationConfidence = "high" | "medium" | "low";

export type PlatformRoute =
  | "included-with-platform"
  | "managed-wordpress"
  | "wordpress-capable-hosting"
  | "wordpress-hosting"
  | "static-edge"
  | "static-edge-with-managed-services"
  | "managed-app-or-vps"
  | "self-managed-vps-cloud"
  | "managed-application-platform"
  | "general-managed-hosting"
  | "requirements-review"
  | "specialist-review";

export type ManagementRoute =
  | "platform-managed"
  | "provider-managed"
  | "self-managed"
  | "decision-required"
  | "specialist-review";

export type CapacityRoute =
  | "not-applicable"
  | "shared-eligible"
  | "edge-scalable"
  | "measure-first"
  | "isolated-scalable-review"
  | "specialist-review";

export interface RecommendationAxis<Route extends string> {
  route: Route;
  label: string;
  explanation: string;
}

export interface AdjacentAlternative {
  label: string;
  reason: string;
}

export interface GuideAnchor {
  href: string;
  label: string;
}

export type RecommendationId =
  | "specialist-review"
  | "included-hosting"
  | "confirm-builder-requirements"
  | "managed-app-vps"
  | "self-managed-vps-cloud"
  | "decide-operations-model"
  | "wordpress-capacity-upgrade"
  | "wordpress-measure-first"
  | "managed-wordpress"
  | "wordpress-capable-hosting"
  | "wordpress-management-review"
  | "static-edge"
  | "static-services-hybrid"
  | "managed-application-platform"
  | "requirements-review"
  | "measure-before-moving"
  | "general-managed-hosting";

export interface HostingRecommendation {
  recommendationId: RecommendationId;
  title: string;
  summary: string;
  platformRoute: RecommendationAxis<PlatformRoute>;
  managementRoute: RecommendationAxis<ManagementRoute>;
  capacityRoute: RecommendationAxis<CapacityRoute>;
  confidence: RecommendationConfidence;
  why: string[];
  mustHaves: string[];
  probablyDontNeed: string[];
  adjacentAlternative: AdjacentAlternative;
  upgradeTriggers: string[];
  guideAnchor: GuideAnchor;
  unknownInputs: HostingChooserField[];
}

export type HostingChooserSearchParams =
  | URLSearchParams
  | Record<string, string | string[] | undefined>;
