// Block System — Layer 3 (Compositions)
// Blocks are pre-composed layouts built entirely from @vlting/ui components.
// Each block accepts a `variant` prop to switch between different layouts.

// Shared types
export type { BlockProps, SocialProvider } from './_shared/types'
export type { AppShellBlockProps, AppShellBlockVariant } from './app-shell'
// App shell block
export { AppShellBlock } from './app-shell'
export type { AuthBlockProps, AuthBlockVariant } from './auth'
// Auth block (login + signup)
export { AuthBlock } from './auth'
export type {
  ChatInterfaceBlockProps,
  ChatInterfaceBlockVariant,
  ChatMessage,
} from './chat-interface'
// Chat interface block
export { ChatInterfaceBlock } from './chat-interface'
export type { DashboardBlockProps, DashboardBlockVariant, MetricCard } from './dashboard'
// Dashboard block
export { DashboardBlock } from './dashboard'
export type { DataTableBlockProps, DataTableBlockVariant } from './data-table'
// Data table block
export { DataTableBlock } from './data-table'
export type { EmptyStateBlockProps, EmptyStateBlockVariant } from './empty-state'
// Empty state block
export { EmptyStateBlock } from './empty-state'
export type {
  CommentItem,
  FeedBlockProps,
  FeedBlockVariant,
  NotificationItem,
  TimelineEvent,
} from './feed'
// Feed block
export { FeedBlock } from './feed'
export type {
  FileUploadBlockProps,
  FileUploadBlockVariant,
  UploadFile,
} from './file-upload'
// File upload block
export { FileUploadBlock } from './file-upload'
export type { HeroAction, HeroBlockProps, HeroBlockVariant } from './hero'
// Hero block
export { HeroBlock } from './hero'
export type {
  Notification,
  NotificationCenterBlockProps,
  NotificationCenterBlockVariant,
} from './notification-center'
// Notification center block
export { NotificationCenterBlock } from './notification-center'
export type {
  OnboardingStep,
  OnboardingWizardBlockProps,
  OnboardingWizardBlockVariant,
} from './onboarding-wizard'
// Onboarding wizard block
export { OnboardingWizardBlock } from './onboarding-wizard'
export type { PricingBlockProps, PricingBlockVariant } from './pricing'
// Pricing block
export { PricingBlock } from './pricing'
export type { SettingsBlockProps, SettingsBlockVariant } from './settings'
// Settings block
export { SettingsBlock } from './settings'
export type {
  FileTreeItem,
  NavGroup,
  NavItem,
  SidebarBlockProps,
  SidebarBlockVariant,
} from './sidebar'
// Sidebar block
export { SidebarBlock } from './sidebar'
