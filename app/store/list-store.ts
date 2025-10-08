import { isExpired } from "./helpers";
import { store } from "./string-store";

export function pushToList(key: string, values: string[]): number {
  let entry = store.get(key);

  if (!entry || isExpired(entry)) {
    entry = { type: "list", value: [] };
    store.set(key, entry);
  }

  if (entry.type !== "list") {
    throw new Error(
      "WRONGTYPE Operation against a key holding the wrong kind of value"
    );
  }

  entry.value.push(...values);
  return entry.value.length;
}

export function getList(key: string): string[] | undefined {
  const entry = store.get(key);
  if (!entry || isExpired(entry) || entry.type !== "list") return undefined;
  return entry.value;
}
