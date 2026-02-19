# Component Spec — TypingIndicator

## 1. Purpose

Displays a visual indication that one or more participants in a conversation are currently typing, typically shown as animated dots or a text label below the message thread.

Use when: communicating in real time that another party is composing a message in the active conversation.

Do NOT use when: showing general presence or online status (use an avatar status indicator) or indicating an upload or processing operation (use `UploadProgressItem`).

---

## 2. UX Intent

- Primary interaction goal: give the user context that a reply is being composed, reducing perceived wait time and setting expectations.
- Expected user mental model: three animated bouncing dots with an optional "Alice is typing…" label — universally recognized across messaging platforms.
- UX laws applied:
  - **Doherty Threshold** — the indicator must appear immediately when typing begins; latency above 400 ms breaks the "live" illusion.
  - **Jakob's Law** — three animated dots match the universal typing indicator convention.
  - **Gestalt (Proximity)** — the indicator appears in the same position as incoming message bubbles, reinforcing its association with the other participant.

---

## 3. Visual Behavior

- Layout: horizontal row (`XStack` based) — three animated dots, optionally preceded by a small avatar and followed by a label (e.g., "Alice is typing…").
- Dots: three equal-size circles that animate in a sequential bouncing or pulsing pattern.
- When multiple participants are typing, the label adapts (e.g., "Alice and Bob are typing…" or "Several people are typing…").
- Spacing: dot size, spacing between dots, and padding reference size and space tokens.
- Typography: optional label uses caption/muted token.
- Token usage: dot color, dot background, and label text colors reference theme tokens only.
- Responsive behavior: the indicator is inline with the message thread; it does not take up significant vertical space.

---

## 4. Interaction Behavior

- States:
  - **visible**: indicator is shown when at least one participant is typing.
  - **hidden**: indicator is not rendered when no one is typing.
  - **multiple typers**: label adapts to reflect multiple participants.
- The indicator is purely presentational; it does not respond to user interaction.
- Controlled: visibility and participant names are controlled externally.
- Keyboard behavior: the indicator is not interactive and is not focusable.
- Screen reader behavior: the indicator is announced as a polite live region update (e.g., "Alice is typing") when it appears; it should not be announced repeatedly on every animation frame.
- Motion rules: the dot animation must respect `prefers-reduced-motion`; when reduced motion is active, the dots are static and only the label communicates the typing state.

---

## 5. Accessibility Requirements

- ARIA: the container uses `aria-live="polite"` and `aria-atomic="true"` so that the typing status is announced once when it changes; the animated dots are `aria-hidden="true"`.
- The accessible announcement is text-based (e.g., "Alice is typing…"), not reliant on the animation.
- Contrast: dot color and label text meet WCAG 2.1 AA.
- The indicator must not be announced repeatedly while the animation plays; only on entry and removal.
- Reduced motion: dots are static; label alone communicates state.

---

## 6. Theming Rules

- Required tokens: `color` (dot fill), `colorMuted` (label text), `space` (gap between dots), `size` (dot diameter).
- Dot animation timing (duration, easing) is defined via tokens or CSS custom properties, not hardcoded values.
- Prohibited hardcoded values: no literal color strings, pixel sizes, or animation durations.
- Dark mode: dot and label tokens must maintain sufficient contrast in dark themes.

---

## 7. Composition Rules

- Rendered at the bottom of the `ChatThread` message list, in the same visual position as an incoming message bubble.
- Receives a list of typing participant names (or count) as props.
- Does not manage the typing detection logic; the consumer pushes typing state changes as props.
- Anti-patterns:
  - Do not implement WebSocket or typing event logic inside this component.
  - Do not hardcode participant names.
  - Do not make this component interactive (e.g., pressable).

---

## 8. Performance Constraints

- The animation is CSS-driven to avoid JavaScript animation overhead.
- No internal timers or subscriptions.
- The component mounts and unmounts in response to the consumer's typing state; it does not persist internally.

---

## 9. Test Requirements

- Renders three animated dots when at least one participant is typing.
- Renders an appropriate label for one, two, and many typers.
- Does not render when the participant list is empty.
- Animated dots have `aria-hidden="true"`.
- The container has `aria-live="polite"` and `aria-atomic="true"`.
- When `prefers-reduced-motion: reduce` is active, dots are static and the label alone conveys state.
- No hardcoded color, spacing, or animation duration values in rendered output.
- Passes axe accessibility audit in visible and hidden states.
