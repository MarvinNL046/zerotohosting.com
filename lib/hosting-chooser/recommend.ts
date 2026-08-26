import {
  CAPACITY_ROUTE_LABELS,
  CHOOSER_OPTION_LABELS,
  MANAGEMENT_ROUTE_LABELS,
  PLATFORM_ROUTE_LABELS,
} from "./options";
import type {
  CapacityRoute,
  HostingChooserField,
  HostingChooserInput,
  HostingRecommendation,
  ManagementRoute,
  PlatformRoute,
  RecommendationAxis,
  RecommendationConfidence,
} from "./types";

const GUIDE_BASE = "/guides/types-of-web-hosting/";

const DEMANDING_WORKLOADS = new Set<HostingChooserInput["workload"]>([
  "commerce-booking",
  "membership-logins",
  "workers-services",
  "large-media",
]);

const FIELD_ORDER: HostingChooserField[] = [
  "stage",
  "platform",
  "workload",
  "customControl",
  "opsCapability",
  "evidence",
  "criticality",
  "compliance",
];

function platformAxis(
  route: PlatformRoute,
  explanation: string,
): RecommendationAxis<PlatformRoute> {
  return { route, label: PLATFORM_ROUTE_LABELS[route], explanation };
}

function managementAxis(
  route: ManagementRoute,
  explanation: string,
): RecommendationAxis<ManagementRoute> {
  return { route, label: MANAGEMENT_ROUTE_LABELS[route], explanation };
}

function capacityAxis(
  route: CapacityRoute,
  explanation: string,
): RecommendationAxis<CapacityRoute> {
  return { route, label: CAPACITY_ROUTE_LABELS[route], explanation };
}

function unknownFields(input: HostingChooserInput): HostingChooserField[] {
  return FIELD_ORDER.filter((field) => input[field] === "unknown");
}

function lowerConfidence(
  base: RecommendationConfidence,
  openFields: HostingChooserField[],
  decisionCriticalFields: HostingChooserField[] = [],
): RecommendationConfidence {
  if (openFields.length === 0) {
    return base;
  }

  if (openFields.some((field) => decisionCriticalFields.includes(field))) {
    return "low";
  }

  if (base === "high" && openFields.length === 1) {
    return "medium";
  }

  return "low";
}

function humanizeFields(fields: HostingChooserField[]): string {
  return fields
    .map((field) => {
      switch (field) {
        case "platform":
          return "the website or app type";
        case "workload":
          return "what the website or app must do";
        case "customControl":
          return "special software or direct server control";
        case "opsCapability":
          return "who will care for the server";
        case "stage":
          return "whether the project is new or already exists";
        case "evidence":
          return "proof of a hosting limit";
        case "criticality":
          return "what happens if the site is busy or down";
        case "compliance":
          return "legal or data-location rules";
        default:
          return field;
      }
    })
    .join(", ");
}

function completeRecommendation(
  input: HostingChooserInput,
  recommendation: Omit<HostingRecommendation, "confidence" | "unknownInputs"> & {
    baseConfidence: RecommendationConfidence;
    decisionCriticalFields?: HostingChooserField[];
  },
): HostingRecommendation {
  const openFields = unknownFields(input);
  const {
    baseConfidence,
    decisionCriticalFields = [],
    why,
    mustHaves,
    ...result
  } = recommendation;

  const stageReason =
    input.stage === "existing"
      ? "Measure how this project works before moving it. Keep a tested way to move it back."
      : input.stage === "new"
        ? "Check this project’s basic hosting needs before you put it online. Save the results so you can compare them later."
        : undefined;

  const stageMustHave =
    input.stage === "existing"
      ? "A record of how the current site works and a tested way to move back"
      : input.stage === "new"
        ? "Checked basic hosting needs and notes about how it worked when it first went online"
        : undefined;

  const explicitUnknownReason =
    openFields.length > 0
      ? [
          `Some answers are still missing: ${humanizeFields(openFields)}. We did not count a missing answer as “no”.`,
        ]
      : [];

  const effectiveCriticalFields = [
    ...new Set<HostingChooserField>([
      "compliance",
      ...decisionCriticalFields,
    ]),
  ];

  return {
    ...result,
    confidence: lowerConfidence(
      baseConfidence,
      openFields,
      effectiveCriticalFields,
    ),
    why: [
      ...why,
      ...(stageReason === undefined ? [] : [stageReason]),
      ...explicitUnknownReason,
    ],
    mustHaves: [
      ...mustHaves,
      ...(stageMustHave === undefined ? [] : [stageMustHave]),
    ],
    unknownInputs: openFields,
  };
}

