import { afterEach, describe, expect, test } from "bun:test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { IMAGE_FORMAT } from "../constants";

const ONE_BY_ONE_PNG = Uint8Array.fromBase64(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=",
);

const tempPaths: string[] = [];

afterEach(async () => {
  await Promise.all(tempPaths.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

async function createTempDir(): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), "image-resizer-integration-test-"));
  tempPaths.push(dir);
  return dir;
}

describe("image-resizer CLI", () => {
  test("resizes an image through the entrypoint", async () => {
    const dir = await createTempDir();
    const inputPath = join(dir, "fixture.png");
    const outputDir = join(dir, "output");
    await writeFile(inputPath, ONE_BY_ONE_PNG);

    const process = Bun.spawn({
      cmd: [
        "bun",
        "run",
        "src/index.ts",
        inputPath,
        "--width",
        "1",
        "--format",
        IMAGE_FORMAT.png,
        "--out",
        outputDir,
      ],
      stderr: "pipe",
      stdout: "pipe",
    });

    const [stdout, stderr, exitCode] = await Promise.all([
      new Response(process.stdout).text(),
      new Response(process.stderr).text(),
      process.exited,
    ]);

    expect(exitCode).toBe(0);
    expect(stderr).toBe("");
    expect(stdout).toContain("Resizing:");
    expect(stdout).toContain("Done!");
    expect(stdout).toContain("fixture_1xauto.png");
    expect(await Bun.file(join(outputDir, "fixture_1xauto.png")).exists()).toBe(true);
  });

  test("exits with a non-zero status for missing input files", async () => {
    const dir = await createTempDir();
    const outputDir = join(dir, "output");
    const missingInputPath = join(dir, "missing.png");

    const process = Bun.spawn({
      cmd: ["bun", "run", "src/index.ts", missingInputPath, "--out", outputDir],
      stderr: "pipe",
      stdout: "pipe",
    });

    const [stdout, stderr, exitCode] = await Promise.all([
      new Response(process.stdout).text(),
      new Response(process.stderr).text(),
      process.exited,
    ]);

    expect(exitCode).toBe(1);
    expect(stdout).toBe("");
    expect(stderr).toContain("Error:");
    expect(stderr).toContain("File not found");
  });
});
