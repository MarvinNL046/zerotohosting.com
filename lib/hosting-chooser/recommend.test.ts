import { describe, expect, it } from "vitest";

import { recommendHosting } from "./recommend";
import type { HostingChooserInput } from "./types";

const BASE_INPUT: HostingChooserInput = {
  stage: "new",
  platform: "cms",
  workload: "public-cacheable",
  customControl: "no",
  opsCapability: "no",
  evidence: "none",
  criticality: "standard",
  compliance: "standard",
};

function input(
  overrides: Partial<HostingChooserInput> = {},
): HostingChooserInput {
  return { ...BASE_INPUT, ...overrides };
}

describe("recommendHosting precedence", () => {
  it("routes regulated, residency, and complex availability needs to specialist review", () => {
    const result = recommendHosting(
      input({
        platform: "hosted-builder",
        customControl: "no",
        compliance: "regulated-or-residency",
      }),
    );

    expect(result.recommendationId).toBe("specialist-review");
    expect(result.platformRoute.route).toBe("specialist-review");
    expect(result.managementRoute.route).toBe("specialist-review");
    expect(result.capacityRoute.route).toBe("specialist-review");
    expect(result.confidence).toBe("high");
  });

  it("keeps specialist review ahead of custom-control routing", () => {
    expect(
      recommendHosting(
        input({
          customControl: "yes",
          opsCapability: "yes",
          compliance: "regulated-or-residency",
        }),
      ).recommendationId,
    ).toBe("specialist-review");
  });
});

describe("hosted platform routing", () => {
  it("does not recommend separate hosting when the platform is hosted and control is explicitly not needed", () => {
    const result = recommendHosting(
      input({ platform: "hosted-builder", customControl: "no" }),
    );

    expect(result.recommendationId).toBe("included-hosting");
    expect(result.platformRoute.route).toBe("included-with-platform");
    expect(result.capacityRoute.route).toBe("not-applicable");
    expect(result.probablyDontNeed).toContain("A separate shared-hosting account");
  });

  it("does not treat unknown control needs as no", () => {
    const result = recommendHosting(
      input({ platform: "hosted-builder", customControl: "unknown" }),
    );

    expect(result.recommendationId).toBe("confirm-builder-requirements");
    expect(result.recommendationId).not.toBe("included-hosting");
    expect(result.managementRoute.route).toBe("decision-required");
    expect(result.unknownInputs).toContain("customControl");
    expect(result.confidence).toBe("low");
    expect(result.why.at(-1)).toContain("did not count a missing answer as");
  });
});

describe("custom-control routing", () => {
  it("recommends a managed application platform or VPS when ops capability is no", () => {
    const result = recommendHosting(
      input({ customControl: "yes", opsCapability: "no" }),
    );

    expect(result.recommendationId).toBe("managed-app-vps");
    expect(result.platformRoute.route).toBe("managed-app-or-vps");
    expect(result.managementRoute.route).toBe("provider-managed");
    expect(result.capacityRoute.route).toBe("isolated-scalable-review");
  });

  it("recommends a self-managed VPS or cloud VM when ops capability is yes", () => {
    const result = recommendHosting(
      input({ customControl: "yes", opsCapability: "yes" }),
    );

    expect(result.recommendationId).toBe("self-managed-vps-cloud");
    expect(result.platformRoute.route).toBe("self-managed-vps-cloud");
    expect(result.managementRoute.route).toBe("self-managed");
  });

  it("requires an operations decision when capability is unknown", () => {
    const result = recommendHosting(
      input({ customControl: "yes", opsCapability: "unknown" }),
    );

    expect(result.recommendationId).toBe("decide-operations-model");
    expect(result.managementRoute.route).toBe("decision-required");
    expect(result.confidence).toBe("low");
    expect(result.unknownInputs).toEqual(["opsCapability"]);
  });
});

