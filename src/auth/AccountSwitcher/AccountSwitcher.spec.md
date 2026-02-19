# Component Spec — AccountSwitcher

## 1. Purpose

AccountSwitcher allows a user to view and switch between multiple authenticated accounts they have access to within a single session. It surfaces the current active account identity and exposes other available accounts for quick selection.

Use it when an application supports multi-account or multi-workspace contexts (e.g., personal vs. organization accounts).

Do NOT use it when the application supports only a single authenticated identity, or when account selection is handled exclusively at login time.

---

## 2. UX Intent

- Primary interaction goal: allow the user to identify their current account and switch to another with minimal friction.
- Expected user mental model: a dropdown or popover listing known accounts, similar to OS-level user-switching menus or email client account pickers (Jakob's Law — familiar pattern).
- UX laws applied:
  - Jakob's Law: mirror conventions from Google, GitHub, Slack account switchers.
  - Hick's Law: limit visible choices to directly available accounts; avoid overwhelming lists.
  - Fitts's Law: the trigger element must be large enough and positioned predictably (header/nav area).
  - Miller's Law: if more than ~7 accounts exist, introduce grouping or search filtering.

---

## 3. Visual Behavior

- Layout: vertically stacked list of account entries within a constrained container (popover or sheet).
- Each account entry displays an avatar, display name, and secondary identifier (e.g., email or handle).
- The active account is visually distinguished (selected indicator, bold label, or checkmark).
- Spacing between account entries uses space tokens; no hardcoded gaps.
- Typography follows the design system's body and caption scales.
- On small viewports, the switcher may expand into a bottom sheet rather than a popover.
- Maximum height is constrained; overflow scrolls the account list.
- Minimum touch target per account row is 44x44pt (Fitts's Law).

---

## 4. Interaction Behavior

- States:
  - Idle: trigger button shows current account avatar and name.
  - Hover (web): trigger button shows a subtle background highlight.
  - Focus: trigger button shows a visible focus ring.
  - Active (open): the switcher panel is visible; the trigger reflects the open state.
  - Loading: when account list is being resolved, a loading indicator replaces the list.
  - Disabled: trigger is non-interactive; no visual affordance for opening.
- Controlled and uncontrolled open state both supported.
- Keyboard behavior:
  - `Enter` or `Space` on the trigger opens/closes the panel.
  - `ArrowDown` / `ArrowUp` navigate between account entries.
  - `Enter` selects the focused account and closes the panel.
  - `Escape` closes the panel and returns focus to the trigger.
  - `Tab` closes the panel and moves focus out.
- Screen reader behavior: trigger announces "Account switcher, [current account name], button". Account entries announce name and secondary identifier. Selected account announces "selected".
- Motion: open/close transitions respect `prefers-reduced-motion`; animation is suppressed or replaced with instant show/hide.

---

## 5. Accessibility Requirements

- Trigger element has `role="button"` with `aria-haspopup="listbox"` and `aria-expanded` reflecting open state.
- Account list has `role="listbox"`.
- Each account entry has `role="option"` with `aria-selected` on the active account.
- Focus is moved into the list on open; trapped within the panel while open.
- All interactive elements meet a minimum 3:1 contrast ratio against their background; text meets 4.5:1.
- Reduced motion: no scale or fade transitions when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- Required tokens: background color, surface/overlay color, text primary, text secondary, border color, focus ring color, selected indicator color, avatar placeholder background.
- Prohibited hardcoded values: no raw color strings, no pixel spacing values, no hardcoded font sizes.
- Dark mode: all token references must resolve correctly under the active theme; no separate dark-mode-only style overrides.

---

## 7. Composition Rules

- May wrap: navigation bars, headers, sidebars, or standalone trigger areas.
- May contain: account list items (avatar + name + identifier), dividers, an optional "Add account" or "Sign out" action row.
- Anti-patterns:
  - Do not embed business logic (fetching accounts, performing auth) inside this component.
  - Do not nest another AccountSwitcher inside itself.
  - Do not use this component as a general-purpose dropdown/menu.

---

## 8. Performance Constraints

- Account list items should be memoized individually to avoid re-renders when the active account changes.
- If the account list can exceed 20 entries, virtualize the list.
- The trigger element must not re-render on every keystroke elsewhere on the page; isolate open-state updates.

---

## 9. Test Requirements

- Renders current account name and avatar in the trigger.
- Opens the account list on trigger activation (click, Enter, Space).
- Closes on Escape and returns focus to trigger.
- Arrow key navigation moves focus through account entries.
- Selecting an account fires the selection callback with the correct account identifier.
- Active account is marked as selected visually and via `aria-selected`.
- Loading state renders a loading indicator and hides the account list.
- Disabled state prevents opening.
- Accessibility: no axe violations; focus trap works; `aria-expanded` toggles correctly.
- Reduced motion: no animation classes applied when `prefers-reduced-motion` is active.
