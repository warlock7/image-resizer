import { describe, expect, test } from "bun:test";

import { formatBytes, formatOptionalPercent } from "../format";

describe("formatBytes", () => {
  test("formats bytes as kilobytes with one decimal place", () => {
    expect(formatBytes(1536)).toBe("1.5 KB");
  });

  test("keeps small byte counts in kilobytes", () => {
    expect(formatBytes(70)).toBe("0.1 KB");
  });
});

describe("formatOptionalPercent", () => {
  test("formats positive percentages with one decimal place", () => {
    expect(formatOptionalPercent(12.345)).toBe("12.3%");
  });

  test("returns undefined for zero and negative percentages", () => {
    expect(formatOptionalPercent(0)).toBeUndefined();
    expect(formatOptionalPercent(-5)).toBeUndefined();
  });
});