describe("WordPress routing", () => {
  it.each(["proven-limit", "capacity-errors"] as const)(
    "routes WordPress with %s evidence to an explicit-limits capacity review",
    (evidence) => {
      const result = recommendHosting(
        input({ platform: "wordpress", evidence }),
      );

      expect(result.recommendationId).toBe("wordpress-capacity-upgrade");
      expect(result.platformRoute.route).toBe("managed-wordpress");
      expect(result.capacityRoute.route).toBe("isolated-scalable-review");
      expect(result.mustHaves.join(" ")).toMatch(/limits/i);
    },
  );

  it.each(["proven-limit", "capacity-errors"] as const)(
    "keeps WordPress platform and management open for %s evidence when control needs are unknown",
    (evidence) => {
      const result = recommendHosting(
        input({
          platform: "wordpress",
          evidence,
          customControl: "unknown",
        }),
      );

      expect(result.recommendationId).toBe("wordpress-capacity-upgrade");
      expect(result.platformRoute.route).toBe("wordpress-hosting");
      expect(result.managementRoute.route).toBe("decision-required");
      expect(result.capacityRoute.route).toBe("isolated-scalable-review");
      expect(result.confidence).toBe("low");
      expect(result.unknownInputs).toEqual(["customControl"]);
      expect(result.why.join(" ")).toContain(
        "You have not said whether you need special software or direct server control.",
      );
      expect(result.why.join(" ")).not.toContain(
        "You have not said who will care for the server.",
      );
    },
  );

  it.each(["proven-limit", "capacity-errors"] as const)(
    "keeps WordPress platform and management open for %s evidence when server care is unknown",
    (evidence) => {
      const result = recommendHosting(
        input({
          platform: "wordpress",
          evidence,
          opsCapability: "unknown",
        }),
      );

      expect(result.recommendationId).toBe("wordpress-capacity-upgrade");
      expect(result.platformRoute.route).toBe("wordpress-hosting");
      expect(result.managementRoute.route).toBe("decision-required");
      expect(result.capacityRoute.route).toBe("isolated-scalable-review");
      expect(result.confidence).toBe("low");
      expect(result.unknownInputs).toEqual(["opsCapability"]);
      expect(result.why.join(" ")).toContain(
        "You have not said who will care for the server.",
      );
      expect(result.why.join(" ")).not.toContain(
        "You have not said whether you need special software or direct server control.",
      );
    },
  );

  it("names both missing WordPress capacity decisions without inventing answers", () => {
    const result = recommendHosting(
      input({
        platform: "wordpress",
        evidence: "proven-limit",
        customControl: "unknown",
        opsCapability: "unknown",
      }),
    );

    expect(result.platformRoute.route).toBe("wordpress-hosting");
    expect(result.managementRoute.route).toBe("decision-required");
    expect(result.confidence).toBe("low");
    expect(result.unknownInputs).toEqual(["customControl", "opsCapability"]);
    expect(result.why.join(" ")).toContain(
      "You have not said whether you need special software or direct server control.",
    );
    expect(result.why.join(" ")).toContain(
      "You have not said who will care for the server.",
    );
  });

  it("routes unmeasured WordPress slowness to measurement before migration", () => {
    const result = recommendHosting(
      input({ platform: "wordpress", evidence: "only-slow" }),
    );

    expect(result.recommendationId).toBe("wordpress-measure-first");
    expect(result.capacityRoute.route).toBe("measure-first");
    expect(result.title).toMatch(/find out why/i);
    expect(result.probablyDontNeed).toContain(
      "An immediate move to new hosting",
    );
  });

  it("does not assign WordPress operations ownership when it is unknown", () => {
    const result = recommendHosting(
      input({
        platform: "wordpress",
        evidence: "only-slow",
        opsCapability: "unknown",
      }),
    );

    expect(result.managementRoute.route).toBe("decision-required");
    expect(result.confidence).toBe("low");
  });

  it("uses managed WordPress when the user does not want operations ownership", () => {
    const result = recommendHosting(
      input({ platform: "wordpress", opsCapability: "no" }),
    );

    expect(result.recommendationId).toBe("managed-wordpress");
    expect(result.platformRoute.route).toBe("managed-wordpress");
    expect(result.managementRoute.route).toBe("provider-managed");
    expect(result.capacityRoute.route).toBe("shared-eligible");
  });

  it("uses WordPress-capable hosting when the user accepts more maintenance", () => {
    const result = recommendHosting(
      input({ platform: "wordpress", opsCapability: "yes" }),
    );

    expect(result.recommendationId).toBe("wordpress-capable-hosting");
    expect(result.platformRoute.route).toBe("wordpress-capable-hosting");
    expect(result.capacityRoute.route).toBe("shared-eligible");
  });

  it("keeps management open when WordPress operations ownership is unknown", () => {
    const result = recommendHosting(
      input({ platform: "wordpress", opsCapability: "unknown" }),
    );

    expect(result.recommendationId).toBe("wordpress-management-review");
    expect(result.managementRoute.route).toBe("decision-required");
    expect(result.confidence).toBe("low");
  });

  it("keeps WordPress management open when custom-control needs are unknown", () => {
    const result = recommendHosting(
      input({ platform: "wordpress", customControl: "unknown" }),
    );

    expect(result.recommendationId).toBe("wordpress-management-review");
    expect(result.managementRoute.route).toBe("decision-required");
    expect(result.capacityRoute.route).toBe("measure-first");
    expect(result.confidence).toBe("low");
  });

  it.each([
    [
      "unknown",
      "unknown",
      "The project runs WordPress. We still need to know whether it needs special server access and who will care for the server.",
    ],
    [
      "unknown",
      "no",
      "The project runs WordPress. We still need to know whether it needs special software or direct server control.",
    ],
    [
      "no",
      "unknown",
      "The project runs WordPress. We know it does not need special server access, but we still need to know who will care for the server.",
    ],
  ] as const)(
    "explains the exact missing WordPress decision for control=%s and server care=%s",
    (customControl, opsCapability, reason) => {
      const result = recommendHosting(
        input({ platform: "wordpress", customControl, opsCapability }),
      );

      expect(result.why[0]).toBe(reason);
    },
  );
});

