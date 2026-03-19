import {
  Children,
  type ComponentPropsWithRef,
  type ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
} from 'react'
import { styled } from '../../stl-react/src/config'
import { useToggleGroup } from '../../headless/src'

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
  mode?: 'stateless' | 'toggle' | 'exclusive'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

export const ButtonGroup = Object.assign(
  forwardRef<HTMLDivElement, ButtonGroupProps>(
    ({ attached, children, orientation = 'horizontal', mode = 'stateless', value, defaultValue, onValueChange, ...rest }, ref) => {
      const groupDirection: GroupDirection = orientation
      const isToggleMode = mode === 'toggle' || mode === 'exclusive'

      const toggleGroup = isToggleMode
        ? useToggleGroup({ type: mode as 'toggle' | 'exclusive', value, defaultValue, onValueChange, orientation })
        : null

      let processedChildren = children
      if (attached || isToggleMode) {
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

          const injectedProps: Record<string, any> = {}

          if (attached) {
            injectedProps.groupPosition = groupPosition
            injectedProps.groupDirection = groupDirection
          }

          if (toggleGroup) {
            const childValue = (child as ReactElement<any>).props?.value
            if (childValue) {
              const itemProps = toggleGroup.getItemProps(childValue)
              Object.assign(injectedProps, itemProps)
              // Map aria-pressed to the pressed variant
              if (itemProps['aria-pressed']) {
                injectedProps.pressed = true
              }
              if (itemProps['aria-checked']) {
                injectedProps.pressed = true
              }
            }
          }

          return cloneElement(child as ReactElement<any>, injectedProps)
        })
      }

      const containerProps: Record<string, any> = {
        role: 'group',
      }

      if (toggleGroup) {
        Object.assign(containerProps, toggleGroup.getGroupProps())
      }

      if (process.env.NODE_ENV !== 'production' && isToggleMode) {
        if (!rest['aria-label'] && !rest['aria-labelledby']) {
          console.warn(
            'ButtonGroup: toggle/exclusive mode requires aria-label or aria-labelledby for accessibility.'
          )
        }
      }

      return (
        <ButtonGroupRoot
          ref={ref}
          orientation={orientation}
          attached={attached}
          {...containerProps}
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
