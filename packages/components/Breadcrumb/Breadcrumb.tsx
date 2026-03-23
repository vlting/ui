import {
  type ComponentPropsWithRef,
  forwardRef,
} from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledRoot = styled('nav', {
  fontFamily: '$body',
}, { name: 'BreadcrumbRoot' })

const StyledList = styled('ol', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  flexWrap: 'wrap',
  listStyle: 'none',
  m: '$0',
  p: '$0',
}, { name: 'BreadcrumbList' })

const StyledItem = styled('li', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
}, { name: 'BreadcrumbItem' })

const StyledLink = styled('a', {
  color: '$neutral9',
  textDecoration: 'none',
  fontSize: '$p',
  fontFamily: '$body',
  radius: '$2',
  px: '$4',
  py: '$2',
  ':hover': { color: '$neutralText1', textDecoration: 'underline' },
  ':focus': { bg: '$neutral4', color: '$neutralText1', textDecoration: 'underline', outline: 'none' },
}, { name: 'BreadcrumbLink' })

const StyledSeparator = styled('span', {
  color: '$neutral6',
  fontSize: '$small',
  userSelect: 'none',
  px: '$8',
}, { name: 'BreadcrumbSeparator' })

const StyledPage = styled('span', {
  color: '$neutralText1',
  fontWeight: '$500',
  fontSize: '$p',
  fontFamily: '$body',
}, { name: 'BreadcrumbPage' })

const StyledEllipsis = styled('span', {
  color: '$neutral6',
  fontSize: '$p',
  userSelect: 'none',
}, { name: 'BreadcrumbEllipsis' })

// ─── Root ───────────────────────────────────────────────────────────────────

export interface BreadcrumbRootProps extends ComponentPropsWithRef<typeof StyledRoot> {}

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbRootProps>(
  ({ children, ...rest }, ref) => (
    <StyledRoot ref={ref} aria-label="Breadcrumb" {...rest}>
      {children}
    </StyledRoot>
  ),
)
BreadcrumbRoot.displayName = 'Breadcrumb.Root'

// ─── List ───────────────────────────────────────────────────────────────────

export interface BreadcrumbListProps extends ComponentPropsWithRef<typeof StyledList> {}

const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  (props, ref) => <StyledList ref={ref} {...props} />,
)
BreadcrumbList.displayName = 'Breadcrumb.List'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface BreadcrumbItemProps extends ComponentPropsWithRef<typeof StyledItem> {}

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  (props, ref) => <StyledItem ref={ref} {...props} />,
)
BreadcrumbItem.displayName = 'Breadcrumb.Item'

// ─── Link ───────────────────────────────────────────────────────────────────

export interface BreadcrumbLinkProps extends ComponentPropsWithRef<typeof StyledLink> {}

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  (props, ref) => <StyledLink ref={ref} {...props} />,
)
BreadcrumbLink.displayName = 'Breadcrumb.Link'

// ─── Separator ──────────────────────────────────────────────────────────────

export interface BreadcrumbSeparatorProps extends ComponentPropsWithRef<typeof StyledSeparator> {}

const BreadcrumbSeparator = forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ children, ...rest }, ref) => (
    <StyledSeparator ref={ref} role="presentation" aria-hidden="true" {...rest}>
      {children ?? '/'}
    </StyledSeparator>
  ),
)
BreadcrumbSeparator.displayName = 'Breadcrumb.Separator'

// ─── Page ───────────────────────────────────────────────────────────────────

export interface BreadcrumbPageProps extends ComponentPropsWithRef<typeof StyledPage> {}

const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  (props, ref) => <StyledPage ref={ref} role="link" aria-current="page" aria-disabled="true" {...props} />,
)
BreadcrumbPage.displayName = 'Breadcrumb.Page'

// ─── Ellipsis ───────────────────────────────────────────────────────────────

export interface BreadcrumbEllipsisProps extends ComponentPropsWithRef<typeof StyledEllipsis> {}

const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
  ({ children, ...rest }, ref) => (
    <StyledEllipsis ref={ref} role="presentation" aria-hidden="true" {...rest}>
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