function capacityFor(input: HostingChooserInput): RecommendationAxis<CapacityRoute> {
  if (
    input.evidence === "proven-limit" ||
    input.evidence === "capacity-errors"
  ) {
    return capacityAxis(
      "isolated-scalable-review",
      "Start with the known hosting limit. Compare exact plan limits and check whether the site gets its own server power.",
    );
  }

  if (input.evidence === "only-slow") {
    return capacityAxis(
      "measure-first",
      "A slow page does not prove that the hosting plan is too small. Measure where the delay starts before buying a bigger plan.",
    );
  }

  if (
    input.evidence === "unknown" ||
    input.workload === "unknown" ||
    input.criticality === "unknown" ||
    input.customControl === "unknown"
  ) {
    return capacityAxis(
      "measure-first",
      "Some answers that affect plan size are missing. Check what the site must do, what server control it needs, and what happens if it fails before choosing a plan.",
    );
  }

  if (
    input.criticality === "high" ||
    DEMANDING_WORKLOADS.has(input.workload)
  ) {
    return capacityAxis(
      "isolated-scalable-review",
      "This work, or the harm while the site is offline, may need more care. Check limits on server power and room to grow.",
    );
  }

  return capacityAxis(
    "shared-eligible",
    "There is no proof that this project needs more server power. A shared plan, where several sites use one server, is a fair start.",
  );
}

function wordpressManagementRoute(
  input: HostingChooserInput,
): "managed-wordpress" | "wordpress-capable-hosting" | "wordpress-management-review" {
  if (input.opsCapability === "no") {
    return "managed-wordpress";
  }
  if (input.opsCapability === "yes") {
    return "wordpress-capable-hosting";
  }
  return "wordpress-management-review";
}

