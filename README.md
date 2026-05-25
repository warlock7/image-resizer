# image-resizer

An image resizer CLI built with [Bun](https://bun.sh) and the native `Bun.Image` API.

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
