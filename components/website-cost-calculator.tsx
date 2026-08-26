"use client";

import { useMemo, useState } from "react";
import { Calculator, RotateCcw } from "lucide-react";

import {
  calculateWebsiteCost,
  createEmptyWebsiteCostInput,
  type OneTimeCostKey,
  type RecurringCostKey,
  type WebsiteCostInput,
} from "@/lib/website-cost-calculator/calculate";

const currencies = ["USD", "EUR", "GBP"] as const;
type Currency = (typeof currencies)[number];

const moneyFormatters: Readonly<Record<Currency, Intl.NumberFormat>> = {
  USD: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }),
  EUR: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }),
  GBP: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  }),
};

type AmountState = Readonly<{
  recurring: Readonly<
    Record<RecurringCostKey, Readonly<{ firstYear: string; laterYear: string }>>
  >;
  oneTime: Readonly<Record<OneTimeCostKey, string>>;
}>;

const recurringRows: readonly Readonly<{
  key: RecurringCostKey;
  label: string;
  hint: string;
}>[] = [
  {
    key: "domain",
    label: "Domain name",
    hint: "The web address, such as example.com.",
  },
  {
    key: "hosting",
    label: "Hosting or website builder",
    hint: "Use the full amount for the whole billing period, not only the monthly price shown.",
  },
  {
    key: "email",
    label: "Business email",
    hint: "Add this only when it is not included in your plan.",
  },
  {
    key: "apps",
    label: "Paid apps or plugins",
    hint: "Add-ons for forms, stores, bookings, or other features.",
  },
  {
    key: "care",
    label: "Backups and security",
    hint: "Add website-care tools or help that you expect to pay for each year.",
  },
  {
    key: "otherRecurring",
    label: "Other yearly costs",
    hint: "For any repeating website cost that is not listed above.",
  },
] as const;

const oneTimeRows: readonly Readonly<{
  key: OneTimeCostKey;
  label: string;
  hint: string;
}>[] = [
  {
    key: "design",
    label: "Theme, template, or design",
    hint: "A one-time design purchase or project cost.",
  },
  {
    key: "setup",
    label: "Setup or developer help",
    hint: "A one-time fee to build, move, or set up the website.",
  },
] as const;

function createEmptyAmountState(): AmountState {
  return {
    recurring: {
      domain: { firstYear: "", laterYear: "" },
      hosting: { firstYear: "", laterYear: "" },
      email: { firstYear: "", laterYear: "" },
      apps: { firstYear: "", laterYear: "" },
      care: { firstYear: "", laterYear: "" },
      otherRecurring: { firstYear: "", laterYear: "" },
    },
    oneTime: {
      design: "",
      setup: "",
    },
  };
}

function parseAmount(value: string): number {
  const amount = Number(value);
  return Number.isFinite(amount) && amount >= 0 ? amount : 0;
}

function toCalculatorInput(state: AmountState): WebsiteCostInput {
  const empty = createEmptyWebsiteCostInput();

  return {
    recurring: Object.fromEntries(
      (Object.keys(empty.recurring) as RecurringCostKey[]).map((key) => [
        key,
        {
          firstYear: parseAmount(state.recurring[key].firstYear),
          laterYear: parseAmount(state.recurring[key].laterYear),
        },
      ]),
    ) as WebsiteCostInput["recurring"],
    oneTime: Object.fromEntries(
      (Object.keys(empty.oneTime) as OneTimeCostKey[]).map((key) => [
        key,
        parseAmount(state.oneTime[key]),
      ]),
    ) as WebsiteCostInput["oneTime"],
  };
}

function formatMoney(amount: number, currency: Currency): string {
  return moneyFormatters[currency].format(amount);
}

