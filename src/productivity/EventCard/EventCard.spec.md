# Component Spec — EventCard

## 1. Purpose

Displays a single calendar event as a compact, structured card. Communicates the essential details of an event — its time, title, and optional location — in a scannable format suitable for use within calendar views, event lists, or agenda panels.

Use when: rendering one or more events in a list, day view, or agenda context where each event needs clear visual separation and hierarchy.

Do NOT use when: a simple text label is sufficient, or when the event requires extensive detail (use a full EventDetailPanel instead).

---

## 2. UX Intent

- Primary interaction goal: Allow users to quickly scan event metadata (time, title, location) and understand what is happening and when, without requiring navigation.
- Expected user mental model: Users expect an event card to behave like an appointment entry in a calendar app — a bounded block with a clear title and time (Jakob's Law).
- UX laws applied:
  - Jakob's Law: Follow familiar event card patterns from native OS calendars and popular productivity apps.
  - Gestalt (Figure/Ground): The card's container creates a clear boundary, distinguishing the event from the surrounding surface.
  - Gestalt (Hierarchy): Time appears before title, which appears before location — matching expected reading order.
  - Fitts's Law: The entire card surface should be a tap target if the card is interactive.
  - Miller's Law: Limit displayed metadata to the most essential fields (time, title, location) to avoid cognitive overload.

---

## 3. Visual Behavior

- Layout rules:
  - The card is a vertical stack (EventCard > Time, Title, Location from top to bottom).
  - Time is displayed at the top in a smaller, secondary text style.
  - Title is the primary label — larger and higher weight.
  - Location is optional and displayed below the title in a smaller, secondary style with an optional icon prefix.
  - A left-edge accent bar may be used to communicate event category or color coding.
- Spacing expectations: Consistent internal padding using space tokens. Vertical gap between Time, Title, and Location uses a smaller space token to maintain visual cohesion.
- Typography rules: Title uses a body or label token at medium/semibold weight. Time and Location use a caption or small body token at regular weight.
- Token usage: Background, border, text, and accent colors must use design tokens exclusively.
- Responsive behavior: The card stretches to fill its container's width. On narrow viewports the title may truncate to one or two lines with an ellipsis.

---

## 4. Interaction Behavior

- States:
  - Idle: Static display of event metadata.
  - Hover (web): Subtle background elevation or color shift to signal interactivity.
  - Focus: Visible focus ring around the card boundary.
  - Active/Pressed: Brief press feedback (scale or opacity change).
  - Disabled: Card is non-interactive, de-emphasized opacity.
  - Past event: Visually de-emphasized (reduced opacity or muted color tokens) to indicate the event has elapsed.
- Controlled vs uncontrolled: EventCard is a purely presentational component. No internal state. All data is supplied via props.
- Keyboard behavior:
  - If the card is interactive, it must be focusable via Tab.
  - Enter or Space activates the card's primary action.
- Screen reader behavior:
  - The card is announced as a single logical unit.
  - The accessible label combines time, title, and location into a coherent sentence (e.g., "2:00 PM – 3:00 PM, Team Standup, Conference Room A").
  - Past events are identified with supplementary text (e.g., "past event").
- Motion rules: Press/hover transitions use a brief duration (under 150ms). Entrance animations (if used in a list) follow the list's animation orchestration. All motion is suppressed under reduced motion preference.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - Interactive cards use `role="button"` or are wrapped in a native interactive element.
  - Non-interactive cards use `role="article"` or are presentational with an accessible label.
  - Time sub-component uses `<time>` semantics with a machine-readable `dateTime` attribute when rendered in HTML contexts.
- Focus rules: If interactive, the card is included in the natural Tab order. Focus ring must be clearly visible and use the focus token.
- Contrast expectations: Title text must meet 4.5:1 contrast. Time and Location text must meet at least 3:1. The accent bar must not be the sole means of conveying category information.
- Reduced motion behavior: Hover and press transitions are instant. No entrance slide or fade animations.

---

## 6. Theming Rules

- Required tokens: surface background, surface border, text primary (title), text secondary (time, location), accent/category color, focus ring color, radius, space.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Surface tokens must shift to dark-mode equivalents. Accent colors must remain distinguishable against dark surfaces. Text tokens must ensure adequate contrast in dark mode.

---

## 7. Composition Rules

- What can wrap it: CalendarView day cells, agenda list containers, horizontal scroll strips for day view events.
- What it may contain:
  - EventCard.Time: the event's time range.
  - EventCard.Title: the event name.
  - EventCard.Location: optional venue or meeting link.
  - An optional status badge or icon.
- Anti-patterns:
  - Do not embed interactive forms or editable fields inside EventCard.
  - Do not nest EventCard inside another EventCard.
  - Do not display more than 3–4 metadata fields; use an EventDetailPanel for rich data.

---

## 8. Performance Constraints

- Memoization rules: EventCard should be memoized at the list level. Re-renders should only occur when event data props change.
- Virtualization: When used inside an agenda or day list with many events, the parent list container must handle virtualization. EventCard itself does not manage list virtualization.
- Render boundaries: EventCard is a leaf component and should not trigger parent re-renders.

---

## 9. Test Requirements

- What must be tested:
  - Time, Title, and Location sub-components render their supplied content.
  - Location sub-component renders nothing when no location is provided.
  - Past event variant applies de-emphasis styling.
  - Interactive card responds to press/click events.
- Interaction cases:
  - Keyboard Enter and Space activate the card when it is interactive.
  - Tab includes the card in focus order when interactive.
  - Non-interactive cards are not included in Tab order.
- Accessibility checks:
  - The card has an accessible label that communicates all essential event data.
  - Time element has a machine-readable `dateTime` attribute.
  - Focus ring is visible on keyboard focus.
  - Contrast ratios pass for title and secondary text in both light and dark themes.
  - Reduced motion suppresses all transitions.
