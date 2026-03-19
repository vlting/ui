import {
  Children,
  type ComponentPropsWithRef,
  type ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
} from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Styled root ────────────────────────────────────────────────────────────

const ButtonGroupRoot = styled('div', {
  display: 'inline-flex',
  gap: '$4',
  overflow: 'visible',
}, {
  name: 'ButtonGroup',
  variants: {
    orientation: {
      horizontal: { flexDirection: 'row' },
      vertical: { flexDirection: 'column' },
    },
    attached: {
      true: { gap: '$0' },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

// ─── ButtonGroup ────────────────────────────────────────────────────────────

type GroupPosition = 'first' | 'middle' | 'last' | 'only'
type GroupDirection = 'horizontal' | 'vertical'

export type ButtonGroupProps = ComponentPropsWithRef<typeof ButtonGroupRoot> & {
  attached?: boolean
  orientation?: 'horizontal' | 'vertical'
}

export const ButtonGroup = Object.assign(
  forwardRef<HTMLDivElement, ButtonGroupProps>(
    ({ attached, children, orientation = 'horizontal', ...rest }, ref) => {
      const groupDirection: GroupDirection = orientation

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

          if (process.env.NODE_ENV !== 'production') {
            const displayName = (child as any).type?.displayName
            if (displayName && displayName !== 'Button' && displayName !== 'Toggle') {
              console.warn(
                `ButtonGroup: attached mode expects Button children, got "${displayName}".`
              )
            }
          }

          return cloneElement(child as ReactElement<any>, {
            groupPosition,
            groupDirection,
          })
        })
      }

      return (
        <ButtonGroupRoot
          ref={ref}
          orientation={orientation}
          attached={attached}
          role="group"
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
