# Component Spec — ChatThread

## 1. Purpose

Renders the scrollable message history for a single conversation, displaying a chronological sequence of message bubbles, date separators, and system messages.

Use when: displaying the full message history of a conversation within a `ChatLayout.Thread` slot.

Do NOT use when: displaying a list of conversations (use `ChatSidebar`) or a single message in isolation (use `MessageBubble`).

---

## 2. UX Intent

- Primary interaction goal: allow users to read a full conversation history and understand the chronological flow of messages.
- Expected user mental model: a vertically scrolling feed of message bubbles, with newer messages at the bottom — consistent with every major mobile and web messaging application.
- UX laws applied:
  - **Jakob's Law** — messages are anchored at the bottom, newest at the bottom, matching universal messaging app conventions.
  - **Gestalt (Continuity, Proximity)** — consecutive messages from the same sender are visually grouped; date separators clearly delineate time breaks.
  - **Doherty Threshold** — new messages must appear within 400 ms of receipt; the thread must scroll to the latest message automatically on new arrival.

---

## 3. Visual Behavior

- Layout: vertical scrollable column; messages flow top to bottom; the view is anchored at the bottom (auto-scrolls to latest message).
- Outgoing messages are right-aligned; incoming messages are left-aligned (in LTR; reversed in RTL).
- Date separators appear between messages from different calendar days.
- System messages (e.g., "Alice joined the conversation") are centered and styled differently from user message bubbles.
- A "new messages" indicator or scroll-to-bottom button appears when the user has scrolled up and a new message arrives.
- Spacing: vertical gaps between messages, group spacing, and date separator margins reference space tokens.
- Typography: see `MessageBubble` for message text tokens; date separators use caption/muted token.
- Token usage: thread background, date separator text, and system message text reference theme tokens only.
- Responsive behavior: full width at all viewports; message bubble max-width is constrained to a token-defined percentage of the thread width.

---

## 4. Interaction Behavior

- States:
  - **idle**: messages rendered; scrolled to bottom.
  - **loading**: skeleton message bubbles shown while initial history loads.
  - **loading more** (pagination): a loading indicator at the top while older messages load.
  - **empty**: a meaningful empty state when the conversation has no messages.
  - **error**: an error state when messages fail to load.
  - **new message**: auto-scrolls to bottom if the user is already near the bottom; shows a "new messages" indicator otherwise.
- The thread is not interactive in itself; interactions are handled by child `MessageBubble` components.
- Controlled: message list is provided externally; scroll position is managed internally with escape hatches (e.g., a scroll-to-bottom prop).
- Keyboard behavior: scrollable region is focusable and scrollable via keyboard; individual messages and interactive elements within bubbles are reachable by Tab.
- Screen reader behavior: the thread is announced as a log region (`role="log"` or `aria-live="polite"`) so new messages are announced as they arrive.
- Motion rules: auto-scroll animation respects `prefers-reduced-motion`; instant jump to bottom when reduced motion is active.

---

## 5. Accessibility Requirements

- ARIA: thread container uses `role="log"` with `aria-live="polite"` and `aria-label` (e.g., "Message thread with Alice").
- New messages are announced by the live region.
- Date separators use `role="separator"` or are announced via `aria-label`.
- Scroll-to-bottom button has an accessible label.
- Reduced motion: disable smooth-scroll animation; jump to bottom instantly.

---

## 6. Theming Rules

- Required tokens: `background`, `color` (system message text), `colorMuted` (date separator), `space` (message gap, group gap).
- Message bubble max-width uses a size token (e.g., `$12` or equivalent percentage).
- Prohibited hardcoded values: no literal color strings, pixel spacing, or max-width values.
- Dark mode: thread background and separator tokens must resolve correctly in dark themes.

---

## 7. Composition Rules

- Renders `MessageBubble` instances and date separators from a message array prop.
- Placed inside `ChatLayout.Thread`.
- Does not fetch messages; receives message array as prop.
- Anti-patterns:
  - Do not implement message sending or real-time subscription inside this component.
  - Do not hardcode message alignment rules; derive from sender identity in the message data.
  - Do not nest another `ChatThread` inside this component.

---

## 8. Performance Constraints

- Virtualize long message histories to avoid rendering hundreds of off-screen message bubbles.
- New messages appended at the bottom must not cause full list re-renders.
- Scroll anchor at the bottom must be maintained during resize.
- No internal data fetching or WebSocket subscriptions.

---

## 9. Test Requirements

- Renders all messages from the message array prop.
- Outgoing messages are right-aligned; incoming messages are left-aligned.
- Date separators appear between messages from different days.
- Auto-scrolls to the latest message on initial load and on new message arrival.
- "New messages" indicator appears when scrolled up and a new message arrives.
- Loading state renders skeleton message bubbles.
- Empty state renders a meaningful empty message.
- New messages are announced via the live region.
- Scroll-to-bottom button has a correct accessible label.
- Passes axe accessibility audit in idle and loading states.
