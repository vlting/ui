import type { ComponentType } from 'react'

/** Normalized icon type compatible with @tamagui/lucide-icons */
export type IconFC = ComponentType<{ size?: number | string; color?: string }>

export interface IconProps {
  icon: IconFC
  size?: number | string
  color?: string
  'aria-hidden'?: boolean
  'aria-label'?: string
}

/**
 * Generic icon wrapper. Accepts any component that takes size + color props.
 * Use with @tamagui/lucide-icons or any compatible icon set.
 * Icons are decorative (aria-hidden) by default; pass aria-hidden={false} and aria-label for semantic usage.
 */
export function Icon({
  icon: IconComponent,
  size = '$1',
  color,
  'aria-hidden': ariaHidden = true,
  'aria-label': ariaLabel,
}: IconProps) {
  return (
    <span aria-hidden={ariaHidden} aria-label={ariaLabel}>
      <IconComponent size={size} color={color} />
    </span>
  )
}
