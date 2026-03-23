import {
  type ComponentPropsWithRef,
  createContext,
  forwardRef,
  useContext,
} from 'react'
import { useTabs, type UseTabsReturn } from '../../headless/src/useTabs'
import { styled, options } from '../../stl-react/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

type TabsVariant = 'tab' | 'line' | 'subtle'
type TabsTheme = 'primary' | 'secondary' | 'neutral'

const TabsContext = createContext<
  (UseTabsReturn & {
    orientation: 'horizontal' | 'vertical'
    variant: TabsVariant
    theme: TabsTheme
  }) | null
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
      horizontal: { flexDirection: 'row' },
      vertical: { flexDirection: 'column', alignItems: 'stretch' },
    },
    variant: {
      line: {},
      tab: { bg: '$neutral3', radius: '$card', p: '$4', gap: '$4' },
      subtle: { gap: '$4' },
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
}, {
  name: 'TabsTrigger',
  variants: {
    active: { true: {} },
    disabled: {
      true: { opacity: '$disabledOpacity', cursor: 'not-allowed', pointerEvents: 'none' },
    },
    variant: {
      line: {},
      tab: { radius: '$3', },
      subtle: { radius: '$button' },
    },
    theme: options('primary', 'secondary', 'neutral'),
    orientation: { horizontal: {}, vertical: { textAlign: 'start' } },
  },
  compoundVariants: [
    // ── Line: transparent border by default ──────────────
    {
      when: { variant: 'line', orientation: 'horizontal' },
      stl: { borderBottom: '$neutral', borderBottomColor: 'transparent' },
    },
    {
      when: { variant: 'line', orientation: 'vertical' },
      stl: { borderRight: '$neutral', borderRightColor: 'transparent' },
    },
    // Line ALL × theme (horizontal)
    {
      when: { variant: 'line', orientation: 'horizontal', theme: 'primary' },
      stl: {
          ':interact': { bg: '$primary2', color: '$primary11' },
          ':focus': { bg: '$primary4', color: '$primaryText4' },
      },
    },
    {
      when: { variant: 'line', orientation: 'horizontal', theme: 'secondary' },
      stl: {
          ':interact': { bg: '$secondary2', color: '$secondary11' },
          ':focus': { bg: '$secondary4', color: '$secondaryText4' },
      },
    },
    {
      when: { variant: 'line', orientation: 'horizontal', theme: 'neutral' },
      stl: {
          ':interact': { bg: '$neutral2', color: '$neutral11' },
          ':focus': { bg: '$neutral4', color: '$neutralText4' },
      },
    },
    // Line ALL × theme (vertical)
    {
      when: { variant: 'line', orientation: 'vertical', theme: 'primary' },
      stl: {
          ':interact': { bg: '$primary2', color: '$primary11' },
          ':focus': { bg: '$primary4', color: '$primaryText4' },
      },
    },
    {
      when: { variant: 'line', orientation: 'vertical', theme: 'secondary' },
      stl: {
          ':interact': { bg: '$secondary2', color: '$secondary11' },
          ':focus': { bg: '$secondary4', color: '$secondaryText4' },
      },
    },
    {
      when: { variant: 'line', orientation: 'vertical', theme: 'neutral' },
      stl: {
          ':interact': { bg: '$neutral2', color: '$neutral11' },
          ':focus': { bg: '$neutral4', color: '$neutralText4' },
      },
    },
    // Line active × theme (horizontal)
    {
      when: { variant: 'line', orientation: 'horizontal', active: 'true', theme: 'primary' },
      stl: {
        color: '$primary9', borderBottom: '$primary', bg: '$primary1',
      },
    },
    {
      when: { variant: 'line', orientation: 'horizontal', active: 'true', theme: 'secondary' },
      stl: {
        color: '$secondary9', borderBottom: '$secondary', bg: '$secondary1',
      },
    },
    {
      when: { variant: 'line', orientation: 'horizontal', active: 'true', theme: 'neutral' },
      stl: {
        color: '$neutral12', borderBottom: '$neutral', bg: '$neutral1',
      },
    },
    // Line active × theme (vertical)
    {
      when: { variant: 'line', orientation: 'vertical', active: 'true', theme: 'primary' },
      stl: {
        color: '$primary9', borderRight: '$primary', bg: '$primary1',
      },
    },
    {
      when: { variant: 'line', orientation: 'vertical', active: 'true', theme: 'secondary' },
      stl: {
        color: '$secondary9', borderRight: '$secondary', bg: '$secondary1',
      },
    },
    {
      when: { variant: 'line', orientation: 'vertical', active: 'true', theme: 'neutral' },
      stl: {
        color: '$neutral12', borderRight: '$neutral', bg: '$neutral1',
      },
    },

    // ── Tab: active gets subtle-button styling ──────────
    {
      when: { variant: 'tab', theme: 'primary' },
      stl: { ':interact': { bg: '$primary5', color: '$primaryText5' } },
    },
    {
      when: { variant: 'tab', theme: 'secondary' },
      stl: { ':interact': { bg: '$secondary5', color: '$secondaryText5' } },
    },
    {
      when: { variant: 'tab', theme: 'neutral' },
      stl: { ':interact': { bg: '$neutral5', color: '$neutralText5' } },
    },
    {
      when: { variant: 'tab', active: 'true', theme: 'primary' },
      stl: { bg: '$primary1', color: '$primaryText1', ':interact': { bg: '$primary5', color: '$primaryText5' } },
    },
    {
      when: { variant: 'tab', active: 'true', theme: 'secondary' },
      stl: { bg: '$secondary1', color: '$secondaryText1', ':interact': { bg: '$secondary5', color: '$secondaryText5' } },
    },
    {
      when: { variant: 'tab', active: 'true', theme: 'neutral' },
      stl: { bg: '$neutral1', color: '$neutralText1', ':interact': { bg: '$neutral5', color: '$neutralText5' } },
    },

    // ── Subtle: neutral ghost default, themed when active ─
    {
      when: { variant: 'subtle' },
      stl: { bg: 'transparent', color: '$neutralText1', ':interact': { bg: '$neutral4', color: '$neutralText4' } },
    },
    {
      when: { variant: 'subtle', theme: 'primary' },
      stl: { ':interact': { bg: '$primary5', color: '$primaryText5' } },
    },
    {
      when: { variant: 'subtle', theme: 'secondary' },
      stl: { ':interact': { bg: '$secondary5', color: '$secondaryText5' } },
    },
    {
      when: { variant: 'subtle', theme: 'neutral' },
      stl: { ':interact': { bg: '$neutral5', color: '$neutralText5' } },
    },
    {
      when: { variant: 'subtle', active: 'true', theme: 'primary' },
      stl: { bg: '$primary4', color: '$primaryText4', ':interact': { bg: '$primary5', color: '$primaryText5' } },
    },
    {
      when: { variant: 'subtle', active: 'true', theme: 'secondary' },
      stl: { bg: '$secondary4', color: '$secondaryText4', ':interact': { bg: '$secondary5', color: '$secondaryText5' } },
    },
    {
      when: { variant: 'subtle', active: 'true', theme: 'neutral' },
      stl: { bg: '$neutral4', color: '$neutralText4', ':interact': { bg: '$neutral5', color: '$neutralText5' } },
    },
  ],
})

