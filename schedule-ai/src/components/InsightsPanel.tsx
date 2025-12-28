'use client';

import { format } from "date-fns";
import { InsightBundle } from "@/lib/types";

interface InsightsPanelProps {
  insights: InsightBundle;
}

export function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
      <header className="flex flex-col gap-1 pb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Weekly guidance</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">A focused plan to keep your week balanced.</p>
      </header>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Next actions</h3>
          <ul className="space-y-3">
            {insights.nextActions.map((action) => (
              <li
                key={action.id}
                className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/80"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{action.title}</p>
                  <span className="rounded-full bg-slate-900/5 px-3 py-1 text-xs text-slate-500 dark:bg-slate-200/10 dark:text-slate-300">
                    {format(new Date(action.dueDate), "EEE p")}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{action.detail}</p>
              </li>
            ))}
          </ul>
        </div>
        <aside className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Workload forecast</h3>
            <div className="mt-3 space-y-2">
              {Object.entries(insights.weekLoad.breakdown).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-3">
                  <span className="w-16 text-xs font-semibold uppercase text-slate-400">{day}</span>
                  <div className="flex-1 rounded-full bg-slate-200/60 dark:bg-slate-800">
                    <div
                      className="rounded-full bg-brand-500/80 py-1 text-[10px] font-semibold text-white text-center"
                      style={{ width: `${Math.min(100, hours * 20)}%` }}
                    >
                      {hours > 0 ? `${hours.toFixed(1)}h` : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Total workload: {insights.weekLoad.totalHours.toFixed(1)}h
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Pacing tips</h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {insights.pacingTips.map((tip, index) => (
                <li key={index} className="rounded-xl bg-slate-100/70 px-4 py-3 dark:bg-slate-800/80">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          {insights.overdueItems.length > 0 ? (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-rose-400">Catch up now</h3>
              <ul className="mt-2 space-y-2 text-sm text-rose-500 dark:text-rose-300">
                {insights.overdueItems.map((item) => (
                  <li key={item.id} className="rounded-xl border border-rose-200/50 bg-rose-50/60 px-4 py-2 dark:border-rose-500/20 dark:bg-rose-500/10">
                    {item.title} • was due {format(new Date(item.dueDate), "MMM d")}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
