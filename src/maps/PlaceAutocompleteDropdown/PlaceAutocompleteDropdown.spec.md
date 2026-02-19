# Component Spec — PlaceAutocompleteDropdown

## 1. Purpose

Displays a floating dropdown list of place suggestions associated with a location search input. It presents ranked geographic suggestions — each with a place name, secondary descriptor, and optional category icon — for the user to select.

Use when: LocationSearchInput (or any location text input) has an active query and needs to render its suggestions. PlaceAutocompleteDropdown is the presentational dropdown layer for that interaction.

Do NOT use when: a general-purpose autocomplete (non-geographic) is needed — use a standard Combobox dropdown. Do not render PlaceAutocompleteDropdown without an associated input element.

---

## 2. UX Intent

- Primary interaction goal: allow users to quickly recognize and select the intended location from a ranked list of suggestions, reducing the need to type the full address.
- Expected user mental model: the suggestion list below a maps search bar — a short, ranked list of best-matching places appears as you type.
- UX laws applied:
  - Hick's Law: limit suggestions to 5–7 items maximum to minimize selection time.
  - Fitts's Law: each suggestion row must be tall enough to tap accurately on touch devices.
  - Doherty Threshold: the dropdown must appear within 400ms of a query change.
  - Jakob's Law: the list-below-input autocomplete pattern is universally understood.

---

## 3. Visual Behavior

- Renders as a floating panel directly below the associated input, full-width of the input.
- The panel has a surface background token, a border token, and a shadow token for elevation.
- Each suggestion row displays:
  - A leading icon (location pin or category icon) — always present.
  - A primary text (place name or main result) in body typography token.
  - A secondary text (address, region, or category) in caption typography token with muted color.
  - An optional trailing distance label.
- The matching portion of the primary text is highlighted using a primary/accent color token (bold or color).
- Hovered or keyboard-focused rows use a subtle background highlight token.
- A divider between suggestion items is optional; if used, it uses the border color token.
- The dropdown has a maximum height (size token) and scrolls internally if more items are present.
- An empty state message is shown if no suggestions match.
- A loading row (skeleton or spinner) is shown while suggestions are being fetched.

---

## 4. Interaction Behavior

- Open state is driven by the associated input — the dropdown appears when the input is focused and has a non-empty query; it closes on blur, Escape, or selection.
- Selecting a row (press or Enter) fires `onSelect` with the suggestion data and closes the dropdown.
- Hovering a row highlights it visually.
- Keyboard behavior:
  - Arrow Down from the input moves focus to the first suggestion row.
  - Arrow Up / Down navigates between rows.
  - Enter activates the focused row.
  - Escape closes the dropdown and returns focus to the input.
  - Tab closes the dropdown and moves focus to the next focusable element.
- Screen reader behavior: the dropdown has `role="listbox"`; each row has `role="option"` with `aria-selected`. The focused row is referenced via `aria-activedescendant` on the associated input.
- Motion: the dropdown opens with a fade or slide-down; closes with a fade. Respects `prefers-reduced-motion` — instant show/hide when preferred.

---

## 5. Accessibility Requirements

- The dropdown container carries `role="listbox"` with an `aria-label` matching the input's purpose (e.g., "Location suggestions").
- Each suggestion row carries `role="option"` and a unique `id`.
- The currently highlighted option is referenced via `aria-activedescendant` on the associated input (managed by the parent input component).
- Leading icons carry `aria-hidden="true"`.
- Primary and secondary text must be readable by screen readers as a combined string.
- The dropdown is visually positioned using absolute/portal rendering and must not cause layout reflow on the rest of the page.
- All text contrast must meet WCAG AA.
- The empty state message must be readable by screen readers via `aria-live="polite"` or equivalent.

---

## 6. Theming Rules

- Required tokens: surface/background token for the dropdown panel, border token, shadow token for elevation, primary/accent token for text match highlight and row hover, muted text token for secondary descriptor, icon color token, space tokens for row padding and gap, typography tokens for primary and secondary text.
- Prohibited: no hardcoded hex colors, pixel widths, or raw box-shadow values.
- Dark mode: panel background, border, row hover, and text tokens must resolve correctly in dark themes.

---

## 7. Composition Rules

- PlaceAutocompleteDropdown is always paired with LocationSearchInput (or an equivalent input); it is not standalone.
- It is rendered in a portal (above the normal document flow) to avoid clipping by overflow-hidden parent containers.
- It receives suggestion data as a prop; it does not perform any data fetching.
- Anti-patterns:
  - Do not use PlaceAutocompleteDropdown for non-geographic suggestions.
  - Do not render it without an associated, accessible input element.
  - Do not embed interactive controls other than suggestion rows inside the dropdown.

---

## 8. Performance Constraints

- Suggestion rows are simple presentational items — no memoization overhead per row is needed for typical suggestion counts (under 10 items).
- Portal rendering must not cause layout reflow on open/close.
- Highlight matching computation must be synchronous and fast — applied to at most 7 short strings.
- The dropdown must not remain mounted in the DOM when closed.

---

## 9. Test Requirements

- Renders the correct number of suggestion rows from the `suggestions` prop.
- Displays primary and secondary text for each suggestion.
- Highlights the matching portion of primary text.
- Shows a loading state when `loading` is true.
- Shows an empty state when `suggestions` is empty.
- `onSelect` fires with correct suggestion data on row click/press.
- Arrow Down / Up keyboard navigation highlights the correct row.
- Enter activates the highlighted row and fires `onSelect`.
- Escape closes the dropdown.
- `role="listbox"` is on the container; `role="option"` is on each row.
- Leading icons have `aria-hidden="true"`.
- Reduced motion suppresses open/close animation.
- Renders correctly in light and dark themes.
