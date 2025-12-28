'use client';

import { format } from "date-fns";
import { ReminderCandidate } from "@/lib/types";

interface ReminderPanelProps {
  reminders: ReminderCandidate[];
}

export function ReminderPanel({ reminders }: ReminderPanelProps) {
  const hasReminders = reminders.length > 0;

  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-500/10 via-white to-white p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:from-brand-500/10 dark:via-slate-900 dark:to-slate-900">
      <header className="flex items-center justify-between gap-4 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Smart reminders</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            I prioritize what needs a gentle nudge so nothing slips.
          </p>
        </div>
        <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-300">
          {reminders.length} active alerts
        </span>
      </header>
      {hasReminders ? (
        <ul className="space-y-3">
          {reminders.map((candidate) => {
            const dueDate = new Date(candidate.assignment.dueDate);
            return (
              <li
                key={candidate.assignment.id}
                className="rounded-2xl border border-brand-100 bg-white/80 p-4 shadow-sm transition hover:border-brand-200 dark:border-brand-900 dark:bg-slate-900/80"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {candidate.assignment.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Due {format(dueDate, "EEE, MMM d • h:mm a")}
                    </p>
                  </div>
                  <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-600 dark:text-brand-300">
                    {candidate.hoursUntilDue <= 0 ? "Past due" : `${Math.max(1, Math.floor(candidate.hoursUntilDue))}h left`}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{candidate.message}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-brand-200 bg-white/60 p-6 text-sm text-slate-500 dark:border-brand-800 dark:bg-slate-900/40 dark:text-slate-400">
          No reminders right now. I&apos;ll tap you as soon as something needs attention.
        </div>
      )}
    </section>
  );
}
