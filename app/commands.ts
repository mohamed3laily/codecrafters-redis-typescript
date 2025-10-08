import {
  encodeSimpleString,
  encodeBulkString,
  encodeError,
} from "./utils/resp";

export function handleCommand(parts: string[]): string {
  if (parts.length === 0) {
    return encodeError("empty command");
  }

  const command = parts[0].toUpperCase();

  switch (command) {
    case "PING": {
      return encodeSimpleString("PONG");
    }

    case "ECHO": {
      const message = parts[1] ?? "";
      return encodeBulkString(message);
    }

    default:
      return encodeError(`unknown command '${command}'`);
  }
}
