import {
  type ComponentPropsWithRef,
  createContext,
  forwardRef,
  useContext,
  useEffect,
} from 'react'
import {
  type UseAccordionProps,
  type UseAccordionReturn,
  useAccordion,
} from '../../headless/src/useAccordion'
import { styled } from '../../stl-react/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

type AccordionContextValue = UseAccordionReturn

const AccordionContext = createContext<AccordionContextValue | null>(null)

function useAccordionContext() {
  const ctx = useContext(AccordionContext)
  if (!ctx) {
    throw new Error(
      'Accordion compound components must be used within Accordion.Root',
    )
  }
  return ctx
}

interface AccordionItemContextValue {
  value: string
  disabled: boolean
  isOpen: boolean
  index: number
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null)

function useAccordionItemContext() {
  const ctx = useContext(AccordionItemContext)
  if (!ctx) {
    throw new Error(
      'Accordion.Trigger and Accordion.Content must be used within Accordion.Item',
    )
  }
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledRoot = styled('div', {}, { name: 'AccordionRoot' })

const StyledItem = styled('div', {
  borderBottom: '$neutralMin',
}, {
  name: 'AccordionItem',
})

const StyledTrigger = styled('button', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  py: '$12',
  px: '$0',
  bg: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '$button',
  textAlign: 'left',
  color: 'inherit',
}, {
  name: 'AccordionTrigger',
})

const StyledContent = styled('div', {
  overflow: 'hidden',
}, {
  name: 'AccordionContent',
})

// ─── Root ───────────────────────────────────────────────────────────────────

export interface AccordionRootProps
  extends Omit<ComponentPropsWithRef<typeof StyledRoot>, 'defaultValue'> {
  type: 'single' | 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
  collapsible?: boolean
}

const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(
  (
    {
      type,
      value,
      defaultValue,
      onValueChange,
      disabled,
      collapsible,
      children,
      ...rest
    },
    ref,
  ) => {
    const accordionProps: UseAccordionProps =
      type === 'multiple'
        ? { type: 'multiple', value, defaultValue, onValueChange, disabled }
        : { type: 'single', collapsible, value, defaultValue, onValueChange, disabled }

    const accordion = useAccordion(accordionProps)
    const rootProps = accordion.getRootProps()

    return (
      <AccordionContext.Provider value={accordion}>
        <StyledRoot
          ref={(node: HTMLDivElement | null) => {
            const rovingRef = rootProps.ref as React.MutableRefObject<HTMLElement | null>
            if (rovingRef) rovingRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          onKeyDown={rootProps.onKeyDown}
          {...rest}
        >
          {children}
        </StyledRoot>
      </AccordionContext.Provider>
    )
  },
)
AccordionRoot.displayName = 'Accordion.Root'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface AccordionItemProps
  extends ComponentPropsWithRef<typeof StyledItem> {
  value: string
  disabled?: boolean
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value: itemValue, disabled = false, children, ...rest }, ref) => {
    const ctx = useAccordionContext()
    const index = ctx.registerItem(itemValue)
    const isOpen = ctx.isExpanded(itemValue)

    useEffect(() => {
      return () => ctx.unregisterItem(itemValue)
    }, [itemValue, ctx])

    return (
      <AccordionItemContext.Provider
        value={{ value: itemValue, disabled, isOpen, index }}
      >
        <StyledItem
          ref={ref}
          data-state={isOpen ? 'open' : 'closed'}
          {...rest}
        >
          {children}
        </StyledItem>
      </AccordionItemContext.Provider>
    )
  },
)
AccordionItem.displayName = 'Accordion.Item'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface AccordionTriggerProps
  extends ComponentPropsWithRef<typeof StyledTrigger> {}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, ...rest }, ref) => {
    const ctx = useAccordionContext()
    const item = useAccordionItemContext()
    const triggerProps = ctx.getTriggerProps(item.value, item.index)

    return (
      <StyledTrigger
        ref={ref}
        type="button"
        data-state={item.isOpen ? 'open' : 'closed'}
        {...triggerProps}
        disabled={triggerProps.disabled || item.disabled}
        {...rest}
      >
        {children}
      </StyledTrigger>
    )
  },
)
AccordionTrigger.displayName = 'Accordion.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface AccordionContentProps
  extends ComponentPropsWithRef<typeof StyledContent> {}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  (props, ref) => {
    const ctx = useAccordionContext()
    const item = useAccordionItemContext()
    const contentProps = ctx.getContentProps(item.value)

    return (
      <StyledContent
        ref={ref}
        data-state={item.isOpen ? 'open' : 'closed'}
        {...contentProps}
        {...props}
      />
    )
  },
)
AccordionContent.displayName = 'Accordion.Content'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
})
