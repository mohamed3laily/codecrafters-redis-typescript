import { encodeBulkString } from "../../utils/resp";

export function echo(args: string[]): string {
  const message = args[0] ?? "";
  return encodeBulkString(message);
}
