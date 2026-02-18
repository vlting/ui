import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const SRC = join(process.cwd(), 'src')

// Module definitions: [moduleDir, [...componentNames]]
const modules = {
  primitives: [
    'Stack', 'Text', 'Button', 'Input', 'TextArea', 'Select',
    'Checkbox', 'RadioGroup', 'Switch', 'Avatar', 'Dialog', 'Sheet', 'Tooltip',
  ],
  layout: [
    'AppShell', 'Sidebar', 'TopNav', 'BottomTabs', 'Drawer', 'CommandPalette',
    'PageHeader', 'Section', 'Card', 'StatCard', 'MetricTile', 'DataGrid',
    'DataTable', 'VirtualizedList', 'Pagination', 'Breadcrumbs', 'Tabs',
    'Accordion', 'ResizablePanel', 'SplitView',
  ],
  forms: [
    'FormContainer', 'FieldWrapper', 'Label', 'HelperText', 'InlineError',
    'ValidationMessage', 'MultiStepForm', 'DatePicker', 'TimePicker',
    'DateRangePicker', 'FileUploader', 'MultiImageUploader', 'DragAndDropZone',
    'RichTextEditor', 'TagInput', 'Combobox', 'MultiSelect', 'OTPInput',
    'PasswordStrengthMeter',
  ],
  feedback: [
    'Toast', 'Banner', 'Alert', 'ConfirmDialog', 'SkeletonLoader', 'Spinner',
    'ProgressBar', 'EmptyState', 'ErrorBoundary', 'NotFoundState',
    'OfflineIndicator', 'LoadingOverlay',
  ],
  auth: [
    'LoginForm', 'SignupForm', 'MagicLinkForm', 'MFAForm', 'PasswordResetForm',
    'SessionExpiredModal', 'AccountSwitcher', 'AuthProfileEditor', 'AvatarUploader',
    'PrivacySettingsPanel',
  ],
  organization: [
    'OrgSwitcher', 'OrgAvatar', 'RoleBadge', 'InviteUserModal',
    'TeamMemberTable', 'PermissionMatrix', 'AccessControlBadge',
    'AuditLogViewer', 'ActivityLogList',
  ],
  social: [
    'PostComposer', 'PostCard', 'PostMediaGallery', 'ReactionBar',
    'CommentThread', 'CommentItem', 'InfiniteFeedList', 'ShareModal',
    'ReportContentModal', 'ModerationPanel',
  ],
  community: [
    'CommunityHeader', 'ThreadList', 'ThreadCard', 'ThreadComposer',
    'NestedCommentTree', 'VoteControl', 'TagFilterBar', 'ModeratorToolbar',
  ],
  messaging: [
    'ChatLayout', 'ChatSidebar', 'ChatThread', 'MessageBubble',
    'TypingIndicator', 'ReadReceipt', 'AttachmentPreview', 'MessageInput',
    'EmojiPicker', 'ConversationListItem', 'VoiceMessagePlayer',
  ],
  dating: [
    'SwipeDeck', 'SwipeCard', 'MatchCard', 'MatchList', 'ProfilePreviewCard',
    'DatingProfileEditor', 'InterestSelector', 'PhotoGalleryUploader',
    'LocationRadiusSelector', 'BoostBadge', 'SuperLikeIndicator',
    'BlockUserModal',
  ],
  ecommerce: [
    'ProductCard', 'ProductGallery', 'VariantSelector', 'PriceDisplay',
    'CartDrawer', 'CartItemRow', 'CheckoutForm', 'ShippingAddressForm',
    'BillingSummary', 'OrderSummaryCard', 'OrderHistoryTable',
    'InventoryStatusBadge',
  ],
  payments: [
    'SubscriptionSelector', 'PlanComparisonTable', 'BillingCycleToggle',
    'PaymentMethodForm', 'SavedPaymentMethodsList', 'InvoiceTable',
    'InvoiceDetailView', 'UsageMeter', 'UpgradeModal',
    'CancellationFlowDialog',
  ],
  media: [
    'MediaLibraryGrid', 'MediaCard', 'MediaTagFilter', 'UploadProgressItem',
    'AudioPlayer', 'VideoPlayer', 'Playlist', 'MediaViewerModal',
    'ProgressTracker', 'MonetizedContentLock',
  ],
  maps: [
    'MapContainer', 'MapPin', 'ClusterMarker', 'RadiusSelector',
    'LocationSearchInput', 'PlaceAutocompleteDropdown', 'MapInfoCard',
    'DirectionsPanel', 'HeatmapOverlay',
  ],
  crm: [
    'ContactCard', 'LeadCard', 'DealCard', 'PipelineBoard', 'KanbanColumn',
    'StageBadge', 'ContactForm', 'ActivityTimeline', 'LeadStatusBadge',
  ],
  erp: [
    'InventoryTable', 'StockLevelIndicator', 'SupplierCard',
    'PurchaseOrderForm', 'ReorderAlertBanner', 'WarehouseSelector',
  ],
  accounting: [
    'LedgerTable', 'ExpenseForm', 'ExpenseCategoryBadge',
    'FinancialSummaryCard', 'CashFlowChart', 'ExportReportButton',
  ],
  'project-management': [
    'TaskCard', 'TaskDetailPanel', 'KanbanBoard', 'GanttChart',
    'SprintHeader', 'AssignmentAvatarStack', 'DeadlineIndicator',
    'SubtaskList', 'PMCommentSidebar',
  ],
  collaboration: [
    'DocumentEditor', 'CollabCommentSidebar', 'MentionAutocomplete',
    'ActivityFeed', 'VersionHistoryPanel', 'PresenceIndicator',
    'SharedCursorOverlay',
  ],
  automation: [
    'WorkflowBuilderCanvas', 'TriggerSelector', 'ActionSelector',
    'ConditionBuilder', 'RuleSummaryCard', 'WebhookConfigForm',
    'AutomationStatusBadge',
  ],
  marketing: [
    'CampaignCard', 'EmailTemplateEditor', 'AudienceSelector',
    'ABTestVariantCard', 'FunnelVisualization', 'ConversionStatCard',
  ],
  analytics: [
    'ChartWrapper', 'LineChart', 'BarChart', 'PieChart', 'AreaChart',
    'MetricCard', 'AnalyticsFilterBar', 'DateRangeSelector', 'SavedReportList',
    'ExportDataButton',
  ],
  hr: [
    'EmployeeCard', 'EmployeeDirectoryTable', 'TimeEntryForm',
    'LeaveRequestCard', 'ApprovalWorkflowPanel', 'PayrollSummaryCard',
  ],
  productivity: [
    'NotesEditor', 'NotesList', 'CalendarView', 'EventCard',
    'ReminderItem', 'PersonalDashboard', 'QuickAddPanel',
  ],
}

