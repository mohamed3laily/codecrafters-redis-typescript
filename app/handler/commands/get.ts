import { getValue } from "../../store";
import {
  encodeBulkString,
  encodeNullBulkString,
  encodeError,
} from "../../utils/resp";

export function get(args: string[]): string {
  if (args.length < 1) {
    return encodeError("ERR wrong number of arguments for 'GET'");
  }
  const value = getValue(args[0]);
  return value !== undefined ? encodeBulkString(value) : encodeNullBulkString();
}