describe("platform and capacity axes", () => {
  it("routes static sites to static and edge hosting", () => {
    const result = recommendHosting(input({ platform: "static" }));

    expect(result.recommendationId).toBe("static-edge");
    expect(result.platformRoute.route).toBe("static-edge");
    expect(result.managementRoute.route).toBe("platform-managed");
    expect(result.capacityRoute.route).toBe("edge-scalable");
  });

  it("uses a hybrid static and managed-services route for background workers", () => {
    const result = recommendHosting(
      input({ platform: "static", workload: "workers-services" }),
    );

    expect(result.recommendationId).toBe("static-services-hybrid");
    expect(result.platformRoute.route).toBe(
      "static-edge-with-managed-services",
    );
    expect(result.managementRoute.route).toBe("provider-managed");
    expect(result.capacityRoute.route).toBe("isolated-scalable-review");
    expect(result.why.join(" ")).toMatch(/static hosting alone cannot/i);
    expect(result.probablyDontNeed).not.toContain(
      "A server program that stays running",
    );
    expect(result.guideAnchor.href).toContain(
      "#managed-application-platforms",
    );
  });

  it("keeps explicit custom-control precedence ahead of the static worker hybrid", () => {
    const result = recommendHosting(
      input({
        platform: "static",
        workload: "workers-services",
        customControl: "yes",
      }),
    );

    expect(result.recommendationId).toBe("managed-app-vps");
    expect(result.platformRoute.route).toBe("managed-app-or-vps");
  });

  it("keeps service ownership open for a static worker workload when operations ownership is unknown", () => {
    const result = recommendHosting(
      input({
        platform: "static",
        workload: "workers-services",
        opsCapability: "unknown",
      }),
    );

    expect(result.managementRoute.route).toBe("decision-required");
    expect(result.confidence).toBe("low");
  });

  it("routes a custom app without server-control needs to a managed application platform", () => {
    const result = recommendHosting(input({ platform: "custom-app" }));

    expect(result.recommendationId).toBe("managed-application-platform");
    expect(result.platformRoute.route).toBe("managed-application-platform");
    expect(result.managementRoute.route).toBe("provider-managed");
  });

  it("keeps a basic CMS eligible for shared capacity", () => {
    const result = recommendHosting(input({ platform: "cms" }));

    expect(result.recommendationId).toBe("general-managed-hosting");
    expect(result.platformRoute.route).toBe("general-managed-hosting");
    expect(result.capacityRoute.route).toBe("shared-eligible");
  });

  it.each([
    "commerce-booking",
    "membership-logins",
    "workers-services",
    "large-media",
  ] as const)("reviews isolated or scalable capacity for %s", (workload) => {
    const result = recommendHosting(input({ workload }));
    expect(result.capacityRoute.route).toBe("isolated-scalable-review");
  });

  it("reviews isolated or scalable capacity when downtime impact is high", () => {
    const result = recommendHosting(input({ criticality: "high" }));
    expect(result.capacityRoute.route).toBe("isolated-scalable-review");
  });

  it("uses measurement rather than shared eligibility when evidence is unknown", () => {
    const result = recommendHosting(input({ evidence: "unknown" }));
    expect(result.capacityRoute.route).toBe("measure-first");
    expect(result.confidence).toBe("low");
  });

  it("uses measurement rather than shared eligibility when workload is unknown", () => {
    const result = recommendHosting(input({ workload: "unknown" }));
    expect(result.capacityRoute.route).toBe("measure-first");
    expect(result.confidence).toBe("low");
  });

  it("sends a measured-before-moving result to the matching guide section", () => {
    const result = recommendHosting(
      input({ platform: "cms", stage: "existing", evidence: "only-slow" }),
    );

    expect(result.recommendationId).toBe("measure-before-moving");
    expect(result.title).toBe("Measure the problem before choosing a bigger plan");
    expect(result.guideAnchor).toEqual({
      href: "/guides/types-of-web-hosting/#measure-before-you-move",
      label: "See what to measure before moving",
    });
  });

  it("does not assign provider management when custom-control needs are unknown", () => {
    const result = recommendHosting(input({ customControl: "unknown" }));
    expect(result.managementRoute.route).toBe("decision-required");
    expect(result.capacityRoute.route).toBe("measure-first");
    expect(result.confidence).toBe("low");
  });

  it("requires a platform decision when platform is unknown", () => {
    const result = recommendHosting(input({ platform: "unknown" }));
    expect(result.recommendationId).toBe("requirements-review");
    expect(result.platformRoute.route).toBe("requirements-review");
    expect(result.confidence).toBe("low");
  });
});

