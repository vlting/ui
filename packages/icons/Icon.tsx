import { lazy, memo, Suspense, type LazyExoticComponent, type ComponentType } from 'react'
import type { IconFC } from './createIcon'

export type { IconFC } from './createIcon'

export interface DynamicIconProps {
  name: string
  variant?: 'line' | 'fill'
  size?: number | string
  color?: string
}

/** Convert name + variant to PascalCase component name with Ri prefix */
function toComponentName(name: string, variant: string = 'line'): string {
  const base = name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
  const variantSuffix = variant === 'fill' ? 'Fill' : variant === 'line' ? 'Line' : ''
  return `Ri${base}${variantSuffix}`
}

/** Module-level cache for lazy icon components */
const cache = new Map<string, LazyExoticComponent<ComponentType<{ size?: number | string; color?: string }>>>()

function getLazyIcon(componentName: string) {
  const cached = cache.get(componentName)
  if (cached) return cached

  const LazyIcon = lazy(() =>
    import(`./generated/${componentName}`).then(
      m => ({ default: (m[componentName] || Object.values(m)[0]) as IconFC }),
      () => ({ default: (() => null) as unknown as IconFC })
    )
  )

  cache.set(componentName, LazyIcon)
  return LazyIcon
}

export const DynamicIcon = memo(function DynamicIcon({
  name,
  variant = 'line',
  size = 24,
  color = 'currentColor',
}: DynamicIconProps) {
  const componentName = toComponentName(name, variant)
  const LazyIcon = getLazyIcon(componentName)

  return (
    <Suspense fallback={null}>
      <LazyIcon size={size} color={color} />
    </Suspense>
  )
})

export default DynamicIcon
