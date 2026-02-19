# Component Spec — ActivityTimeline

## 1. Purpose

Displays a chronological timeline of CRM activity events associated with a contact, deal, or lead — such as emails sent, calls made, meetings scheduled, notes added, and stage changes. Provides a full audit trail of relationship history.

Use when: Viewing the interaction history for a CRM record (contact, deal, or lead) to understand the relationship's context and progress.

Do NOT use when: The list of events is unrelated to CRM record history (use a general `ActivityFeed`), or the context does not have a temporal/chronological structure.

---

## 2. UX Intent

- Primary interaction goal: Let sales and relationship managers quickly understand the full history of interactions with a contact or deal, without having to search through separate logs.
- Expected user mental model: A vertical timeline similar to Salesforce's activity timeline or HubSpot's contact feed — a time-ordered log of distinct event types, each with an icon indicating the activity type, a description, and a timestamp.
- UX laws applied:
  - Serial Position Effect: Most recent events appear at the top, as they are most actionable.
  - Proximity (Gestalt): Each timeline event is a cohesive unit; the connecting line makes the temporal relationship between events clear.
  - Miller's Law: Group events by date (Today, Yesterday, This Week) to reduce scanning effort on long timelines.

---

## 3. Visual Behavior

- Layout: Vertical timeline. Each event node consists of a connecting line (the timeline spine), an event type icon on the spine, and an event content block to the right. Date group headings appear above the first event of each date group.
- Spacing: Consistent vertical spacing between event nodes using spacing tokens. The icon is vertically centered on the event content block. The connecting spine is a narrow vertical line using a border width token.
- Typography: Event type label or title in medium/bold body weight; event description in regular body text; timestamp in muted secondary text at a smaller size token.
- Token usage: Timeline spine color, event icon color (may be activity-type-specific using semantic color tokens), event block background (optional), date heading text color, description text color, muted timestamp color — all from theme tokens.
- Responsive behavior: Full-width column layout on all breakpoints. On narrow viewports, the icon may reduce in size using a smaller size token.

---

## 4. Interaction Behavior

- States:
  - Idle: Displays the full list of activity events.
  - Empty: Displays an empty state message (e.g., "No activity recorded yet.").
  - Loading: Skeleton event rows with placeholder icon and content blocks.
  - Expandable event: Some event types (e.g., email body, call notes) may be collapsed by default and expand on interaction, managed by the parent.
  - Error: An error state message with optional retry action.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the event array, loading state, and any expand/collapse callbacks.
- Keyboard behavior: Tab moves through focusable elements (expandable events, action links within events). Enter/Space activates expandable events.
- Screen reader behavior: The timeline is a `<ul>` list. Each event is a `<li>` with a full description including the event type, description, and timestamp. Date group headings are announced as section headings.
- Motion rules: New events appended to the top animate with a subtle fade-in. Expand/collapse of event details animates with height transition. Reduced motion: instant changes.

---

## 5. Accessibility Requirements

- ARIA requirements: Container is a `<ul>` with `role="list"` and `aria-label="Activity timeline"` or equivalent. Each event is a `<li>`. Expandable events use `aria-expanded` on the toggle. Date group headings use appropriate heading elements.
- Focus rules: Tab order follows DOM order (top to bottom, newest to oldest). Focus is not trapped. Expandable items are accessible via keyboard.
- Contrast expectations: All text (event title, description, timestamp, date headings) meets WCAG AA against the timeline background. Event type icon colors meet contrast requirements.
- Reduced motion behavior: Fade-in and expand/collapse animations are suppressed.

---

## 6. Theming Rules

- Required tokens: timeline spine color, spine width token, event icon background/color (per semantic activity type), event block background (optional), heading text color, body text color, muted/secondary text color, spacing tokens, border radius token for event blocks.
- Prohibited hardcoded values: No hardcoded colors, pixel sizes, or event type-specific hex values.
- Dark mode expectations: Timeline spine, event icons, and content blocks all adapt to dark theme tokens.

---

## 7. Composition Rules

- What can wrap it: Placed in a CRM record detail view (contact, deal, or lead page) typically in a dedicated "Activity" tab or panel.
- What it may contain: A list of timeline event nodes. Each node contains an activity icon, an event content block (title, description, optional expanded body), and a timestamp. May contain date group headings.
- Anti-patterns:
  - Do not embed activity data-fetching inside this component.
  - Do not mix non-CRM activity types (e.g., system logs) into this timeline without clear type differentiation.
  - Do not use this component as a general notification feed.

---

## 8. Performance Constraints

- Memoization rules: Each event node should be memoized by event ID. The timeline should not re-render all nodes when a single node is expanded.
- Virtualization: For long activity histories (100+ events), the parent should supply a paginated or virtualized list. The component must support rendering virtualized children.
- Render boundaries: No data-fetching inside this component.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct event nodes for the provided data.
  - Date group headings appear correctly.
  - Renders the empty state message.
  - Renders the loading skeleton state.
  - Expandable events toggle their expanded state correctly.
- Interaction cases:
  - Tab navigation through all event items.
  - Enter/Space toggles expandable event details.
  - Retry action fires in error state.
- Accessibility checks:
  - `role="list"` and `aria-label` on container.
  - `aria-expanded` on expandable events.
  - Date group headings use correct heading semantics.
  - Contrast passes for all text and icons.
  - Reduced motion: animations suppressed.
