import { encodeSimpleString, encodeError } from "../../utils/resp";
import { setValue } from "../store";

export function set(args: string[]): string {
  if (args.length < 2) {
    return encodeError("ERR wrong number of arguments for 'SET'");
  }

  const [key, value, ...options] = args;
  const ttlMs = parseTtlOptions(options);

  if (ttlMs instanceof Error) {
    return encodeError(ttlMs.message);
  }

  setValue(key, value, ttlMs);
  return encodeSimpleString("OK");
}

function parseTtlOptions(options: string[]): number | undefined | Error {
  if (options.length === 0) return undefined;

  let ttlMs: number | undefined;

  for (let i = 0; i < options.length; i += 2) {
    const option = options[i]?.toUpperCase();
    const val = options[i + 1];
    if (!option || !val) return new Error("ERR syntax error");

    const parsed = parseInt(val, 10);
    if (isNaN(parsed)) {
      return new Error("ERR value is not an integer or out of range");
    }

    if (option === "EX") {
      ttlMs = parsed * 1000;
    } else if (option === "PX") {
      ttlMs = parsed;
    } else {
      return new Error("ERR syntax error");
    }
  }

  return ttlMs;
}
