import { isExpired } from "./helpers";
import type { Entry, StringEntry } from "./types";

const store = new Map<string, Entry>();

export function setValue(key: string, value: string, ttlMs?: number) {
  const expiresAt = ttlMs ? Date.now() + ttlMs : undefined;
  const entry: StringEntry = { type: "string", value, expiresAt };
  store.set(key, entry);
}

export function getValue(key: string): string | undefined {
  const entry = getEntry(key);
  if (!entry || entry.type !== "string") return undefined;
  return entry.value;
}

export function getEntry(key: string): Entry | undefined {
  const entry = store.get(key);
  if (!entry) return undefined;

  if (isExpired(entry)) {
    store.delete(key);
    return undefined;
  }

  return entry;
}

export function hasKey(key: string): boolean {
  return !!getEntry(key);
}

export function clearStore() {
  store.clear();
}

export { store };
