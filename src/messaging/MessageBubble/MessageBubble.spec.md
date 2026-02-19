# Component Spec — MessageBubble

## 1. Purpose

Renders a single message in a conversation thread, including the message content, timestamp, delivery status, and optional metadata, in a visually differentiated bubble appropriate for the sender direction (outgoing vs. incoming).

Use when: rendering individual messages within `ChatThread`.

Do NOT use when: displaying a system notification or date separator in the thread (these are separate components) or showing a conversation summary (use `ConversationListItem`).

---

## 2. UX Intent

- Primary interaction goal: communicate message content, sender identity, time sent, and delivery status clearly and without ambiguity.
- Expected user mental model: a colored speech bubble aligned to one side — right for outgoing, left for incoming — consistent with all major messaging applications.
- UX laws applied:
  - **Jakob's Law** — bubble alignment and color conventions match SMS, iMessage, WhatsApp, and Slack.
  - **Gestalt (Figure/Ground, Proximity)** — bubble shape creates a clear figure; timestamp and status are secondary elements grouped beneath.
  - **Doherty Threshold** — new message bubbles must render and be readable within 400 ms.

---

## 3. Visual Behavior

- Layout: composed via `MessageBubble.Content`, `MessageBubble.Timestamp`, and `MessageBubble.Status` sub-components within the `MessageBubble` root.
- Outgoing: right-aligned; bubble color uses an outgoing token.
- Incoming: left-aligned; bubble color uses an incoming token.
- Content slot: text content, optional media embed, or attachment preview; supports rich content passed as children.
- Timestamp slot: small muted text below the bubble.
- Status slot: delivery status icon (sent, delivered, read); positioned near the timestamp for outgoing messages.
- Bubble tail (corner accent): indicates sender direction; corner radius adjusts for grouped consecutive messages.
- Spacing: bubble padding, tail size, and status icon size reference space and size tokens.
- Typography: message text uses body token; timestamp uses caption/muted token.
- Token usage: all bubble background, text, and status icon colors reference theme tokens only.
- Responsive behavior: bubble max-width is a token-defined fraction of the thread width; text wraps naturally.

---

## 4. Interaction Behavior

- States:
  - **idle**: message rendered.
  - **sending**: outgoing message with a "sending" status indicator (spinner or clock icon).
  - **sent**: checkmark or single tick.
  - **delivered**: double checkmark.
  - **read**: double checkmark with read color.
  - **failed**: error indicator; a retry action may be provided.
  - **selected** (for forwarding or deletion): bubble highlighted.
  - **long-pressed** (mobile): triggers a context menu (managed by consumer).
- Controlled: status and selection state are provided externally.
- Keyboard behavior: if interactive (e.g., for selection), activates on `Enter` or `Space`; context menu trigger is keyboard-accessible.
- Screen reader behavior: the bubble announces sender name (if shown), message content, timestamp, and delivery status in a single accessible label or via structured children.
- Motion rules: new message entrance animation respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA: `role="listitem"` within the thread list; the accessible name combines sender, content summary, timestamp, and status.
- Status icons are not icon-only: they have `aria-label` descriptions (e.g., "Read").
- Timestamps communicate the full date/time via `aria-label` or `title` even when displayed in relative format.
- Contrast: message text on the bubble background meets WCAG 2.1 AA (4.5:1 for normal text).
- Reduced motion: suppress entrance animations.

---

## 6. Theming Rules

- Required tokens: `backgroundOutgoing`, `backgroundIncoming`, `color` (outgoing text), `colorIncoming` (incoming text), `colorMuted` (timestamp), `colorStatusSent`, `colorStatusDelivered`, `colorStatusRead`, `space`, `borderRadius`.
- Prohibited hardcoded values: no literal color strings, pixel padding, or border-radius values.
- Dark mode: outgoing and incoming bubble tokens must maintain readability and contrast in dark themes.

---

## 7. Composition Rules

- Composed using `MessageBubble`, `MessageBubble.Content`, `MessageBubble.Timestamp`, `MessageBubble.Status`.
- Content slot accepts text, `AttachmentPreview`, or `VoiceMessagePlayer` as children.
- Rendered inside `ChatThread` as part of a list.
- Anti-patterns:
  - Do not implement message sending or deletion logic inside this component.
  - Do not hardcode sender names, message content, or timestamps.
  - Do not nest another `MessageBubble` inside a `MessageBubble`.

---

## 8. Performance Constraints

- Memoize when rendered in a long virtualized list.
- Rich content (images, video embeds) within the Content slot must load lazily.
- No internal data fetching or subscriptions.

---

## 9. Test Requirements

- Renders message content, timestamp, and status from props.
- Outgoing bubble is right-aligned; incoming bubble is left-aligned.
- Each status state (sending, sent, delivered, read, failed) renders the correct icon and `aria-label`.
- Failed state renders a retry indicator.
- Selected state renders a visible highlight.
- Sender and content are included in the accessible name.
- Timestamp `aria-label` contains the full date/time.
- No hardcoded color, spacing, or border-radius values in rendered output.
- Passes axe accessibility audit in outgoing, incoming, and failed states.
