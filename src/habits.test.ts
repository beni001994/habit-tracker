import { describe, expect, it } from "vitest";
import { addHabit, currentStreak, lastDays, removeHabit, toDateKey, toggleDay } from "./habits";

describe("habit helpers", () => {
  it("formats date keys in local time", () => {
    expect(toDateKey(new Date(2026, 0, 5))).toBe("2026-01-05");
  });

  it("adds a trimmed habit and ignores blank names", () => {
    const habits = addHabit([], "  Read  ", "a");
    expect(habits).toEqual([{ id: "a", name: "Read", completed: [] }]);
    expect(addHabit(habits, "   ", "b")).toBe(habits);
  });

  it("removes a habit", () => {
    const habits = addHabit(addHabit([], "A", "a"), "B", "b");
    expect(removeHabit(habits, "a").map((h) => h.id)).toEqual(["b"]);
  });

  it("toggles a day on and off", () => {
    const base = addHabit([], "A", "a");
    const on = toggleDay(base, "a", "2026-03-01");
    expect(on[0].completed).toEqual(["2026-03-01"]);
    expect(toggleDay(on, "a", "2026-03-01")[0].completed).toEqual([]);
  });

  it("counts a streak ending today", () => {
    expect(currentStreak(["2026-03-01", "2026-03-02", "2026-03-03"], "2026-03-03")).toBe(3);
  });

  it("keeps the streak alive when today is not done yet", () => {
    expect(currentStreak(["2026-03-01", "2026-03-02"], "2026-03-03")).toBe(2);
  });

  it("resets the streak after a missed day", () => {
    expect(currentStreak(["2026-03-01"], "2026-03-03")).toBe(0);
  });

  it("counts a streak across a month boundary", () => {
    expect(currentStreak(["2026-02-28", "2026-03-01"], "2026-03-01")).toBe(2);
  });

  it("lists the last days oldest first", () => {
    expect(lastDays("2026-03-02", 3)).toEqual(["2026-02-28", "2026-03-01", "2026-03-02"]);
  });
});
