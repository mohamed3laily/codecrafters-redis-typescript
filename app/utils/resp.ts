export function parseRESP(data: string): string[] {
  const lines = data.split("\r\n").filter(Boolean);
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("$")) {
      const value = lines[i + 1];
      result.push(value);
      i++;
    } else if (line.startsWith("*")) {
      continue;
    } else {
      result.push(line);
    }
  }

  return result;
}

export function encodeSimpleString(value: string): string {
  return `+${value}\r\n`;
}

export function encodeInteger(value: number): string {
  return `:${value}\r\n`;
}

export function encodeBulkString(value: string): string {
  return `$${value.length}\r\n${value}\r\n`;
}

export function encodeNullBulkString(): string {
  return `$-1\r\n`;
}

export function encodeError(message: string): string {
  return `-ERR ${message}\r\n`;
}
