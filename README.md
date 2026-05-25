# image-resizer

A production-style image resizer CLI built with [Bun](https://bun.sh) and the native `Bun.Image` API.

The app accepts an input image, resizes it, optionally converts it, and writes the result to an output directory.

## Requirements

- Bun >= 1.3.14

## Setup

```bash
bun install
```

## Usage

```bash
bun run start -- <input-image> [options]
```

You can also run the entry file directly:

```bash
bun run src/index.ts <input-image> [options]
```

## Options

| Flag                | Default    | Description                                     |
| ------------------- | ---------- | ----------------------------------------------- |
| `--width <px>`      | `800`      | Output width in pixels                          |
| `--height <px>`     | auto       | Output height in pixels                         |
| `--fit <mode>`      | `inside`   | Fit mode: `fill` or `inside`                    |
| `--format <fmt>`    | `jpeg`     | Output format: `jpeg`, `png`, `webp`, or `avif` |
| `--quality <0-100>` | `80`       | Output quality                                  |
| `--out <dir>`       | `./output` | Output directory                                |

## Examples

```bash
# Resize to 400x300 JPEG
bun run start -- photo.jpg --width 400 --height 300

# Convert to WebP at 90% quality
bun run start -- photo.png --format webp --quality 90

# Thumbnail, preserving aspect ratio
bun run start -- photo.jpg --width 200 --height 200 --fit inside --format png
```

Output files are saved to `./output/` by default with a `_WxH` suffix, for example:

```text
photo_800xauto.jpeg
```

## Project structure

```text
.
├── src
│   ├── index.ts                  # App entrypoint
│   ├── cli.ts                    # CLI parsing and command orchestration
│   ├── constants.ts              # Defaults and supported values
│   ├── types.ts                  # Shared TypeScript types
│   ├── services
│   │   ├── __tests__             # Service unit tests
│   │   └── image-resizer.ts      # Core resize/convert service
│   ├── tests                     # Integration tests
│   └── utils
│       ├── __tests__             # Utility unit tests
│       ├── files.ts              # File/path helpers
│       ├── format.ts             # Output formatting helpers
│       ├── output.ts             # stdout/stderr writing helpers
│       └── validation.ts         # Option validation and normalization
├── output                         # Generated images
├── biome.json                    # Biome formatter/linter config
├── package.json
├── tsconfig.json
└── bun.lock
```

## Scripts

```bash
bun run start -- <input-image> [options]
bun run dev -- <input-image> [options]
bun run typecheck
bun run lint
bun run format
bun run test
bun run test:unit
bun run test:integration
bun run check
```

- `typecheck` runs TypeScript with `tsc --noEmit`.
- `lint` runs Biome lint rules.
- `format` writes Biome formatting changes.
- `test` runs all Bun tests.
- `test:unit` runs colocated tests under `__tests__` folders.
- `test:integration` runs integration tests under `src/tests`.
- `check` runs TypeScript, tests, then Biome formatting/lint/import checks.

## Code quality

Biome is configured with recommended rules plus stricter project rules:

- unused imports are errors
- unused variables are errors
- explicit `any` is an error
- imports used only as types must use `import type`
- `let` must become `const` when possible
- `console` usage is an error; CLI output goes through `src/utils/output.ts`