export function WebsiteCostCalculator() {
  const [amounts, setAmounts] = useState<AmountState>(createEmptyAmountState);
  const [currency, setCurrency] = useState<Currency>("USD");
  const result = useMemo(
    () => calculateWebsiteCost(toCalculatorInput(amounts)),
    [amounts],
  );
  const blankCounts = useMemo(() => {
    const firstYearRecurring = recurringRows.filter(
      (row) => amounts.recurring[row.key].firstYear === "",
    ).length;
    const laterYear = recurringRows.filter(
      (row) => amounts.recurring[row.key].laterYear === "",
    ).length;
    const oneTime = oneTimeRows.filter(
      (row) => amounts.oneTime[row.key] === "",
    ).length;

    return {
      firstYear: firstYearRecurring + oneTime,
      laterYear,
      repeating: firstYearRecurring + laterYear,
    };
  }, [amounts]);
  const firstYearResultLabel = blankCounts.firstYear === 0
    ? "First-year total"
    : "First-year total so far";
  const laterYearResultLabel = blankCounts.laterYear === 0
    ? "Later-year total"
    : "Later-year total so far";

  function updateRecurring(
    key: RecurringCostKey,
    period: "firstYear" | "laterYear",
    value: string,
  ) {
    setAmounts((current) => ({
      ...current,
      recurring: {
        ...current.recurring,
        [key]: { ...current.recurring[key], [period]: value },
      },
    }));
  }

  function updateOneTime(key: OneTimeCostKey, value: string) {
    setAmounts((current) => ({
      ...current,
      oneTime: { ...current.oneTime, [key]: value },
    }));
  }

  return (
    <div className="cost-calculator" id="calculator">
      <div className="cost-calculator-form-panel">
        <div className="cost-calculator-panel-heading">
          <span className="cost-calculator-icon" aria-hidden="true">
            <Calculator size={22} />
          </span>
          <div>
            <p className="eyebrow">Your numbers</p>
            <h2>Build your website cost.</h2>
          </div>
        </div>

        <div className="currency-field">
          <label htmlFor="cost-currency">Currency</label>
          <select
            id="cost-currency"
            value={currency}
            onChange={(event) => setCurrency(event.target.value as Currency)}
          >
            {currencies.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="cost-table" role="group" aria-label="Repeating website costs">
          <div className="cost-table-header" aria-hidden="true">
            <span>Repeating cost</span>
            <span>Year 1</span>
            <span>Later year</span>
          </div>
          {recurringRows.map((row) => (
            <div className="cost-row" key={row.key}>
              <div className="cost-row-copy">
                <strong>{row.label}</strong>
                <span id={`${row.key}-cost-hint`}>{row.hint}</span>
              </div>
              <label>
                <span className="mobile-cost-period" aria-hidden="true">
                  Year 1
                </span>
                <span className="sr-only">{row.label}, year 1</span>
                <input
                  aria-label={`${row.label}, year 1`}
                  aria-describedby={`${row.key}-cost-hint`}
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  type="number"
                  placeholder="0"
                  value={amounts.recurring[row.key].firstYear}
                  onChange={(event) =>
                    updateRecurring(row.key, "firstYear", event.target.value)
                  }
                />
              </label>
              <label>
                <span className="mobile-cost-period" aria-hidden="true">
                  Later year
                </span>
                <span className="sr-only">{row.label}, later year</span>
                <input
                  aria-label={`${row.label}, later year`}
                  aria-describedby={`${row.key}-cost-hint`}
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  type="number"
                  placeholder="0"
                  value={amounts.recurring[row.key].laterYear}
                  onChange={(event) =>
                    updateRecurring(row.key, "laterYear", event.target.value)
                  }
                />
              </label>
            </div>
          ))}
        </div>

        <div className="one-time-costs">
          <h3>One-time costs</h3>
          {oneTimeRows.map((row) => (
            <label className="one-time-row" key={row.key}>
              <span>
                <strong>{row.label}</strong>
                <small id={`${row.key}-cost-hint`}>{row.hint}</small>
              </span>
              <input
                aria-label={row.label}
                aria-describedby={`${row.key}-cost-hint`}
                inputMode="decimal"
                min="0"
                step="0.01"
                type="number"
                placeholder="0"
                value={amounts.oneTime[row.key]}
                onChange={(event) => updateOneTime(row.key, event.target.value)}
              />
            </label>
          ))}
        </div>

        <button
          className="button button-quiet cost-reset"
          type="button"
          onClick={() => setAmounts(createEmptyAmountState())}
        >
          <RotateCcw size={16} aria-hidden="true" />
          Clear all numbers
        </button>
      </div>

      <aside className="cost-result" aria-label="Website cost estimate">
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {firstYearResultLabel} {formatMoney(result.firstYearTotal, currency)}.
          {laterYearResultLabel} {formatMoney(result.laterYearTotal, currency)}.
        </p>
        <p className="eyebrow light-eyebrow">Your estimate</p>
        <p className="cost-result-label">{firstYearResultLabel}</p>
        <p className="cost-result-total" data-testid="first-year-total">
          {formatMoney(result.firstYearTotal, currency)}
        </p>
        <p className="cost-result-explainer">
          This uses only filled boxes. {blankCounts.firstYear === 0
            ? "All first-year boxes are filled."
            : `${blankCounts.firstYear} first-year ${blankCounts.firstYear === 1 ? "box is" : "boxes are"} still blank.`}
          {" "}This is not a price from a hosting company.
        </p>

        <dl className="cost-result-breakdown">
          <div>
            <dt>Year 1 costs entered above</dt>
            <dd>{formatMoney(result.firstYearRecurringTotal, currency)}</dd>
          </div>
          <div>
            <dt>One-time costs</dt>
            <dd>{formatMoney(result.oneTimeTotal, currency)}</dd>
          </div>
          <div className="cost-result-renewal">
            <dt>{laterYearResultLabel}</dt>
            <dd data-testid="later-year-total">
              {formatMoney(result.laterYearTotal, currency)}
            </dd>
          </div>
        </dl>

        <p className="cost-result-explainer">
          {blankCounts.laterYear === 0
            ? "All later-year boxes are filled."
            : `${blankCounts.laterYear} later-year ${blankCounts.laterYear === 1 ? "box is" : "boxes are"} still blank.`}
          {" "}Enter 0 when a cost does not apply. Leave an unknown amount blank.
        </p>

        <div className="cost-change-note">
          <strong>What changes after year 1?</strong>
          {blankCounts.repeating > 0 ? (
            <p>
              Fill every yearly cost box before comparing years. Enter 0 when a
              cost does not apply.
            </p>
          ) : (
            <p>
              Your repeating total changes by{" "}
              <span data-testid="recurring-change">
                {formatMoney(Math.abs(result.recurringChange), currency)}
              </span>{" "}
              {result.recurringChange > 0
                ? "more"
                : result.recurringChange < 0
                  ? "less"
                  : "based on the numbers entered"}
              {result.recurringChange === 0 ? "." : " per year."}
            </p>
          )}
        </div>

        <ul className="cost-result-rules">
          <li>Use the full amount charged for the whole billing period.</li>
          <li>Add sales tax only when it is not already in your number.</li>
          <li>Put fees that change with use in ‘Other yearly costs.’</li>
        </ul>
      </aside>
    </div>
  );
}
