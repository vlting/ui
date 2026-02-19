# Component Spec — LocationSearchInput

## 1. Purpose

Provides a text input field specifically designed for entering and searching geographic locations. It presents location suggestions (via a dropdown) as the user types, and emits a structured location value when a suggestion is selected.

Use when: users need to specify a geographic location by typing an address, city name, point of interest, or coordinates.

Do NOT use when: general-purpose text search is needed (use a standard Search input), or when the location is selected via map interaction rather than text entry.

---

## 2. UX Intent

- Primary interaction goal: reduce the friction of specifying a geographic location by offering real-time, ranked suggestions as the user types.
- Expected user mental model: similar to a search bar in Google Maps or any address field with autocomplete — type a few characters and select from a list.
- UX laws applied:
  - Hick's Law: suggestions are ranked and limited to a manageable count (5–7 results) to minimize decision time.
  - Fitts's Law: suggestion items must be tall enough to tap reliably on touch devices.
  - Doherty Threshold: suggestions must appear within 400ms of typing to maintain engagement.
  - Jakob's Law: the pattern of type-then-select from a dropdown list is universal for location/address inputs.

---

## 3. Visual Behavior

- Renders as a styled text input with a leading location pin icon and an optional trailing clear button (visible when input has a value).
- A dropdown of location suggestions appears below the input when suggestions are available.
- Each suggestion row displays a place name (primary) and an optional secondary descriptor (address, region).
- The matching portion of the suggestion text is highlighted using a primary/accent color token.
- The input has idle, focus, hover, disabled, and error visual states — all using design tokens.
- The dropdown is visually attached to the input (no gap), with a surface background, border, and shadow token for elevation.
- Suggestions list has a maximum height (size token) and scrolls if more suggestions are present.
- Clears to idle state when the input is cleared.

---

## 4. Interaction Behavior

- Controlled pattern: `value` prop + `onValueChange` callback for the text content. Selected location emitted via `onLocationSelect` with a structured location object.
- Uncontrolled mode supported via `defaultValue`.
- As the user types, an `onSearch` callback (debounced internally) fires with the current query; the consumer provides suggestions via a `suggestions` prop.
- Selecting a suggestion (by press or keyboard) sets the input value to the place name and fires `onLocationSelect`.
- Clear button clears the input and fires `onLocationSelect(null)`.
- Keyboard behavior:
  - Type to populate suggestions.
  - Arrow Down opens the suggestions dropdown and moves focus to the first suggestion.
  - Arrow Up / Down navigates through suggestions.
  - Enter selects the focused suggestion.
  - Escape closes the dropdown and returns focus to the input.
  - Tab closes the dropdown and moves focus to the next element.
- Screen reader behavior: the input has `role="combobox"` with `aria-expanded`, `aria-controls`, and `aria-autocomplete="list"`. The suggestions list has `role="listbox"` with `role="option"` per item. The focused suggestion is indicated via `aria-activedescendant`.
- Motion: dropdown open/close animates with a subtle fade; respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- The input carries `role="combobox"`, `aria-expanded` (true when dropdown is open), `aria-controls` (referencing the listbox ID), and `aria-autocomplete="list"`.
- The suggestions list carries `role="listbox"` with an `aria-label`.
- Each suggestion option carries `role="option"` and `aria-selected`.
- The focused option is referenced via `aria-activedescendant` on the input.
- `aria-label` or a visible `<label>` element must be associated with the input.
- Clear button carries `aria-label="Clear location"`.
- All text contrast must meet WCAG AA.
- Reduced motion: dropdown appears/disappears instantly without animation.

---

## 6. Theming Rules

- Required tokens: input background token, border color token (idle, focus, error states), primary/accent token for focused border and text highlight, icon color token, surface token for dropdown, shadow token for dropdown elevation, muted text token for secondary suggestion descriptor, space tokens for input padding and suggestion row padding.
- Prohibited: no hardcoded hex colors, pixel padding, or raw border-radius values.
- Dark mode: input background, border, dropdown surface, and text tokens must resolve correctly in dark themes.

---

## 7. Composition Rules

- LocationSearchInput is a self-contained form control; it accepts suggestion data from the parent via props.
- It does not perform geocoding or API calls internally — the consumer provides suggestions via a `suggestions` prop.
- It may be composed inside a MapContainer overlay, a search bar, or a form.
- Anti-patterns:
  - Do not use LocationSearchInput for non-geographic searches — use a standard Input with autocomplete.
  - Do not embed business logic (geocoding API calls) inside this component.
  - Do not use it without a visible label or `aria-label`.

---

## 8. Performance Constraints

- `onSearch` must be debounced internally (default ~300ms) to prevent excessive callback calls during fast typing.
- The suggestions dropdown must not cause layout shifts — its dimensions must be deterministic before it opens.
- Suggestion items should be rendered as a simple list (not virtualized) since the count is always small (max 10).

---

## 9. Test Requirements

- Renders input with leading icon and no trailing clear button when empty.
- Renders trailing clear button when input has a value.
- Fires `onSearch` with the typed query (debounced).
- Renders suggestion items when `suggestions` prop is populated.
- Selects a suggestion via click/press and fires `onLocationSelect` with correct data.
- Selects a suggestion via keyboard (Arrow Down + Enter) and fires `onLocationSelect`.
- Escape closes the dropdown.
- Clear button clears the input and fires `onLocationSelect(null)`.
- ARIA attributes (`role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`) are correct and update correctly.
- Dropdown is `aria-hidden` or unmounted when closed.
- Reduced motion suppresses dropdown animation.
- Renders correctly in light and dark themes.
