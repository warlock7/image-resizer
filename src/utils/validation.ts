import {
  DEFAULT_RESIZE_OPTIONS,
  QUALITY_RANGE,
  SUPPORTED_FIT_MODES,
  SUPPORTED_FORMATS,
} from "../constants";
import type { FitMode, OutputFormat, ResizeOptions, ResolvedResizeOptions } from "../types";

export function resolveResizeOptions(options: ResizeOptions = {}): ResolvedResizeOptions {
  const resolved = {
    ...DEFAULT_RESIZE_OPTIONS,
    ...options,
  };

  validatePositiveInteger("width", resolved.width);

  if (resolved.height !== undefined) {
    validatePositiveInteger("height", resolved.height);
  }

  validateQuality(resolved.quality);
  validateFitMode(resolved.fit);
  validateOutputFormat(resolved.format);

  return resolved;
}

function validatePositiveInteger(name: string, value: number): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }
}

function validateQuality(value: number): void {
  if (!Number.isInteger(value) || value < QUALITY_RANGE.min || value > QUALITY_RANGE.max) {
    throw new Error(
      `quality must be an integer between ${QUALITY_RANGE.min} and ${QUALITY_RANGE.max}`,
    );
  }
}

function validateFitMode(value: string): asserts value is FitMode {
  if (!SUPPORTED_FIT_MODES.includes(value as FitMode)) {
    throw new Error(`fit must be one of: ${SUPPORTED_FIT_MODES.join(", ")}`);
  }
}

function validateOutputFormat(value: string): asserts value is OutputFormat {
  if (!SUPPORTED_FORMATS.includes(value as OutputFormat)) {
    throw new Error(`format must be one of: ${SUPPORTED_FORMATS.join(", ")}`);
  }
}
