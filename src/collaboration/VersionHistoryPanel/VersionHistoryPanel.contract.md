# Component Contract — VersionHistoryPanel

## 1. Public API

### Base Props

`VersionHistoryPanel` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Intended to be rendered as a side panel alongside a `DocumentEditor`. May be toggled via a toolbar button.

May contain: A scrollable list of version entries grouped by date. A restore/apply action button at the bottom or on each selected entry. May contain an `ActivityFeed` showing changes for the selected version.

---

## 2. Behavioral Guarantees

- Idle: Displays the list of version entries; no version is selected.
  - Entry selected: The selected entry is visually highlighted; the document preview shows that version's content.
  - Loading: Skeleton placeholders for version entries while the list is being loaded by the parent.
  - Empty: A message indicating no version history is available.
  - Restoring: A loading/pending indicator while a restore operation is in progress (triggered by parent).
- Controlled vs uncontrolled: Fully controlled. Parent provides the version list, the currently selected version ID, and callbacks for selection and restore actions.
- Keyboard behavior: Arrow Up/Down to move through version entries. Enter to select the highlighted entry. A dedicated "Restore" button is reachable via Tab and activatable via Enter/Space.
- Screen reader behavior: The panel is a landmark region labeled "Version history." Each version entry is a list item with a full description (name, author, timestamp). The currently selected entry is indicated via `aria-selected`.
- Motion rules: Selecting a new version may animate a transition in the document preview area. Reduced motion: transition is instant.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Panel container uses `role="complementary"` with `aria-label="Version history"`. The version list uses `role="listbox"`. Each entry uses `role="option"` with `aria-selected`. Restore button has a descriptive label that includes the version name.
- Focus rules: On panel open, focus moves to the version list or the first entry. Closing the panel returns focus to the trigger element.
- Contrast expectations: Selected entry highlight must provide sufficient contrast for the entry text above it. All text meets WCAG AA.
- Reduced motion behavior: Any transition animations when switching version previews are suppressed.

---

## 4. Styling Guarantees

- Required tokens: panel background, entry default background, entry hover background, entry selected/active background, group heading text color, divider color, primary text, secondary/muted text, border radius token for entries, spacing tokens for entry padding and group gaps.
- Prohibited hardcoded values: No hardcoded colors, pixel widths, or date formatting styles.
- Dark mode expectations: Panel background uses a dark surface token. Selected entry highlight uses a dark accent background token. All text adapts via theme tokens.

- Responsive behavior: The panel is typically a fixed-width sidebar. On narrow viewports it transitions to a bottom sheet or full-screen modal.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `VersionHistoryPanel.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
