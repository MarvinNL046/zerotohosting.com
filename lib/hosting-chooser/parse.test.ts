import { describe, expect, it } from "vitest";

import { parseHostingChooserInput } from "./parse";

describe("parseHostingChooserInput", () => {
  it("parses a complete URLSearchParams input", () => {
    const params = new URLSearchParams({
      stage: "existing",
      platform: "wordpress",
      workload: "commerce-booking",
      customControl: "no",
      opsCapability: "no",
      evidence: "capacity-errors",
      criticality: "high",
      compliance: "standard",
    });

    expect(parseHostingChooserInput(params)).toEqual({
      stage: "existing",
      platform: "wordpress",
      workload: "commerce-booking",
      customControl: "no",
      opsCapability: "no",
      evidence: "capacity-errors",
      criticality: "high",
      compliance: "standard",
    });
  });

  it("parses Next.js record search params and uses the first array value", () => {
    expect(
      parseHostingChooserInput({
        stage: ["new", "existing"],
        platform: ["static", "wordpress"],
        workload: "public-cacheable",
        customControl: "no",
        opsCapability: "yes",
        evidence: "none",
        criticality: "standard",
        compliance: "standard",
      }),
    ).toEqual({
      stage: "new",
      platform: "static",
      workload: "public-cacheable",
      customControl: "no",
      opsCapability: "yes",
      evidence: "none",
      criticality: "standard",
      compliance: "standard",
    });
  });

  it("accepts kebab-case and snake-case aliases for compound keys", () => {
    expect(
      parseHostingChooserInput({
        "custom-control": "yes",
        ops_capability: "no",
      }),
    ).toMatchObject({ customControl: "yes", opsCapability: "no" });
  });

  it("normalises case and surrounding whitespace", () => {
    expect(
      parseHostingChooserInput({
        stage: " NEW ",
        platform: "WORDPRESS",
        workload: " PUBLIC-CACHEABLE ",
      }),
    ).toMatchObject({
      stage: "new",
      platform: "wordpress",
      workload: "public-cacheable",
    });
  });

  it("maps missing, empty, and unrecognised values to unknown rather than no", () => {
    expect(
      parseHostingChooserInput({
        platform: "",
        customControl: "false",
        opsCapability: undefined,
        evidence: "probably-not",
      }),
    ).toEqual({
      stage: "unknown",
      platform: "unknown",
      workload: "unknown",
      customControl: "unknown",
      opsCapability: "unknown",
      evidence: "unknown",
      criticality: "unknown",
      compliance: "unknown",
    });
  });
});
