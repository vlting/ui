import React from 'react'
import type { GetProps } from 'tamagui'
import { XStack, YStack, styled } from 'tamagui'

// ---------------------------------------------------------------------------
// Stack primitive — single-axis layout container
//
// Spec: Stack.spec.md
// Provides vertical (default) and horizontal layout primitives with
// token-based gap, alignment, and justification.
// ---------------------------------------------------------------------------

export const VStackFrame = styled(YStack, {})

export const HStackFrame = styled(XStack, {})

export type VStackProps = GetProps<typeof VStackFrame>
export type HStackProps = GetProps<typeof HStackFrame>

// Convenience alias for explicit vertical stacking
export const VStack = VStackFrame

// Convenience alias for explicit horizontal stacking
export const HStack = HStackFrame

// ---------------------------------------------------------------------------
// Stack — direction-aware layout primitive
// Accepts `direction` prop to switch between vertical and horizontal layout.
// All other props are forwarded to the underlying Tamagui stack frame.
// ---------------------------------------------------------------------------

export type StackProps = VStackProps & {
  /**
   * Controls the flex direction of the container.
   * @default 'vertical'
   */
  direction?: 'horizontal' | 'vertical'
}

export const Stack = React.forwardRef<React.ElementRef<typeof VStackFrame>, StackProps>(
  function Stack({ direction = 'vertical', ...props }, ref) {
    if (direction === 'horizontal') {
      return <HStackFrame ref={ref as React.Ref<React.ElementRef<typeof HStackFrame>>} {...(props as HStackProps)} />
    }
    return <VStackFrame ref={ref} {...props} />
  }
)
