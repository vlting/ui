# Component Contract — PhotoGalleryUploader

## 1. Public API

### Base Props

`PhotoGalleryUploader` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: the DatingProfileEditor, a standalone photo management screen, or an onboarding step.

May contain: photo thumbnail images, slot icons, remove buttons, progress indicators, and an action menu/sheet.

---

## 2. Behavioral Guarantees

empty (idle), empty (hover/focus), filled (idle), filled (hover/focus — shows remove overlay), uploading (progress indicator), error (upload failed — error overlay with retry).
- The component is controlled: the parent owns the photos array and receives `onAdd`, `onRemove`, and `onReorder` callbacks.
- Pressing an empty slot triggers the file/media selection flow (delegated to the parent via `onAdd`).
- Pressing a filled slot may open a context menu or action sheet with "Change Photo" and "Remove" options.
- Dragging a filled slot to another position triggers `onReorder` with the new index order.

- Keyboard behavior:
- Screen reader behavior: each slot announces its index, status (empty or filled with photo name/index), and available actions.


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
- Reduced motion: no drag animation, no progress animation — use static/instant updates.

---

## 4. Styling Guarantees

- Required tokens: `background` (slot), `borderColor` (slot border), accent token for primary photo slot indicator, overlay background token (semi-transparent surface), icon color token, error token for failed slot, progress color token.
- Prohibited hardcoded values: no raw colors, no hardcoded pixel dimensions for slots.
- Dark mode: slot backgrounds, overlays, icons, and error states must all resolve via theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PhotoGalleryUploader.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
