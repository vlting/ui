import { View, styled } from 'tamagui'
import type { GetProps } from 'tamagui'

// Standard sr-only technique
// @ts-expect-error Tamagui v2 RC
export const VisuallyHidden = styled(View, {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  // clip and clipPath applied as style since Tamagui may not support them directly
  borderWidth: 0,
})

export type VisuallyHiddenProps = GetProps<typeof VisuallyHidden>
