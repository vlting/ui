# Component Contract — ContactCard

## 1. Public API

### Base Props

`ContactCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Placed inside a contact list, search results list, or CRM sidebar panel. May appear in a `KanbanColumn` or `PipelineBoard` context.

May contain: - `ContactCard.Avatar` — the contact's avatar image or initials fallback.

---

## 2. Behavioral Guarantees

- Idle: Default card appearance.
  - Hover: Subtle background or shadow elevation change to indicate the card is clickable.
  - Focus: Visible focus ring on the card or the primary name link.
  - Loading: Skeleton for avatar, name, and details.
  - No avatar: Falls back to initials-based avatar using the contact's name initials.
- Controlled vs uncontrolled: Fully controlled. Parent supplies contact data and action callbacks.
- Keyboard behavior: Tab reaches the card's primary link (name) and then each action button in the Actions section. The card itself may also be a single focusable element if it is fully clickable.
- Screen reader behavior: Contact name is the primary accessible label. Avatar image has `alt` set to the contact's name or is marked decorative if the name is already announced. Action buttons have descriptive labels (e.g., "Call Alice Smith", "Email Alice Smith").
- Motion rules: Hover state transition animates subtly. Reduced motion: instant state change.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Card acts as a list item in its list context. Avatar image uses `alt` with contact name or `alt=""` if name is present as text. Action buttons have descriptive `aria-label` values incorporating the contact name.
- Focus rules: Name link is the first focusable element. Action buttons follow in tab order. If the entire card is a link, individual action buttons are separately focusable within it.
- Contrast expectations: Name, detail text, and action labels meet WCAG AA against the card background in both default and hover states.
- Reduced motion behavior: Hover/focus transitions are suppressed.

---

## 4. Styling Guarantees

- Required tokens: card background, card hover background, card border color, card shadow/elevation, avatar border color, name text color, detail body text color, muted/secondary text color, action button colors, spacing tokens, border radius tokens for card and avatar.
- Prohibited hardcoded values: No hardcoded colors, pixel dimensions, or font sizes.
- Dark mode expectations: Card background uses a dark surface token. All text and button colors adapt. Avatar border adjusts to dark border token.

- Responsive behavior: In narrow contexts, the card stacks vertically (avatar top, content below). In wider contexts, avatar is to the left of the content. Card width is determined by its container.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ContactCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
