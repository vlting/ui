# Component Spec — DirectionsPanel

## 1. Purpose

Displays step-by-step navigation directions between a start and end location. It presents the ordered list of maneuver steps, total distance, estimated travel time, and transportation mode controls. Used alongside a MapContainer to show the route visually on the map while steps are described in the panel.

Use when: users need turn-by-turn directions displayed as a readable, structured list alongside or overlaying a map.

Do NOT use when: only a route line on the map is needed without step-by-step breakdown — in that case, render the route directly on the map without this panel.

---

## 2. UX Intent

- Primary interaction goal: allow users to understand and follow a route one step at a time, with enough context to navigate without looking at the map continuously.
- Expected user mental model: a turn-by-turn directions list as seen in Google Maps or Apple Maps — ordered steps with distance and maneuver icons.
- UX laws applied:
  - Miller's Law: steps are presented one at a time or in a short scannable list, not dumped as a wall of text.
  - Gestalt (continuity): steps are visually connected in sequence (numbered list, dividers) to communicate a journey from start to end.
  - Doherty Threshold: the panel must render within 400ms of route calculation to keep the user engaged.

---

## 3. Visual Behavior

- Renders as a vertical scrollable list of direction steps.
- Each step displays: a maneuver icon, a description, and a distance/duration label.
- The panel header shows the total distance and estimated travel time, and optional transportation mode selector tabs (driving, walking, transit, cycling).
- Steps are separated by a divider token.
- Maneuver icons are consistent with a standard icon set (turn left, turn right, continue, merge, etc.); they are positioned to the leading edge of each step.
- The active/current step (during navigation) is highlighted using a primary color token.
- On small viewports, the panel may be collapsed into a bottom sheet with only the current step visible; a button expands the full step list.
- All spacing uses space tokens; typography uses scale tokens.

---

## 4. Interaction Behavior

- Transportation mode selector: selecting a mode fires an `onModeChange` callback.
- Step press: pressing a step fires an `onStepPress` callback with the step index, allowing the map to pan/zoom to that step's location.
- Active step is driven by an `activeStep` prop (controlled) or tracked internally (uncontrolled with `defaultActiveStep`).
- Scroll position within the step list automatically scrolls the active step into view.
- Keyboard behavior:
  - Tab moves through transportation mode buttons and each step item.
  - Enter/Space activates a step or mode button.
  - Arrow Up/Down navigates between steps when focus is within the list.
- Screen reader behavior: the step list has `role="list"` with `role="listitem"` per step. Active step carries `aria-current="true"`. Transportation mode buttons carry `aria-pressed` or equivalent.
- Motion: active step scroll-into-view respects `prefers-reduced-motion` — it uses instant scroll when preferred.

---

## 5. Accessibility Requirements

- The step list carries `role="list"` with an `aria-label` (e.g., "Navigation steps").
- Each step carries `role="listitem"` with accessible text combining the maneuver description and distance.
- Maneuver icons carry `aria-hidden="true"` since the step description already conveys the maneuver.
- Active step carries `aria-current="true"`.
- Transportation mode buttons carry `role="tab"` or `aria-pressed` to indicate selection state.
- All text contrast must meet WCAG AA.
- Panel is not a modal — it does not trap focus.

---

## 6. Theming Rules

- Required tokens: surface/background token for the panel, primary color token for active step highlight, border token for step dividers, muted text token for distance/duration labels, icon color token, space tokens for step padding and gap, typography scale tokens for step description and distance labels.
- Prohibited: no hardcoded colors, pixel padding, or raw font-size values.
- Dark mode: all surface, text, and highlight tokens must resolve correctly in dark themes.

---

## 7. Composition Rules

- DirectionsPanel is typically rendered adjacent to or overlaying a MapContainer.
- It does not perform route calculation — it receives a pre-calculated directions data structure as a prop.
- May be composed inside a Drawer, SplitView panel, or bottom sheet depending on layout.
- Anti-patterns:
  - Do not embed a live map inside DirectionsPanel — the map is a sibling, not a child.
  - Do not perform data fetching inside DirectionsPanel — receive directions as a prop.
  - Do not hardcode transportation modes — they must be configurable or driven by available route data.

---

## 8. Performance Constraints

- Step list should be virtualized if the number of steps exceeds ~50 (for very long routes).
- Scroll-to-active-step must not cause layout thrash — use scroll offset calculations, not repeated DOM measurements.
- Mode change must not re-render the entire panel unnecessarily.

---

## 9. Test Requirements

- Renders all steps with maneuver description and distance.
- Renders the total distance and estimated travel time in the header.
- Highlights the active step with the primary color token.
- `onStepPress` fires with the correct step index when a step is activated.
- `onModeChange` fires with the correct mode when a transportation mode is selected.
- Maneuver icons have `aria-hidden="true"`.
- Active step has `aria-current="true"`.
- Step list has correct `role` and `aria-label`.
- Auto-scroll brings active step into view.
- Reduced motion suppresses scroll animation.
- Renders correctly in light and dark themes.
