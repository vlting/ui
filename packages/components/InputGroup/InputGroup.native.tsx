import {
  type ReactNode,
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
} from 'react'
import { Text as RNText, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'

// ─── Types ──────────────────────────────────────────────────────────────────

type GroupPosition = 'first' | 'middle' | 'last' | 'only'

interface InputGroupContextValue {
  size: 'sm' | 'md' | 'lg'
  orientation: 'horizontal' | 'vertical'
}

// ─── Context ────────────────────────────────────────────────────────────────

const InputGroupContext = createContext<InputGroupContextValue | null>(null)

function useInputGroupContext() {
  const ctx = useContext(InputGroupContext)
  if (!ctx) throw new Error('InputGroup sub-components must be used within InputGroup')
  return ctx
}

// ─── Radius helper ──────────────────────────────────────────────────────────

function getGroupRadii(position: GroupPosition, orientation: string): ViewStyle {
  if (position === 'only') return {}
  if (orientation === 'horizontal') {
    if (position === 'first') return { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
    if (position === 'middle') return { borderRadius: 0 }
    return { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
  }
  if (position === 'first') return { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
  if (position === 'middle') return { borderRadius: 0 }
  return { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
}

// ─── Styled ─────────────────────────────────────────────────────────────────

const RootBase = styled(View, {
  alignItems: 'stretch',
}, {
  orientation: {
    horizontal: { flexDirection: 'row' },
    vertical: { flexDirection: 'column' },
  },
}, 'InputGroup')

const AddonBase = styled(View, {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$neutral3',
  borderWidth: 1,
  borderColor: '$neutral6',
  borderRadius: 6,
}, {
  size: {
    sm: { paddingHorizontal: 8 },
    md: { paddingHorizontal: 12 },
    lg: { paddingHorizontal: 16 },
  },
}, 'InputGroupAddon')

const AddonText = styled(RNText, {
  color: '$defaultBody',
}, {
  size: {
    sm: { fontSize: 13 },
    md: { fontSize: 14 },
    lg: { fontSize: 15 },
  },
}, 'InputGroupAddonText')

// ─── Root ───────────────────────────────────────────────────────────────────

export interface InputGroupProps {
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  children?: ReactNode
  style?: ViewStyle
}

const Root = forwardRef<View, InputGroupProps>(
  ({ orientation = 'horizontal', size = 'md', children, ...rest }, ref) => {
    const validChildren = Children.toArray(children).filter(isValidElement)
    const count = validChildren.length

    const processed = validChildren.map((child, index) => {
      const position: GroupPosition =
        count === 1 ? 'only'
          : index === 0 ? 'first'
            : index === count - 1 ? 'last'
              : 'middle'
      return cloneElement(child as React.ReactElement<any>, {
        _groupPosition: position,
        _groupOrientation: orientation,
      })
    })

    return (
      <InputGroupContext.Provider value={{ size, orientation }}>
        <RootBase
          ref={ref}
          orientation={orientation}
          accessibilityRole={'group' as any}
          {...rest}
        >
          {processed}
        </RootBase>
      </InputGroupContext.Provider>
    )
  },
)
Root.displayName = 'InputGroup'

// ─── Addon ──────────────────────────────────────────────────────────────────

export interface InputGroupAddonProps {
  children?: ReactNode
  _groupPosition?: GroupPosition
  _groupOrientation?: string
  style?: ViewStyle
}

const Addon = forwardRef<View, InputGroupAddonProps>(
  ({ _groupPosition = 'only', _groupOrientation = 'horizontal', children, ...rest }, ref) => {
    const ctx = useInputGroupContext()
    const radiusStyle = getGroupRadii(_groupPosition, _groupOrientation)
    return (
      <AddonBase ref={ref} size={ctx.size} style={radiusStyle} {...rest}>
        {typeof children === 'string' ? (
          <AddonText size={ctx.size}>{children}</AddonText>
        ) : (
          children
        )}
      </AddonBase>
    )
  },
)
Addon.displayName = 'InputGroup.Addon'

// ─── ButtonAddon ────────────────────────────────────────────────────────────

export interface InputGroupButtonAddonProps {
  children?: ReactNode
  _groupPosition?: GroupPosition
  _groupOrientation?: string
  style?: ViewStyle
}

const ButtonAddon = forwardRef<View, InputGroupButtonAddonProps>(
  ({ _groupPosition = 'only', _groupOrientation = 'horizontal', children, ...rest }, ref) => {
    const ctx = useInputGroupContext()

    const processed = Children.map(children, (child) => {
      if (isValidElement(child)) {
        return cloneElement(child as React.ReactElement<any>, {
          groupPosition: _groupPosition,
          groupDirection: _groupOrientation,
          size: (child.props as any).size ?? ctx.size,
        })
      }
      return child
    })

    return (
      <View ref={ref} {...rest}>
        {processed}
      </View>
    )
  },
)
ButtonAddon.displayName = 'InputGroup.ButtonAddon'

// ─── Input ──────────────────────────────────────────────────────────────────

export interface InputGroupInputProps {
  children?: ReactNode
  _groupPosition?: GroupPosition
  _groupOrientation?: string
}

const InputSlot = forwardRef<View, InputGroupInputProps>(
  ({ children, _groupPosition = 'only', _groupOrientation = 'horizontal' }, ref) => {
    const ctx = useInputGroupContext()
    const radiusStyle = getGroupRadii(_groupPosition, _groupOrientation)

    return (
      <View ref={ref} style={{ flex: 1 }}>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child as React.ReactElement<any>, {
              size: ctx.size,
              style: { ...radiusStyle, ...(child.props as any).style },
            })
          }
          return child
        })}
      </View>
    )
  },
)
InputSlot.displayName = 'InputGroup.Input'

// ─── Export ─────────────────────────────────────────────────────────────────

export const InputGroup = Object.assign(Root, {
  Root,
  Addon,
  ButtonAddon,
  Input: InputSlot,
})