describe("confidence and output contract", () => {
  it("adds an existing-project migration baseline and rollback requirement", () => {
    const result = recommendHosting(input({ stage: "existing" }));

    expect(result.why.join(" ")).toMatch(
      /measure how this project works.*tested way to move it back/i,
    );
    expect(result.mustHaves).toContain(
      "A record of how the current site works and a tested way to move back",
    );
  });

  it("adds a new-project minimum-requirements and launch baseline", () => {
    const result = recommendHosting(input({ stage: "new" }));

    expect(result.why.join(" ")).toMatch(
      /check this project['’]s basic hosting needs.*save the results/i,
    );
    expect(result.mustHaves).toContain(
      "Checked basic hosting needs and notes about how it worked when it first went online",
    );
  });

  it("keeps an unknown project stage explicit without inventing a stage requirement", () => {
    const result = recommendHosting(input({ stage: "unknown" }));

    expect(result.unknownInputs).toContain("stage");
    expect(result.why.at(-1)).toMatch(
      /whether the project is new.*did not count a missing answer/i,
    );
    expect(result.mustHaves).not.toContain(
      "A record of how the current site works and a tested way to move back",
    );
    expect(result.mustHaves).not.toContain(
      "Checked basic hosting needs and a record of the launch results",
    );
  });

  it("lowers high confidence to medium for one non-critical unknown", () => {
    const result = recommendHosting(
      input({ platform: "hosted-builder", customControl: "no", stage: "unknown" }),
    );
    expect(result.confidence).toBe("medium");
    expect(result.unknownInputs).toEqual(["stage"]);
  });

  it("lowers confidence to low for multiple unknown inputs", () => {
    const result = recommendHosting(
      input({
        platform: "hosted-builder",
        customControl: "no",
        stage: "unknown",
        workload: "unknown",
      }),
    );
    expect(result.confidence).toBe("low");
  });

  it("treats unknown compliance as decision-critical", () => {
    const result = recommendHosting(input({ compliance: "unknown" }));
    expect(result.confidence).toBe("low");
    expect(result.unknownInputs).toContain("compliance");
  });

  it("returns every explanatory section and a guide anchor", () => {
    const result = recommendHosting(BASE_INPUT);
    expect(result.why.length).toBeGreaterThan(0);
    expect(result.mustHaves.length).toBeGreaterThan(0);
    expect(result.probablyDontNeed.length).toBeGreaterThan(0);
    expect(result.adjacentAlternative.label).not.toBe("");
    expect(result.adjacentAlternative.reason).not.toBe("");
    expect(result.upgradeTriggers.length).toBeGreaterThan(0);
    expect(result.guideAnchor.href).toMatch(
      /^\/guides\/types-of-web-hosting\/#/,
    );
  });

  it("is deterministic for equal inputs", () => {
    expect(recommendHosting(BASE_INPUT)).toEqual(
      recommendHosting({ ...BASE_INPUT }),
    );
  });
});
