# Component Contract — ApprovalWorkflowPanel

## 1. Public API

### Base Props

`ApprovalWorkflowPanel` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: drawer panels, modal dialogs, full-page record detail views, side-panel layouts. Must be a descendant of the design system Provider.

May contain: a workflow header, an approval chain visualization (list of stage items), an optional comment/notes area, and an action footer. Individual stage items display approver identity, status, and timestamp.

---

## 2. Behavioral Guarantees

- Pending (viewer is the current approver): Approve and Reject buttons are active.
  - Pending (viewer is not the current approver): action area is hidden or shows "Awaiting [Name]'s review."
  - Approved (all stages complete): panel shows a completed/approved status badge; no action controls.
  - Rejected: panel shows a rejected status badge; optionally shows the rejecting approver's comment.
  - Submitting: action buttons enter a loading state while the action is being processed.
  - Error: error message appears near the action area; buttons return to their active state.
- Controlled vs uncontrolled: this is a display + event-emitting component. It accepts workflow state as props and emits onApprove/onReject callbacks. It does not manage workflow state internally.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: stage status changes (e.g., pending to approved) may animate with a brief token transition suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: after a successful action, focus moves to the panel's status region or a confirmation message.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress stage status transition animations.

---

## 4. Styling Guarantees

- Required tokens: stage status semantic colors (pending, approved, rejected), connector line color, panel background, header background, action button colors (primary, danger), disabled opacity, space tokens, typography scale tokens.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all semantic status token aliases must resolve to accessible values against dark backgrounds.

- Responsive behavior: on narrow screens, the approval chain stacks vertically. On wide screens, a horizontal layout may be used. Actions are always in a fixed-position footer or at the bottom of the panel.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ApprovalWorkflowPanel.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
