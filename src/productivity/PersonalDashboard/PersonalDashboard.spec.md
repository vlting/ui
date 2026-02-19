# Component Spec — PersonalDashboard

## 1. Purpose

Provides a unified at-a-glance overview of a user's personal productivity data — including upcoming events, reminders, recent notes, and task summaries — within a single composable surface.

Use when: the user needs a home or start page that aggregates the most relevant productivity information without requiring navigation to individual sections.

Do NOT use when: a single-domain view is sufficient (e.g., showing only a calendar or only a task list). In those cases, use the domain-specific component directly.

---

## 2. UX Intent

- Primary interaction goal: Give the user an immediate summary of what is relevant now and what requires attention, reducing the need to navigate between multiple sections.
- Expected user mental model: Users expect a dashboard to function like a personal home screen or morning briefing — a glanceable summary, not an interactive workspace (Jakob's Law).
- UX laws applied:
  - Miller's Law: Limit visible widgets/sections to a manageable number (ideally no more than 5–7 distinct areas).
  - Hick's Law: Prioritize the most relevant information; secondary content should be accessible via navigation, not cluttering the dashboard.
  - Gestalt (Proximity and Common Region): Logically related items (e.g., today's events) are grouped in a bounded section with a label.
  - Doherty Threshold: The dashboard must render its primary content within 400ms. Sections that depend on async data show skeletons immediately.
  - Fitts's Law: Call-to-action elements (quick add, navigation shortcuts) must have adequate target sizes.

---

## 3. Visual Behavior

- Layout rules:
  - The dashboard is a vertical stack of distinct sections or widgets (e.g., a greeting header, a today's events strip, a reminders section, a recent notes section).
  - Each section has a labeled header and a contained body area.
  - On wider viewports, sections may arrange in a two-column or multi-column grid.
  - A greeting or date/time header occupies the top of the dashboard.
- Spacing expectations: Consistent vertical gap between sections using a large space token. Internal section padding uses a medium space token.
- Typography rules: Section headers use a heading or label token. Content within sections uses body and caption tokens appropriate to their component type.
- Token usage: All colors, spacing, and radii must use design tokens.
- Responsive behavior: On narrow viewports, all sections stack vertically. On wide viewports, a multi-column layout is applied. Sections collapse gracefully if their content is empty.

---

## 4. Interaction Behavior

- States:
  - Idle: All sections display their content.
  - Loading: Skeleton states within sections are displayed until data resolves.
  - Empty (per section): Each section renders its own empty state when no relevant data exists.
  - Partial: Some sections may be populated while others are still loading.
- Controlled vs uncontrolled: The dashboard is a layout/composition component. It does not manage data state. All section content is supplied by the parent.
- Keyboard behavior:
  - Tab moves focus through all interactive elements within sections in DOM order.
  - No special keyboard shortcuts are scoped to the dashboard frame itself.
- Screen reader behavior:
  - Each section is a labeled region (`role="region"` with `aria-labelledby` referencing the section heading).
  - The page/view containing the dashboard has a descriptive heading.
  - Loading states within sections are announced via live regions.
- Motion rules: Section entrance animations (if any) are subtle fades or slides. All motion is suppressed under reduced motion preference.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - Dashboard container uses `role="main"` if it is the primary content area of the view.
  - Each section widget uses `role="region"` with `aria-labelledby`.
  - Skeleton/loading regions use `aria-busy="true"` and `aria-live="polite"`.
- Focus rules: Focus flows naturally through the dashboard in DOM order. No focus traps. Keyboard users can Tab through all interactive elements without obstruction.
- Contrast expectations: Section headings and body content must meet 4.5:1. Secondary labels and metadata must meet 3:1.
- Reduced motion behavior: Entrance animations and skeleton shimmer effects are disabled.

---

## 6. Theming Rules

- Required tokens: page/dashboard background, section surface background, section border, text heading, text body, text secondary, space, radius.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Dashboard and section surface backgrounds shift to dark tokens. Text and border tokens resolve correctly. All embedded component tokens also respond to dark mode.

---

## 7. Composition Rules

- What can wrap it: A full-page view or screen-level layout. May be wrapped by a navigation shell or tab panel.
- What it may contain:
  - A greeting or date header.
  - A CalendarView strip or EventCard list for upcoming events.
  - A ReminderItem list for due reminders.
  - A NotesList or recent notes summary.
  - A QuickAddPanel for rapid task/note creation.
  - Task summary counts or progress indicators.
- Anti-patterns:
  - Do not embed the full NotesEditor or a full KanbanBoard inside PersonalDashboard — summaries only.
  - Do not load or fetch data from within PersonalDashboard; data must be provided by the parent.
  - Do not exceed the established section limit; add navigation links instead of adding more sections.

---

## 8. Performance Constraints

- Memoization rules: Each section widget should be independently memoized so that updating one section does not re-render others.
- Virtualization: The dashboard itself does not require virtualization. Sections that contain lists must handle their own virtualization.
- Render boundaries: Each dashboard section is an independent render boundary. A data update in the events section must not trigger re-renders in the notes or reminders sections.

---

## 9. Test Requirements

- What must be tested:
  - All configured sections render correctly with supplied data.
  - Loading state renders skeleton placeholders within the appropriate sections.
  - Empty state renders the empty message within a section that has no data.
  - Sections with data and sections without data can coexist on the same dashboard.
- Interaction cases:
  - Tab key traverses all interactive elements in all sections in DOM order.
  - Quick add or navigation shortcuts within sections fire the correct callbacks.
- Accessibility checks:
  - Each section has `role="region"` and an accessible label.
  - Loading sections have `aria-busy="true"`.
  - Section headings have the correct heading level.
  - No focus traps.
  - Contrast ratios pass in both light and dark themes.
  - Reduced motion disables all entrance animations.
