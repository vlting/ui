import type { ComponentPropsWithRef } from 'react'
import { Spinner } from '../../stl-react/src/primitives/Spinner/Spinner'
import { styled, templateProps } from '../../stl-react/src/config'

const VARIANT_MAP = { primary: 'primary', min: 'neutralMin', max: 'neutralMax' } as const

// ─── Loader ─────────────────────────────────────────────────────────────────

export const Loader = styled('div', {
  stl: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    variant: { primary: {}, min: {}, max: {} },
    size: { sm: {}, md: {}, lg: {} },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
  mapProps: (props) => ({
    ...props,
    role: 'status',
    'aria-label': props['aria-label'] ?? 'Loading',
  }),
  ...templateProps<{ variant?: keyof typeof VARIANT_MAP; size?: 'sm' | 'md' | 'lg' }>('variant', 'size'),
  template: ({ variant = 'primary', size = 'md' }) => (
    <Spinner theme={VARIANT_MAP[variant]} size={size} aria-hidden="true" />
  ),
  styleName: 'Loader',
})

export type LoaderProps = ComponentPropsWithRef<typeof Loader>
export type LoaderVariant = NonNullable<LoaderProps['variant']>
export type LoaderSize = NonNullable<LoaderProps['size']>
