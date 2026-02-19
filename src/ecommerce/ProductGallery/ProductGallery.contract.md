# Component Contract — ProductGallery

## 1. Public API

### Base Props

`ProductGallery` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a product detail page layout, a product quick-view modal.

May contain: a main image display area, thumbnail navigation strip (or dot indicators), previous/next navigation buttons, and an optional image counter overlay.

---

## 2. Behavioral Guarantees

idle (first image active), navigating (transition to new image), loading (image loading placeholder), zoomed (optional zoom on press/click of main image).
- The component is controlled or uncontrolled: supports both a `selectedIndex` + `onIndexChange` pattern and a self-managed default index.
- Pressing a thumbnail sets it as the active image.
- Pressing next/prev buttons advances or retreats the active index.
- Swiping left/right on the main image navigates (mobile).
- At the first image, the prev button is disabled; at the last image, the next button is disabled. (Optionally looping, controlled by a prop.)

- Keyboard behavior:
- Screen reader behavior: the main image has a descriptive `alt` text; the gallery has an `aria-label` (e.g., "Product images"). The active image index is communicated via an `aria-live` announcement (e.g., "Image 2 of 5").


### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus must be visible and never trapped.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: no crossfade or slide — instant image swap.

---

## 4. Styling Guarantees

- Required tokens: thumbnail border token (default), accent/highlight token (active thumbnail), navigation button surface token, overlay background token (for counter), `borderRadius` for thumbnail and button shapes.
- Prohibited hardcoded values: no raw colors, no hardcoded pixel thumbnail sizes outside the token scale.
- Dark mode: thumbnail borders, navigation buttons, overlays, and counter text must resolve via theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ProductGallery.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
