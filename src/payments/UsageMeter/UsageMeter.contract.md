# Component Contract — UsageMeter

## 1. Public API

### Base Props

`UsageMeter` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

| Category | Examples |
|----------|---------|
| Layout | `width`, `height`, `minWidth`, `maxWidth`, `flex`, `flexDirection` |
| Spacing | `padding`, `paddingHorizontal`, `margin`, `gap` (space tokens) |
| Visual | `backgroundColor`, `borderColor`, `borderRadius`, `opacity` |
| Theme | `theme`, `themeInverse` |
| Animation | `animation`, `enterStyle`, `exitStyle` |
| Accessibility | `accessible`, `accessibilityLabel`, `accessibilityRole`, `aria-*` |
| Events | `onPress`, `onHoverIn`, `onHoverOut`, `onFocus`, `onBlur` |

### Component-Specific Props

No additional props are defined in the current stub implementation. Props specific to the component's behavior (e.g., data, state, callbacks) are to be defined when behavioral logic is implemented per the `.spec.md`.

### Composition Context

Intended to be wrapped by: billing dashboards, account overview cards, feature usage sections, sidebar status widgets.

May contain: a resource name label, a progress bar element, usage text, and an optional upgrade CTA.

---

## 2. Behavioral Guarantees

- Normal (< 70%): bar fills in the default accent color.
  - Warning (70–89%): bar changes to warning semantic color; optionally a warning icon or text appears.
  - Critical (>= 90%): bar changes to destructive color; optionally a "Limit approaching" label and upgrade CTA appear.
  - At limit (100%): bar is fully filled in destructive color; "Limit reached" label and upgrade CTA are prominent.
  - Over limit (> 100%): bar is capped at 100% visually; a distinct "Over limit" indicator (badge or text) appears.
  - Loading: a skeleton bar replaces the meter while data loads.
- Controlled vs uncontrolled: display-only. Accepts `current`, `limit`, `unit`, and `label` as props. No internal state.
- Keyboard behavior: non-interactive display component. If an upgrade CTA is present, it is keyboard-reachable via Tab.
- Screen reader behavior: the usage information must be conveyed as text (e.g., "API calls: 7,500 of 10,000 used, 75%"). The progress bar uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label`. The semantic state (warning, critical) must be conveyed via text, not color alone.
- Motion rules: changes to the bar fill amount use a short width transition from motion tokens. Color changes (state transitions) use a short color transition. Both suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: the bar uses `role="progressbar"` with `aria-valuenow` (current numeric value), `aria-valuemin` (0), `aria-valuemax` (limit), and `aria-label` or `aria-labelledby` describing the resource. The usage text below the bar provides a human-readable description visible to screen readers.
- Focus rules: the meter itself is not focusable. If an upgrade CTA is present, it is in the tab order.
- Contrast expectations: all bar fill colors (accent, warning, destructive) must meet non-text contrast requirements (3:1) against the track background. All text labels meet WCAG AA.
- Reduced motion behavior: the bar fill width and color transitions are instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: primary/accent (normal fill), warning semantic, destructive/error semantic, muted surface (track background), primary text, secondary text, radius tokens (bar track), space tokens (label-to-bar gap, bar height).
- Prohibited hardcoded values: no raw hex colors, no pixel-based heights or widths, no hardcoded percentage thresholds (thresholds should be configurable via props or a default config).
- Dark mode expectations: bar track and fill colors must remain distinguishable and semantically correct in dark mode. Warning and critical states must be clearly different from the normal state in dark mode.

- Responsive behavior: the bar fills the full width of its container. On narrow viewports, the usage text may wrap to a second line.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `UsageMeter.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
