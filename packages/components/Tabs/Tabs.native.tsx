import {
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
  useMemo,
} from 'react'
import {
  Pressable as RNPressable,
  ScrollView as RNScrollView,
  Text as RNText,
  View,
} from 'react-native'
import type { ViewStyle } from 'react-native'
import { useTabs, type UseTabsReturn } from '../../headless/src/useTabs'
import { styled } from '../../stl-native/src/config/styled'

// ─── Context ────────────────────────────────────────────────────────────────

type TabsVariant = 'tab' | 'line' | 'subtle'
type TabsTheme = 'primary' | 'secondary' | 'neutral'

interface TabsContextValue extends UseTabsReturn {
  orientation: 'horizontal' | 'vertical'
  variant: TabsVariant
  theme: TabsTheme
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs compound components must be used within Tabs.Root')
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledRoot = styled(
  View,
  { flexDirection: 'column' },
  {
    orientation: {
      horizontal: { flexDirection: 'column' },
      vertical: { flexDirection: 'row' },
    },
  },
  'TabsRoot',
)

const StyledList = styled(
  RNScrollView,
  { flexDirection: 'row' },
  {
    orientation: {
      horizontal: { flexDirection: 'row' },
      vertical: { flexDirection: 'column' },
    },
    variant: {
      line: {},
      tab: { backgroundColor: '$neutral3', borderRadius: '$card', padding: '$4', gap: '$4' },
      subtle: { gap: '$4' },
    },
  },
  'TabsList',
)

const StyledTrigger = styled(
  RNPressable,
  {
    paddingHorizontal: '$12',
    paddingVertical: '$8',
  },
  {
    active: {
      true: {},
    },
    disabled: {
      true: { opacity: '$disabledOpacity' },
    },
  },
  'TabsTrigger',
)

const StyledTriggerText = styled(
  RNText,
  {
    fontWeight: '500',
    fontSize: '$p',
    color: '$neutral9',
  },
  {},
  'TabsTriggerText',
)

const StyledContent = styled(View, {}, {}, 'TabsContent')

// ─── Theme color helpers ────────────────────────────────────────────────────

function getActiveStyles(theme: TabsTheme, variant: TabsVariant): ViewStyle {
  const colors: Record<TabsTheme, { bg: string; border: string }> = {
    primary: { bg: '$primary1', border: '$primary9' },
    secondary: { bg: '$secondary1', border: '$secondary9' },
    neutral: { bg: '$neutral1', border: '$neutral12' },
  }
  const c = colors[theme]

  if (variant === 'line') {
    return { backgroundColor: c.bg, borderBottomWidth: 2, borderBottomColor: c.border }
  }
  if (variant === 'tab') {
    return { backgroundColor: c.bg }
  }
  // subtle
  return { backgroundColor: c.bg }
}

// ─── Root ───────────────────────────────────────────────────────────────────

export interface TabsRootProps {
  children: ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  variant?: TabsVariant
  theme?: TabsTheme
  style?: ViewStyle
}

const TabsRoot = forwardRef<View, TabsRootProps>(
  ({ value, defaultValue, onValueChange, orientation = 'horizontal', variant = 'tab', theme = 'primary', children, ...rest }, ref) => {
    const tabs = useTabs({ value, defaultValue, onValueChange, orientation, focusTab: () => {} })
    const ctxValue = useMemo(
      () => ({ ...tabs, orientation, variant, theme }),
      [tabs, orientation, variant, theme],
    )

    return (
      <TabsContext.Provider value={ctxValue}>
        <StyledRoot ref={ref} orientation={orientation} {...rest}>
          {children}
        </StyledRoot>
      </TabsContext.Provider>
    )
  },
)
TabsRoot.displayName = 'Tabs.Root'

// ─── List ───────────────────────────────────────────────────────────────────

export interface TabsListProps {
  children: ReactNode
  style?: ViewStyle
}

const TabsList = forwardRef<RNScrollView, TabsListProps>(
  (props, ref) => {
    const ctx = useTabsContext()

    return (
      <StyledList
        ref={ref}
        horizontal={ctx.orientation === 'horizontal'}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        orientation={ctx.orientation}
        variant={ctx.variant}
        accessibilityRole="tablist"
        {...props}
      />
    )
  },
)
TabsList.displayName = 'Tabs.List'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface TabsTriggerProps {
  children: ReactNode
  value: string
  disabled?: boolean
  style?: ViewStyle
}

const TabsTrigger = forwardRef<View, TabsTriggerProps>(
  ({ value, disabled = false, children, style, ...rest }, ref) => {
    const ctx = useTabsContext()
    const tabProps = ctx.getTabProps(value, { disabled })
    const isActive = tabProps['aria-selected']
    const activeStyle = isActive ? getActiveStyles(ctx.theme, ctx.variant) : undefined

    return (
      <StyledTrigger
        ref={ref}
        active={isActive || undefined}
        disabled={disabled || undefined}
        onPress={tabProps.onPress}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive, disabled }}
        style={{ ...activeStyle, ...style } as ViewStyle}
        {...rest}
      >
        {typeof children === 'string' ? (
          <StyledTriggerText>{children}</StyledTriggerText>
        ) : (
          children
        )}
      </StyledTrigger>
    )
  },
)
TabsTrigger.displayName = 'Tabs.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface TabsContentProps {
  children: ReactNode
  value: string
  style?: ViewStyle
}

const TabsContent = forwardRef<View, TabsContentProps>(
  ({ value, children, ...rest }, ref) => {
    const ctx = useTabsContext()
    const panelProps = ctx.getTabPanelProps(value)

    if (panelProps.hidden) return null

    return (
      <StyledContent
        ref={ref}
        accessibilityRole="summary"
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
