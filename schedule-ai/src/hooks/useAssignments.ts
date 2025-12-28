'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Assignment,
  AssignmentInput,
  AssignmentStatus,
  InsightBundle,
  MetricsSnapshot,
  ReminderCandidate,
} from "@/lib/types";
import {
  buildAssignment,
  buildInsights,
  buildReminderCandidates,
  computeMetrics,
  serializeAssignments,
  updateAssignment,
  loadAssignments,
} from "@/lib/assignment-utils";

export type SortMode = "dueDate" | "status" | "course";

export interface UseAssignments {
  assignments: Assignment[];
  saveAssignment: (input: AssignmentInput) => void;
  updateStatus: (id: string, status: AssignmentStatus) => void;
  removeAssignment: (id: string) => void;
  snoozeAssignment: (id: string, pushedHours: number) => void;
  updateReminderLead: (id: string, leadHours: number) => void;
  metrics: MetricsSnapshot;
  insights: InsightBundle;
  reminders: ReminderCandidate[];
  setSortMode: (mode: SortMode) => void;
  sortMode: SortMode;
}

export function useAssignments(): UseAssignments {
  const [assignments, setAssignments] = useState<Assignment[]>(() => loadAssignments());
  const [sortMode, setSortMode] = useState<SortMode>("dueDate");
  const hasHydrated = useRef(false);

  useEffect(() => {
    hasHydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hasHydrated.current) return;
    serializeAssignments(assignments);
  }, [assignments]);

  const sortedAssignments = useMemo(() => {
    const copy = [...assignments];
    switch (sortMode) {
      case "status":
        return copy.sort((a, b) => a.status.localeCompare(b.status));
      case "course":
        return copy.sort((a, b) => (a.course ?? "").localeCompare(b.course ?? ""));
      case "dueDate":
      default:
        return copy.sort(
          (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
        );
    }
  }, [assignments, sortMode]);

  const metrics = useMemo(() => computeMetrics(sortedAssignments), [sortedAssignments]);
  const insights = useMemo(() => buildInsights(sortedAssignments), [sortedAssignments]);
  const reminders = useMemo(() => buildReminderCandidates(sortedAssignments), [sortedAssignments]);

  const saveAssignment = (input: AssignmentInput) => {
    setAssignments((prev) => [buildAssignment(input), ...prev]);
  };

  const updateStatus = (id: string, status: AssignmentStatus) => {
    setAssignments((prev) =>
      prev.map((assignment) => (assignment.id === id ? updateAssignment(assignment, { status }) : assignment)),
    );
  };

  const removeAssignment = (id: string) => {
    setAssignments((prev) => prev.filter((assignment) => assignment.id !== id));
  };

  const snoozeAssignment = (id: string, pushedHours: number) => {
    setAssignments((prev) =>
      prev.map((assignment) => {
        if (assignment.id !== id) return assignment;
        const newDate = new Date(assignment.dueDate);
        newDate.setHours(newDate.getHours() + pushedHours);
        return updateAssignment(assignment, { dueDate: newDate.toISOString() });
      }),
    );
  };

  const updateReminderLead = (id: string, leadHours: number) => {
    setAssignments((prev) =>
      prev.map((assignment) => (assignment.id === id ? updateAssignment(assignment, { reminderLeadHours: leadHours }) : assignment)),
    );
  };

  return {
    assignments: sortedAssignments,
    saveAssignment,
    updateStatus,
    removeAssignment,
    snoozeAssignment,
    updateReminderLead,
    metrics,
    insights,
    reminders,
    setSortMode,
    sortMode,
  };
}
