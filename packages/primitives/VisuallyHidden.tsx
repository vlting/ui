import type React from 'react'
import { View, styled } from 'tamagui'
import type { GetProps } from 'tamagui'

// Standard sr-only technique using inline styles for properties Tamagui doesn't support
const srOnlyStyle: React.CSSProperties = {
  clip: 'rect(0, 0, 0, 0)',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
}

// @ts-expect-error Tamagui v2 RC
const VisuallyHiddenFrame = styled(View, {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  borderWidth: 0,
})

export function VisuallyHidden({ children, ...props }: GetProps<typeof VisuallyHiddenFrame> & { children?: React.ReactNode }) {
  return (
    // @ts-expect-error Tamagui v2 RC
    <VisuallyHiddenFrame {...props} style={srOnlyStyle}>
      {children}
    </VisuallyHiddenFrame>
  )
}

export type VisuallyHiddenProps = GetProps<typeof VisuallyHidden>
