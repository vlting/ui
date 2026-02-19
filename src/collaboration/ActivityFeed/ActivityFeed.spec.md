# Component Spec — ActivityFeed

## 1. Purpose

Displays a chronological or reverse-chronological stream of collaboration events (comments, edits, mentions, reactions, status changes) within a shared document or workspace context.

Use when: Users need awareness of recent activity by collaborators in a shared context.

Do NOT use when: Displaying a single isolated notification, or when the list of events is not related to collaborative document work. For general notification feeds, use a dedicated notification component instead.

---

## 2. UX Intent

- Primary interaction goal: Allow users to quickly scan recent collaborative events and understand what has changed since their last visit.
- Expected user mental model: A scrollable, time-ordered log similar to a chat history or audit trail — familiar from tools like Notion, Google Docs, or Slack activity panels.
- UX laws applied:
  - Jakob's Law: Mirrors the familiar vertical activity log pattern users know from productivity apps.
  - Miller's Law: Items should be grouped or paginated to avoid cognitive overload — avoid displaying more than 7-10 uninterrupted items without a visual separator or load-more affordance.
  - Doherty Threshold: New activity should appear without perceptible delay; optimistic rendering is preferred.

---

## 3. Visual Behavior

- Layout: Vertical stack of activity items, ordered newest-first or oldest-first depending on context. Each item occupies a full-width row.
- Spacing: Consistent gap between items using spacing tokens. Items should not feel cramped or overly spaced — use a medium spacing token.
- Typography: Actor name in a prominent weight; action description in regular weight; timestamp in a subdued style using a secondary text color token.
- Token usage: Background, border, and text colors must all reference theme tokens. No hardcoded values.
- Responsive behavior: Full width on mobile. On wider viewports, may be constrained to a sidebar width. Should not overflow horizontally.

---

## 4. Interaction Behavior

- States:
  - Idle: Displays list of activity items.
  - Empty: Displays an empty state message indicating no activity yet.
  - Loading: Displays a skeleton or spinner placeholder while items are being fetched by the parent.
  - Error: Accepts an error state prop; renders an error message provided by the parent.
- Controlled vs uncontrolled: Fully controlled — the parent supplies the list of activity items as props. The component does not manage its own data.
- Keyboard behavior: The feed is scrollable via keyboard (arrow keys, Page Up/Down). Individual items that are interactive must be reachable via Tab.
- Screen reader behavior: The feed container should be announced as a list. Each item should be a list item with a meaningful accessible label summarizing the event.
- Motion rules: New items appearing in the feed should animate in subtly (fade or slide). Animation must be disabled or reduced when the user has enabled reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: Container should use `role="feed"` or `role="list"`. Each activity item should use `role="article"` or `role="listitem"`. Timestamps should be rendered using a `<time>` element with a machine-readable `datetime` attribute.
- Focus rules: Focus should not be trapped within the feed. If items contain interactive controls (e.g., reply buttons), those must be focusable in DOM order.
- Contrast expectations: All text must meet WCAG AA contrast ratios against the feed background. Subdued timestamp text must still pass at its smaller size.
- Reduced motion behavior: Entry animations must be suppressed or replaced with an instant appearance when `prefers-reduced-motion` is active.

---

## 6. Theming Rules

- Required tokens: background color, surface/card color, primary text color, secondary/muted text color, border/divider color, spacing scale, typography scale.
- Prohibited hardcoded values: No hardcoded hex colors, pixel spacing, or font size values.
- Dark mode expectations: All background and text colors must invert appropriately via theme tokens. No manual dark mode overrides allowed.

---

## 7. Composition Rules

- What can wrap it: May be placed inside a sidebar panel, a drawer, or a full-page layout container. Should work inside `CollabCommentSidebar` or `VersionHistoryPanel` as a content region.
- What it may contain: A list of activity item child components. May optionally contain a load-more trigger or pagination control at the bottom.
- Anti-patterns:
  - Do not embed data-fetching logic inside this component.
  - Do not render business-specific action buttons (e.g., "Approve", "Reject") directly inside the feed — delegate those to item-level components.
  - Do not use this component for non-collaborative notification feeds.

---

## 8. Performance Constraints

- Memoization rules: Individual activity items should be memoized to avoid re-rendering on unrelated state changes. The feed list should only re-render when the items array reference changes.
- Virtualization: When the activity list exceeds a significant number of items (e.g., 50+), the parent should provide a virtualized list. The component itself should support rendering virtualized row children without enforcing its own virtualization.
- Render boundaries: The component should not be responsible for fetching or caching data. All data concerns belong to the parent.

---

## 9. Test Requirements

- What must be tested:
  - Renders correctly with a populated list of activity items.
  - Renders an empty state when no items are provided.
  - Renders a loading state when indicated by props.
  - Renders an error state when indicated by props.
- Interaction cases:
  - Keyboard scrolling through the feed.
  - Tab navigation reaches interactive elements within items.
- Accessibility checks:
  - ARIA roles are correctly applied to the container and each item.
  - Contrast ratios pass for all text colors in both light and dark themes.
  - Reduced motion: entry animations are suppressed.
