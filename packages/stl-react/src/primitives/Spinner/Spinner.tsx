import { type ComponentPropsWithRef, forwardRef } from 'react'
import { styled } from '../../config'

const SpinnerBase = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: '$spin',
  lowMotion: {
    animation: 'none',
  },
}, {
  name: 'Spinner',
  variants: {
    theme: {
      primary: { color: '$primary9' },
      secondary: { color: '$secondary9' },
      neutralMin: { color: '$min' },
      neutralMax: { color: '$color12' },
      min: { color: '$min' },
      max: { color: '$color12' },
    },
    size: {
      sm: { width: '$16', height: '$16' },
      md: { width: '$20', height: '$20' },
      lg: { width: '$28', height: '$28' },
      xl: { width: '$40', height: '$40' },
    },
  },
  defaultVariants: {
    theme: 'neutralMax',
    size: 'md',
  },
})

export type SpinnerProps = ComponentPropsWithRef<typeof SpinnerBase>

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  (props, ref) => (
    <SpinnerBase
      ref={ref}
      role="status"
      aria-label={props['aria-label'] ?? 'Loading'}
      {...props}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.25" />
        <path
          d="M14 8a6 6 0 0 0-6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </SpinnerBase>
  ),
)
Spinner.displayName = 'Spinner'
