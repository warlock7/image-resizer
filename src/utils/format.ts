export function formatBytes(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export function formatOptionalPercent(value: number): string | undefined {
  if (value <= 0) {
    return undefined;
  }

  return `${value.toFixed(1)}%`;
}
