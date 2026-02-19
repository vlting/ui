# Component Spec — ContactCard

## 1. Purpose

Displays a summary card for a CRM contact, presenting their avatar, name, role/title, key contact details, and primary action controls (e.g., call, email, view profile). Used in list views, search results, and relationship panels.

Use when: Showing a contact preview in a list, search result, or quick-reference panel where the full contact profile is not required.

Do NOT use when: The full contact detail page is being shown (use the full contact profile layout), or the context is not a CRM contact record.

---

## 2. UX Intent

- Primary interaction goal: Allow sales and relationship managers to quickly identify a contact and take an immediate action (call, email) without navigating to the full contact record.
- Expected user mental model: A familiar business card or contact list item — similar to contact cards in Salesforce, HubSpot, or a mobile contacts app.
- UX laws applied:
  - Jakob's Law: Matches the familiar contact card pattern from CRM and contact-list applications.
  - Fitts's Law: Primary action buttons (call, email) must have generous tap targets.
  - Hierarchy (Gestalt): Contact name and avatar are the most prominent elements; supporting details are visually secondary.

---

## 3. Visual Behavior

- Layout: Card container with four compositional sub-sections: Avatar (left or top), Name (primary heading), Details (secondary text: title, company, contact info), and Actions (button row).
- Spacing: Consistent internal padding using spacing tokens. Gap between Avatar and Name/Details uses a spacing token. Action buttons have a top margin to visually separate them from the details.
- Typography: Name uses a heading or large body bold token. Title/company uses a regular body token. Contact details (email, phone) use a secondary/muted text token at a smaller size.
- Token usage: Card background, border, avatar border, name text, detail text, muted text, action button colors — all from theme tokens.
- Responsive behavior: In narrow contexts, the card stacks vertically (avatar top, content below). In wider contexts, avatar is to the left of the content. Card width is determined by its container.

---

## 4. Interaction Behavior

- States:
  - Idle: Default card appearance.
  - Hover: Subtle background or shadow elevation change to indicate the card is clickable.
  - Focus: Visible focus ring on the card or the primary name link.
  - Loading: Skeleton for avatar, name, and details.
  - No avatar: Falls back to initials-based avatar using the contact's name initials.
- Controlled vs uncontrolled: Fully controlled. Parent supplies contact data and action callbacks.
- Keyboard behavior: Tab reaches the card's primary link (name) and then each action button in the Actions section. The card itself may also be a single focusable element if it is fully clickable.
- Screen reader behavior: Contact name is the primary accessible label. Avatar image has `alt` set to the contact's name or is marked decorative if the name is already announced. Action buttons have descriptive labels (e.g., "Call Alice Smith", "Email Alice Smith").
- Motion rules: Hover state transition animates subtly. Reduced motion: instant state change.

---

## 5. Accessibility Requirements

- ARIA requirements: Card acts as a list item in its list context. Avatar image uses `alt` with contact name or `alt=""` if name is present as text. Action buttons have descriptive `aria-label` values incorporating the contact name.
- Focus rules: Name link is the first focusable element. Action buttons follow in tab order. If the entire card is a link, individual action buttons are separately focusable within it.
- Contrast expectations: Name, detail text, and action labels meet WCAG AA against the card background in both default and hover states.
- Reduced motion behavior: Hover/focus transitions are suppressed.

---

## 6. Theming Rules

- Required tokens: card background, card hover background, card border color, card shadow/elevation, avatar border color, name text color, detail body text color, muted/secondary text color, action button colors, spacing tokens, border radius tokens for card and avatar.
- Prohibited hardcoded values: No hardcoded colors, pixel dimensions, or font sizes.
- Dark mode expectations: Card background uses a dark surface token. All text and button colors adapt. Avatar border adjusts to dark border token.

---

## 7. Composition Rules

- What can wrap it: Placed inside a contact list, search results list, or CRM sidebar panel. May appear in a `KanbanColumn` or `PipelineBoard` context.
- What it may contain (compound sub-components):
  - `ContactCard.Avatar` — the contact's avatar image or initials fallback.
  - `ContactCard.Name` — the contact's full name, optionally as a link.
  - `ContactCard.Details` — secondary details: title, company, email, phone.
  - `ContactCard.Actions` — action buttons for primary contact actions.
- Anti-patterns:
  - Do not embed contact data-fetching inside this component.
  - Do not render the full contact profile inside the card — it is a preview/summary only.
  - Do not omit the `ContactCard.Name` sub-component — it is required for accessibility.

---

## 8. Performance Constraints

- Memoization rules: The card should be memoized by contact ID. Updates to unrelated contacts must not cause re-renders.
- Virtualization: Intended to be used inside virtualized lists when rendering many contacts.
- Render boundaries: No data-fetching inside this component.

---

## 9. Test Requirements

- What must be tested:
  - Renders Avatar, Name, Details, and Actions sub-components correctly.
  - Avatar falls back to initials when no image is provided.
  - Renders the loading skeleton state.
  - All action buttons are present and labeled correctly.
- Interaction cases:
  - Clicking/pressing the name link fires the navigation callback.
  - Each action button fires the correct callback with the contact context.
  - Hover state changes visual appearance.
  - Tab navigation reaches name link and all action buttons.
- Accessibility checks:
  - Avatar image has correct `alt` text.
  - Action buttons have descriptive `aria-label` values.
  - Focus ring is visible on name link and action buttons.
  - Contrast passes in default and hover states.
  - Reduced motion: hover transitions suppressed.
