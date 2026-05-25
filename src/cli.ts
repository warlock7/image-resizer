import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import {
  DEFAULT_OUTPUT_DIR,
  DEFAULT_RESIZE_OPTIONS,
  SUPPORTED_FIT_MODES,
  SUPPORTED_FORMATS,
} from "./constants";
import { resizeImage } from "./services/image-resizer";
import type { CliArguments, FitMode, OutputFormat } from "./types";
import { assertFileExists } from "./utils/files";
import { formatBytes, formatOptionalPercent } from "./utils/format";
import { writeInfo } from "./utils/output";

export async function runCli(argv = Bun.argv): Promise<void> {
  const args = await parseArguments(argv);

  await assertFileExists(args.input);

  writeInfo("Resizing:", {
    input: args.input,
    width: args.width,
    height: args.height ?? "auto",
    fit: args.fit,
    format: args.format,
    quality: args.quality,
    out: args.out,
  });

  const result = await resizeImage({
    inputPath: args.input,
    outputDir: args.out,
    options: args,
  });

  const saved = formatOptionalPercent(result.savingsPercent);

  writeInfo("Done!", {
    savedTo: result.outputPath,
    inputSize: formatBytes(result.inputSizeBytes),
    outputSize: formatBytes(result.outputSizeBytes),
    ...(saved && { saved }),
  });
}

async function parseArguments(argv: string[]): Promise<CliArguments> {
  const parsed = await yargs(hideBin(argv))
    .scriptName("image-resizer")
    .usage("$0 <input> [options]")
    .command("$0 <input>", "Resize and convert an image", (builder) =>
      builder.positional("input", {
        describe: "Path to the source image",
        type: "string",
        demandOption: true,
      }),
    )
    .option("width", {
      describe: "Output width in pixels",
      type: "number",
      default: DEFAULT_RESIZE_OPTIONS.width,
    })
    .option("height", {
      describe: "Output height in pixels",
      type: "number",
    })
    .option("fit", {
      describe: "Resize fit mode",
      type: "string",
      default: DEFAULT_RESIZE_OPTIONS.fit,
      choices: SUPPORTED_FIT_MODES,
    })
    .option("format", {
      describe: "Output image format",
      type: "string",
      default: DEFAULT_RESIZE_OPTIONS.format,
      choices: SUPPORTED_FORMATS,
    })
    .option("quality", {
      describe: "Output quality from 0 to 100",
      type: "number",
      default: DEFAULT_RESIZE_OPTIONS.quality,
    })
    .option("out", {
      describe: "Output directory",
      type: "string",
      default: DEFAULT_OUTPUT_DIR,
    })
    .strict()
    .help()
    .parseAsync();

  return parsed as typeof parsed & {
    input: string;
    out: string;
    fit: FitMode;
    format: OutputFormat;
  };
}
