'use client';

import { MetricsSnapshot } from "@/lib/types";

interface MetricsOverviewProps {
  metrics: MetricsSnapshot;
}

const METRIC_CARDS: Array<{
  key: keyof MetricsSnapshot;
  label: string;
  accent: string;
  description: string;
}> = [
  { key: "pending", label: "Queued", accent: "bg-brand-500/10 text-brand-700 dark:text-brand-300", description: "Not started yet" },
  { key: "inProgress", label: "In motion", accent: "bg-sky-500/10 text-sky-700 dark:text-sky-300", description: "Currently active" },
  { key: "dueToday", label: "Due today", accent: "bg-amber-500/10 text-amber-700 dark:text-amber-300", description: "Needs attention" },
  { key: "overdue", label: "Overdue", accent: "bg-rose-500/10 text-rose-700 dark:text-rose-300", description: "Catch up ASAP" },
  { key: "dueTomorrow", label: "Due tomorrow", accent: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300", description: "Prepare ahead" },
  { key: "done", label: "Wrapped", accent: "bg-slate-500/10 text-slate-700 dark:text-slate-300", description: "Completed work" },
];

export function MetricsOverview({ metrics }: MetricsOverviewProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
      <header className="flex flex-wrap items-end justify-between gap-3 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Workflow pulse</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A quick read on where your assignments stand right now.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          Total: {metrics.total}
        </span>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {METRIC_CARDS.map((card) => (
          <div
            key={card.key}
            className="rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${card.accent}`}>{card.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
              {metrics[card.key] ?? 0}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
