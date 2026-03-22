import {
  type ComponentPropsWithRef,
  createContext,
  forwardRef,
  useContext,
} from 'react'
import { useTabs, type UseTabsReturn } from '../../headless/src/useTabs'
import { styled } from '../../stl-react/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

const TabsContext = createContext<
  (UseTabsReturn & { orientation: 'horizontal' | 'vertical' }) | null
>(null)

function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) {
    throw new Error('Tabs compound components must be used within Tabs.Root')
  }
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledRoot = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  fontFamily: '$body',
}, {
  name: 'TabsRoot',
  variants: {
    orientation: {
      horizontal: { flexDirection: 'column' },
      vertical: { flexDirection: 'row' },
    },
  },
})

const StyledList = styled('div', {
  display: 'flex',
  gap: '$0',
}, {
  name: 'TabsList',
  variants: {
    orientation: {
      horizontal: { flexDirection: 'row', borderBottom: '$neutralMin' },
      vertical: { flexDirection: 'column', borderRight: '$neutralMin' },
    },
  },
})

const StyledTrigger = styled('button', {
  px: '$12',
  py: '$8',
  fontWeight: '$500',
  fontSize: '$p',
  fontFamily: '$body',
  bg: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '$neutral9',
  borderBottom: '2px solid transparent',
  ':interact': { color: '$neutral12' },
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, {
  name: 'TabsTrigger',
  variants: {
    active: {
      true: { borderBottom: '2px solid', borderColor: '$primary9', color: '$primary9' },
    },
    disabled: {
      true: { opacity: '$disabledOpacity', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
})

const StyledContent = styled('div', {
  pt: '$16',
  fontFamily: '$body',
}, { name: 'TabsContent' })

// ─── Root ───────────────────────────────────────────────────────────────────

export interface TabsRootProps
  extends Omit<ComponentPropsWithRef<typeof StyledRoot>, 'defaultValue'> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
}

const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(
  ({ value, defaultValue, onValueChange, orientation = 'horizontal', children, ...rest }, ref) => {
    const tabs = useTabs({ value, defaultValue, onValueChange, orientation })

    return (
      <TabsContext.Provider value={{ ...tabs, orientation }}>
        <StyledRoot ref={ref} orientation={orientation} {...rest}>
          {children}
        </StyledRoot>
      </TabsContext.Provider>
    )
  },
)
TabsRoot.displayName = 'Tabs.Root'

// ─── List ───────────────────────────────────────────────────────────────────

export interface TabsListProps extends ComponentPropsWithRef<typeof StyledList> {}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  (props, ref) => {
    const ctx = useTabsContext()
    const listProps = ctx.getTabListProps()

    return (
      <StyledList
        ref={ref}
        role={listProps.role}
        aria-orientation={listProps['aria-orientation']}
        orientation={ctx.orientation}
        {...props}
      />
    )
  },
)
TabsList.displayName = 'Tabs.List'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface TabsTriggerProps
  extends Omit<ComponentPropsWithRef<typeof StyledTrigger>, 'value'> {
  value: string
  disabled?: boolean
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled = false, children, onClick, ...rest }, ref) => {
    const ctx = useTabsContext()
    const tabProps = ctx.getTabProps(value)

    return (
      <StyledTrigger
        ref={ref}
        type="button"
        role={tabProps.role}
        id={tabProps.id}
        aria-selected={tabProps['aria-selected']}
        aria-controls={tabProps['aria-controls']}
        tabIndex={tabProps.tabIndex}
        active={tabProps['aria-selected']}
        disabled={disabled}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (!disabled) tabProps.onPress()
          onClick?.(e)
        }}
        onKeyDown={tabProps.onKeyDown}
        {...rest}
      >
        {children}
      </StyledTrigger>
    )
  },
)
TabsTrigger.displayName = 'Tabs.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface TabsContentProps
  extends Omit<ComponentPropsWithRef<typeof StyledContent>, 'value'> {
  value: string
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, children, ...rest }, ref) => {
    const ctx = useTabsContext()
    const panelProps = ctx.getTabPanelProps(value)

    if (panelProps.hidden) return null

    return (
      <StyledContent
        ref={ref}
        role={panelProps.role}
        id={panelProps.id}
        aria-labelledby={panelProps['aria-labelledby']}
        tabIndex={panelProps.tabIndex}
        {...rest}
      >
        {children}
      </StyledContent>
    )
  },
)
TabsContent.displayName = 'Tabs.Content'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
})
