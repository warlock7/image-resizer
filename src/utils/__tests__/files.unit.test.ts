import { afterEach, describe, expect, test } from "bun:test";
import { mkdtemp, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { assertFileExists, buildOutputPath, ensureDirectory, getFileSize } from "../files";

const tempPaths: string[] = [];

afterEach(async () => {
  await Promise.all(tempPaths.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

async function createTempDir(): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), "image-resizer-files-test-"));
  tempPaths.push(dir);
  return dir;
}

describe("buildOutputPath", () => {
  test("builds an output path with width and auto height", () => {
    expect(
      buildOutputPath("/images/photo.original.png", "output", {
        width: 800,
        format: "jpeg",
      }),
    ).toBe(join("output", "photo.original_800xauto.jpeg"));
  });

  test("builds an output path with explicit height", () => {
    expect(
      buildOutputPath("photo.png", "output", {
        width: 400,
        height: 300,
        format: "webp",
      }),
    ).toBe(join("output", "photo_400x300.webp"));
  });
});

describe("file helpers", () => {
  test("creates directories recursively", async () => {
    const dir = await createTempDir();
    const nestedDir = join(dir, "a", "b");

    await ensureDirectory(nestedDir);

    expect((await stat(nestedDir)).isDirectory()).toBe(true);
  });

  test("assertFileExists resolves for existing files and rejects for missing files", async () => {
    const dir = await createTempDir();
    const filePath = join(dir, "sample.txt");
    await writeFile(filePath, "hello");

    await expect(assertFileExists(filePath)).resolves.toBeUndefined();
    await expect(assertFileExists(join(dir, "missing.txt"))).rejects.toThrow("File not found");
  });

  test("returns file size in bytes", async () => {
    const dir = await createTempDir();
    const filePath = join(dir, "sample.txt");
    await writeFile(filePath, "hello");

    expect(getFileSize(filePath)).toBe(5);
  });
});
