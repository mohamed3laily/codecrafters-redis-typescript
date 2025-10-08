import { encodeSimpleString, encodeError } from "../../utils/resp";
import { setValue } from "../store";

export function set(args: string[]): string {
  if (args.length < 2) {
    return encodeError("ERR wrong number of arguments for 'SET'");
  }
  const [key, value] = args;
  setValue(key, value);
  return encodeSimpleString("OK");
}
