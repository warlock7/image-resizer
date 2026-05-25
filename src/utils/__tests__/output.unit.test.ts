import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";

import { writeError, writeInfo } from "../output";

describe("writeInfo", () => {
  afterEach(() => {
    mock.restore();
  });

  test("writes an info message to stdout with a newline", () => {
    const stdoutWrite = spyOn(process.stdout, "write").mockImplementation(() => true);

    writeInfo("Resize complete");

    expect(stdoutWrite).toHaveBeenCalledWith("Resize complete\n");
  });

  test("writes an info message with an inspected payload", () => {
    const stdoutWrite = spyOn(process.stdout, "write").mockImplementation(() => true);

    writeInfo("Resize complete", { outputPath: "output/image.png" });

    const output = stdoutWrite.mock.calls[0]?.[0];

    expect(output).toContain("Resize complete");
    expect(output).toContain("outputPath");
    expect(output).toContain("output/image.png");
    expect(output).toEndWith("\n");
  });
});

describe("writeError", () => {
  afterEach(() => {
    mock.restore();
  });

  test("writes an error message to stderr with a newline", () => {
    const stderrWrite = spyOn(process.stderr, "write").mockImplementation(() => true);

    writeError("Resize failed");

    expect(stderrWrite).toHaveBeenCalledWith("Resize failed\n");
  });

  test("writes an error message with an inspected payload", () => {
    const stderrWrite = spyOn(process.stderr, "write").mockImplementation(() => true);

    writeError("Resize failed", { cause: "missing input" });

    const output = stderrWrite.mock.calls[0]?.[0];

    expect(output).toContain("Resize failed");
    expect(output).toContain("cause");
    expect(output).toContain("missing input");
    expect(output).toEndWith("\n");
  });
});
