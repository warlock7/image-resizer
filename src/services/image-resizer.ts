import type { ResizeImageParams, ResizeImageResult } from "../types";
import { buildOutputPath, ensureDirectory, getFileSize } from "../utils/files";
import { resolveResizeOptions } from "../utils/validation";

export async function resizeImage({
  inputPath,
  outputDir,
  options,
}: ResizeImageParams): Promise<ResizeImageResult> {
  const resolvedOptions = resolveResizeOptions(options);
  const outputPath = buildOutputPath(inputPath, outputDir, resolvedOptions);

  await ensureDirectory(outputDir);

  const image = Bun.file(inputPath).image().resize(resolvedOptions.width, resolvedOptions.height, {
    fit: resolvedOptions.fit,
  });

  switch (resolvedOptions.format) {
    case "jpeg":
      await image.jpeg({ quality: resolvedOptions.quality }).write(outputPath);
      break;
    case "png":
      await image
        .png({
          compressionLevel: Math.round(((100 - resolvedOptions.quality) / 100) * 9),
        })
        .write(outputPath);
      break;
    case "webp":
      await image.webp({ quality: resolvedOptions.quality }).write(outputPath);
      break;
    case "avif":
      await image.avif({ quality: resolvedOptions.quality }).write(outputPath);
      break;
  }

  const inputSizeBytes = getFileSize(inputPath);
  const outputSizeBytes = getFileSize(outputPath);

  return {
    outputPath,
    inputSizeBytes,
    outputSizeBytes,
    savingsPercent: (1 - outputSizeBytes / inputSizeBytes) * 100,
  };
}