function recommendWordPress(input: HostingChooserInput): HostingRecommendation {
  if (
    input.evidence === "proven-limit" ||
    input.evidence === "capacity-errors"
  ) {
    const needsControlDecision = input.customControl === "unknown";
    const needsOpsDecision = input.opsCapability === "unknown";
    const needsPlanDecision = needsControlDecision || needsOpsDecision;

    return completeRecommendation(input, {
      recommendationId: "wordpress-capacity-upgrade",
      title:
        needsControlDecision && needsOpsDecision
          ? "Check WordPress plans after you answer the two server questions"
          : needsControlDecision
            ? "Check WordPress plans after you decide what server control you need"
            : needsOpsDecision
              ? "Check WordPress plans after you decide who will care for the server"
              : "Compare WordPress or cloud plans with clear limits",
      summary: needsControlDecision
        ? needsOpsDecision
          ? "You have proof that a hosting limit matters. Decide what server control you need and who will care for the server."
          : "You have proof that a hosting limit matters. Decide whether you need special software or direct server control."
        : needsOpsDecision
          ? "You have proof that a hosting limit matters. Decide who will care for the server before choosing a plan."
          : "You have proof that a hosting limit matters. Compare exact limits and support before you change plans or hosting companies.",
      platformRoute: platformAxis(
        needsPlanDecision ? "wordpress-hosting" : "managed-wordpress",
        needsControlDecision
          ? "Compare managed WordPress with other WordPress hosting until you know whether you need special software or direct server control."
          : needsOpsDecision
            ? "WordPress hosting fits the software. Check which support and server-care tasks each plan includes before choosing."
            : "Compare managed WordPress plans by their exact support and limits.",
      ),
      managementRoute: managementAxis(
        needsPlanDecision ? "decision-required" : "provider-managed",
        needsControlDecision && needsOpsDecision
          ? "Answer both questions before choosing a plan. Decide what control you need and who will do each server-care task."
          : needsControlDecision
            ? "Decide whether you need special software or direct server control. That answer can change who must care for the server."
            : needsOpsDecision
              ? "Decide who will install security fixes, watch the server, make backups, fix problems, and restore the site."
              : "Choose a plan that clearly lists its security fixes and server checks. Check how it makes backups and restores the site.",
      ),
      capacityRoute: capacityAxis(
        "isolated-scalable-review",
        "Start with the known limit or error. Compare the allowed power and memory. Check file limits and visits handled at the same time.",
      ),
      baseConfidence: "high",
      decisionCriticalFields: ["customControl", "opsCapability"],
      why: [
        "The project runs WordPress.",
        "A written limit or failed page load is better proof than a page that only feels slow.",
        ...(needsControlDecision
          ? [
              "You have not said whether you need special software or direct server control. We have not chosen a WordPress plan type for you.",
            ]
          : []),
        ...(needsOpsDecision
          ? [
              "You have not said who will care for the server. We have not made the server-care choice for you.",
            ]
          : []),
      ],
      mustHaves: [
        "Written plan limits or limits confirmed by support",
        ...(needsControlDecision
          ? ["A clear list of special server needs"]
          : []),
        ...(needsOpsDecision
          ? ["A named person or company for every server-care task"]
          : []),
        "Automatic backups and a restore test",
        "A safe copy of the site for testing changes",
        "Checks that show whether the known limit is fixed",
      ],
      probablyDontNeed: [
        "A server your team cares for only because a bigger plan exists",
        "An “unlimited” claim that does not explain the real limits",
        "A new hosting company before you know which part of the plan reached its limit",
      ],
      adjacentAlternative: {
        label: needsPlanDecision
          ? "Managed WordPress with clear limits"
          : "Fix the current WordPress setup first",
        reason: needsPlanDecision
          ? "This may be simpler if it supports every feature you need. Check exactly which server-care tasks the plan includes."
          : "A WordPress add-on, slow database search, cached page, or large file may cause the problem. Fixing it may avoid a move.",
      },
      upgradeTriggers: [
        "The same measured limit returns after you fix the app",
        "At busy times, the server uses almost all of its processing power or memory",
        "Restoring the site or getting help takes too long for the harm caused while it is offline",
      ],
      guideAnchor: {
        href: `${GUIDE_BASE}#wordpress-hosting`,
        label: "Learn who does what in WordPress hosting",
      },
    });
  }

  if (input.evidence === "only-slow") {
    return completeRecommendation(input, {
      recommendationId: "wordpress-measure-first",
      title: "Find out why WordPress is slow before buying a bigger plan",
      summary:
        "The site's code, saved information, add-ons, large files, internet connection, or hosting can cause delays. Find the cause first.",
      platformRoute: platformAxis(
        "wordpress-hosting",
        "WordPress hosting still fits, but a slow page alone is not proof that you need a bigger plan.",
      ),
      managementRoute: managementAxis(
        input.opsCapability === "unknown"
          ? "decision-required"
          : input.opsCapability === "yes"
            ? "self-managed"
            : "provider-managed",
        input.opsCapability === "unknown"
          ? "Decide who will care for the server while you find the cause. We do not assume the hosting company will do it."
          : input.opsCapability === "yes"
            ? "Your team can care for a server, but that alone is not a reason to take on more server work."
            : "Choose a plan that includes server care while you find the cause. Check exactly what the plan manages.",
      ),
      capacityRoute: capacityAxis(
        "measure-first",
        "Measure page times and how hard the server works before choosing a bigger or different plan.",
      ),
      baseConfidence: "high",
      decisionCriticalFields: ["opsCapability"],
      why: [
        "The project runs WordPress.",
        "The site only feels slow. That is not enough proof that the hosting plan is the cause.",
      ],
      mustHaves: [
        "Timing results that show where one slow page spends time",
        "Checks for slow database searches and WordPress add-ons",
        "Checks for cached pages, cached images, and large files",
        "A before-and-after result for each fix",
      ],
      probablyDontNeed: [
        "An immediate move to new hosting",
        "A virtual server (VPS) chosen only because its numbers look bigger",
        "Many speed add-ons without one clear problem to test",
      ],
      adjacentAlternative: {
        label: "Managed WordPress hosting",
        reason:
          "Consider it after testing if you need better WordPress help or clearer plan limits.",
      },
      upgradeTriggers: [
        "Testing proves that the hosting company limits how much server power the site may use",
        "Errors happen when visitor numbers suddenly jump",
        "The hosting company cannot give you the tools or software needed to find and fix the cause",
      ],
      guideAnchor: {
        href: `${GUIDE_BASE}#measure-before-you-move`,
        label: "See what to measure before moving",
      },
    });
  }

  const route =
    input.customControl === "unknown"
      ? "wordpress-management-review"
      : wordpressManagementRoute(input);
  const isManaged = route === "managed-wordpress";
  const needsDecision = route === "wordpress-management-review";
  const wordpressDecisionReason =
    input.customControl === "unknown" && input.opsCapability === "unknown"
      ? "The project runs WordPress. We still need to know whether it needs special server access and who will care for the server."
      : input.customControl === "unknown"
        ? "The project runs WordPress. We still need to know whether it needs special software or direct server control."
        : input.opsCapability === "unknown"
          ? "The project runs WordPress. We know it does not need special server access, but we still need to know who will care for the server."
          : undefined;

  return completeRecommendation(input, {
    recommendationId: route,
    title: isManaged
      ? "Start with managed WordPress"
      : needsDecision
        ? "Decide who will care for the server before choosing WordPress hosting"
        : "Start with a basic WordPress hosting plan",
    summary: isManaged
      ? "You want a plan that includes server care. Clear support and a tested restore process matter more than big numbers on a plan page."
      : needsDecision
        ? "The right WordPress plan depends on who will install updates, fix problems, make backups, and restore the site."
        : "Your team can do more WordPress care. There is no proof that you need a separate server.",
    platformRoute: platformAxis(
      isManaged
        ? "managed-wordpress"
        : needsDecision
          ? "wordpress-hosting"
          : "wordpress-capable-hosting",
      isManaged
        ? "Managed WordPress can put software support and some server care with one company. Check exactly what each plan includes."
        : needsDecision
          ? "Stay with WordPress hosting, but check exactly what support will do before choosing a plan type."
          : "A basic plan that supports WordPress is a fair start. You need no special server control and have no proof of a plan limit.",
    ),
    managementRoute: managementAxis(
      needsDecision ? "decision-required" : "provider-managed",
      needsDecision
        ? "Before you choose a plan, decide who will install security fixes, watch the server, check backups, and restore the site."
        : isManaged
          ? "Choose a plan that includes server care and support that knows WordPress. Check exactly what the plan handles."
          : "Choose a plan that lists its server-care tasks. Your team should handle the WordPress website and its updates.",
    ),
    capacityRoute: capacityFor(input),
    baseConfidence: "high",
    decisionCriticalFields: [
      "customControl",
      "opsCapability",
      "evidence",
      "criticality",
      "workload",
    ],
    why: [
      needsDecision
        ? wordpressDecisionReason!
        : "The project runs WordPress and does not need special software or direct server control.",
      input.evidence === "none"
        ? "There is no proof that the current or planned hosting is too small."
        : "Proof about the needed plan size is still missing, so we keep that choice open.",
    ],
    mustHaves: [
      "A clear list of what support and your team must do",
      "Automatic backups and a restore process you can use",
      "Support for your WordPress and add-on versions, plus PHP, the language WordPress uses",
      "Written limits on server power, file space, and use",
    ],
    probablyDontNeed: [
      "Full control of every server setting, also called root access",
      "A virtual server (VPS) your team must care for when the WordPress site is ordinary",
      "A bigger plan without proof that the current plan is too small",
    ],
    adjacentAlternative: {
      label: isManaged
        ? "A plan shared with other sites that supports WordPress"
        : "Managed WordPress",
      reason: isManaged
        ? "Consider it when your team can do more WordPress care and needs less help."
        : "Choose it when you want more help from the hosting company with WordPress and restoring the site.",
    },
    upgradeTriggers: [
      "The site reaches its written limits or shows errors when busy",
      "Support no longer covers enough work for your team",
      "Being offline causes serious harm, or signed-in users need their own share of server power",
    ],
    guideAnchor: {
      href: `${GUIDE_BASE}#wordpress-hosting`,
      label: "Compare types of WordPress hosting",
    },
  });
}

