import { memo, type ComponentType } from 'react'
import Svg, { Path } from 'react-native-svg'

/** Icon component type — compatible with @tamagui/lucide-icons and the Icon primitive */
export type IconFC = ComponentType<{ size?: number | string; color?: string }>

/**
 * Factory that produces an IconFC-compatible component from SVG path data.
 * Used by the code generator to create individual icon components.
 */
export function createIcon(pathData: string, displayName: string): IconFC {
  const Icon = memo(({ size = 24, color = 'currentColor' }: { size?: number | string; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d={pathData} />
    </Svg>
  ))
  Icon.displayName = displayName
  return Icon as IconFC
}
