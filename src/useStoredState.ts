import { useEffect, useState } from "react";

/** useState that persists its value as JSON in localStorage. */
export function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be unavailable (private mode, quota); the app still works without it.
    }
  }, [key, value]);

  return [value, setValue] as const;
}
