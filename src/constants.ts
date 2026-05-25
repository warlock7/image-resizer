import type { FitMode, OutputFormat, ResizeOptions } from "./types";

export const SUPPORTED_FORMATS = [
  "jpeg",
  "png",
  "webp",
  "avif",
] as const satisfies readonly OutputFormat[];

export const SUPPORTED_FIT_MODES = ["fill", "inside"] as const satisfies readonly FitMode[];

export const DEFAULT_RESIZE_OPTIONS = {
  width: 800,
  fit: "inside",
  format: "jpeg",
  quality: 80,
} as const satisfies Required<Pick<ResizeOptions, "width" | "fit" | "format" | "quality">>;

export const DEFAULT_OUTPUT_DIR = "./output";

export const QUALITY_RANGE = {
  min: 0,
  max: 100,
} as const;
