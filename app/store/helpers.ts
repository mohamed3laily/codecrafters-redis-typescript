import type { Entry } from "./types";

export function isExpired(entry: Entry): boolean {
  return !!entry.expiresAt && entry.expiresAt < Date.now();
}
