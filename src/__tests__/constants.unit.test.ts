import { describe, expect, test } from "bun:test";

import {
  DEFAULT_RESIZE_OPTIONS,
  FIT_MODE,
  IMAGE_FORMAT,
  SUPPORTED_FIT_MODES,
  SUPPORTED_FORMATS,
} from "../constants";

describe("image format constants", () => {
  test("defines supported output formats", () => {
    expect(SUPPORTED_FORMATS).toEqual([
      IMAGE_FORMAT.jpeg,
      IMAGE_FORMAT.png,
      IMAGE_FORMAT.webp,
      IMAGE_FORMAT.avif,
    ]);
  });

  test("keeps the default format inside the supported formats list", () => {
    expect(SUPPORTED_FORMATS).toContain(DEFAULT_RESIZE_OPTIONS.format);
  });

  test("defines supported fit modes", () => {
    expect(SUPPORTED_FIT_MODES).toEqual([FIT_MODE.fill, FIT_MODE.inside]);
  });

  test("keeps the default fit inside the supported fit modes list", () => {
    expect(SUPPORTED_FIT_MODES).toContain(DEFAULT_RESIZE_OPTIONS.fit);
  });
});
