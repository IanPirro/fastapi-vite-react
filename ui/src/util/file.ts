// From bytes to megabytes formtted to 2 decimals
export const fromBytesToMegaBytes = (bytes: number) => {
  return (bytes / 1024 / 1024).toFixed(2)
}
