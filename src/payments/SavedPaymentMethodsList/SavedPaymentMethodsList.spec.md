# Component Spec — SavedPaymentMethodsList

## 1. Purpose

Displays a list of the user's saved payment methods (credit/debit cards, bank accounts, etc.) with options to select a default, add a new method, or remove an existing one.

Use it on billing settings pages and at the payment step of checkout flows where the user must choose or manage their saved payment instruments.

Do NOT use it for payment method entry forms (use PaymentMethodForm), for displaying transaction history (use InvoiceTable), or for read-only display without any management actions.

---

## 2. UX Intent

- Primary interaction goal: selection and management — the user identifies the payment method they want to use and either selects it or manages (set default, remove) their saved methods.
- Expected user mental model: a list of cards or accounts similar to the payment method management UIs in Stripe, Apple Pay settings, or e-commerce checkout flows. Each method shows a card brand icon, masked number, and expiry.
- UX laws applied:
  - Jakob's Law: match the familiar pattern of payment method lists with card brand logos, masked card numbers, and expiry dates.
  - Fitts's Law: selection targets (radio buttons or the entire list item row) must be large enough for comfortable touch.
  - Hick's Law: present methods in a clean list; avoid visual clutter. Group actions (remove, set default) in an overflow or secondary affordance.
  - Miller's Law: if there are many saved methods, limit the visible list to 5–7 with a "Show more" affordance.

---

## 3. Visual Behavior

- Layout: a vertical list of payment method items. Each item has a card brand icon, masked card/account number, expiry or last-four digits, a default badge (if applicable), and action controls (set default, remove).
- Spacing: consistent vertical gap between items using space tokens. Item internal padding from space tokens with adequate minimum height for touch targets.
- Typography: card brand uses a label scale. Masked number uses a monospaced or tabular body scale. Expiry/detail uses a secondary/caption scale. "Default" badge uses a small label scale.
- Token usage:
  - Item background: surface or list-item-surface token.
  - Selected/active item background: muted accent or selected-state token.
  - Default badge: positive/success or accent background token.
  - Remove action: destructive/error text token.
  - Border: border token between items or around the list container.
- Responsive behavior: full-width list at all breakpoints. Action controls may be in an overflow menu on narrow viewports to preserve item width.

---

## 4. Interaction Behavior

- States:
  - Idle: list shows all saved methods; the default is marked.
  - Selected: a method is highlighted as the active selection (for checkout flows).
  - Hover: item background shifts to hover token.
  - Focus: item or its controls show a visible focus ring.
  - Loading: skeleton items while data loads.
  - Empty: an "Add payment method" prompt is shown when no methods are saved.
  - Removing: the remove action shows a loading state on the item while deletion is in progress.
- Controlled vs uncontrolled: selection state (for checkout) is controlled via `value` and `onValueChange`. Management actions (`onSetDefault`, `onRemove`) are callbacks. Open/add-new is handled by the parent (triggers PaymentMethodForm).
- Keyboard behavior:
  - Tab navigates through each list item's interactive controls.
  - Arrow keys navigate between items in selection mode (radio pattern).
  - Enter or Space selects a focused item.
  - Remove actions are reachable via Tab.
- Screen reader behavior: the list has `role="radiogroup"` in selection mode (or `role="list"` in management-only mode). Each item has an accessible label combining card brand, masked number, and expiry. The default badge is readable by screen readers. Remove buttons include the card name in their label.
- Motion rules: item hover and selection transitions use a subtle background color change from motion tokens. Suppressed under reduced motion. The remove loading state uses a brief spinner. Suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: in selection mode, use `role="radiogroup"` with `aria-label` and each item as `role="radio"` with `aria-checked`. Remove buttons use `aria-label` including the card name. Default badge is readable (not `aria-hidden`).
- Focus rules: in selection mode, only the selected item is in the tab order (roving tabindex). Arrow keys move selection within the list. Action buttons (remove, set default) remain Tab-reachable.
- Contrast expectations: all text (card number, expiry, badge labels) meets WCAG AA. Remove action text (destructive) meets contrast requirements.
- Reduced motion behavior: all transitions and spinner animations are instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: surface, list-item surface, hover state, selected state, border, primary text, secondary text, positive/success (default badge), destructive/error (remove action), space tokens, radius tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based dimensions, no hardcoded font sizes.
- Dark mode expectations: item surfaces, hover, and selected states must remain visually distinct in dark mode. Default and remove states must maintain their semantic clarity.

---

## 7. Composition Rules

- What can wrap it: billing settings pages, checkout payment step, UpgradeModal payment step.
- What it may contain: a list of payment method items each containing brand icon, masked number, expiry, default badge (if applicable), and action controls. An "Add new payment method" trigger at the bottom of the list.
- Anti-patterns:
  - Do not embed the PaymentMethodForm inside a list item — use a separate dialog/sheet for adding methods.
  - Do not display unmasked card numbers.
  - Do not use SavedPaymentMethodsList for displaying transaction history.

---

## 8. Performance Constraints

- Memoization rules: memoize the component. Individual item components should be memoized.
- Virtualization: typically not needed (users rarely have more than 5–10 saved methods). If the list grows, the parent may supply a paginated subset.
- Render boundaries: the component does not fetch payment data. All data comes from props.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct number of payment method items.
  - The default method displays a "Default" badge.
  - Empty state renders when no methods are saved.
  - Loading skeleton renders when loading is true.
  - Clicking an item (in selection mode) calls `onValueChange` with the method ID.
  - "Set default" action calls `onSetDefault` with the method ID.
  - "Remove" action calls `onRemove` with the method ID.
  - Remove loading state shows a spinner on the affected item.
- Interaction cases:
  - Arrow keys navigate between items in selection mode.
  - Tab reaches all action controls in each item.
- Accessibility checks:
  - In selection mode, `role="radiogroup"` and `role="radio"` are present with correct `aria-checked`.
  - Remove buttons have descriptive labels including the card name.
  - Default badge is readable by screen readers.
  - Contrast passes in both themes.
  - Transitions suppressed under reduced motion.
