# Component Spec — OrgSwitcher

## 1. Purpose

Allows a user who belongs to multiple organizations to view their current organization and switch to a different one from a compact, inline control — typically placed in a navigation sidebar or header.

Use it when the application supports multi-tenancy and the user may need to switch organizational context.

Do NOT use it as a general navigation menu, for single-org users (hide or disable it in that context), or as a full-page organization listing.

---

## 2. UX Intent

- Primary interaction goal: context switching — the user selects a different organization and the application updates its context accordingly.
- Expected user mental model: a dropdown trigger that displays the current org's identity (avatar + name) and, when activated, reveals a list of orgs to switch to. Familiar from Slack workspaces, GitHub org switcher, and Vercel team switcher.
- UX laws applied:
  - Jakob's Law: follow established patterns for workspace/tenant switchers — trigger shows current selection, dropdown shows alternatives.
  - Hick's Law: limit visible orgs in the dropdown to a manageable count. Provide search if the count exceeds a threshold (e.g., 7+).
  - Fitts's Law: the trigger button must be a large, full-width or near-full-width hit area within the nav, not a small icon.
  - Miller's Law: if the org list grows long, introduce grouping or search rather than rendering an unbounded list.

---

## 3. Visual Behavior

- Layout: a trigger button containing an OrgAvatar, the organization name as text, and a chevron icon indicating the dropdown behavior. The dropdown panel opens below (or above, if near viewport bottom) the trigger.
- Spacing: trigger has comfortable padding from space tokens. Dropdown items have consistent padding and minimum height from size tokens.
- Typography: org name in the trigger uses a body or label scale. Org names in the dropdown use the same scale. A "current" indicator (checkmark or highlight) distinguishes the active org.
- Token usage:
  - Trigger background: transparent or surface token; hover uses a hover-state token.
  - Dropdown surface: elevated surface/popover token with shadow.
  - Active item background: selected/accent muted token.
  - Text: primary foreground token.
  - Chevron icon: secondary foreground token.
  - Border: border token around the dropdown panel.
- Responsive behavior: on mobile, the dropdown may be replaced by a bottom sheet. On desktop, it is an inline popover.

---

## 4. Interaction Behavior

- States:
  - Idle/closed: trigger shows current org identity.
  - Open: dropdown is visible, focus moves into the list.
  - Hovered (trigger): trigger background shifts to hover token.
  - Active/selected org: the current org is visually marked in the list.
  - Loading: if the org list is being fetched, a loading indicator appears inside the dropdown.
- Controlled vs uncontrolled: open state may be controlled via `open` / `onOpenChange` props, or managed internally.
- Keyboard behavior:
  - Enter or Space on the trigger opens the dropdown.
  - Arrow keys navigate the org list.
  - Enter on a list item selects that org.
  - Escape closes the dropdown and returns focus to the trigger.
  - Home/End jump to the first/last list item.
- Screen reader behavior: trigger has an accessible name describing the current org and the expand/collapse state (`aria-expanded`). The dropdown list has `role="listbox"` or `role="menu"`. Each org option has the appropriate role (`role="option"` or `role="menuitem"`). The active org is marked `aria-selected="true"`.
- Motion rules: dropdown open/close uses a short fade and slide transition (from motion tokens). Suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: trigger button has `aria-haspopup="listbox"` (or `"menu"`) and `aria-expanded` reflecting open state. Dropdown list has an accessible label. Active org option has `aria-selected="true"` or `aria-checked="true"`.
- Focus rules: on open, focus moves to the first item in the dropdown (or the active org item). On close (Escape or selection), focus returns to the trigger.
- Contrast expectations: all org names, icons, and the active indicator must meet WCAG AA contrast against their backgrounds in both light and dark modes.
- Reduced motion behavior: open/close transitions are instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: surface, surface-elevated/popover, hover state, selected/active background, primary text, secondary text, border, shadow, space tokens (padding, item height), border-radius.
- Prohibited hardcoded values: no raw hex colors, no pixel-based dimensions, no hardcoded font sizes.
- Dark mode expectations: dropdown panel must be visually elevated above the page background in dark mode. Selected state must remain distinguishable. All text must remain legible.

---

## 7. Composition Rules

- What can wrap it: navigation sidebars, application headers, settings navigation panels.
- What it may contain: an OrgAvatar, org name text, a chevron icon in the trigger; a scrollable list of org items (each containing OrgAvatar + name + optional active indicator) in the dropdown.
- Anti-patterns:
  - Do not place OrgSwitcher inside a dropdown that is already open (nested popovers).
  - Do not use OrgSwitcher as the only way to access org settings; navigation links should also exist.
  - Do not hardcode a list of organizations; the list must always come from props.

---

## 8. Performance Constraints

- Memoization rules: memoize the component. The org list items should be stable references to avoid re-renders when unrelated state changes.
- Virtualization: if the org list exceeds a practical number (e.g., 20+), the dropdown list should be virtualizable by the parent. The component must not force a full re-render of all items on every open.
- Render boundaries: data fetching is the responsibility of the parent. The component renders only what it receives.

---

## 9. Test Requirements

- What must be tested:
  - Trigger displays the current org's avatar and name.
  - Clicking the trigger opens the dropdown.
  - All provided orgs are listed in the dropdown.
  - The active org is visually marked and has the correct ARIA attribute.
  - Selecting a different org calls the `onOrgChange` callback with the correct org identifier.
  - Dropdown closes after selection.
  - Escape key closes the dropdown.
- Interaction cases:
  - Arrow key navigation through the org list.
  - Enter key selects the focused org.
  - Clicking outside the dropdown closes it.
- Accessibility checks:
  - Trigger has `aria-haspopup` and `aria-expanded`.
  - Dropdown list has an accessible label.
  - Active org is `aria-selected` or `aria-checked`.
  - Focus trap and focus restoration work correctly.
  - Contrast passes in both themes.
  - Transitions are suppressed under reduced motion.
