<!-- target-branch: feat/docs-site/blocks-reimagining -->
# Data Table + Settings + Pricing Blocks

## Instructions

Create three new blocks that don't have existing equivalents in the current system.

### DataTableBlock

**Variants:**

| Variant | Description |
|---------|------------|
| `standard` | Full-featured data table with search, pagination, column sorting |
| `compact` | Dense table with minimal padding, for lists/logs |
| `expandable` | Rows expand to show detail content |

**Props:**
```typescript
interface DataTableBlockProps {
  variant: 'standard' | 'compact' | 'expandable'
  title?: string
  description?: string
  columns: ColumnDef[]
  data: Record<string, unknown>[]
  searchable?: boolean
  searchPlaceholder?: string
  pageSize?: number
  onRowClick?: (row: Record<string, unknown>) => void
  // Expandable variant
  renderExpandedRow?: (row: Record<string, unknown>) => ReactNode
  actions?: ReactNode  // top-right action area (e.g., "Add" button)
}
```

### SettingsBlock

**Variants:**

| Variant | Description |
|---------|------------|
| `profile` | User profile editing form (name, email, avatar, bio) |
| `preferences` | Preference toggles (notifications, theme, language) |
| `account` | Account management (password change, delete account, 2FA) |

**Props:**
```typescript
interface SettingsBlockProps {
  variant: 'profile' | 'preferences' | 'account'
  title?: string
  description?: string
  onSave?: (data: Record<string, unknown>) => void
  loading?: boolean
  // Profile variant
  user?: { name?: string; email?: string; avatar?: string; bio?: string }
  // Preferences variant
  preferences?: PreferenceItem[]
  // Account variant
  onChangePassword?: () => void
  onDeleteAccount?: () => void
}

interface PreferenceItem {
  label: string
  description?: string
  type: 'toggle' | 'select'
  value: boolean | string
  options?: string[]  // for select type
  onChange: (value: boolean | string) => void
}
```

### PricingBlock

**Variants:**

| Variant | Description |
|---------|------------|
| `cards` | Side-by-side pricing tier cards (3 tiers typical) |
| `comparison` | Feature comparison table across tiers |
| `simple` | Minimal single-plan display with feature list |

**Props:**
```typescript
interface PricingBlockProps {
  variant: 'cards' | 'comparison' | 'simple'
  title?: string
  description?: string
  plans: PricingPlan[]
  billingPeriod?: 'monthly' | 'yearly'
  onBillingPeriodChange?: (period: 'monthly' | 'yearly') => void
  onSelectPlan?: (planId: string) => void
}

interface PricingPlan {
  id: string
  name: string
  description?: string
  price: { monthly: number; yearly: number }
  currency?: string
  features: Array<{ text: string; included: boolean }>
  highlighted?: boolean
  cta?: string
}
```

### Implementation

1. Create `packages/blocks/data-table/DataTableBlock.tsx` + `index.ts`
   - Use DataTable, Card, Input, Button, Pagination from @vlting/ui
   - Standard: search bar + table + pagination footer
   - Compact: smaller rows, tighter padding
   - Expandable: click to expand row with custom content

2. Create `packages/blocks/settings/SettingsBlock.tsx` + `index.ts`
   - Use Card, Input, Field, Button, Switch, Select, Avatar, Separator from @vlting/ui
   - Profile: form with avatar upload area, name, email, bio fields
   - Preferences: list of toggle/select items
   - Account: password section + danger zone (delete account)

3. Create `packages/blocks/pricing/PricingBlock.tsx` + `index.ts`
   - Use Card, Button, Badge, Separator, Toggle/ToggleGroup from @vlting/ui
   - Cards: flex row of Card components, highlighted plan gets accent border
   - Comparison: table layout with feature rows and checkmark/x columns
   - Simple: single card with feature list

### Patterns
- AnyFC casting for all Tamagui/UI components
- styledHtml for form elements in settings
- All data via props, no internal fetching
- Use tokens for all colors/spacing (no hardcoded values)

## Scope
- `packages/blocks/data-table/DataTableBlock.tsx` (new)
- `packages/blocks/data-table/index.ts` (new)
- `packages/blocks/settings/SettingsBlock.tsx` (new)
- `packages/blocks/settings/index.ts` (new)
- `packages/blocks/pricing/PricingBlock.tsx` (new)
- `packages/blocks/pricing/index.ts` (new)

## Verification
- [ ] DataTableBlock renders all 3 variants
- [ ] SettingsBlock renders all 3 variants
- [ ] PricingBlock renders all 3 variants
- [ ] All use @vlting/ui components exclusively
- [ ] Accessible form structure in SettingsBlock

## Task Progress
<!-- lat: 2026-03-02T22:50:00Z -->
<!-- agent-pid: 68095 -->
<!-- worktree: .worktrees/q-004 -->
<!-- branch: q/004 -->

### Checklist
- [ ] **ACTIVE** → Create worktree and scaffold directories
- [ ] Implement DataTableBlock with 3 variants
- [ ] Implement SettingsBlock with 3 variants
- [ ] Implement PricingBlock with 3 variants
- [ ] Create index.ts files for all 3 blocks
- [ ] Verify TypeScript passes
- [ ] Commit, rebase, merge, archive

### Handoff Context
- Three new blocks with no existing equivalents
- DataTable component already exists at ../../components/DataTable
- Need to check what Switch, Select, Avatar, Pagination, ToggleGroup are available
