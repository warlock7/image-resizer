import { describe, expect, test } from "bun:test";

import { DEFAULT_RESIZE_OPTIONS } from "../../constants";
import { resolveResizeOptions } from "../validation";

describe("resolveResizeOptions", () => {
  test("returns defaults when no options are provided", () => {
    expect(resolveResizeOptions()).toEqual(DEFAULT_RESIZE_OPTIONS);
  });

  test("merges custom options with defaults", () => {
    expect(
      resolveResizeOptions({
        width: 320,
        height: 240,
        fit: "fill",
        format: "webp",
        quality: 90,
      }),
    ).toEqual({
      width: 320,
      height: 240,
      fit: "fill",
      format: "webp",
      quality: 90,
    });
  });

  test("rejects invalid dimensions", () => {
    expect(() => resolveResizeOptions({ width: 0 })).toThrow("width must be a positive integer");
    expect(() => resolveResizeOptions({ height: -1 })).toThrow("height must be a positive integer");
  });

  test("rejects invalid quality values", () => {
    expect(() => resolveResizeOptions({ quality: -1 })).toThrow(
      "quality must be an integer between 0 and 100",
    );
    expect(() => resolveResizeOptions({ quality: 101 })).toThrow(
      "quality must be an integer between 0 and 100",
    );
  });

  test("rejects unsupported fit modes and formats", () => {
    expect(() => resolveResizeOptions({ fit: "cover" as never })).toThrow(
      "fit must be one of: fill, inside",
    );
    expect(() => resolveResizeOptions({ format: "gif" as never })).toThrow(
      "format must be one of: jpeg, png, webp, avif",
    );
  });
});
