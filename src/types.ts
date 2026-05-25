export type FitMode = "fill" | "inside";

export type OutputFormat = "jpeg" | "png" | "webp" | "avif";

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
