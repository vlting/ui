# Component Spec — ReadReceipt

## 1. Purpose

Displays a compact indicator showing which recipients have read a message, typically rendered as a row of small avatars or a status label beneath an outgoing message bubble.

Use when: indicating message read status to the sender in a one-on-one or group conversation.

Do NOT use when: showing delivery-only status (use the `MessageBubble.Status` slot) or displaying a full participant list.

---

## 2. UX Intent

- Primary interaction goal: give the sender confidence that their message has been seen, using a lightweight indicator that does not distract from the message content itself.
- Expected user mental model: a row of small avatar thumbnails (or a text label like "Read") beneath an outgoing message — consistent with iMessage, WhatsApp, and Facebook Messenger.
- UX laws applied:
  - **Gestalt (Proximity)** — avatars are tightly grouped and positioned immediately below the message bubble they relate to.
  - **Miller's Law** — when many participants have read the message, collapse individual avatars to a count (e.g., "+3") to avoid visual overload.
  - **Fitts's Law** — individual avatar touch targets should be large enough if they are pressable (e.g., to show a list of who has read); otherwise they are decorative.

---

## 3. Visual Behavior

- Layout: horizontal row (`XStack` based) of small circular avatars; rendered at trailing edge below an outgoing message.
- When the read count exceeds a display threshold (e.g., 3), collapse excess avatars into a "+N" overflow indicator.
- Avatars: circular; render an image if available, or initials as a fallback.
- An optional text label ("Read", "Seen") may replace or supplement the avatars for simple one-on-one conversations.
- Spacing: avatar size, overlap offset, and row gap reference size and space tokens.
- Typography: overflow count and optional text label use a caption token.
- Token usage: avatar border, overflow count background, and label text colors reference theme tokens only.
- Responsive behavior: the row does not grow to fill the full thread width; it is constrained to a compact size.

---

## 4. Interaction Behavior

- States:
  - **no readers**: component is not rendered (or renders empty).
  - **one or more readers**: avatars rendered in a row.
  - **overflow**: excess readers collapsed to "+N" indicator.
  - **pressable** (optional): pressing the row or the "+N" opens a full reader list (managed by consumer).
- Controlled: reader list is provided externally as props.
- Keyboard behavior: if pressable, the row is focusable and activates on `Enter` or `Space`.
- Screen reader behavior: the component announces "Read by [names]" or "Read by [N] people" as a single accessible label.
- Motion rules: avatar entrance animation (when new reader appears) respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA: the row container has an `aria-label` summarizing who has read the message (e.g., "Read by Alice and 2 others"); individual avatars are `aria-hidden` if redundant with the group label.
- If pressable, use `role="button"` with the accessible label on the container.
- Contrast: overflow count text and initials fallback meet WCAG 2.1 AA.
- Reduced motion: suppress avatar entrance animations.

---

## 6. Theming Rules

- Required tokens: `backgroundAvatar` (fallback avatar), `colorAvatar` (initials text), `borderColor` (avatar ring), `color` (overflow count, label), `colorMuted`, `space`, `size` (avatar diameter).
- Prohibited hardcoded values: no literal color strings, pixel avatar sizes, or overlap offsets.
- Dark mode: avatar ring and count tokens must maintain sufficient contrast in dark themes.

---

## 7. Composition Rules

- Rendered as a sub-component beneath `MessageBubble` for outgoing messages.
- Receives an array of reader objects (name, avatarUrl) as props.
- Does not manage read receipt logic or update itself; reads are pushed in by the consumer.
- Anti-patterns:
  - Do not show read receipts for incoming messages; they are only for outgoing messages.
  - Do not hardcode reader names or avatar URLs.
  - Do not implement the "seen by" detail list inside this component; delegate to a consumer-managed overlay.

---

## 8. Performance Constraints

- No internal data fetching or subscriptions.
- Avatar images are loaded lazily; the component renders immediately with initials fallback.
- Memoize when the reader list prop is stable.

---

## 9. Test Requirements

- Renders a circular avatar for each reader from the reader list prop.
- When the reader count exceeds the display threshold, renders a "+N" overflow indicator.
- When the reader list is empty, the component renders nothing (or is hidden).
- The row `aria-label` correctly summarizes who has read the message.
- Individual avatars are `aria-hidden` when the group label is present.
- If pressable, the row fires `onPress` and is keyboard-accessible.
- No hardcoded color, spacing, or size values in rendered output.
- Passes axe accessibility audit in idle and overflow states.
