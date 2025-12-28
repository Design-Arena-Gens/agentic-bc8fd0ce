'use client';

import { AssignmentStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: AssignmentStatus;
}

const STATUS_STYLE: Record<AssignmentStatus, string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  "in-progress": "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
  done: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
};

const LABELS: Record<AssignmentStatus, string> = {
  pending: "Not started",
  "in-progress": "In progress",
  done: "Completed",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLE[status]}`}>
      {LABELS[status]}
    </span>
  );
}
