# Habit Tracker

A small habit tracker built with React and TypeScript. Add habits, tick off each of the last seven days, and watch your streak grow.

**Live demo:** https://beni001994.github.io/habit-tracker/

## Features

- Add and remove habits
- One-tap check-ins for the last 7 days
- Current streak per habit (a streak survives until a full day is missed)
- Data saved in the browser with `localStorage`, with no account or backend
- Light and dark theme from the system setting

## Getting started

```bash
npm install
npm run dev
npm test
npm run build
```

## How it works

The streak and date logic lives in `src/habits.ts` as pure functions, covered by unit tests in `src/habits.test.ts`, including month boundaries. `src/App.tsx` is the UI, and `src/useStoredState.ts` is a small hook that persists state to `localStorage`.

Tests and the production build run in GitHub Actions on every push, and `main` deploys to GitHub Pages.

## Tech

React 18, TypeScript, Vite, Vitest

## License

MIT
