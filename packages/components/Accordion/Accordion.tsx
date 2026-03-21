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
import { mergeRefs } from '../../utils/mergeRefs'

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

const StyledRoot = styled('div', {
  fontFamily: '$body',
}, { name: 'AccordionRoot' })

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
  py: '$8',
  px: '$12',
  bg: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '$p',
  fontWeight: '$500',
  fontFamily: '$body',
  textAlign: 'left',
  color: 'inherit',
  ':interact': { bg: '$neutral4' },
  ':pressed': { bg: '$neutral5' },
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, {
  name: 'AccordionTrigger',
  variants: {
    disabled: {
      true: { opacity: '$disabledOpacity', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
})

const StyledChevron = styled('span', {
  display: 'flex',
  alignItems: 'center',
  color: 'inherit',
  transitionProperty: 'transform',
  transitionDuration: '$fastDuration',
  transitionTimingFunction: 'ease',
  lowMotion: { transitionDuration: '0.01s' },
}, {
  name: 'AccordionChevron',
  variants: {
    open: {
      true: { transform: 'rotate(180deg)' },
    },
  },
})

const ChevronIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 6l4 4 4-4" />
  </svg>
)

const StyledContentGrid = styled('div', {
  display: 'grid',
  gtRows: '0fr',
  transitionProperty: 'grid-template-rows',
  transitionDuration: '$fastDuration',
  transitionTimingFunction: 'ease',
  lowMotion: { transitionDuration: '0.01s' },
}, {
  name: 'AccordionContentGrid',
  variants: {
    open: {
      true: { gtRows: '1fr' },
    },
  },
})

const StyledContent = styled('div', {
  overflow: 'hidden',
  minHeight: '0',
  pt: '$0',
  pb: '$12',
  px: '$16',
  fontSize: '$p',
  color: '$neutralText4',
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
          ref={mergeRefs(ref, rootProps.ref)}
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
  extends ComponentPropsWithRef<typeof StyledTrigger> {
  indicator?: boolean
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, indicator = true, ...rest }, ref) => {
    const ctx = useAccordionContext()
    const item = useAccordionItemContext()
    const triggerProps = ctx.getTriggerProps(item.value, item.index)
    const isDisabled = triggerProps.disabled || item.disabled

    return (
      <StyledTrigger
        ref={ref}
        type="button"
        data-state={item.isOpen ? 'open' : 'closed'}
        {...triggerProps}
        disabled={isDisabled}
        {...rest}
      >
        {children}
        {indicator && (
          <StyledChevron open={item.isOpen} data-state={item.isOpen ? 'open' : 'closed'}>
            <ChevronIcon />
          </StyledChevron>
        )}
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
    const { hidden: _hidden, ...contentProps } = ctx.getContentProps(item.value)

    return (
      <StyledContentGrid
        open={item.isOpen}
        data-state={item.isOpen ? 'open' : 'closed'}
        aria-hidden={!item.isOpen}
      >
        <StyledContent
          ref={ref}
          data-state={item.isOpen ? 'open' : 'closed'}
          {...contentProps}
          {...props}
        />
      </StyledContentGrid>
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
