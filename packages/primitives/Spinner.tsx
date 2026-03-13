import { styled } from '../stl-react/src/config'

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  theme?: 'primary' | 'secondary' | 'neutralMin' | 'neutralMax'
}

const SpinnerFrame = styled('span', {
  stl: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    lowMotion: {
      animation: 'none',
    },
  },
  variants: {
    theme: {
      primary: { color: '$primary9' },
      secondary: { color: '$secondary9' },
      neutralMin: { color: '$color8' },
      neutralMax: { color: '$color12' },
    },
    size: {
      sm: { width: '$16', height: '$16' },
      md: { width: '$20', height: '$20' },
      lg: { width: '$28', height: '$28' },
    },
  },
  defaultVariants: {
    theme: 'neutralMax',
    size: 'md',
  },
  styleName: 'Spinner',
})

export function Spinner({ size = 'md', theme = 'neutralMax' }: SpinnerProps) {
  return (
    <SpinnerFrame
      role="status"
      aria-label="Loading"
      theme={theme}
      size={size}
      style={{
        animation: 'vlting-spinner 1.25s linear infinite',
      }}
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
      <style
        dangerouslySetInnerHTML={{
          __html:
            '@keyframes vlting-spinner { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @media (prefers-reduced-motion: reduce) { .Spinner { animation: none !important; } }',
        }}
      />
    </SpinnerFrame>
  )
}
