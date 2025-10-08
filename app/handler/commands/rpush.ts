import { pushToList } from "../../store";
import { encodeError, encodeInteger } from "../../utils/resp";

export function rpush(args: string[]): string {
  if (args.length < 2) {
    return encodeError("ERR wrong number of arguments for 'RPUSH'");
  }

  const [key, ...values] = args;

  try {
    const newLength = pushToList(key, values);
    return encodeInteger(newLength);
  } catch (err: any) {
    return encodeError(err.message);
  }
}
