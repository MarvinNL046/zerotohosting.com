export const recurringCostKeys = [
  "domain",
  "hosting",
  "email",
  "apps",
  "care",
  "otherRecurring",
] as const;

export const oneTimeCostKeys = ["design", "setup"] as const;

export type RecurringCostKey = (typeof recurringCostKeys)[number];
export type OneTimeCostKey = (typeof oneTimeCostKeys)[number];

export type RecurringCostInput = Readonly<{
  firstYear: number;
  laterYear: number;
}>;

export type WebsiteCostInput = Readonly<{
  recurring: Readonly<Record<RecurringCostKey, RecurringCostInput>>;
  oneTime: Readonly<Record<OneTimeCostKey, number>>;
}>;

export type WebsiteCostResult = Readonly<{
  firstYearRecurringTotal: number;
  laterYearRecurringTotal: number;
  oneTimeTotal: number;
  firstYearTotal: number;
  laterYearTotal: number;
  recurringChange: number;
}>;

function cleanAmount(value: number): number {
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }

  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function addMoney(values: readonly number[]): number {
  const cents = values.reduce(
    (total, value) => total + Math.round(cleanAmount(value) * 100),
    0,
  );

  return cents / 100;
}

export function createEmptyWebsiteCostInput(): WebsiteCostInput {
  return {
    recurring: {
      domain: { firstYear: 0, laterYear: 0 },
      hosting: { firstYear: 0, laterYear: 0 },
      email: { firstYear: 0, laterYear: 0 },
      apps: { firstYear: 0, laterYear: 0 },
      care: { firstYear: 0, laterYear: 0 },
      otherRecurring: { firstYear: 0, laterYear: 0 },
    },
    oneTime: {
      design: 0,
      setup: 0,
    },
  };
}

export function calculateWebsiteCost(
  input: WebsiteCostInput,
): WebsiteCostResult {
  const firstYearRecurringTotal = addMoney(
    recurringCostKeys.map((key) => input.recurring[key].firstYear),
  );
  const laterYearRecurringTotal = addMoney(
    recurringCostKeys.map((key) => input.recurring[key].laterYear),
  );
  const oneTimeTotal = addMoney(
    oneTimeCostKeys.map((key) => input.oneTime[key]),
  );
  const firstYearTotal = addMoney([
    firstYearRecurringTotal,
    oneTimeTotal,
  ]);

  return {
    firstYearRecurringTotal,
    laterYearRecurringTotal,
    oneTimeTotal,
    firstYearTotal,
    laterYearTotal: laterYearRecurringTotal,
    recurringChange: addMoney([laterYearRecurringTotal]) -
      addMoney([firstYearRecurringTotal]),
  };
}
