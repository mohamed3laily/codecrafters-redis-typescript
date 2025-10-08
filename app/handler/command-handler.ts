import { encodeError } from "../utils/resp";
import { ping } from "./commands/ping";
import { echo } from "./commands/echo";
import { set } from "./commands/set";
import { get } from "./commands/get";

const commandHandlers: Record<string, (args: string[]) => string> = {
  PING: () => ping(),
  ECHO: echo,
  SET: set,
  GET: get,
};

export function handleCommand(parts: string[]): string {
  if (parts.length === 0) {
    return encodeError("ERR empty command");
  }

  const [command, ...args] = parts;
  const handler = commandHandlers[command.toUpperCase()];

  if (!handler) {
    return encodeError(`ERR unknown command '${command}'`);
  }

  return handler(args);
}
