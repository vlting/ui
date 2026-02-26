import type { ComponentType } from 'react'

/** Normalized icon type compatible with @tamagui/lucide-icons */
export type IconFC = ComponentType<{ size?: number | string; color?: string }>

export interface IconProps {
  icon: IconFC
  size?: number | string
  color?: string
}

/**
 * Generic icon wrapper. Accepts any component that takes size + color props.
 * Use with @tamagui/lucide-icons or any compatible icon set.
 */
export function Icon({ icon: IconComponent, size = '$1', color }: IconProps) {
  return <IconComponent size={size} color={color} />
}
