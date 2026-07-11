"use client";

import { CircleCheck, Lightbulb, OctagonAlert, TriangleAlert } from "lucide-react";
import type { LintIssue } from "@/lib/guide-lint";

const SEVERITY_UI = {
  error: { icon: OctagonAlert, className: "text-red-11" },
  warning: { icon: TriangleAlert, className: "text-amber-11" },
  suggestion: { icon: Lightbulb, className: "text-slate-11" },
} as const;

/** The research-linter panel, shared by the guide and questionnaire editors. */
export function LintPanel({ issues }: { issues: LintIssue[] }) {
  return (
    <section className="mt-4 rounded-xl border border-border bg-card p-4">
      <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-10">
        Verificări
        {issues.length > 0 && (
          <span className="rounded-full bg-slate-3 px-2 py-0.5 text-xs font-medium normal-case tracking-normal text-slate-11">
            {issues.length}
          </span>
        )}
      </h2>
      {issues.length === 0 ? (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <CircleCheck aria-hidden className="h-4 w-4 text-slate-9" />
          Nicio problemă metodologică detectată.
        </p>
      ) : (
        <ul className="mt-2 flex flex-col gap-2">
          {issues.map((issue) => {
            const ui = SEVERITY_UI[issue.severity];
            return (
              <li
                key={issue.rule}
                className="flex items-start gap-2 text-sm leading-relaxed"
              >
                <ui.icon
                  aria-hidden
                  className={`mt-0.5 h-4 w-4 shrink-0 ${ui.className}`}
                />
                <span className="sr-only">{issue.severity}: </span>
                <span className="text-slate-11">{issue.message}</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
