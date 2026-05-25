import { afterEach, describe, expect, test } from "bun:test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { resizeImage } from "../image-resizer";

const ONE_BY_ONE_PNG = Uint8Array.fromBase64(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=",
);

const tempPaths: string[] = [];

afterEach(async () => {
  await Promise.all(tempPaths.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

async function createTempDir(): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), "image-resizer-service-test-"));
  tempPaths.push(dir);
  return dir;
}

describe("resizeImage", () => {
  test("resizes an image and returns output metadata", async () => {
    const dir = await createTempDir();
    const inputPath = join(dir, "sample.png");
    const outputDir = join(dir, "output");
    await writeFile(inputPath, ONE_BY_ONE_PNG);

    const result = await resizeImage({
      inputPath,
      outputDir,
      options: {
        width: 1,
        format: "png",
      },
    });

    expect(result.outputPath).toBe(join(outputDir, "sample_1xauto.png"));
    expect(await Bun.file(result.outputPath).exists()).toBe(true);
    expect(result.inputSizeBytes).toBeGreaterThan(0);
    expect(result.outputSizeBytes).toBeGreaterThan(0);
    expect(Number.isFinite(result.savingsPercent)).toBe(true);
  });
});
