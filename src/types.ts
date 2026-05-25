import type { FIT_MODE, IMAGE_FORMAT } from "./constants";

export type FitMode = (typeof FIT_MODE)[keyof typeof FIT_MODE];

export type OutputFormat = (typeof IMAGE_FORMAT)[keyof typeof IMAGE_FORMAT];

export interface ResizeOptions {
  width?: number;
  height?: number;
  fit?: FitMode;
  format?: OutputFormat;
  quality?: number;
}

export interface ResolvedResizeOptions {
  width: number;
  height?: number;
  fit: FitMode;
  format: OutputFormat;
  quality: number;
}

export interface ResizeImageParams {
  inputPath: string;
  outputDir: string;
  options?: ResizeOptions;
}

export interface ResizeImageResult {
  outputPath: string;
  inputSizeBytes: number;
  outputSizeBytes: number;
  savingsPercent: number;
}

export interface CliArguments extends ResizeOptions {
  input: string;
  out: string;
}
