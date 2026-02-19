# Component Spec — ClusterMarker

## 1. Purpose

Displays a visual marker on a map canvas that represents a group of multiple co-located points that have been aggregated into a single cluster. It communicates the count of points within the cluster and provides a visual affordance for expanding or zooming into the cluster.

Use when: a map contains many overlapping or nearby points that would clutter the display if rendered individually. ClusterMarker replaces individual MapPin components at low zoom levels.

Do NOT use when: points are sparse enough to be shown as individual MapPins without visual overlap.

---

## 2. UX Intent

- Primary interaction goal: allow users to understand the density of data at a given location and drill into the cluster by tapping/clicking to zoom in.
- Expected user mental model: a "group badge" on a map — similar to clustered map pins seen in Google Maps, Apple Maps, and other mapping applications.
- UX laws applied:
  - Gestalt (similarity): the cluster marker visually groups multiple points into a single perceptual unit.
  - Fitts's Law: the cluster marker must be large enough to tap accurately on touch devices, scaled relative to cluster count.
  - Jakob's Law: clustering with a count badge is a well-established mapping UI convention.

---

## 3. Visual Behavior

- Renders as a circular badge centered on the cluster's geographic position.
- Displays the count of points in the cluster as a numeric label inside the badge.
- Badge size may scale with cluster count (larger clusters = larger badge) using size tokens.
- Badge background uses a primary or brand color token; count label uses a contrasting text token.
- An outer ring or halo (semi-transparent, using the same color token at reduced opacity) may surround the badge to visually indicate spread.
- On hover, the badge may increase in scale slightly using a transform (scale token or animation).
- Does not render as a DOM button by default — interaction behavior is provided by the parent map layer.

---

## 4. Interaction Behavior

- Primary interaction: press/click triggers a zoom-in or expand action on the cluster — this callback (`onPress`) is provided by the consumer.
- States: idle, hover, focus, active (pressed).
- Keyboard behavior: the marker is focusable when rendered in an accessible map context; Enter/Space activates the `onPress` callback.
- Screen reader behavior: the marker announces the count of grouped items and its actionable nature, e.g., "Cluster of 42 items. Press to zoom in."
- Motion: hover scale effect respects `prefers-reduced-motion` — it is suppressed when preferred.

---

## 5. Accessibility Requirements

- Must carry an accessible label describing the cluster count and action, e.g., `aria-label="42 items clustered. Activate to zoom in."`.
- Must be keyboard focusable and activatable (Enter/Space).
- The count text inside the badge must meet WCAG AA contrast (4.5:1) against the badge background.
- The outer halo/ring must meet 3:1 contrast against the map background for the UI component to be perceivable.
- Do not convey cluster size or density through color alone — the count label is always required.

---

## 6. Theming Rules

- Required tokens: primary/brand color token for badge background, contrasting text color token for count label, opacity token for halo/ring, size tokens for badge diameter (per count tier), typography token for count label.
- Prohibited: no hardcoded hex colors, pixel diameters, or raw font-size values.
- Dark mode: badge background and text tokens must resolve correctly in dark map themes.

---

## 7. Composition Rules

- ClusterMarker is positioned by the parent map rendering layer (e.g., a map library's marker system) — it does not manage its own geographic coordinates.
- It does not wrap individual MapPin components — it replaces them at low zoom levels.
- May receive a custom icon or children for branded cluster appearances.
- Anti-patterns:
  - Do not use ClusterMarker for a single non-clustered point — use MapPin.
  - Do not embed full detail content inside ClusterMarker — use MapInfoCard for detail on activation.
  - Do not manage zoom level logic inside ClusterMarker — that belongs to MapContainer.

---

## 8. Performance Constraints

- ClusterMarker must be lightweight — many instances may be visible simultaneously on large datasets.
- Avoid expensive layout calculations inside the marker; size must be deterministic from props.
- Hover/active state changes must not trigger re-renders of siblings.
- Animation (scale transform) must use GPU-accelerated properties only (transform, opacity).

---

## 9. Test Requirements

- Renders the correct count number inside the badge.
- Applies the correct size variant for different count tiers.
- `onPress` fires when the marker is clicked or activated via keyboard.
- Accessible label accurately describes the cluster count and action.
- The marker is keyboard focusable.
- Count text meets contrast requirements against badge background.
- Hover scale animation is suppressed under `prefers-reduced-motion`.
- Renders correctly in light and dark themes.
