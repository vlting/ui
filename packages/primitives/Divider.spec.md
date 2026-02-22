# Component Spec — Divider

## 1. Purpose

- Provides a visual separator between content sections or sibling elements.
- Should be used to create clear visual boundaries within lists, card sections, toolbars, or between content blocks.
- Should NOT be used as a decorative border on a container (use border tokens on the container itself).
- Should NOT be used to create significant whitespace (use Spacer instead).

---

## 2. UX Intent

- Primary interaction goal: visually divide content into distinct groups without introducing interactive behavior.
- Expected user mental model: a thin line (horizontal or vertical) that separates related sections, similar to `<hr>` in HTML.
- **Gestalt Principles (2.4):** Divider reinforces visual grouping by establishing explicit boundaries between element clusters. It supports the principle of common region by delineating where one group ends and another begins.
- **Jakob's Law (2.1):** Horizontal dividers between content sections follow universally understood web and native conventions.

---

## 3. Visual Behavior

- Layout rules: renders as a 1px line along the chosen axis. `flexShrink: 0` prevents collapse in flex containers.
- Spacing expectations: horizontal dividers apply `marginVertical: $2`; vertical dividers apply `marginHorizontal: $2`. These use space tokens and can be overridden by the consumer.
- Typography rules: not applicable (Divider does not render text).
- Token usage: `$borderColor` for background color; `$2` for margin spacing. No hardcoded values.
- Responsive behavior: supports Tamagui responsive and media-query props. Consumers can change orientation or visibility at different breakpoints.

---

## 4. Interaction Behavior

- States: Divider is non-interactive. It has no hover, focus, active, disabled, loading, or error states.
- Controlled vs uncontrolled: not applicable (stateless).
- Keyboard behavior: not focusable. Must never appear in the tab order.
- Screen reader behavior: invisible to assistive technology by default. When semantic separation is needed, consumers should add `accessibilityRole="separator"`.
- Motion rules: no motion is applied. Dividers must not animate.

---

## 5. Accessibility Requirements

- ARIA requirements: no default role. Consumers should set `role="separator"` (via `accessibilityRole="separator"`) when the divider conveys meaningful content separation to screen reader users.
- Focus rules: must never receive focus.
- Contrast expectations: the `$borderColor` token must meet a minimum 3:1 contrast ratio against its background in both light and dark themes (this is a theme-level responsibility).
- Reduced motion behavior: not applicable (no animation).

---

## 6. Theming Rules

- Required tokens: `$borderColor` (background color), `$2` (margin spacing).
- Prohibited hardcoded values: no raw hex colors or pixel dimensions for color or spacing.
- Dark mode expectations: `$borderColor` must resolve to an appropriate value in dark themes. The divider must remain visible but not overpowering in both light and dark modes.

---

## 7. Composition Rules

- What can wrap it: any layout container (VStack, HStack, Stack, Box, ScrollView).
- What it may contain: nothing. Divider is a leaf element and must not accept children.
- Anti-patterns:
  - Do not stack multiple Dividers to create thicker lines (override `height` or `width` instead).
  - Do not use a horizontal Divider inside an HStack or a vertical Divider inside a VStack without understanding that the divider may not fill the cross-axis as expected.
  - Do not use Divider for decorative flourishes or complex visual patterns.

---

## 8. Performance Constraints

- Memoization rules: do not memoize. Divider is a simple styled view with no internal logic.
- Virtualization: when used inside virtualized lists, Divider must render as a standard item or separator and must not break the virtualization boundary.
- Render boundaries: Divider does not establish a React error boundary or Suspense boundary.

---

## 9. Test Requirements

- What must be tested:
  - Horizontal orientation renders a 1px-tall, full-width element with vertical margin.
  - Vertical orientation renders a 1px-wide, full-height element with horizontal margin.
  - Default orientation is horizontal when no `orientation` prop is provided.
  - Uses `$borderColor` as the background color.
  - `flexShrink: 0` is applied in all cases.
- Interaction cases: not applicable (non-interactive).
- Accessibility checks:
  - No role is set by default.
  - Consumer-applied `accessibilityRole="separator"` is forwarded correctly.
  - Divider is not focusable.