// Components that should use XStack instead of YStack (horizontal layout)
const xstackComponents = new Set([
  'ReactionBar', 'TagFilterBar', 'ModeratorToolbar', 'AnalyticsFilterBar',
  'Breadcrumbs', 'BottomTabs', 'TopNav', 'AssignmentAvatarStack',
  'PresenceIndicator', 'ReadReceipt', 'TypingIndicator',
])

// Components that are behavioral (need function component + interface)
const behavioralComponents = new Set([
  'SwipeDeck', 'SwipeCard', 'ErrorBoundary', 'InfiniteFeedList',
  'VirtualizedList', 'DragAndDropZone', 'MultiStepForm', 'RichTextEditor',
  'EmojiPicker', 'WorkflowBuilderCanvas', 'KanbanBoard', 'PipelineBoard',
  'GanttChart', 'CalendarView', 'DocumentEditor', 'MapContainer',
  'HeatmapOverlay', 'SharedCursorOverlay', 'FunnelVisualization',
  'CashFlowChart', 'LineChart', 'BarChart', 'PieChart', 'AreaChart',
  'AudioPlayer', 'VideoPlayer', 'VoiceMessagePlayer',
])

// Components with sub-parts (compound pattern)
const compoundComponents = {
  'AppShell': ['Header', 'Sidebar', 'Content', 'Footer'],
  'Card': ['Header', 'Content', 'Footer'],
  'StatCard': ['Label', 'Value', 'Trend'],
  'MetricTile': ['Label', 'Value', 'Icon'],
  'DataTable': ['Header', 'Row', 'Cell'],
  'FormContainer': ['Title', 'Description', 'Actions'],
  'FieldWrapper': ['Label', 'Input', 'Error', 'Helper'],
  'PostCard': ['Header', 'Content', 'Media', 'Actions'],
  'CommentItem': ['Avatar', 'Content', 'Actions'],
  'MessageBubble': ['Content', 'Timestamp', 'Status'],
  'ProductCard': ['Image', 'Title', 'Price', 'Actions'],
  'ContactCard': ['Avatar', 'Name', 'Details', 'Actions'],
  'TaskCard': ['Title', 'Assignee', 'Status', 'DueDate'],
  'EmployeeCard': ['Avatar', 'Name', 'Role', 'Department'],
  'EventCard': ['Time', 'Title', 'Location'],
  'ChatLayout': ['Sidebar', 'Thread', 'Input'],
  'OrderSummaryCard': ['Items', 'Subtotal', 'Total'],
  'MediaCard': ['Thumbnail', 'Title', 'Meta'],
  'LeadCard': ['Name', 'Status', 'Value'],
  'DealCard': ['Title', 'Value', 'Stage'],
  'CampaignCard': ['Title', 'Status', 'Metrics'],
  'MatchCard': ['Photo', 'Name', 'Age', 'Bio'],
  'ProfilePreviewCard': ['Photo', 'Name', 'Bio', 'Interests'],
  'SwipeCard': ['Photo', 'Info', 'Actions'],
}

