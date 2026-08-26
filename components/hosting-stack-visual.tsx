import { Check, Gauge, Layers3, Wrench } from "lucide-react";

const stages = [
  { number: "01", label: "Website setup", value: "What do you run?", icon: Layers3 },
  { number: "02", label: "Server care", value: "Who manages it?", icon: Wrench },
  { number: "03", label: "Needed power", value: "What do tests show?", icon: Gauge },
];

export function HostingStackVisual() {
  return (
    <figure className="hosting-stack" aria-labelledby="hosting-stack-caption">
      <div className="stack-window">
        <div className="window-bar">
          <span />
          <span />
          <span />
          <code>hosting.choice</code>
        </div>
        <div className="stack-body">
          <div className="signal-row">
            <span>YOUR ANSWERS</span>
            <span className="signal-chip">site needs</span>
            <span className="signal-chip">test results</span>
          </div>
          <div className="stack-stages">
            {stages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div className="stack-stage" key={stage.number}>
                  <span className="stage-number">{stage.number}</span>
                  <span className="stage-icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{stage.label}</strong>
                    <small>{stage.value}</small>
                  </span>
                  <Check className="stage-check" size={17} aria-hidden="true" />
                </div>
              );
            })}
          </div>
          <div className="route-output">
            <span>YOUR RESULT</span>
            <strong>One clear place to start</strong>
            <small>with simple checks and next steps</small>
          </div>
        </div>
      </div>
      <figcaption id="hosting-stack-caption">
        Choose hosting in three steps: website setup, who manages the server, and
        how much power you need.
      </figcaption>
    </figure>
  );
}
