const store = new Map<string, string>();

export function setValue(key: string, value: string) {
  store.set(key, value);
}

export function getValue(key: string): string | undefined {
  return store.get(key);
}

export function hasKey(key: string): boolean {
  return store.has(key);
}

export function clearStore() {
  store.clear();
}
