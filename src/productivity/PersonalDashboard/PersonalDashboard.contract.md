# Component Contract — PersonalDashboard

## 1. Public API

### Base Props

`PersonalDashboard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: A full-page view or screen-level layout. May be wrapped by a navigation shell or tab panel.

May contain: - A greeting or date header.

---

## 2. Behavioral Guarantees

- Idle: All sections display their content.
  - Loading: Skeleton states within sections are displayed until data resolves.
  - Empty (per section): Each section renders its own empty state when no relevant data exists.
  - Partial: Some sections may be populated while others are still loading.
- Controlled vs uncontrolled: The dashboard is a layout/composition component. It does not manage data state. All section content is supplied by the parent.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Section entrance animations (if any) are subtle fades or slides. All motion is suppressed under reduced motion preference.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: Focus flows naturally through the dashboard in DOM order. No focus traps. Keyboard users can Tab through all interactive elements without obstruction.
- Contrast expectations: Section headings and body content must meet 4.5:1. Secondary labels and metadata must meet 3:1.
- Reduced motion behavior: Entrance animations and skeleton shimmer effects are disabled.

---

## 4. Styling Guarantees

- Required tokens: page/dashboard background, section surface background, section border, text heading, text body, text secondary, space, radius.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Dashboard and section surface backgrounds shift to dark tokens. Text and border tokens resolve correctly. All embedded component tokens also respond to dark mode.
- Layout rules:
- Responsive behavior: On narrow viewports, all sections stack vertically. On wide viewports, a multi-column layout is applied. Sections collapse gracefully if their content is empty.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PersonalDashboard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
