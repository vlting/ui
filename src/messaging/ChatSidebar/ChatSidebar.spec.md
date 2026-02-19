# Component Spec — ChatSidebar

## 1. Purpose

Displays a scrollable list of conversations, direct messages, or channels in the sidebar panel of a messaging interface, allowing users to navigate between conversations.

Use when: rendering the conversation navigation panel within a `ChatLayout.Sidebar` slot.

Do NOT use when: displaying a single conversation thread (use `ChatThread`) or a search/discovery list unrelated to active conversations.

---

## 2. UX Intent

- Primary interaction goal: allow users to find and switch between conversations quickly and confidently.
- Expected user mental model: a scrollable list of conversation items with avatar, name, preview text, timestamp, and unread badge — consistent with mobile messaging app sidebars.
- UX laws applied:
  - **Jakob's Law** — sidebar layout matches conventions from Slack, WhatsApp, and iMessage.
  - **Gestalt (Proximity, Similarity)** — each conversation item is a visually consistent row; groupings (e.g., pinned, recent) are separated by headers.
  - **Miller's Law** — if conversations are numerous, group them into sections (pinned, unread, all) to aid navigation.
  - **Fitts's Law** — conversation rows must be tall enough for comfortable touch interaction.

---

## 3. Visual Behavior

- Layout: vertical scrollable list; optional search/filter input at the top; optional section headers for groupings.
- Each conversation row: avatar/icon, display name, last message preview (truncated), timestamp, and optional unread count badge.
- Active/selected conversation row is highlighted.
- Unread conversations may be visually emphasized (bold title, unread badge).
- Spacing: row height, avatar size, and padding reference space and size tokens.
- Typography: conversation name uses body-medium token; preview text uses caption/muted token; timestamp uses caption token.
- Token usage: row background, active row background, unread badge, and text colors reference theme tokens only.
- Responsive behavior: on mobile the sidebar is a full-screen or drawer view.

---

## 4. Interaction Behavior

- States:
  - **idle**: conversation list rendered.
  - **active/selected**: the currently open conversation is highlighted.
  - **hover**: subtle row background shift.
  - **focus**: visible focus ring on the focused row.
  - **loading**: skeleton rows shown while conversations are loading.
  - **empty**: a meaningful empty state when no conversations exist.
- Controlled: active conversation ID is controlled externally; pressing a row fires `onConversationSelect`.
- Keyboard behavior: arrow keys navigate between rows; `Enter` or `Space` selects a conversation.
- Screen reader behavior: each row announces conversation name, last message preview, timestamp, and unread count.
- Motion rules: row transitions and scroll behavior respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA: sidebar list uses `role="listbox"` or `role="list"`; each row uses `role="option"` or `role="listitem"` with `aria-selected` for the active conversation.
- Unread count badge is announced as part of the row (e.g., "3 unread messages").
- Avatar images have `alt` text with the contact name or are `aria-hidden` if redundant.
- Focus: focus ring is visible on all rows.
- Contrast: row text and badge colors meet WCAG 2.1 AA.
- Reduced motion: suppress row entrance animations.

---

## 6. Theming Rules

- Required tokens: `background`, `backgroundHover`, `backgroundSelected`, `borderColor`, `color`, `colorMuted`, `colorUnread`, `backgroundBadge`, `focusStyle`, `space`, `size` (avatar).
- Prohibited hardcoded values: no literal color strings, pixel spacing, or avatar dimensions.
- Dark mode: selected row and unread badge tokens must maintain sufficient contrast in dark themes.

---

## 7. Composition Rules

- Placed inside `ChatLayout.Sidebar`.
- Renders `ConversationListItem` components (or equivalent) per conversation.
- Does not fetch conversation data; receives a conversations array as props.
- Anti-patterns:
  - Do not implement message routing or real-time updates inside this component.
  - Do not hardcode conversation names or preview text.
  - Do not nest another `ChatSidebar` inside this component.

---

## 8. Performance Constraints

- Virtualize long conversation lists (50+ items) to avoid rendering off-screen rows.
- Memoize conversation rows when their props are stable.
- No internal data fetching or subscriptions.

---

## 9. Test Requirements

- Renders the correct number of conversation rows from props.
- Active conversation row is highlighted and has `aria-selected="true"`.
- Pressing a row fires `onConversationSelect` with the correct conversation ID.
- Unread count badge is rendered and announced by screen readers.
- Loading state renders skeleton rows.
- Empty state renders a meaningful message.
- Keyboard navigation (arrow keys, Enter, Space) works correctly.
- Focus ring is visible on focused rows.
- Passes axe accessibility audit in idle and loading states.
