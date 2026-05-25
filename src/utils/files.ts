import { mkdir } from "node:fs/promises";
import { join, parse } from "node:path";

import type { ResolvedResizeOptions } from "../types";

export async function ensureDirectory(path: string): Promise<void> {
  await mkdir(path, { recursive: true });
}

export async function assertFileExists(path: string): Promise<void> {
  if (!(await Bun.file(path).exists())) {
    throw new Error(`File not found: ${path}`);
  }
}

export function buildOutputPath(
  inputPath: string,
  outputDir: string,
  options: Pick<ResolvedResizeOptions, "width" | "height" | "format">,
): string {
  const { name } = parse(inputPath);
  const heightLabel = options.height ?? "auto";
  const fileName = `${name}_${options.width}x${heightLabel}.${options.format}`;

  return join(outputDir, fileName);
}

export function getFileSize(path: string): number {
  return Bun.file(path).size;
}
