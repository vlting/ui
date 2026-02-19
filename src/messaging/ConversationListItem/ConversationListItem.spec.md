# Component Spec — ConversationListItem

## 1. Purpose

Renders a single conversation entry in a sidebar or conversation list, showing avatar, display name, last message preview, timestamp, and an optional unread count badge.

Use when: rendering individual rows within `ChatSidebar` or any other conversation list.

Do NOT use when: displaying a full message thread (use `ChatThread`) or a contact card with full profile information.

---

## 2. UX Intent

- Primary interaction goal: allow users to identify a conversation and switch to it with a single press.
- Expected user mental model: a contact/conversation row — avatar, name, preview, time, and badge — matching mobile messaging app list items.
- UX laws applied:
  - **Jakob's Law** — row layout matches messaging app conventions (avatar left, name + preview center, time + badge right).
  - **Fitts's Law** — the entire row is a pressable tap target, not just the name or avatar.
  - **Gestalt (Proximity)** — name and preview are stacked vertically; timestamp and badge are right-aligned as a visual pair.

---

## 3. Visual Behavior

- Layout: horizontal row — avatar on the leading edge, name + preview stacked in the center, timestamp + unread badge stacked on the trailing edge.
- Avatar: circular; renders an image if a URL is provided, or initials as a fallback.
- Name: single line, truncated with ellipsis.
- Preview: single line, truncated with ellipsis; muted color.
- Timestamp: formatted relatively (e.g., "2m", "Yesterday") or absolutely.
- Unread badge: a small pill or circle with unread count; hidden when count is 0.
- Active state: row is highlighted when this conversation is the selected one.
- Spacing: row height, avatar size, and internal padding reference size and space tokens.
- Typography: name uses body-medium token; preview uses caption/muted token; timestamp uses caption token; badge uses a numeric caption token.
- Token usage: all colors reference theme tokens.
- Responsive behavior: row fills container width; avatar size and badge scale per size tokens.

---

## 4. Interaction Behavior

- States:
  - **idle**: row rendered with conversation data.
  - **selected/active**: row highlighted.
  - **hover**: subtle background shift.
  - **focus**: visible focus ring on the row.
  - **loading**: skeleton version of the row with placeholder shapes.
  - **muted/archived**: visual treatment (e.g., reduced opacity or icon) indicating the conversation is muted or archived.
- Controlled: selected state is passed as a prop from the parent list; pressing fires `onPress`.
- Keyboard behavior: `Enter` or `Space` activates the row when focused.
- Screen reader behavior: the row announces the conversation name, preview snippet, timestamp, and unread count (e.g., "Alice, Hey are you free later?, 2 minutes ago, 3 unread messages").
- Motion rules: hover and selection transitions respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA: `role="option"` with `aria-selected` when inside a `listbox`; `role="listitem"` when inside a plain list.
- The entire row's accessible name must combine name, preview, timestamp, and unread count.
- Avatar image must have `alt` set to the contact name, or `aria-hidden` if the name is already in the row text.
- Unread count must be part of the accessible name or described via `aria-describedby`.
- Focus: focus ring must be clearly visible.
- Contrast: name, preview, timestamp, and badge colors meet WCAG 2.1 AA.
- Reduced motion: suppress hover and selection transitions.

---

## 6. Theming Rules

- Required tokens: `background`, `backgroundHover`, `backgroundSelected`, `color`, `colorMuted`, `colorBadge`, `backgroundBadge`, `focusStyle`, `space`, `size` (avatar).
- Prohibited hardcoded values: no literal color strings, pixel dimensions, or border-radius values.
- Dark mode: selected and hover tokens must maintain sufficient contrast in dark themes.

---

## 7. Composition Rules

- Rendered inside `ChatSidebar` or a generic conversation list.
- Receives conversation data (id, name, avatarUrl, previewText, timestamp, unreadCount, isSelected) as props.
- Anti-patterns:
  - Do not implement message fetching or real-time data inside this component.
  - Do not hardcode conversation names, preview text, or timestamps.
  - Do not nest another `ConversationListItem` inside this component.

---

## 8. Performance Constraints

- Memoize when rendered in a long virtualized list.
- Avatar images are loaded lazily; the row renders immediately with an initials fallback.
- No internal data fetching or subscriptions.

---

## 9. Test Requirements

- Renders avatar, name, preview, timestamp, and unread badge from props.
- When unreadCount is 0, the badge is not visible.
- Selected state renders the row with the selected background token.
- Pressing the row fires `onPress` with the conversation ID.
- Loading state renders a skeleton row.
- Focus ring is visible when focused via keyboard.
- Screen reader announces name, preview, timestamp, and unread count together.
- Passes axe accessibility audit in idle, selected, and loading states.
