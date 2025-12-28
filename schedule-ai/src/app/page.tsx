'use client';

import { AssignmentForm } from "@/components/AssignmentForm";
import { AssignmentList } from "@/components/AssignmentList";
import { InsightsPanel } from "@/components/InsightsPanel";
import { MetricsOverview } from "@/components/MetricsOverview";
import { ReminderPanel } from "@/components/ReminderPanel";
import { SortMode, useAssignments } from "@/hooks/useAssignments";

export default function Home() {
  const {
    assignments,
    saveAssignment,
    updateStatus,
    removeAssignment,
    snoozeAssignment,
    updateReminderLead,
    metrics,
    insights,
    reminders,
    sortMode,
    setSortMode,
  } = useAssignments();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-16 text-slate-100">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-10 shadow-soft backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Schedule AI</p>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                Your assignment co-pilot for painless planning.
              </h1>
              <p className="max-w-2xl text-sm text-slate-300">
                Capture every homework, auto-prioritize the urgent ones, and get focused reminders right when you need
                them. I keep your week balanced and your deadlines on track.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-sm text-slate-300">
              <p className="text-xs font-semibold uppercase text-slate-500">Sort assignments</p>
              <select
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value as SortMode)}
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-900"
              >
                <option value="dueDate">By due date</option>
                <option value="status">By status</option>
                <option value="course">By course</option>
              </select>
              <span className="text-xs text-slate-500">
                I will still surface the most urgent tasks and reminders automatically.
              </span>
            </div>
          </div>
        </header>

        <AssignmentForm onSubmit={saveAssignment} />

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <MetricsOverview metrics={metrics} />
          <ReminderPanel reminders={reminders} />
        </section>

        <InsightsPanel insights={insights} />
        <AssignmentList
          assignments={assignments}
          onStatusChange={updateStatus}
          onRemove={removeAssignment}
          onSnooze={snoozeAssignment}
          onReminderLeadChange={updateReminderLead}
        />
      </main>
    </div>
  );
}
