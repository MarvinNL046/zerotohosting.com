import { CheckCircle2, XCircle } from "lucide-react";

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export default function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Pros */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
        <h3 className="font-bold text-emerald-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
          <CheckCircle2 size={16} className="text-emerald-600" />
          What We Like
        </h3>
        <ul className="space-y-2">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-emerald-900">
              <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 shrink-0" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="bg-rose-50 border border-rose-100 rounded-xl p-5">
        <h3 className="font-bold text-rose-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
          <XCircle size={16} className="text-rose-600" />
          What Could Be Better
        </h3>
        <ul className="space-y-2">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-rose-900">
              <XCircle size={15} className="text-rose-400 mt-0.5 shrink-0" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
