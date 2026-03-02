// Block System — Layer 3 (Compositions)
// Blocks are pre-composed layouts built entirely from @vlting/ui components.
// Each block accepts a `variant` prop to switch between different layouts.

// Shared types
export type { BlockProps, SocialProvider } from './_shared/types'

// Auth block (login + signup)
export { AuthBlock } from './auth'
export type { AuthBlockProps, AuthBlockVariant } from './auth'

// Sidebar block
export { SidebarBlock } from './sidebar'
export type { SidebarBlockProps, SidebarBlockVariant, NavItem, NavGroup, FileTreeItem } from './sidebar'

// Dashboard block
export { DashboardBlock } from './dashboard'
export type { DashboardBlockProps, DashboardBlockVariant, MetricCard } from './dashboard'

// Data table block
export { DataTableBlock } from './data-table'
export type { DataTableBlockProps, DataTableBlockVariant } from './data-table'

// Settings block
export { SettingsBlock } from './settings'
export type { SettingsBlockProps, SettingsBlockVariant } from './settings'

// Pricing block
export { PricingBlock } from './pricing'
export type { PricingBlockProps, PricingBlockVariant } from './pricing'

// Hero block
export { HeroBlock } from './hero'
export type { HeroBlockProps, HeroBlockVariant, HeroAction } from './hero'

// Feed block
export { FeedBlock } from './feed'
export type { FeedBlockProps, FeedBlockVariant, TimelineEvent, NotificationItem, CommentItem } from './feed'

// App shell block
export { AppShellBlock } from './app-shell'
export type { AppShellBlockProps, AppShellBlockVariant } from './app-shell'

// Empty state block
export { EmptyStateBlock } from './empty-state'
export type { EmptyStateBlockProps, EmptyStateBlockVariant } from './empty-state'
