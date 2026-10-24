export interface Habit {
  id: string;
  name: string;
  /** Days the habit was completed, as YYYY-MM-DD strings. */
  completed: string[];
}

/** Format a date as YYYY-MM-DD in local time. */
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function shiftDay(key: string, days: number): string {
  const [y, m, d] = key.split("-").map(Number);
  return toDateKey(new Date(y, m - 1, d + days));
}

export function addHabit(habits: Habit[], name: string, id: string): Habit[] {
  const trimmed = name.trim();
  if (!trimmed) return habits;
  return [...habits, { id, name: trimmed, completed: [] }];
}

export function removeHabit(habits: Habit[], id: string): Habit[] {
  return habits.filter((h) => h.id !== id);
}

export function toggleDay(habits: Habit[], id: string, day: string): Habit[] {
  return habits.map((h) => {
    if (h.id !== id) return h;
    const done = h.completed.includes(day);
    return { ...h, completed: done ? h.completed.filter((d) => d !== day) : [...h.completed, day] };
  });
}

/**
 * Current streak: consecutive completed days ending today.
 * If today is not done yet, the streak counts back from yesterday, so it
 * is not lost until a whole day has been missed.
 */
export function currentStreak(completed: string[], today: string): number {
  const days = new Set(completed);
  let cursor = days.has(today) ? today : shiftDay(today, -1);
  let streak = 0;
  while (days.has(cursor)) {
    streak += 1;
    cursor = shiftDay(cursor, -1);
  }
  return streak;
}

/** The last `count` days ending today, oldest first. */
export function lastDays(today: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => shiftDay(today, i - (count - 1)));
}
