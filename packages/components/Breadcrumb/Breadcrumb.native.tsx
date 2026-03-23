import { type ReactNode, forwardRef } from 'react'
import { Pressable, ScrollView, Text as RNText, View } from 'react-native'
import { styled } from '../../stl-native/src/config'

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledRoot = styled(View, {
  flexDirection: 'row',
}, {}, 'BreadcrumbRoot')

const StyledList = styled(ScrollView, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
}, {}, 'BreadcrumbList')

const StyledItem = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
}, {}, 'BreadcrumbItem')

const StyledLink = styled(Pressable, {
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 4,
}, {
  pressed: {
    true: { backgroundColor: '$neutral4' },
  },
}, 'BreadcrumbLink')

const StyledLinkText = styled(RNText, {
  color: '$neutral9',
  fontSize: 14,
}, {}, 'BreadcrumbLinkText')

const StyledSeparator = styled(RNText, {
  color: '$neutral6',
  fontSize: 12,
}, {}, 'BreadcrumbSeparator')

const StyledPage = styled(RNText, {
  color: '$neutralText1',
  fontWeight: '500',
  fontSize: 14,
}, {}, 'BreadcrumbPage')

const StyledEllipsis = styled(RNText, {
  color: '$neutral6',
  fontSize: 14,
}, {}, 'BreadcrumbEllipsis')

// ─── Root ───────────────────────────────────────────────────────────────────

export interface BreadcrumbRootProps {
  children?: ReactNode
  accessibilityLabel?: string
}

const BreadcrumbRoot = forwardRef<View, BreadcrumbRootProps>(
  ({ children, accessibilityLabel = 'Breadcrumb', ...rest }, ref) => (
    <StyledRoot
      ref={ref}
      accessibilityRole="header"
      accessibilityLabel={accessibilityLabel}
      {...rest}
    >
      {children}
    </StyledRoot>
  ),
)
BreadcrumbRoot.displayName = 'Breadcrumb.Root'

// ─── List ───────────────────────────────────────────────────────────────────

export interface BreadcrumbListProps {
  children?: ReactNode
}

const BreadcrumbList = forwardRef<ScrollView, BreadcrumbListProps>(
  ({ children, ...rest }, ref) => (
    <StyledList
      ref={ref}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ alignItems: 'center', gap: 8 }}
      accessibilityRole="list"
      {...rest}
    >
      {children}
    </StyledList>
  ),
)
BreadcrumbList.displayName = 'Breadcrumb.List'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface BreadcrumbItemProps {
  children?: ReactNode
}

const BreadcrumbItem = forwardRef<View, BreadcrumbItemProps>(
  (props, ref) => <StyledItem ref={ref} {...props} />,
)
BreadcrumbItem.displayName = 'Breadcrumb.Item'

// ─── Link ───────────────────────────────────────────────────────────────────

export interface BreadcrumbLinkProps {
  children?: ReactNode
  onPress?: () => void
  disabled?: boolean
}

const BreadcrumbLink = forwardRef<View, BreadcrumbLinkProps>(
  ({ children, onPress, disabled, ...rest }, ref) => (
    <StyledLink
      ref={ref}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="link"
      accessibilityState={{ disabled }}
      {...rest}
    >
      {typeof children === 'string' ? (
        <StyledLinkText>{children}</StyledLinkText>
      ) : (
        children
      )}
    </StyledLink>
  ),
)
BreadcrumbLink.displayName = 'Breadcrumb.Link'

// ─── Separator ──────────────────────────────────────────────────────────────

export interface BreadcrumbSeparatorProps {
  children?: ReactNode
}

const BreadcrumbSeparator = forwardRef<RNText, BreadcrumbSeparatorProps>(
  ({ children, ...rest }, ref) => (
    <StyledSeparator
      ref={ref}
      accessibilityElementsHidden
      importantForAccessibility="no"
      {...rest}
    >
      {children ?? '/'}
    </StyledSeparator>
  ),
)
BreadcrumbSeparator.displayName = 'Breadcrumb.Separator'

// ─── Page ───────────────────────────────────────────────────────────────────

export interface BreadcrumbPageProps {
  children?: ReactNode
}

const BreadcrumbPage = forwardRef<RNText, BreadcrumbPageProps>(
  (props, ref) => (
    <StyledPage
      ref={ref}
      accessibilityRole="text"
      accessibilityLabel={typeof props.children === 'string' ? `Current page: ${props.children}` : undefined}
      {...props}
    />
  ),
)
BreadcrumbPage.displayName = 'Breadcrumb.Page'

// ─── Ellipsis ───────────────────────────────────────────────────────────────

export interface BreadcrumbEllipsisProps {
  children?: ReactNode
}

const BreadcrumbEllipsis = forwardRef<RNText, BreadcrumbEllipsisProps>(
  ({ children, ...rest }, ref) => (
    <StyledEllipsis
      ref={ref}
      accessibilityElementsHidden
      importantForAccessibility="no"
      {...rest}
    >
      {children ?? '\u2026'}
    </StyledEllipsis>
  ),
)
BreadcrumbEllipsis.displayName = 'Breadcrumb.Ellipsis'

// ─── Export ─────────────────────────────────────────────────────────────────

export type BreadcrumbProps = BreadcrumbRootProps

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Root: BreadcrumbRoot,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Separator: BreadcrumbSeparator,
  Page: BreadcrumbPage,
  Ellipsis: BreadcrumbEllipsis,
})
