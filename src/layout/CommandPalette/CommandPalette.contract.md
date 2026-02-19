# Component Contract — CommandPalette

## 1. Public API

### Base Props

`CommandPalette` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: application root-level component or page-level wrapper (for global keyboard listener). Must be a descendant of the design system Provider. Rendered as a portal to the document root to avoid z-index or overflow clipping issues.

May contain: a search input, a scrollable result list with optional group headings, result items (each with a label, optional icon, optional metadata, optional keyboard shortcut badge), and an empty state slot.

---

## 2. Behavioral Guarantees

- Open (empty query): shows default/recent commands or a curated initial list.
  - Open (filtered): shows results matching the current query string.
  - Result item hovered/focused: item background changes to hover/selected token.
  - No results: empty state message rendered in the result list area.
  - Loading: a loading indicator within the result list when results are fetched asynchronously.
  - Closed: overlay is hidden; focus returns to the previously focused element.
- Controlled vs uncontrolled: the open/closed state supports both patterns. The query value may be controlled or uncontrolled. The result list is always driven by props (parent filters and provides results).
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: palette opens with a short scale-in or fade-in token animation. Backdrop fades in. Both are suppressed under reduced motion; palette appears immediately.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: when opened, focus moves immediately to the search input. When closed, focus returns to the element that triggered the open action. Focus is trapped within the palette while open.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress open/close animations; display the palette immediately.

---

## 4. Styling Guarantees

- Required tokens: palette background, palette border, palette shadow, backdrop color (semi-transparent), input background, input border, result item hover background, result item selected background, group heading text, empty state text, focus ring color, space tokens, radius token, typography scale tokens.
- Prohibited hardcoded values: no hardcoded colors, spacing, max-width/height values, or font sizes.
- Dark mode: palette background and result item states must resolve correctly in dark mode; the backdrop must create sufficient contrast to focus attention on the palette.

- Responsive behavior: on small screens, the palette takes up most of the viewport width and height. On medium/large screens, the palette is a centered floating panel of a constrained max-width (e.g., 640px) and max-height, with the result list scrolling internally.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `CommandPalette.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
