import { inspect } from "node:util";

type OutputPayload = Record<string, unknown>;

export function writeInfo(message: string, payload?: OutputPayload): void {
  writeLine(process.stdout, formatMessage(message, payload));
}

export function writeError(message: string, payload?: OutputPayload): void {
  writeLine(process.stderr, formatMessage(message, payload));
}

function writeLine(stream: NodeJS.WriteStream, message: string): void {
  stream.write(`${message}\n`);
}

function formatMessage(message: string, payload?: OutputPayload): string {
  if (payload === undefined) {
    return message;
  }

  return `${message} ${inspect(payload, { colors: true, depth: null })}`;
}
