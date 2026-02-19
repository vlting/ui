# Admin & B2B Playbook

## 1. Problem Space

Admin and B2B patterns apply to internal tooling and enterprise product surfaces where power users manage organizations, roles, permissions, workflows, and operational data. Primary modules: `organization` (roles, permissions, members, audit), `hr` (employee management, leave, payroll), `erp` (inventory, suppliers, purchase orders), `automation` (workflows, rules, webhooks), `crm` (pipeline management), `project-management` (task management, sprint planning), `accounting` (ledger, expenses, reporting), `analytics` (reporting, saved views).

These interfaces are used by expert users who prioritize efficiency and density over hand-holding. However, they must still respect accessibility and progressive disclosure for complex workflows.

---

## 2. UX Laws Applied

- **Hick's Law** — Admin surfaces are complex by necessity. Apply it differently here: reduce the number of actions visible *simultaneously* (hide secondary actions in overflow menus), but allow expert users to reach any action in minimal steps.
- **Fitts's Law** — Bulk action buttons and row action icons must have adequate touch/click targets even in dense tables.
- **Miller's Law** — Permission matrices and configuration tables must chunk options into logical groups. Do not show all 50 permissions on a single scrollable list.
- **Tesler's Law** — Workflow automation and rule building absorb complexity from the business. `WorkflowBuilderCanvas` and `ConditionBuilder` must make complex logic feel approachable.
- **Gestalt Proximity** — Group related settings and controls. Org settings (identity, branding, billing) form a natural section; member management is a separate section.
- **Jakob's Law** — Admin interfaces have established conventions from tools like Salesforce, HubSpot, Jira, GitHub. Follow these for role management, permission matrices, and activity logs.
- **Peak-End Rule** — Destructive admin actions (delete member, revoke role, cancel subscription) are high-stakes. Confirmation dialogs must be explicit and clearly reversible or irreversible.

---

## 3. Standard Layout Pattern

### Admin Section Page
```
<AppShell
  sidebar={<Sidebar />}          {/* admin-specific nav */}
>
  <PageHeader title="Members" actions={<Button>Invite Member</Button>} />
  <Section>
    <TeamMemberTable />
    <Pagination />
  </Section>
</AppShell>
```

### Permission Management Page
```
<AppShell>
  <PageHeader title="Roles & Permissions" />
  <Section>
    <Tabs>                        {/* tab per role or section */}
      <PermissionMatrix />
    </Tabs>
  </Section>
</AppShell>
```

### Workflow Builder Page
```
<AppShell>
  <PageHeader title="Automation" actions={<Button>New Rule</Button>} />
  <Section>
    <WorkflowBuilderCanvas>
      <TriggerSelector />
      <ConditionBuilder />
      <ActionSelector />
    </WorkflowBuilderCanvas>
    <RuleSummaryCard />
  </Section>
</AppShell>
```

### Audit Log / Activity Page
```
<AppShell>
  <PageHeader title="Audit Log" actions={<ExportDataButton />} />
  <Section>
    <AnalyticsFilterBar />
    <AuditLogViewer />            {/* or ActivityLogList */}
    <Pagination />
  </Section>
</AppShell>
```

### Header Pattern
- `PageHeader` with the admin section name and a primary action button (right-aligned).
- Breadcrumbs for deeply nested admin settings.
- No decorative hero images or large banners — admin interfaces are utility-first.

### Filters
- `AnalyticsFilterBar` for filtering audit logs, employee directories, and operational tables.
- Search input within `TeamMemberTable` and `EmployeeDirectoryTable` for finding records quickly.

### Primary CTA
- "Invite Member", "New Role", "Create Workflow", "Add Employee" — always in the `PageHeader` actions slot.
- Destructive actions (delete, revoke) are secondary and require confirmation dialogs.

### Secondary CTA
- `ExportDataButton` for audit logs, reports, and data tables.
- Row-level actions (edit, delete, view) as icon buttons in table rows.

---

## 4. Component Mapping

| Need | Component |
|------|-----------|
| Organization identity display | `OrgAvatar` |
| Multi-org context switcher | `OrgSwitcher` |
| Role label / tag | `RoleBadge` |
| Permission level label | `AccessControlBadge` |
| Role + permission grid | `PermissionMatrix` |
| Team member list table | `TeamMemberTable` |
| Invite a user to the org | `InviteUserModal` |
| Timestamped audit trail | `AuditLogViewer` |
| Recent activity list | `ActivityLogList` |
| Employee list/directory | `EmployeeDirectoryTable` |
| Employee summary card | `EmployeeCard` |
| Leave request card | `LeaveRequestCard` |
| Multi-step approval flow | `ApprovalWorkflowPanel` |
| Payroll summary overview | `PayrollSummaryCard` |
| Time entry form | `TimeEntryForm` (forms) |
| Inventory table | `InventoryTable` |
| Purchase order form | `PurchaseOrderForm` |
| Low stock alert banner | `ReorderAlertBanner` |
| Stock level display | `StockLevelIndicator` |
| Supplier info card | `SupplierCard` |
| Warehouse selector | `WarehouseSelector` |
| Webhook configuration | `WebhookConfigForm` |
| Visual workflow builder | `WorkflowBuilderCanvas` |
| Trigger event selector | `TriggerSelector` |
| Logic condition builder | `ConditionBuilder` |
| Automation rule display | `RuleSummaryCard` |
| Automation status label | `AutomationStatusBadge` |