function recommendStatic(input: HostingChooserInput): HostingRecommendation {
  if (input.workload === "workers-services") {
    const needsOwnershipDecision =
      input.customControl === "unknown" || input.opsCapability === "unknown";

    return completeRecommendation(input, {
      recommendationId: "static-services-hybrid",
      title: "Use static hosting for pages and a managed service for background tasks",
      summary:
        "Static hosting still fits the website pages. Background tasks need a separate service that keeps working after a visitor leaves.",
      platformRoute: platformAxis(
        "static-edge-with-managed-services",
        "Use static hosting for ready-made website files. Use a managed app service for background tasks that must keep running.",
      ),
      managementRoute: managementAxis(
        needsOwnershipDecision ? "decision-required" : "provider-managed",
        needsOwnershipDecision
          ? "List the special software needs and decide who will care for the background service. A static plan can still include server care for pages."
          : "Choose plans that clearly list server care for both parts. Check exactly what each plan handles.",
      ),
      capacityRoute: capacityAxis(
        "isolated-scalable-review",
        "Check how many jobs can run at once and for how long. Also check what happens when a job fails.",
      ),
      baseConfidence: "high",
      decisionCriticalFields: ["customControl", "opsCapability"],
      why: [
        "The website pages can be built as ready-made files.",
        "Some jobs must keep working after a visitor leaves. Static hosting alone cannot run those jobs.",
      ],
      mustHaves: [
        "A list of what the website shows right away and what the separate service does later",
        "Limits for how long tasks may run, how many may run at once, failed tasks, and stored data",
        "Separate ways to publish and check both parts, plus error records and a way to undo a bad change",
        "Steps to restore saved information and restart failed jobs",
      ],
      probablyDontNeed: [
        "A full server for the static website pages",
        "A background server your team cares for without a clear need for direct control",
        "One plan-size guess for both the website pages and jobs that run in the background",
      ],
      adjacentAlternative: {
        label: "One managed app service for the whole project",
        reason:
          "This can make publishing simpler when the website pages and later work depend on each other. The service must also send ready-made files well.",
      },
      upgradeTriggers: [
        "Jobs take too long, too many start together, or the service runs low on memory",
        "Saved information or restore needs call for a stronger setup",
        "The service cannot run a needed program or connect to another system in the required way",
      ],
      guideAnchor: {
        href: `${GUIDE_BASE}#managed-application-platforms`,
        label: "Compare managed services for jobs that run in the background",
      },
    });
  }

  const genericCapacity = capacityFor(input);
  const capacity =
    genericCapacity.route === "shared-eligible"
      ? capacityAxis(
          "edge-scalable",
          "Ready-made files can be sent from many places near visitors. You do not need a normal server plan shared with other sites.",
        )
      : genericCapacity;

  return completeRecommendation(input, {
    recommendationId: "static-edge",
    title: "Use hosting made for static websites",
    summary:
      "Static hosting serves website files that are already made. Some plans can send them from places near your visitors.",
    platformRoute: platformAxis(
      "static-edge",
      "This hosting sends pages and website files that are already built. It does not add a full server.",
    ),
    managementRoute: managementAxis(
      "platform-managed",
      "Choose a plan that manages its server network, gives your site a secure HTTPS address, includes publishing tools, and installs normal security fixes. Check the plan details.",
    ),
    capacityRoute: capacity,
    baseConfidence: "high",
    decisionCriticalFields: ["evidence", "workload", "criticality"],
    why: [
      "The website or app can be built as files that are ready to show.",
      "A full server would add care work that is not needed to send these pages.",
    ],
    mustHaves: [
      "A reliable way to build and publish every change all at once",
      "Your own website address, a secure connection (HTTPS), and rules that send old links to new pages",
      "Clear limits for data use, how often the site can be rebuilt, and short background tasks",
      "A quick way to undo a bad change",
    ],
    probablyDontNeed: [
      "A server program that stays running",
      "Care for the main software that runs a server",
      "A traditional control panel",
    ],
    adjacentAlternative: {
      label: "Managed app service",
      reason:
        "Use it when pages must be made for each visit. It also fits long jobs or software that static hosting cannot run.",
    },
    upgradeTriggers: [
      "You need jobs or services that keep running in the background",
      "You keep hitting limits for website builds, short background tasks, how much data the site sends, or file space",
      "Signed-in pages that change for each user become a main part of the product",
    ],
    guideAnchor: {
      href: `${GUIDE_BASE}#static-and-edge-hosting`,
      label: "Learn how static hosting works",
    },
  });
}

