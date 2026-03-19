import { tokenToVarMap } from '../config/styles.css'

type GradientStop = string

const colorMap = tokenToVarMap.color as Record<string, string>

function resolveStop(stop: string): string {
  if (stop.startsWith('$')) {
    const varName = colorMap[stop]
    return varName ? `var(${varName})` : stop
  }
  return stop
}

export function createGradient(angle: number, ...stops: GradientStop[]): string {
  return `linear-gradient(${angle}deg, ${stops.map(resolveStop).join(', ')})`
}

export function createRadialGradient(shape: string, ...stops: GradientStop[]): string {
  return `radial-gradient(${shape}, ${stops.map(resolveStop).join(', ')})`
}

export function createConicGradient(angle: number, ...stops: GradientStop[]): string {
  return `conic-gradient(from ${angle}deg, ${stops.map(resolveStop).join(', ')})`
}
