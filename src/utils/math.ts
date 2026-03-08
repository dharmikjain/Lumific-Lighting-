/**
 * Utility functions for 3D animations and effects
 */

export const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 + (t - 1) * (2 * (t - 2)) * (2 * (t - 2))
}

export const lerp = (a: number, b: number, t: number): number => {
  return a + (b - a) * t
}

export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value))
}

export const smoothstep = (
  edge0: number,
  edge1: number,
  x: number
): number => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

export const random = (min: number = 0, max: number = 1): number => {
  return Math.random() * (max - min) + min
}

export const randomVector3 = (
  scale: number = 1
): [number, number, number] => {
  return [
    random(-scale, scale),
    random(-scale, scale),
    random(-scale, scale),
  ]
}

export const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180
}

export const radiansToDegrees = (radians: number): number => {
  return (radians * 180) / Math.PI
}

export const createNoise = (
  scale: number = 1,
  time: number = 0
): number => {
  // Simple Perlin-like noise using sine waves
  return (
    (Math.sin(time * 0.5) * 0.5 +
    Math.sin(time * 0.3) * 0.3 +
    Math.sin(time * 0.7) * 0.2) * scale
  )
}
