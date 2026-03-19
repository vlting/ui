import {
  Children,
  type ComponentPropsWithRef,
  type ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
} from 'react'
import { styled } from '../../stl-react/src/config'
import { useToggleGroup } from '../../headless/src'
import { mergeRefs } from '../../utils/mergeRefs'

// ─── Styled root ────────────────────────────────────────────────────────────

const ButtonGroupRoot = styled('div', {
  display: 'inline-flex',
  gap: '$8',
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
    ({ attached, children, orientation = 'horizontal', mode = 'stateless', value, defaultValue, onValueChange, onKeyDown: consumerOnKeyDown, ...rest }, ref) => {
      const groupDirection: GroupDirection = orientation
      const isToggleMode = mode === 'toggle' || mode === 'exclusive'

      // Pre-compute disabled indices from children before calling hooks
      const validChildren = (attached || isToggleMode)
        ? Children.toArray(children).filter(isValidElement)
        : []

      // Extract item values and disabled indices from children before calling hooks
      const { childValues, disabledIndices } = useMemo(() => {
        if (!isToggleMode) return { childValues: [] as string[], disabledIndices: undefined }
        const values: string[] = []
        const disabled = new Set<number>()
        validChildren.forEach((child, index) => {
          const v = (child as ReactElement<any>).props?.value
          if (v) values.push(v)
          if ((child as ReactElement<any>).props?.disabled) {
            disabled.add(index)
          }
        })
        return { childValues: values, disabledIndices: disabled.size > 0 ? disabled : undefined }
      }, [isToggleMode, validChildren])

      const toggleGroup = isToggleMode
        ? useToggleGroup({ type: mode as 'toggle' | 'exclusive', value, defaultValue, onValueChange, orientation, disabledIndices, itemValues: childValues })
        : null

      let processedChildren = children
      if (attached || isToggleMode) {
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

      // Get group props (now includes ref + onKeyDown for exclusive mode)
      const groupProps = toggleGroup ? toggleGroup.getGroupProps() : { role: 'group' as const }
      const { ref: groupRef, onKeyDown: groupOnKeyDown, ...groupRest } = groupProps as any

      // Compose onKeyDown handlers
      let composedOnKeyDown = groupOnKeyDown
      if (groupOnKeyDown && consumerOnKeyDown) {
        composedOnKeyDown = (e: React.KeyboardEvent) => {
          groupOnKeyDown(e)
          consumerOnKeyDown(e)
        }
      } else if (consumerOnKeyDown) {
        composedOnKeyDown = consumerOnKeyDown
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
          ref={groupRef ? mergeRefs(ref, groupRef) : ref}
          orientation={orientation}
          attached={attached}
          onKeyDown={composedOnKeyDown}
          {...groupRest}
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
