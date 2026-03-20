import {
  type ComponentPropsWithRef,
  type ReactNode,
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
} from 'react'
import { styled, type STL } from '../../stl-react/src/config'

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

function getGroupStl(position: GroupPosition, orientation: string): STL {
  if (position === 'only') return {}
  if (orientation === 'horizontal') {
    if (position === 'first') return { borderTopRightRadius: '$0', borderBottomRightRadius: '$0' }
    if (position === 'middle') return { borderRadius: '$0', borderLeftWidth: '$width0' }
    return { borderTopLeftRadius: '$0', borderBottomLeftRadius: '$0', borderLeftWidth: '$width0' }
  }
  if (position === 'first') return { borderBottomLeftRadius: '$0', borderBottomRightRadius: '$0' }
  if (position === 'middle') return { borderRadius: '$0', borderTopWidth: '$width0' }
  return { borderTopLeftRadius: '$0', borderTopRightRadius: '$0', borderTopWidth: '$width0' }
}

// ─── Root ───────────────────────────────────────────────────────────────────

const RootBase = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  width: '100%',
}, {
  name: 'InputGroup',
  variants: {
    orientation: {
      horizontal: { flexDirection: 'row' },
      vertical: { flexDirection: 'column' },
    },
    size: { sm: {}, md: {}, lg: {} },
  },
  defaultVariants: { orientation: 'horizontal', size: 'md' },
})

export type InputGroupProps = ComponentPropsWithRef<typeof RootBase> & {
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
}

const Root = forwardRef<HTMLDivElement, InputGroupProps>(
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
        <RootBase ref={ref} role="group" orientation={orientation} size={size} {...rest}>
          {processed}
        </RootBase>
      </InputGroupContext.Provider>
    )
  },
)
Root.displayName = 'InputGroup'

// ─── Addon ──────────────────────────────────────────────────────────────────

const AddonBase = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  bg: '$surface2',
  border: '$neutralMin',
  color: '$neutralText2',
  flexShrink: '0',
  whiteSpace: 'nowrap',
  fontFamily: '$body',
}, {
  name: 'InputGroupAddon',
  variants: {
    size: {
      sm: { px: '$8', fontSize: '$buttonSmall', borderRadius: '$2' },
      md: { px: '$12', fontSize: '$button', borderRadius: '$3' },
      lg: { px: '$16', fontSize: '$button', borderRadius: '$4' },
    },
  },
  defaultVariants: { size: 'md' },
})

export type InputGroupAddonProps = ComponentPropsWithRef<typeof AddonBase> & {
  _groupPosition?: GroupPosition
  _groupOrientation?: string
}

const Addon = forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ _groupPosition = 'only', _groupOrientation = 'horizontal', ...props }, ref) => {
    const ctx = useInputGroupContext()
    const radiusStl = getGroupStl(_groupPosition, _groupOrientation)
    return <AddonBase ref={ref} aria-hidden="true" size={ctx.size} stl={radiusStl} {...props} />
  },
)
Addon.displayName = 'InputGroup.Addon'

// ─── ButtonAddon ────────────────────────────────────────────────────────────

const ButtonAddonBase = styled('div', {
  display: 'inline-flex',
  alignItems: 'stretch',
  flexShrink: '0',
}, { name: 'InputGroupButtonAddon' })

export type InputGroupButtonAddonProps = ComponentPropsWithRef<typeof ButtonAddonBase> & {
  _groupPosition?: GroupPosition
  _groupOrientation?: string
}

const ButtonAddon = forwardRef<HTMLDivElement, InputGroupButtonAddonProps>(
  ({ _groupPosition = 'only', _groupOrientation = 'horizontal', children, ...props }, ref) => {
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
      <ButtonAddonBase ref={ref} {...props}>
        {processed}
      </ButtonAddonBase>
    )
  },
)
ButtonAddon.displayName = 'InputGroup.ButtonAddon'

// ─── Element ────────────────────────────────────────────────────────────────

const ElementBase = styled('div', {
  position: 'absolute',
  top: '0',
  bottom: '0',
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none',
}, {
  name: 'InputGroupElement',
  variants: {
    placement: {
      left: { left: '0' },
      right: { right: '0' },
    },
    size: {
      sm: { px: '$8' },
      md: { px: '$12' },
      lg: { px: '$16' },
    },
  },
  defaultVariants: { placement: 'right', size: 'md' },
})

export type InputGroupElementProps = ComponentPropsWithRef<typeof ElementBase> & {
  placement?: 'left' | 'right'
  _groupPosition?: GroupPosition
  _groupOrientation?: string
}

const Element = forwardRef<HTMLDivElement, InputGroupElementProps>(
  ({ placement = 'right', children, _groupPosition, _groupOrientation, ...rest }, ref) => {
    const ctx = useInputGroupContext()
    return (
      <ElementBase ref={ref} placement={placement} size={ctx.size} {...rest}>
        <div style={{ pointerEvents: 'auto' }}>{children}</div>
      </ElementBase>
    )
  },
)
Element.displayName = 'InputGroup.Element'

// ─── Input ──────────────────────────────────────────────────────────────────

const InputWrapper = styled('div', {
  flex: '1',
  position: 'relative',
  display: 'flex',
  ':focus-within': { zIndex: '1', position: 'relative' },
}, { name: 'InputGroupInput' })

export type InputGroupInputProps = {
  children?: ReactNode
  _groupPosition?: GroupPosition
  _groupOrientation?: string
}

const InputSlot = forwardRef<HTMLDivElement, InputGroupInputProps>(
  ({ children, _groupPosition = 'only', _groupOrientation = 'horizontal' }, ref) => {
    const ctx = useInputGroupContext()
    const radiusStl = getGroupStl(_groupPosition, _groupOrientation)

    return (
      <InputWrapper ref={ref}>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            const childStl = (child.props as any).stl || {}
            return cloneElement(child as React.ReactElement<any>, {
              size: ctx.size,
              stl: { ...radiusStl, width: '100%', ...childStl },
            })
          }
          return child
        })}
      </InputWrapper>
    )
  },
)
InputSlot.displayName = 'InputGroup.Input'

// ─── Export ─────────────────────────────────────────────────────────────────

export const InputGroup = Object.assign(Root, {
  Root,
  Addon,
  ButtonAddon,
  Element,
  Input: InputSlot,
})