const StyledContent = styled('div', {
  fontFamily: '$body',
}, {
  name: 'TabsContent',
  variants: {
    variant: {
      line: { pt: '$16' },
      tab: { border: '$neutralMin', radius: '$card', p: '$16', mt: '$8' },
      subtle: { pt: '$16' },
    },
    orientation: {
      horizontal: {},
      vertical: {},
    },
  },
  compoundVariants: [
    { when: { variant: 'line', orientation: 'vertical' }, stl: { pt: '$0', pl: '$16' } },
    { when: { variant: 'tab', orientation: 'vertical' }, stl: { mt: '$0', ml: '$8' } },
    { when: { variant: 'subtle', orientation: 'vertical' }, stl: { pt: '$0', pl: '$16' } },
  ],
})

// ─── Root ───────────────────────────────────────────────────────────────────

export interface TabsRootProps
  extends Omit<ComponentPropsWithRef<typeof StyledRoot>, 'defaultValue'> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  variant?: TabsVariant
  theme?: TabsTheme
}

const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(
  ({ value, defaultValue, onValueChange, orientation = 'horizontal', variant = 'tab', theme = 'primary', children, ...rest }, ref) => {
    const tabs = useTabs({ value, defaultValue, onValueChange, orientation })

    return (
      <TabsContext.Provider value={{ ...tabs, orientation, variant, theme }}>
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
        aria-orientation={listProps['aria-orientation'] as 'horizontal' | 'vertical'}
        orientation={ctx.orientation}
        variant={ctx.variant}
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
    const tabProps = ctx.getTabProps(value, { disabled })

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
        variant={ctx.variant}
        theme={ctx.theme}
        orientation={ctx.orientation}
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
        variant={ctx.variant}
        orientation={ctx.orientation}
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