function recommendGeneral(input: HostingChooserInput): HostingRecommendation {
  const isCustomApp = input.platform === "custom-app";
  const needsControlDecision = input.customControl === "unknown";
  const capacity = capacityFor(input);
  const isMeasureFirst = capacity.route === "measure-first";

  return completeRecommendation(input, {
    recommendationId: isMeasureFirst
      ? "measure-before-moving"
      : isCustomApp
        ? "managed-application-platform"
        : "general-managed-hosting",
    title: isMeasureFirst
      ? "Measure the problem before choosing a bigger plan"
      : isCustomApp
        ? "Start with a managed app service"
        : "Start with basic hosting that clearly lists server care",
    summary: isMeasureFirst
      ? "You know what the project runs and who manages it. A slow page alone does not show that the plan is too small. Measure where the delay starts before you move."
      : isCustomApp
        ? "A managed app service can run your code. Check which server tasks its plan includes."
        : "Basic hosting is a fair start because you need no direct control or separate server power.",
    platformRoute: platformAxis(
      isCustomApp ? "managed-application-platform" : "general-managed-hosting",
      isCustomApp
        ? "The project needs a place to run its code. Choose a service that clearly lists its server and publishing work."
        : "The work does not show a need for a special platform or a server your team must care for.",
    ),
    managementRoute: managementAxis(
      needsControlDecision ? "decision-required" : "provider-managed",
      needsControlDecision
        ? "Check whether the project needs special server access or jobs that keep running. Then decide who will care for it."
        : "Choose a plan that includes security fixes and server checks. Confirm how it makes backups and restores the server.",
    ),
    capacityRoute: capacity,
    baseConfidence: "high",
    decisionCriticalFields: [
      "platform",
      "customControl",
      "evidence",
      "workload",
      "criticality",
    ],
    why: [
      isCustomApp
        ? "The project is a custom app, but it does not need direct server control."
        : "The project uses a general website editor or does work that does not need direct server control.",
      capacity.route === "shared-eligible"
        ? "There is no measured reason to pay for server power reserved only for your site."
        : "Check the needed plan size and exact limits. Do not guess from plan names.",
    ],
    mustHaves: [
      "Support for the needed software, its saved information, and the way changes are published",
      "A written list of what support and your team do when something breaks",
      "Backups and written steps to restore them",
      "Written limits for server power, file space, and how much data the site sends",
    ],
    probablyDontNeed: [
      "Full server access without a clear software need",
      "The main software that runs a server, which your team would have to care for",
      "A private share of server power without proof that it is needed",
    ],
    adjacentAlternative: {
      label: isCustomApp ? "Managed virtual server (VPS)" : "Managed app service",
      reason: isCustomApp
        ? "Use it when the managed app service cannot run needed software or give your app its own share of server power."
        : "Use it when the website editor grows custom app features or needs a stronger way to publish changes.",
    },
    upgradeTriggers: [
      "The host cannot run a needed program, background task, or connection to another service",
      "Measured busy-site errors return during normal real-world use",
      "A failure would cause enough harm to need private server power or a stronger promise about restores",
    ],
    guideAnchor: {
      href: isMeasureFirst
        ? `${GUIDE_BASE}#measure-before-you-move`
        : `${GUIDE_BASE}#managed-and-general-hosting`,
      label: isMeasureFirst
        ? "See what to measure before moving"
        : "Compare plans with clearly listed server care",
    },
  });
}

