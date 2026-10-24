import { FormEvent, useState } from "react";
import {
  addHabit,
  currentStreak,
  lastDays,
  removeHabit,
  toDateKey,
  toggleDay,
  type Habit,
} from "./habits";
import { useStoredState } from "./useStoredState";

const DAYS_SHOWN = 7;

export default function App() {
  const [habits, setHabits] = useStoredState<Habit[]>("habits", []);
  const [name, setName] = useState("");
  const today = toDateKey(new Date());
  const days = lastDays(today, DAYS_SHOWN);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setHabits((current) => addHabit(current, name, crypto.randomUUID()));
    setName("");
  };

  return (
    <main className="app">
      <h1>Habit Tracker</h1>
      <p className="subtitle">Tick off each day. Your data stays in this browser.</p>

      <form onSubmit={onSubmit} className="add">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New habit, e.g. Read 20 minutes"
          aria-label="Habit name"
        />
        <button type="submit">Add</button>
      </form>

      {habits.length === 0 ? (
        <p className="empty">No habits yet. Add your first one above.</p>
      ) : (
        <ul className="habits">
          {habits.map((habit) => (
            <li key={habit.id}>
              <div className="habit-head">
                <strong>{habit.name}</strong>
                <span className="streak">{currentStreak(habit.completed, today)} day streak</span>
                <button
                  className="remove"
                  onClick={() => setHabits((c) => removeHabit(c, habit.id))}
                  aria-label={`Remove ${habit.name}`}
                >
                  ×
                </button>
              </div>
              <div className="days">
                {days.map((day) => {
                  const done = habit.completed.includes(day);
                  return (
                    <button
                      key={day}
                      className={done ? "day done" : "day"}
                      onClick={() => setHabits((c) => toggleDay(c, habit.id, day))}
                      aria-pressed={done}
                      title={day}
                    >
                      {day.slice(8)}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
