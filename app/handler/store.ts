type Entry = {
  value: string;
  expiresAt?: number; // in ms
};

const store = new Map<string, Entry>();

export function setValue(key: string, value: string, ttlMs?: number) {
  const expiresAt = ttlMs ? Date.now() + ttlMs : undefined;
  store.set(key, { value, expiresAt });
}

export function getValue(key: string): string | undefined {
  const entry = store.get(key);

  if (!entry) return undefined;

  if (entry.expiresAt && entry.expiresAt < Date.now()) {
    store.delete(key);
    return undefined;
  }

  return entry.value;
}

export function hasKey(key: string): boolean {
  const val = getValue(key);
  return val !== undefined;
}

export function clearStore() {
  store.clear();
}
