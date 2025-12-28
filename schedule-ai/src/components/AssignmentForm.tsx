'use client';

import { useId, useState } from "react";
import { AssignmentInput } from "@/lib/types";
import { formatISO, setHours, setMinutes } from "date-fns";

interface AssignmentFormProps {
  onSubmit: (assignment: AssignmentInput) => void;
}

const defaultDueDate = () => {
  const now = new Date();
  const evening = setMinutes(setHours(now, 21), 0);
  if (evening < now) {
    evening.setDate(evening.getDate() + 1);
  }
  const isoString = formatISO(evening, { representation: "complete" });
  return isoString.slice(0, 16);
};

export function AssignmentForm({ onSubmit }: AssignmentFormProps) {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState(defaultDueDate());
  const [estimatedHours, setEstimatedHours] = useState<number | undefined>(undefined);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const titleId = useId();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) {
      setError("Add a clear assignment title so I can remind you at the right moment.");
      return;
    }
    if (!dueDate) {
      setError("Pick a due date so I can plan reminders appropriately.");
      return;
    }
    setError(null);
    onSubmit({
      title: title.trim(),
      course: course.trim() || undefined,
      dueDate: new Date(dueDate).toISOString(),
      estimatedHours,
      notes: notes.trim() || undefined,
    });
    setTitle("");
    setCourse("");
    setDueDate(defaultDueDate());
    setEstimatedHours(undefined);
    setNotes("");
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-100">
      <header className="flex flex-col gap-1 pb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Quick Add</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Drop in new assignments and I&apos;ll fold them into your schedule instantly.
        </p>
      </header>
      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <div className="md:col-span-2">
          <label htmlFor={titleId} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Assignment title
          </label>
          <input
            id={titleId}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? `${titleId}-error` : undefined}
            placeholder="Research outline, math problem set, lab report…"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-900"
          />
          {error ? (
            <p id={`${titleId}-error`} className="mt-2 text-sm text-red-500">
              {error}
            </p>
          ) : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Course / context</label>
          <input
            value={course}
            onChange={(event) => setCourse(event.target.value)}
            placeholder="Psych 201, Writing Lab…"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Due date & time</label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Estimated effort (hours)</label>
          <input
            type="number"
            min="0.5"
            step="0.5"
            value={estimatedHours ?? ""}
            onChange={(event) => {
              const value = event.target.value;
              setEstimatedHours(value ? Number(value) : undefined);
            }}
            placeholder="1.5"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-900"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Notes / deliverables
          </label>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Key references, rubric reminders, materials to gather…"
            rows={3}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-900"
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            I keep everything private on this device and sync it with your reminders automatically.
          </p>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2 text-sm font-semibold text-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-400"
          >
            Save assignment
          </button>
        </div>
      </form>
    </section>
  );
}
