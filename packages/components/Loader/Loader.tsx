import { forwardRef } from 'react'
import { Spinner, type SpinnerProps } from '../../stl-react/src/primitives/Spinner/Spinner'

const VARIANT_TO_THEME = { primary: 'primary', min: 'min', max: 'max' } as const

type LoaderVariant = keyof typeof VARIANT_TO_THEME
type LoaderSize = 'sm' | 'md' | 'lg'

export interface LoaderProps extends Omit<SpinnerProps, 'theme'> {
  /** @deprecated Use Spinner `theme` prop instead */
  variant?: LoaderVariant
  size?: LoaderSize
}

/**
 * @deprecated Use `Spinner` directly. Loader will be removed in a future major version.
 *
 * Migration: `<Loader variant="min" />` → `<Spinner theme="min" />`
 */
export const Loader = forwardRef<HTMLSpanElement, LoaderProps>(
  ({ variant = 'primary', ...rest }, ref) => (
    <Spinner ref={ref} theme={VARIANT_TO_THEME[variant]} {...rest} />
  ),
)
Loader.displayName = 'Loader'

export type { LoaderVariant, LoaderSize }
