# Component Spec — EmployeeCard

## 1. Purpose

Displays a summary of an individual employee's identity and organizational context in a compact card format. Used in employee directories, team rosters, org charts, reporting dashboards, and people-picker results.

Do NOT use this component for displaying detailed employee profiles (use a full profile page or EmployeeDetailPanel), for displaying aggregate team statistics (use a different data visualization), or for selecting employees from a list (use a PeoplePicker or ComboBox).

---

## 2. UX Intent

- Primary interaction goal: give viewers an immediate at-a-glance understanding of who an employee is, their role, and their department without requiring navigation to a separate detail page.
- Expected user mental model: a contact card with a photo or avatar, a name, and supporting metadata. Similar to a business card or a LinkedIn profile tile.
- UX laws applied:
  - Gestalt (Figure-Ground, Proximity): avatar is visually dominant; name, role, and department are grouped below or beside it in a clear hierarchy.
  - Jakob's Law: card layout follows familiar contact/profile card conventions established across HR and professional networking platforms.
  - Fitts's Law: if the card is interactive (tappable to navigate to a profile), the entire card surface acts as the touch target.
  - Aesthetic-Usability Effect: a well-proportioned card with clean typography inspires trust in the data it displays.

---

## 3. Visual Behavior

- Layout: a vertical card (portrait orientation) containing Avatar at the top, Name below, Role below Name, and Department below Role. An optional horizontal (landscape) variant may place Avatar to the left of the text stack.
- Sub-components (compound pattern): `EmployeeCard.Avatar`, `EmployeeCard.Name`, `EmployeeCard.Role`, `EmployeeCard.Department` are composable and may be omitted if a sub-section is not needed.
- Spacing: padding inside the card, gap between avatar and text group, and gap between text lines all use space tokens.
- Typography: Name uses a medium-weight body or subheading scale token. Role uses a regular body token. Department uses a caption scale token in a muted color.
- Token usage: card background, border, shadow, avatar background (fallback), text colors (primary, secondary, muted) must all use design tokens.
- Responsive behavior: card adapts width to its container. In a grid layout, a minimum width constraint prevents the card from becoming too narrow to read comfortably.

---

## 4. Interaction Behavior

- States:
  - Default (non-interactive): the card is purely presentational.
  - Hoverable/Pressable (if interactive): card surface shows a hover background change using token color; cursor changes to pointer.
  - Focused (if interactive): card has a visible focus ring.
  - Active/Pressed (if interactive): brief press feedback using active token color.
  - Loading (skeleton): when data is pending, each sub-component region shows a skeleton placeholder of appropriate width and height.
- Controlled vs uncontrolled: this is a presentation-only component. Props drive all displayed data. No internal state beyond optional hover/press visual feedback.
- Keyboard behavior: if the card is interactive, it is a focusable element activated by Enter or Space. Non-interactive cards are not in the Tab order.
- Screen reader behavior: the card announces as a single named region. The employee's full name is the primary label. Role and department are read as supplementary text in order. If interactive, the card announces as a button or link with the employee's name.
- Motion rules: hover background transition uses a short duration token suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA: a non-interactive card uses `role="article"` or is a plain landmark-free group with readable content. An interactive card uses `role="button"` or wraps in an anchor with the employee name as the accessible label.
- Focus rules: interactive cards must be reachable via Tab and activated via Enter/Space. Non-interactive cards are excluded from Tab order.
- Contrast: Name, Role, and Department text must all meet WCAG AA contrast against the card background using design tokens.
- Reduced motion: suppress hover background transition.

---

## 6. Theming Rules

- Required tokens: card background, card border, card shadow, avatar fallback background, name text color, role text color, department/muted text color, hover background (interactive variant), focus ring color, space tokens, typography scale tokens, radius token.
- Prohibited hardcoded values: no hardcoded colors, spacing, shadows, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; card surfaces must not become illegible against dark page backgrounds.

---

## 7. Composition Rules

- What can wrap it: grid or list containers in directory views, sidebar panels, popover content, search result lists. Must be a descendant of the design system Provider.
- What it may contain (compound pattern):
  - `EmployeeCard.Avatar` — profile photo or initials avatar.
  - `EmployeeCard.Name` — employee full name.
  - `EmployeeCard.Role` — job title or role label.
  - `EmployeeCard.Department` — department or team label.
  - Additional badges, status indicators, or action menus may be composed externally alongside the card sub-components.
- Anti-patterns:
  - Do not embed navigation logic inside the component — delegate via an onPress or href prop.
  - Do not use this card to show aggregated group or team statistics.
  - Do not place interactive form elements inside a non-interactive card.

---

## 8. Performance Constraints

- Memoization: the card should be memoized; re-renders occur only when employee data props change.
- Virtualization: when displayed in large directory grids (100+ employees), the parent grid must virtualize card rendering; individual cards should not implement their own virtualization.
- Render boundaries: avatar image loading must not block the card's initial render; use lazy image loading or a skeleton placeholder.

---

## 9. Test Requirements

- Rendering: renders correctly with all sub-components present and with each sub-component individually omitted.
- Sub-component composition: Avatar, Name, Role, and Department render independently and in combination.
- Interactive variant: card is focusable and activatable via keyboard; hover and pressed states are visually correct.
- Non-interactive variant: card is not in the Tab order.
- Loading/skeleton: skeleton placeholders appear for each sub-component when data is pending.
- Accessibility: non-interactive card has appropriate role or semantic structure; interactive card has correct button/link role and label.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: no hover transition animation when motion is reduced.
