# Component Spec — ActivityLogList

## 1. Purpose

Displays a chronological, scrollable list of activity events for an organization, team, or resource.

Use it wherever a feed of timestamped user or system actions must be presented — such as in a settings sidebar, a dashboard panel, or a dedicated activity page.

Do NOT use it to display non-chronological structured data (use a table instead), or when only a single event needs to be shown.

---

## 2. UX Intent

- Primary interaction goal: scanning — the user reads through recent events to understand what has happened and when.
- Expected user mental model: a reverse-chronological news feed or changelog. The most recent item appears at the top.
- UX laws applied:
  - Serial Position Effect: the most important (most recent) entries are positioned at the top where attention naturally lands.
  - Gestalt Law of Proximity: each log entry is visually grouped as a unit with consistent spacing between entries.
  - Miller's Law: the list should not overwhelm the user; pagination or infinite scroll handles large data sets so only a digestible number of items is visible at once.

---

## 3. Visual Behavior

- Layout: vertical stack of log entries, full-width of its container. Each entry occupies its own row.
- Spacing: consistent vertical gap between entries using a space token. Internal padding within each entry uses space tokens.
- Typography: timestamp rendered in a secondary/caption text style. Actor name and action text use a body or label style. No hardcoded font sizes.
- Token usage:
  - Dividers (if used): border color tokens.
  - Entry backgrounds: surface or muted surface tokens; alternating background optional via token.
  - Text: primary and secondary foreground tokens.
- Responsive behavior: full-width at all breakpoints. On narrow viewports, entry metadata (e.g., timestamp) may shift below the action text rather than inline.

---

## 4. Interaction Behavior

- States:
  - Idle: list is populated and scrollable.
  - Empty: displays an empty-state message when no activity exists.
  - Loading: displays a skeleton or spinner while data is being provided by the parent.
  - Error: parent is responsible for error state; this component renders whatever items it receives.
- Controlled vs uncontrolled: display-only; accepts an array of activity items as props. No internal state for selection.
- Keyboard behavior: the list container is scrollable via keyboard if it has a fixed height. Individual entries are not focusable unless they contain interactive children (e.g., a link).
- Screen reader behavior: the list should be marked as a list (semantic list element or role="list"). Each entry is a list item with a complete readable description (actor + action + timestamp).
- Motion rules: new items appending to the top may use a brief fade-in; this animation must be suppressed when the user has reduced motion enabled.

---

## 5. Accessibility Requirements

- ARIA requirements: use semantic list markup or `role="list"` with `role="listitem"` for each entry. Timestamps should be rendered in a `<time>` element with a machine-readable `datetime` attribute.
- Focus rules: the list itself is not focusable. If entries contain links or buttons, those must be keyboard-reachable in source order.
- Contrast expectations: all text must meet WCAG AA contrast against their background tokens.
- Reduced motion behavior: suppress any entry-appear animations when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- Required tokens: surface background, primary text, secondary/muted text, border/divider, space (gap between entries), border-radius (for entry cards if card layout is used).
- Prohibited hardcoded values: no raw hex colors, no pixel-based margins or paddings, no hardcoded font sizes.
- Dark mode expectations: all token references must resolve correctly in dark mode. Divider lines and muted backgrounds must remain distinguishable without relying on color alone.

---

## 7. Composition Rules

- What can wrap it: page sections, settings panels, dashboard cards, drawer/sheet bodies.
- What it may contain: a repeating list of activity entry items. Each entry may contain text, an avatar, a timestamp, and optionally a link or badge.
- Anti-patterns:
  - Do not place interactive controls (buttons, filters) inside the list itself; those belong in a parent toolbar.
  - Do not use ActivityLogList to display grouped or categorized data — it is strictly chronological.
  - Do not hardcode a fixed number of visible items in the component itself.

---

## 8. Performance Constraints

- Memoization rules: memoize the component if the items array is stable across renders. Each entry item should be individually memoized when rendering large lists.
- Virtualization: for lists exceeding a practical threshold (e.g., 50+ items), the parent should provide virtualization. The component itself must not assume a short list.
- Render boundaries: the component renders only what it receives. It must not trigger side effects or data fetching.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct number of entries from the provided items array.
  - Displays the empty state when items is empty.
  - Each entry displays actor, action description, and timestamp.
  - Entries are rendered in the correct order (most recent first).
- Interaction cases:
  - If entries contain links, verify keyboard navigation reaches them in order.
- Accessibility checks:
  - List and list item semantics are present.
  - Timestamps have readable text and machine-readable `datetime`.
  - Contrast passes for body and secondary text in both themes.
  - Animations are suppressed under `prefers-reduced-motion`.
