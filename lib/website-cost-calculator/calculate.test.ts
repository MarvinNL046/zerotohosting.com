import { describe, expect, it } from "vitest";

import {
  calculateWebsiteCost,
  createEmptyWebsiteCostInput,
  type WebsiteCostInput,
} from "./calculate";

describe("calculateWebsiteCost", () => {
  it("keeps an empty estimate at zero", () => {
    expect(calculateWebsiteCost(createEmptyWebsiteCostInput())).toEqual({
      firstYearRecurringTotal: 0,
      laterYearRecurringTotal: 0,
      oneTimeTotal: 0,
      firstYearTotal: 0,
      laterYearTotal: 0,
      recurringChange: 0,
    });
  });

  it("separates first-year, later-year, and one-time costs", () => {
    const input: WebsiteCostInput = {
      recurring: {
        domain: { firstYear: 12, laterYear: 18 },
        hosting: { firstYear: 60, laterYear: 120 },
        email: { firstYear: 24, laterYear: 24 },
        apps: { firstYear: 30, laterYear: 30 },
        care: { firstYear: 0, laterYear: 90 },
        otherRecurring: { firstYear: 10, laterYear: 10 },
      },
      oneTime: {
        design: 75,
        setup: 150,
      },
    };

    expect(calculateWebsiteCost(input)).toEqual({
      firstYearRecurringTotal: 136,
      laterYearRecurringTotal: 292,
      oneTimeTotal: 225,
      firstYearTotal: 361,
      laterYearTotal: 292,
      recurringChange: 156,
    });
  });

  it("rounds in cents and treats unsafe amounts as zero", () => {
    const empty = createEmptyWebsiteCostInput();
    const input: WebsiteCostInput = {
      recurring: {
        ...empty.recurring,
        domain: { firstYear: 0.1, laterYear: Number.NaN },
        hosting: { firstYear: 0.2, laterYear: -20 },
      },
      oneTime: {
        design: Number.POSITIVE_INFINITY,
        setup: 0.105,
      },
    };

    expect(calculateWebsiteCost(input)).toEqual({
      firstYearRecurringTotal: 0.3,
      laterYearRecurringTotal: 0,
      oneTimeTotal: 0.11,
      firstYearTotal: 0.41,
      laterYearTotal: 0,
      recurringChange: -0.3,
    });
  });
});
