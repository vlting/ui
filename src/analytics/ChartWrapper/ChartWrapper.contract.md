# Component Contract — ChartWrapper

## 1. Public API

### Base Props

`ChartWrapper` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a dashboard grid cell, a page section, a modal or sheet.

May contain: a title slot, a subtitle slot, an actions slot (header-right), the chart component slot (body), and a legend slot.

---

## 2. Behavioral Guarantees

- In `idle` state: fully rendered with chart content.
- In `loading` state: the chart content area displays a skeleton; the header and legend remain visible.
- In `empty` state: the chart content area shows the empty state; the header remains visible.
- In `error` state: the chart content area shows the error state; the header remains visible.
  - **expanded** (optional): the wrapper fills a larger area (e.g., full-screen modal) when an expand action is triggered.
- Controlled vs uncontrolled: expansion state and active time-range are controlled externally; no internal state beyond layout.
- Keyboard behavior: Tab navigates through the header actions in order; the chart content area is entered via Tab and managed by the chart component itself.
- Screen reader behavior: the wrapper has `aria-label` or `aria-labelledby` pointing to the chart title element; the chart content region has `role="region"` with a label.
- Motion rules: expansion/collapse uses `duration.normal`; state transitions use `duration.fast`; reduced motion disables all animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: the wrapper root has `role="region"` and `aria-labelledby` pointing to the title element; header action buttons have descriptive `aria-label` values.
- Focus rules: focus order is title (if interactive) → header actions → chart content; focus must not be trapped within the wrapper.
- Contrast expectations: title and subtitle text meet WCAG AA (4.5:1) against the wrapper background; action icons meet 3:1 non-text contrast.
- Reduced motion behavior: expansion animation is disabled; the wrapper renders in its final expanded/collapsed state immediately.

---

## 4. Styling Guarantees

- Required tokens: wrapper background, wrapper border, wrapper shadow, title text color, subtitle text color, action icon color, legend text color, divider color (between header and body).
- Prohibited hardcoded values: no raw hex codes, pixel padding, or font sizes.
- Dark mode expectations: wrapper background must be distinguishable from the page background in dark mode; border and shadow tokens must remain visible.
- Layout rules: vertical stack — header row (title + actions), chart content area, optional legend row; the chart content area expands to fill available height; the wrapper has a defined border radius and optional elevation (shadow token).
- Responsive behavior: on mobile, the header may stack title and actions vertically; the legend may collapse to a horizontal scroll row or be hidden behind a toggle.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ChartWrapper.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
