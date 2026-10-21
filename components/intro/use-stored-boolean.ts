"use client";

import { useCallback, useSyncExternalStore } from "react";

const EVENT = "an-stored-boolean";
// Used when localStorage is blocked (some private modes), so toggles still work for the visit.
const memory = new Map<string, boolean>();

function read(key: string) {
  try {
    const stored = window.localStorage.getItem(key);
    if (stored !== null) return stored === "1";
  } catch {
    /* ignore */
  }
  return memory.get(key) ?? false;
}

/** A boolean persisted in localStorage, safe for SSR and private browsing. */
export function useStoredBoolean(key: string) {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("storage", onChange);
    window.addEventListener(EVENT, onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener(EVENT, onChange);
    };
  }, []);

  const value = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => false,
  );

  const setValue = useCallback(
    (next: boolean) => {
      memory.set(key, next);
      try {
        window.localStorage.setItem(key, next ? "1" : "0");
      } catch {
        /* storage unavailable: fall through to the event so the UI still updates this session */
      }
      window.dispatchEvent(new Event(EVENT));
    },
    [key],
  );

  return [value, setValue] as const;
}