function stubComponent(name, stackType = 'YStack') {
  return `import type { GetProps } from 'tamagui'
import { styled, ${stackType} } from 'tamagui'

const ${name}Frame = styled(${stackType}, {})

export type ${name}Props = GetProps<typeof ${name}Frame>

export const ${name} = ${name}Frame
`
}

function stubCompoundComponent(name, parts) {
  const partDefs = parts.map(p => {
    return `const ${name}${p} = styled(YStack, {})`
  }).join('\n\n')

  const staticProps = parts.map(p => `  ${p}: ${name}${p},`).join('\n')

  return `import type { GetProps } from 'tamagui'
import { styled, withStaticProperties, YStack } from 'tamagui'

const ${name}Frame = styled(YStack, {})

${partDefs}

export const ${name} = withStaticProperties(${name}Frame, {
${staticProps}
})

export type ${name}Props = GetProps<typeof ${name}Frame>
`
}

function stubBehavioralComponent(name) {
  return `import type { GetProps } from 'tamagui'
import { styled, YStack } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const ${name}Frame = styled(YStack, {})

export type ${name}Props = GetProps<typeof ${name}Frame>

export const ${name} = ${name}Frame
`
}

function stubTest(name) {
  return `import { render, screen } from '../../__test-utils__/render'
import { ${name} } from './${name}'

describe('${name}', () => {
  it('renders without crashing', () => {
    render(<${name} testID="${name.toLowerCase()}" />)
    expect(screen.getByTestId('${name.toLowerCase()}')).toBeTruthy()
  })
})
`
}

function stubIndex(name) {
  return `export { ${name} } from './${name}'
export type { ${name}Props } from './${name}'
`
}

function moduleIndex(components) {
  return components.map(c => `export { ${c} } from './${c}'`).join('\n') + '\n' +
    components.map(c => `export type { ${c}Props } from './${c}'`).join('\n') + '\n'
}

let totalFiles = 0

for (const [moduleDir, components] of Object.entries(modules)) {
  const moduleBase = join(SRC, moduleDir)

  for (const name of components) {
    const compDir = join(moduleBase, name)
    mkdirSync(compDir, { recursive: true })

    let componentCode
    if (compoundComponents[name]) {
      componentCode = stubCompoundComponent(name, compoundComponents[name])
    } else if (behavioralComponents.has(name)) {
      componentCode = stubBehavioralComponent(name)
    } else {
      const stackType = xstackComponents.has(name) ? 'XStack' : 'YStack'
      componentCode = stubComponent(name, stackType)
    }

    writeFileSync(join(compDir, `${name}.tsx`), componentCode)
    writeFileSync(join(compDir, `${name}.test.tsx`), stubTest(name))
    writeFileSync(join(compDir, 'index.ts'), stubIndex(name))
    totalFiles += 3
  }

  // Module barrel export
  writeFileSync(join(moduleBase, 'index.ts'), moduleIndex(components))
  totalFiles += 1
}

console.log(`Generated ${totalFiles} files across ${Object.keys(modules).length} modules`)
console.log(`Components: ${Object.values(modules).flat().length}`)
