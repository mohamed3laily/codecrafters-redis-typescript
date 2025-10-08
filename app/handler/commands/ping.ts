import { encodeSimpleString } from "../../utils/resp";

export function ping(): string {
  return encodeSimpleString("PONG");
}
