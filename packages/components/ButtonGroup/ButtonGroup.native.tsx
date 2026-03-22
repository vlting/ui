import {
  Children,
  type ReactElement,
  type ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from 'react'
import { View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'

// ─── Styled root ────────────────────────────────────────────────────────────

const ButtonGroupRoot = styled(View, {
  flexDirection: 'row',
  gap: 8,
}, {
  orientation: {
    horizontal: { flexDirection: 'row' },
    vertical: { flexDirection: 'column' },
  },
  attached: {
    true: { gap: 0 },
  },
}, 'ButtonGroup')

// ─── ButtonGroup ────────────────────────────────────────────────────────────

type GroupPosition = 'first' | 'middle' | 'last' | 'only'

export interface ButtonGroupProps {
  children?: ReactNode
  attached?: boolean
  orientation?: 'horizontal' | 'vertical'
  style?: ViewStyle
}

export const ButtonGroup = Object.assign(
  forwardRef<View, ButtonGroupProps>(
    ({ attached, children, orientation = 'horizontal', ...rest }, ref) => {
      let processedChildren = children

      if (attached) {
        const validChildren = Children.toArray(children).filter(isValidElement)
        const count = validChildren.length

        processedChildren = validChildren.map((child, index) => {
          const groupPosition: GroupPosition =
            count === 1 ? 'only'
              : index === 0 ? 'first'
                : index === count - 1 ? 'last'
                  : 'middle'

          return cloneElement(child as ReactElement<any>, {
            groupPosition,
            groupDirection: orientation,
          })
        })
      }

      return (
        <ButtonGroupRoot
          ref={ref}
          orientation={orientation}
          attached={attached}
          accessibilityRole={'group' as any}
          {...rest}
        >
          {processedChildren}
        </ButtonGroupRoot>
      )
    },
  ),
  { displayName: 'ButtonGroup', Root: undefined as any },
)

ButtonGroup.Root = ButtonGroupRoot
