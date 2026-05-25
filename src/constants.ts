export const IMAGE_FORMAT = {
  jpeg: "jpeg",
  png: "png",
  webp: "webp",
  avif: "avif",
} as const;

export const SUPPORTED_FORMATS = Object.values(IMAGE_FORMAT);

export const FIT_MODE = {
  fill: "fill",
  inside: "inside",
} as const;

export const SUPPORTED_FIT_MODES = Object.values(FIT_MODE);

export const DEFAULT_RESIZE_OPTIONS = {
  width: 800,
  fit: FIT_MODE.inside,
  format: IMAGE_FORMAT.jpeg,
  quality: 80,
} as const;

export const DEFAULT_OUTPUT_DIR = "./output";

export const QUALITY_RANGE = {
  min: 0,
  max: 100,
} as const;
