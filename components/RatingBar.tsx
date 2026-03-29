"use client";

import { useEffect, useRef, useState } from "react";

interface RatingBarProps {
  label: string;
  score: number; // 0-10
  color?: "blue" | "green" | "auto";
}

function getBarColor(score: number, override?: string) {
  if (override === "green") return "bg-[#10B981]";
  if (override === "blue") return "bg-[#2563EB]";
  if (score >= 9) return "bg-[#10B981]";
  if (score >= 7.5) return "bg-[#2563EB]";
  if (score >= 6) return "bg-amber-500";
  return "bg-rose-500";
}

function getScoreLabel(score: number) {
  if (score >= 9.5) return "Exceptional";
  if (score >= 9) return "Excellent";
  if (score >= 8) return "Very Good";
  if (score >= 7) return "Good";
  if (score >= 6) return "Average";
  return "Below Average";
}

export default function RatingBar({ label, score, color = "auto" }: RatingBarProps) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(score * 10), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [score]);

  const barColor = getBarColor(score, color === "auto" ? undefined : color);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 hidden sm:block">{getScoreLabel(score)}</span>
          <span className="font-bold text-slate-800 tabular-nums w-7 text-right">{score.toFixed(1)}</span>
        </div>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
          style={{ width: `${width}%` }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={10}
        />
      </div>
    </div>
  );
}