/**
 * Pure, deterministic decision engine. It never reads environment state and
 * never assumes that an `unknown` answer means `no`.
 */
export function recommendHosting(
  input: HostingChooserInput,
): HostingRecommendation {
  if (input.compliance === "regulated-or-residency") {
    return completeRecommendation(input, {
      recommendationId: "specialist-review",
      title: "Ask a specialist to review the website or app setup before you choose hosting",
      summary:
        "Special laws or strict rules about data and staying online need a careful plan. A simple quiz cannot check them safely.",
      platformRoute: platformAxis(
        "specialist-review",
        "A specialist must check the laws, data locations, and recovery plan. The chooser cannot prove that the setup follows every rule.",
      ),
      managementRoute: managementAxis(
        "specialist-review",
        "A specialist should divide every safety and recovery task between the companies and your team. The plan must also say who provides the documents that show the rules are followed.",
      ),
      capacityRoute: capacityAxis(
        "specialist-review",
        "A specialist should plan server size and recovery time. They should also plan what happens when one part fails.",
      ),
      baseConfidence: "high",
      why: [
        "You chose special laws, data-location rules, or a need to stay online almost all the time.",
        "Those rules matter more than ease of use, plan names, or a simple price list.",
      ],
      mustHaves: [
        "A written list of data locations",
        "A list of every outside company that handles the data",
        "A table that says who must do each safety task",
        "A tested backup and restore plan",
        "A plan for major failures, with target times",
        "The safety and access rules for each part",
        "The rules for storing data",
        "The documents an outside reviewer will need",
      ],
      probablyDontNeed: [
        "A choice based only on a hosting category name",
        "An “unlimited” plan that does not state real limits",
        "A move before the legal and technical needs are written down",
      ],
      adjacentAlternative: {
        label: "A specialist service with clear server care",
        reason:
          "It may remove some server work from your team. Choose it only after a specialist checks its data rules and recovery plan.",
      },
      upgradeTriggers: [
        "A law, customer contract, or data-location rule changes",
        "The site must be restored faster after a failure",
        "Data starts moving to new places or companies, or a failure can affect more parts",
      ],
      guideAnchor: {
        href: `${GUIDE_BASE}#specialist-architectures`,
        label: "See when simple hosting advice is not enough",
      },
    });
  }

  if (input.platform === "hosted-builder" && input.customControl === "no") {
    return completeRecommendation(input, {
      recommendationId: "included-hosting",
      title: "Use the hosting that already comes with your website platform",
      summary:
        "A hosted website builder or online store already hosts the site. You do not need another host when you need no special software or direct server control.",
      platformRoute: platformAxis(
        "included-with-platform",
        "The website platform and hosting are one product. A second web-hosting plan may repeat a job that is already included.",
      ),
      managementRoute: managementAxis(
        "platform-managed",
        "Check which server and security tasks the platform plan includes. Also check how it publishes and serves your site.",
      ),
      capacityRoute: capacityAxis(
        "not-applicable",
        "The website platform sets the limits. You do not need a separate shared-hosting plan, virtual server, or cloud server.",
      ),
      baseConfidence: "high",
      why: [
        "You use a hosted website builder or online store.",
        "You said that you do not need special software or direct server control.",
      ],
      mustHaves: [
        "Your own website address, also called a domain name, with a secure connection (HTTPS)",
        "Ways to export, back up, and restore the project",
        "Written limits for use, file space, how much data the site sends, and features",
        "A clear way to connect any outside service the project needs",
      ],
      probablyDontNeed: [
        "A separate shared-hosting account",
        "A rented virtual server (VPS) or cloud server",
        "Care for the main software that runs a server",
      ],
      adjacentAlternative: {
        label: "Static hosting or a managed app service",
        reason:
          "Consider separate hosting only if the platform cannot run your software, save the data you need, or publish changes the way you need.",
      },
      upgradeTriggers: [
        "The platform cannot connect a needed service or run needed software",
        "A written platform limit blocks an important task",
        "The platform can no longer meet your needs for moving data, storing data in set places, or restoring the site",
      ],
      guideAnchor: {
        href: `${GUIDE_BASE}#hosted-platforms`,
        label: "Learn how hosting works with a hosted website platform",
      },
    });
  }

  if (input.platform === "hosted-builder" && input.customControl === "unknown") {
    return completeRecommendation(input, {
      recommendationId: "confirm-builder-requirements",
      title: "Check whether the website platform can run everything you need",
      summary:
        "The website builder may include all the hosting you need. You have not said whether you need special software or direct server control.",
      platformRoute: platformAxis(
        "requirements-review",
        "Check which extra features and outside services the platform allows. Check how you can export data and run your own code.",
      ),
      managementRoute: managementAxis(
        "decision-required",
        "Check whether the website platform includes every needed feature and server-care task.",
      ),
      capacityRoute: capacityAxis(
        "measure-first",
        "List the needed features and read the platform's limits before comparing other hosting plans.",
      ),
      baseConfidence: "medium",
      decisionCriticalFields: ["customControl"],
      why: [
        "The hosting may already be included with the website platform. Check its plan.",
        "The missing answer about special software or server control could change the right hosting type. We keep that choice open.",
      ],
      mustHaves: [
        "A list of needed outside services and programs. Include jobs that must keep running after a visitor leaves",
        "Written limits for add-ons and use",
        "A way to export data and move the project",
      ],
      probablyDontNeed: [
        "A second hosting plan before you find a missing feature",
        "Server access for a feature the website platform already gives you",
      ],
      adjacentAlternative: {
        label: "Managed app service",
        reason:
          "This is the closest choice when you need custom code but do not want to care for a server.",
      },
      upgradeTriggers: [
        "The platform cannot run needed software or a job that continues after a visitor leaves",
        "A written use limit blocks an important task",
        "The platform cannot meet your needs for moving data or keeping data in set places",
      ],
      guideAnchor: {
        href: `${GUIDE_BASE}#hosted-platforms`,
        label: "Check what the included hosting can and cannot do",
      },
    });
  }

  if (input.customControl === "yes") {
    if (input.opsCapability === "no") {
      return completeRecommendation(input, {
        recommendationId: "managed-app-vps",
        title: "Use a managed app service or a managed virtual server (VPS)",
        summary:
          "You need special software or server control. You do not want to care for the main software that runs the server.",
        platformRoute: platformAxis(
          "managed-app-or-vps",
          "Choose the simplest managed service that runs every program you need. Check background tasks, connections to other services, and file space.",
        ),
        managementRoute: managementAxis(
          "provider-managed",
          "Choose a plan that includes security fixes and server checks. Confirm how it makes backups and restores the server.",
        ),
        capacityRoute: capacityAxis(
          "isolated-scalable-review",
          "Check plan limits for server power, jobs, file space, and growth. A plan name is not enough.",
        ),
        baseConfidence: "high",
        why: [
          "You said that you need special software or direct server control.",
          "You said that you do not want to care for the server.",
        ],
        mustHaves: [
          "Written proof that the service supports every needed software feature",
          "A clear list of what the hosting company and your team must do",
          "Automatic backups and a restore test",
          "Written limits for server power and growth. Include file space, connections to other services, and jobs",
        ],
        probablyDontNeed: [
          "A virtual server (VPS) that your team must care for",
          "Full server access if the managed service supports every feature you need",
          "Several cloud companies for one ordinary app",
        ],
        adjacentAlternative: {
          label: "A virtual server (VPS) or cloud server your team cares for",
          reason:
            "Choose it only if no managed service can give you a needed feature and your team clearly agrees to care for the whole server.",
        },
        upgradeTriggers: [
          "The service cannot run a needed program, background task, connection, or way to save information",
          "Measured real-world use goes over the written limits",
          "Restoring the site or getting help takes too long for the harm caused while it is offline",
        ],
        guideAnchor: {
          href: `${GUIDE_BASE}#managed-application-platforms`,
          label: "Compare managed app services and managed servers",
        },
      });
    }

    if (input.opsCapability === "yes") {
      return completeRecommendation(input, {
        recommendationId: "self-managed-vps-cloud",
        title: "A virtual server (VPS) can fit if your team will care for it",
        summary:
          "You need direct control of the software or server. Your team has agreed to keep the server safe and working.",
        platformRoute: platformAxis(
          "self-managed-vps-cloud",
          "A VPS or cloud server is a rented virtual server. You control its main software, installed programs, background tasks, outside connections, and file space.",
        ),
        managementRoute: managementAxis(
          "self-managed",
          "Your team must install security fixes, protect access, watch the server, make backups, fix problems, and restore it.",
        ),
        capacityRoute: capacityAxis(
          "isolated-scalable-review",
          "Choose clear limits for processing power, memory, file space, how much data the site sends, and growth. Test them with work like the app will do.",
        ),
        baseConfidence: "high",
        why: [
          "You said that you need special software or direct server control.",
          "You said that your team can care for the server over time.",
        ],
        mustHaves: [
          "A written list of who installs fixes, protects and watches the server, makes backups, and restores it",
          "Access that gives each person only what they need, plus safe storage for passwords and keys",
          "Alerts when the server uses almost all of its processing power, memory, file space, or other plan limits",
          "Tested steps to rebuild and restore the server",
        ],
        probablyDontNeed: [
          "Changes made directly on the live server that your team cannot repeat",
          "More data locations or control tools than your restore plan needs",
          "A bigger server instead of testing which part of the app is slow",
        ],
        adjacentAlternative: {
          label: "Managed app service or managed virtual server (VPS)",
          reason:
            "It may remove server-care work. Check that it supports every needed feature and lists exactly which server tasks it handles.",
        },
        upgradeTriggers: [
          "The server keeps using almost all of its processing power, memory, file space, or data limit",
          "The team can no longer keep up with security and problem fixes",
          "One server and its restore plan can no longer keep the site online as long as needed",
        ],
        guideAnchor: {
          href: `${GUIDE_BASE}#vps-and-cloud-virtual-machines`,
          label: "Learn what your team must do for a virtual or cloud server",
        },
      });
    }

    return completeRecommendation(input, {
      recommendationId: "decide-operations-model",
      title: "Decide who will care for the server before choosing a virtual server (VPS)",
      summary:
        "The project needs more control than a plan shared with other sites gives. First decide who will care for the server.",
      platformRoute: platformAxis(
        "managed-app-or-vps",
        "Compare a managed app service or managed virtual server (VPS) first. Do this until you clearly choose who will care for the server.",
      ),
      managementRoute: managementAxis(
        "decision-required",
        "Name who will care for the server before you choose a plan. This work includes security fixes, checks, backups, problem fixes, and restores.",
      ),
      capacityRoute: capacityAxis(
        "isolated-scalable-review",
        "The special software needs clear limits for server power and growth. First choose the person or company that will care for the server.",
      ),
      baseConfidence: "medium",
      decisionCriticalFields: ["opsCapability"],
      why: [
        "You said that you need special software or direct server control.",
        "The missing answer about server care stops us from safely choosing a managed server or one your team cares for.",
      ],
      mustHaves: [
        "A named person or company for every server-care task",
          "A checked list of needed programs, background tasks, connections to other services, and file space",
        "A plan for backups and restores, plus checks, alerts and problem fixes",
      ],
      probablyDontNeed: [
        "A server your team must care for before anyone agrees to do that work",
        "A plan choice based only on a list of technical numbers",
      ],
      adjacentAlternative: {
        label: "A virtual server (VPS) or cloud server your team cares for",
        reason:
          "Use it only when the team clearly agrees to do every server-care task and can keep doing them.",
      },
      upgradeTriggers: [
        "A managed service cannot run a software feature you need",
        "The team clearly agrees to care for the server",
        "Measurements show that you need a different setup for plan size or time online",
      ],
      guideAnchor: {
        href: `${GUIDE_BASE}#management-responsibility`,
        label: "Compare a managed server with one your team cares for",
      },
    });
  }

  if (input.platform === "wordpress") {
    return recommendWordPress(input);
  }

  if (input.platform === "static") {
    return recommendStatic(input);
  }

  if (input.platform === "unknown") {
    return completeRecommendation(input, {
      recommendationId: "requirements-review",
      title: "Choose the website or app type before choosing hosting",
      summary:
        "Hosting depends on the software and the work it must do. A plan choice would only be a guess until you know the website or app type.",
      platformRoute: platformAxis(
        "requirements-review",
        "First choose the website type. It may use a hosted builder, WordPress, ready-made files, another editor, or its own code.",
      ),
      managementRoute: managementAxis(
        "decision-required",
        "Who cares for the server depends on the website or app type and whether it needs special software.",
      ),
      capacityRoute: capacityAxis(
        "measure-first",
        "Write down what the site must do, its busy times, proof of limits, and the harm while it is offline. Then choose a plan size.",
      ),
      baseConfidence: "low",
      decisionCriticalFields: ["platform"],
      why: [
        "The website or app type is still unknown.",
        "Different types need different hosting and different server-care work.",
      ],
      mustHaves: [
        "A chosen tool for building and publishing the website or app",
        "A list of needed software, saved information, background tasks, file space, and outside services",
        "A named person or company for updates and checks, plus backups and restores",
      ],
      probablyDontNeed: [
        "A hosting purchase before you choose the software type",
        "A plan-size guess based only on a guessed visitor count",
      ],
      adjacentAlternative: {
        label: "Hosted site builder",
        reason:
          "For a simple site that needs no special software, it can give you the website tools and hosting in one product.",
      },
      upgradeTriggers: [
        "The chosen website or app type needs a separate place to run code",
        "The planned work may cause serious harm while the site is offline or may need a larger plan",
        "New legal or data-location rules appear, or the site must stay online for longer",
      ],
      guideAnchor: {
        href: `${GUIDE_BASE}#start-with-the-platform`,
        label: "Start with the website or app type, not a plan name",
      },
    });
  }

  return recommendGeneral(input);
}

export function describeInput(input: HostingChooserInput): string[] {
  return FIELD_ORDER.map(
    (field) => CHOOSER_OPTION_LABELS[field][input[field] as never] as string,
  );
}
