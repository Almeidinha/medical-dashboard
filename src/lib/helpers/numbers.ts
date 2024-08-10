export type Hex = `#${string}`

export function clamp(a: number, b: number, c: number) {
  return Math.max(a, Math.min(b, c))
}

export function toHex(n: number, length: number): Hex {
  return `#${n.toString(16).padStart(length, '0').toUpperCase()}`
}

export function concatHex(a: Hex, b: Hex): Hex {
  return `#${a.slice(1) + b.slice(1)}`
}

export function bitwiseOr(flags: unknown[]): number {
  return flags.reduce((mask: number, flag, i) => mask | (Number(flag) << i), 0)
}

export function getRightmostSetBitNumber(n: number) {
  return n & -n
}

export function getNumberBetweenMinMax(input: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, input))
}
