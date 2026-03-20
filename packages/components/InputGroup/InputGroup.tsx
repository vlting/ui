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
import { styled } from '../../stl-react/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

interface InputGroupContextValue {
  size: 'sm' | 'md' | 'lg'
  orientation: 'horizontal' | 'vertical'
}

const InputGroupContext = createContext<InputGroupContextValue | null>(null)

function useInputGroupContext() {
  const ctx = useContext(InputGroupContext)
  if (!ctx) throw new Error('InputGroup.Addon must be used within InputGroup')
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

const RootBase = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  width: '100%',
  '> :not(:first-child):not(:last-child)': { borderRadius: '0' },
}, {
  name: 'InputGroup',
  variants: {
    orientation: {
      horizontal: {
        flexDirection: 'row',
        '> :first-child': { borderTopRightRadius: '0', borderBottomRightRadius: '0' },
        '> :last-child': { borderTopLeftRadius: '0', borderBottomLeftRadius: '0' },
      },
      vertical: {
        flexDirection: 'column',
        '> :first-child': { borderBottomLeftRadius: '0', borderBottomRightRadius: '0' },
        '> :last-child': { borderTopLeftRadius: '0', borderTopRightRadius: '0' },
      },
    },
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  },
  defaultVariants: { orientation: 'horizontal', size: 'md' },
})

export type InputGroupProps = ComponentPropsWithRef<typeof RootBase> & {
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
}

const Root = forwardRef<HTMLDivElement, InputGroupProps>(
  ({ orientation = 'horizontal', size = 'md', children, ...rest }, ref) => (
    <InputGroupContext.Provider value={{ size, orientation }}>
      <RootBase
        ref={ref}
        role="group"
        orientation={orientation}
        size={size}
        {...rest}
      >
        {children}
      </RootBase>
    </InputGroupContext.Provider>
  ),
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

export type InputGroupAddonProps = ComponentPropsWithRef<typeof AddonBase>

const Addon = forwardRef<HTMLDivElement, InputGroupAddonProps>(
  (props, ref) => {
    const ctx = useInputGroupContext()
    return <AddonBase ref={ref} aria-hidden="true" size={ctx.size} {...props} />
  },
)
Addon.displayName = 'InputGroup.Addon'

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
}

const Element = forwardRef<HTMLDivElement, InputGroupElementProps>(
  ({ placement = 'right', children, ...rest }, ref) => {
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
}, { name: 'InputGroupInput' })

export type InputGroupInputProps = {
  children?: ReactNode
}

const InputSlot = forwardRef<HTMLDivElement, InputGroupInputProps>(
  ({ children }, ref) => {
    const ctx = useInputGroupContext()
    return (
      <InputWrapper ref={ref}>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child as React.ReactElement<any>, { size: ctx.size })
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
  Element,
  Input: InputSlot,
})
