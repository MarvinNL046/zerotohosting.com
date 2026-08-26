import type {
  CapacityEvidence,
  CapacityRoute,
  ComplianceRequirement,
  HostingCriticality,
  HostingPlatform,
  HostingWorkload,
  ManagementRoute,
  PlatformRoute,
  ProjectStage,
  RecommendationConfidence,
  TriStateAnswer,
} from "./types";

export const PROJECT_STAGE_OPTIONS = ["existing", "new", "unknown"] as const;
export const HOSTING_PLATFORM_OPTIONS = [
  "hosted-builder",
  "wordpress",
  "static",
  "cms",
  "custom-app",
  "unknown",
] as const;
export const HOSTING_WORKLOAD_OPTIONS = [
  "public-cacheable",
  "commerce-booking",
  "membership-logins",
  "workers-services",
  "large-media",
  "unknown",
] as const;
export const TRI_STATE_OPTIONS = ["yes", "no", "unknown"] as const;
export const CAPACITY_EVIDENCE_OPTIONS = [
  "proven-limit",
  "capacity-errors",
  "only-slow",
  "none",
  "unknown",
] as const;
export const HOSTING_CRITICALITY_OPTIONS = ["standard", "high", "unknown"] as const;
export const COMPLIANCE_OPTIONS = [
  "standard",
  "regulated-or-residency",
  "unknown",
] as const;

export const PROJECT_STAGE_LABELS = {
  existing: "A website or app that already exists",
  new: "A new project",
  unknown: "I am not sure yet",
} satisfies Record<ProjectStage, string>;

export const HOSTING_PLATFORM_LABELS = {
  "hosted-builder": "A hosted website builder or online store",
  wordpress: "WordPress",
  static: "A website built from files that are ready to show",
  cms: "Another website editor, also called a CMS",
  "custom-app": "An app made with its own code",
  unknown: "I am not sure yet",
} satisfies Record<HostingPlatform, string>;

export const HOSTING_WORKLOAD_LABELS = {
  "public-cacheable": "Public pages that show the same content to most visitors",
  "commerce-booking": "Store, checkout, booking, or payments",
  "membership-logins": "Members, user accounts, or signed-in pages",
  "workers-services": "Jobs that run in the background or for a long time",
  "large-media": "Large videos, files, or many downloads",
  unknown: "I am not sure yet",
} satisfies Record<HostingWorkload, string>;

export const CUSTOM_CONTROL_LABELS = {
  yes: "Yes. I need special software or direct server control",
  no: "No. Normal hosting features are enough",
  unknown: "I am not sure yet",
} satisfies Record<TriStateAnswer, string>;

export const OPS_CAPABILITY_LABELS = {
  yes: "Yes. My team can care for the server",
  no: "No. I want a plan that includes server care",
  unknown: "I do not know who will care for the server",
} satisfies Record<TriStateAnswer, string>;

export const CAPACITY_EVIDENCE_LABELS = {
  "proven-limit":
    "A plan limit in writing, or an error that says the site hit that limit",
  "capacity-errors": "Errors or failed page loads caused by a hosting limit",
  "only-slow": "It feels slow, but we have not found the cause",
  none: "No proof that the hosting plan is too small",
  unknown: "I am not sure yet",
} satisfies Record<CapacityEvidence, string>;

export const HOSTING_CRITICALITY_LABELS = {
  standard:
    "A short outage would be annoying but would not cause serious harm",
  high:
    "A busy time or outage could cause serious harm, such as lost sales or missed work",
  unknown: "I am not sure yet",
} satisfies Record<HostingCriticality, string>;

export const COMPLIANCE_LABELS = {
  standard: "No special rules for either one",
  "regulated-or-residency":
    "Yes. A law, contract, or company rule sets one of these limits",
  unknown: "I am not sure yet",
} satisfies Record<ComplianceRequirement, string>;

export const CHOOSER_OPTION_LABELS = {
  stage: PROJECT_STAGE_LABELS,
  platform: HOSTING_PLATFORM_LABELS,
  workload: HOSTING_WORKLOAD_LABELS,
  customControl: CUSTOM_CONTROL_LABELS,
  opsCapability: OPS_CAPABILITY_LABELS,
  evidence: CAPACITY_EVIDENCE_LABELS,
  criticality: HOSTING_CRITICALITY_LABELS,
  compliance: COMPLIANCE_LABELS,
} as const;

export const PLATFORM_ROUTE_LABELS = {
  "included-with-platform": "Hosting that comes with the website platform",
  "managed-wordpress": "Managed WordPress",
  "wordpress-capable-hosting": "Hosting that supports WordPress",
  "wordpress-hosting": "A WordPress hosting plan",
  "static-edge": "Hosting for ready-made website files",
  "static-edge-with-managed-services":
    "Static website pages with a managed service for jobs that run in the background",
  "managed-app-or-vps":
    "Managed app service or virtual server (VPS) with clearly listed server care",
  "self-managed-vps-cloud":
    "A virtual server (VPS) or cloud server your team cares for",
  "managed-application-platform": "Managed app service",
  "general-managed-hosting": "Basic hosting with clearly listed server care",
  "requirements-review": "List your needs before choosing a platform",
  "specialist-review": "Review by a hosting specialist",
} satisfies Record<PlatformRoute, string>;

export const MANAGEMENT_ROUTE_LABELS = {
  "platform-managed": "Check which server tasks the website platform handles",
  "provider-managed": "Check which server tasks the hosting plan handles",
  "self-managed": "Confirm that your team will care for the servers",
  "decision-required": "Decide who will care for the servers",
  "specialist-review": "Ask a specialist who should care for each part",
} satisfies Record<ManagementRoute, string>;

export const CAPACITY_ROUTE_LABELS = {
  "not-applicable": "No separate hosting size to choose",
  "shared-eligible":
    "A shared plan, where several sites use one server, may be enough",
  "edge-scalable": "Ready-made files can be sent from more places as visits grow",
  "measure-first": "Measure the problem or list your needs first",
  "isolated-scalable-review": "Review plans with clear limits and room to grow",
  "specialist-review":
    "Ask a specialist to plan size and growth, plus backups and restores",
} satisfies Record<CapacityRoute, string>;

export const CONFIDENCE_LABELS = {
  high: "Very sure",
  medium: "Somewhat sure",
  low: "Not very sure",
} satisfies Record<RecommendationConfidence, string>;
