'use client';

import { useMemo } from "react";
import { format, formatDistanceToNowStrict, isBefore } from "date-fns";
import { Assignment, AssignmentStatus } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

interface AssignmentListProps {
  assignments: Assignment[];
  onStatusChange: (id: string, status: AssignmentStatus) => void;
  onRemove: (id: string) => void;
  onSnooze: (id: string, hours: number) => void;
  onReminderLeadChange: (id: string, leadHours: number) => void;
}

const REMINDER_OPTIONS = [
  { label: "12h before", value: 12 },
  { label: "24h before", value: 24 },
  { label: "48h before", value: 48 },
  { label: "3 days before", value: 72 },
];

export function AssignmentList({
  assignments,
  onStatusChange,
  onRemove,
  onSnooze,
  onReminderLeadChange,
}: AssignmentListProps) {
  const hasAssignments = assignments.length > 0;

  const groupedByStatus = useMemo(() => {
    const groups: Record<AssignmentStatus, Assignment[]> = {
      pending: [],
      "in-progress": [],
      done: [],
    };
    assignments.forEach((assignment) => {
      groups[assignment.status].push(assignment);
    });
    return groups;
  }, [assignments]);

  if (!hasAssignments) {
    return (
      <section className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white/60 p-12 text-center dark:border-slate-800 dark:bg-slate-900/40">
        <p className="max-w-xl text-base text-slate-500 dark:text-slate-400">
          Add your first assignment to see tailored reminders and a smart weekly rollout. I&apos;ll keep everything
          organized and nudge you when deadlines get close.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white/70 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
      <header className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 px-6 py-4 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Assignment queue</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track progress, adjust reminders, and keep everything flowing smoothly.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
          <span>
            Pending <strong className="text-slate-600 dark:text-slate-300">{groupedByStatus.pending.length}</strong>
          </span>
          <span>
            In progress{" "}
            <strong className="text-slate-600 dark:text-slate-300">{groupedByStatus["in-progress"].length}</strong>
          </span>
          <span>
            Done <strong className="text-slate-600 dark:text-slate-300">{groupedByStatus.done.length}</strong>
          </span>
        </div>
      </header>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {assignments.map((assignment) => {
          const dueDate = new Date(assignment.dueDate);
          const isOverdue = assignment.status !== "done" && isBefore(dueDate, new Date());
          const dueLabel = format(dueDate, "EEE, MMM d • h:mm a");
          const relative = formatDistanceToNowStrict(dueDate, { addSuffix: true });

          return (
            <article key={assignment.id} className="grid gap-4 px-6 py-5 md:grid-cols-[1.5fr_1fr]">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">{assignment.title}</h3>
                  {assignment.course ? (
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {assignment.course}
                    </span>
                  ) : null}
                  <StatusBadge status={assignment.status} />
                  {isOverdue ? (
                    <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                      Overdue
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <p>
                    Due <span className="font-medium text-slate-700 dark:text-slate-300">{dueLabel}</span>{" "}
                    <span className="text-slate-400 dark:text-slate-500">({relative})</span>
                  </p>
                  {assignment.estimatedHours ? (
                    <p>
                      Estimated effort:{" "}
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {assignment.estimatedHours}h
                      </span>
                    </p>
                  ) : null}
                  {assignment.notes ? <p className="leading-relaxed">{assignment.notes}</p> : null}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                  <span>Reminder lead</span>
                  <select
                    value={assignment.reminderLeadHours}
                    onChange={(event) => onReminderLeadChange(assignment.id, Number(event.target.value))}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-600 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-brand-400 dark:focus:ring-brand-900"
                  >
                    {REMINDER_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onStatusChange(assignment.id, "done")}
                    className="rounded-2xl bg-emerald-500/10 px-4 py-2 font-semibold text-emerald-600 transition hover:bg-emerald-500/20 dark:text-emerald-300"
                  >
                    Mark done
                  </button>
                  <button
                    onClick={() =>
                      onStatusChange(assignment.id, assignment.status === "in-progress" ? "pending" : "in-progress")
                    }
                    className="rounded-2xl bg-brand-500/10 px-4 py-2 font-semibold text-brand-600 transition hover:bg-brand-500/20 dark:text-brand-300"
                  >
                    {assignment.status === "in-progress" ? "Set pending" : "Start now"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSnooze(assignment.id, 12)}
                    className="rounded-2xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-500 dark:hover:text-brand-300"
                  >
                    Nudge +12h
                  </button>
                  <button
                    onClick={() => onSnooze(assignment.id, 24)}
                    className="rounded-2xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-500 dark:hover:text-brand-300"
                  >
                    Nudge +24h
                  </button>
                </div>
                <button
                  onClick={() => onRemove(assignment.id)}
                  className="self-start text-xs font-semibold text-rose-500 transition hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300"
                >
                  Remove assignment
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