---

## 5. Accessibility Rules

- `PermissionMatrix` must use proper table semantics (`<table>`, `<th>` for role columns, `<th scope="row">` for permission rows). Each cell checkbox must have an `aria-label` combining role and permission names.
- `TeamMemberTable` and `EmployeeDirectoryTable` sortable columns must use `aria-sort`.
- `InviteUserModal` must trap focus and confirm success or error before closing.
- `AuditLogViewer` and `ActivityLogList` entries must be structured as a list (`<ul>`/`<li>`) with each entry's timestamp, actor, and action accessible as plain text.
- `WorkflowBuilderCanvas` is a complex interactive component. Keyboard navigation must allow adding, connecting, and deleting nodes without a mouse. Provide a simplified list-based fallback view.
- `ConditionBuilder` must allow constructing logic entirely by keyboard. Each condition group and operator must be labeled and reachable via Tab/Shift-Tab.
- `ApprovalWorkflowPanel` approval/rejection actions must use `Dialog` confirmation (with focus trap) for irreversible actions.
- `ReorderAlertBanner` must use `role="alert"` so screen readers announce low-stock conditions immediately.
- All role/permission changes must have an undo path or a confirmation step — never silently apply.
- `RoleBadge` and `AccessControlBadge` must not communicate role/access level by color alone — always include a text label.

---

## 6. Anti-Patterns

- **Permission matrix without role context** — `PermissionMatrix` must always show role labels as column headers. Never show a matrix of checkboxes without clear labeling.
- **Bulk delete without confirmation** — Any bulk action that is destructive or hard to reverse must require a confirmation `Dialog` specifying exactly what will be affected ("You are about to delete 14 members. This cannot be undone.").
- **`WorkflowBuilderCanvas` as the only way to create automations** — Always provide a simpler template-based path for non-technical users. The canvas is for power users.
- **`AuditLogViewer` without filtering** — Audit logs grow large quickly. Always pair with `AnalyticsFilterBar` (date range, actor, action type at minimum).
- **Hiding `RoleBadge` on `TeamMemberTable` rows** — Role must always be visible in member lists. Do not hide it in an overflow menu or tooltip only.
- **`InviteUserModal` with role assignment after invite** — Role should be assignable at invite time. Requiring a separate step after the invite is confirmed creates gaps in access control.
- **`ApprovalWorkflowPanel` that allows self-approval** — Enforce the business rule that approvers cannot approve their own requests at the component's exposed props level; the consuming app must pass the correct approver list.
- **Inline editing in `PermissionMatrix` without save confirmation** — Permission changes must either auto-save with an immediate undo option (toast with "Undo") or require an explicit "Save" action. Never silently apply mid-edit.

---

## 7. Variants

### Density Increase
- `TeamMemberTable` and `EmployeeDirectoryTable` in compact mode (reduced row height) for power-user admin views.
- `PermissionMatrix` horizontal scroll for organizations with many roles (>6 columns).
- `AuditLogViewer` grouped by day with collapsed entry lists per day for high-volume audit trails.
- `WorkflowBuilderCanvas` with minimap for complex automations with many nodes.

### Mobile Behavior
- Admin interfaces are primarily desktop experiences. On mobile:
  - `TeamMemberTable` collapses to `EmployeeCard`-style list items.
  - `PermissionMatrix` is read-only on mobile; editing requires desktop.
  - `WorkflowBuilderCanvas` is view-only on mobile — show `RuleSummaryCard` list instead.
  - `AuditLogViewer` and `ActivityLogList` render as stacked cards on mobile.
  - `InviteUserModal` opens as a full-screen `Sheet` on mobile.

### Edge Cases
- **Large organizations (1000+ members)**: `TeamMemberTable` must use server-side pagination. Never load all members at once.
- **No permissions assigned**: `PermissionMatrix` with no checked permissions must show a warning state, not a blank table.
- **Circular workflow**: `WorkflowBuilderCanvas` must detect and visually flag circular trigger-action loops before saving.
- **Revoked role mid-session**: If a user's role is revoked while they are active, their next action should trigger a graceful re-authentication / permission check, not a generic error.
- **`ReorderAlertBanner` dismissal**: Allow users to dismiss low-stock alerts per item — once dismissed, re-alert only when stock drops further or restocking is confirmed.
- **Audit log with no entries**: Show an empty state ("No activity in this period") rather than a blank `AuditLogViewer`. Always include the filter state in the empty state message.
