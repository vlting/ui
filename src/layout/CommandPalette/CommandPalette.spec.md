# Component Spec — CommandPalette

## 1. Purpose

Provides a keyboard-driven, search-first interface for discovering and executing application commands, navigating to pages, and performing global actions — all from a single modal overlay. Used as a power-user productivity feature in complex applications where commands are too numerous to surface all at once in the standard navigation.

Do NOT use this component for simple single-field search (use a SearchInput), for form-based multi-step flows (use a Modal or MultiStepForm), or as a primary navigation mechanism for users unfamiliar with keyboard-first interactions.

---

## 2. UX Intent

- Primary interaction goal: allow users to type a few characters and immediately see a filtered list of matching commands, pages, or actions, which they can activate with Enter or arrow key navigation — without reaching for a mouse.
- Expected user mental model: a floating search-and-execute dialog similar to Spotlight (macOS), VS Code's Command Palette (Cmd+Shift+P), or Linear's command interface — a text field at the top and a scrollable list of results below.
- UX laws applied:
  - Jakob's Law: the modal overlay with a search input at the top and a result list below matches the established command palette pattern from VS Code, Linear, Figma, and Notion.
  - Hick's Law: filtering by keystroke dramatically reduces the decision space; users see only results relevant to what they typed.
  - Doherty Threshold: result filtering must update within 400 ms of each keystroke to feel instantaneous.
  - Fitts's Law: result items are full-width for easy keyboard selection; mouse users can click any result.
  - Miller's Law: show a maximum of approximately seven to ten results at once; scroll for more.

---

## 3. Visual Behavior

- Layout: a centered modal overlay with a backdrop. Inside: a search input at the top (full width), a result list below (scrollable). Optional group headings may separate result categories. An empty state message appears when no results match.
- Spacing: padding inside the palette container uses space tokens. Gap between result items uses space tokens. Group heading margins use space tokens.
- Typography: search input text uses a body scale token. Result item labels use a body token; result item metadata/shortcuts use a caption token in muted color. Group headings use a caption token, uppercase or bold, in muted color.
- Token usage: palette background, backdrop color, border, shadow, input background, result item hover/selected background, group heading text color, empty state text color, focus ring must all use design tokens.
- Responsive behavior: on small screens, the palette takes up most of the viewport width and height. On medium/large screens, the palette is a centered floating panel of a constrained max-width (e.g., 640px) and max-height, with the result list scrolling internally.

---

## 4. Interaction Behavior

- States:
  - Open (empty query): shows default/recent commands or a curated initial list.
  - Open (filtered): shows results matching the current query string.
  - Result item hovered/focused: item background changes to hover/selected token.
  - No results: empty state message rendered in the result list area.
  - Loading: a loading indicator within the result list when results are fetched asynchronously.
  - Closed: overlay is hidden; focus returns to the previously focused element.
- Controlled vs uncontrolled: the open/closed state supports both patterns. The query value may be controlled or uncontrolled. The result list is always driven by props (parent filters and provides results).
- Keyboard behavior:
  - Cmd+K (or a configurable hotkey) opens the palette from anywhere in the application (global listener managed by parent).
  - Escape closes the palette.
  - Arrow Down/Up navigates through result items.
  - Enter activates the focused result item.
  - Tab may navigate through result items (or exit the palette, per configuration).
  - Typing in the input filters results in real time.
- Screen reader behavior:
  - The palette overlay uses `role="dialog"` with `aria-modal="true"` and an `aria-label` (e.g., "Command palette").
  - The search input has an `aria-label` and `aria-controls` pointing to the result list.
  - The result list uses `role="listbox"`. Each result item uses `role="option"` with `aria-selected`.
  - The active/focused item is tracked with `aria-activedescendant` on the search input.
  - Result count changes are announced via `aria-live="polite"`.
- Motion rules: palette opens with a short scale-in or fade-in token animation. Backdrop fades in. Both are suppressed under reduced motion; palette appears immediately.

---

## 5. Accessibility Requirements

- ARIA: `role="dialog"`, `aria-modal="true"`, `aria-label` on the overlay. Search input uses `aria-controls` and `aria-activedescendant`. Result list uses `role="listbox"`. Result items use `role="option"` with `aria-selected`. Focus is trapped within the palette while open.
- Focus rules: when opened, focus moves immediately to the search input. When closed, focus returns to the element that triggered the open action. Focus is trapped within the palette while open.
- Contrast: input text, result labels, metadata text, and group headings must all meet WCAG AA contrast against the palette background using design tokens. The backdrop must not reduce contrast of palette content.
- Reduced motion: suppress open/close animations; display the palette immediately.

---

## 6. Theming Rules

- Required tokens: palette background, palette border, palette shadow, backdrop color (semi-transparent), input background, input border, result item hover background, result item selected background, group heading text, empty state text, focus ring color, space tokens, radius token, typography scale tokens.
- Prohibited hardcoded values: no hardcoded colors, spacing, max-width/height values, or font sizes.
- Dark mode: palette background and result item states must resolve correctly in dark mode; the backdrop must create sufficient contrast to focus attention on the palette.

---

## 7. Composition Rules

- What can wrap it: application root-level component or page-level wrapper (for global keyboard listener). Must be a descendant of the design system Provider. Rendered as a portal to the document root to avoid z-index or overflow clipping issues.
- What it may contain: a search input, a scrollable result list with optional group headings, result items (each with a label, optional icon, optional metadata, optional keyboard shortcut badge), and an empty state slot.
- Anti-patterns:
  - Do not embed the global hotkey listener inside the component — manage this in the application root and control open state via a prop.
  - Do not perform data fetching or command resolution inside the component — supply results as a prop array.
  - Do not use for simple single-field filtering — use a SearchInput.

---

## 8. Performance Constraints

- Memoization: result items should be memoized; re-renders should only affect the result list when the results array changes.
- Virtualization: if the result list can exceed approximately 50 items, virtualize the result list to maintain scroll performance.
- Render boundaries: the palette content should be lazily mounted (not rendered until opened) and unmounted after close to avoid maintaining filter state and DOM nodes when unused.

---

## 9. Test Requirements

- Rendering: renders correctly when open with results, open with no results (empty state), and open in loading state.
- Search filtering: typing into the input updates the result list to match the query.
- Keyboard navigation: Arrow Down/Up moves selection through results; Enter activates the selected result; Escape closes the palette.
- Result activation: activating a result item fires the correct onSelect callback.
- Focus management: focus moves to the search input on open; returns to the trigger element on close; focus is trapped while open.
- Controlled mode: open state and onOpenChange from parent are respected.
- Accessibility: dialog role, aria-modal, aria-label, listbox role, option roles, aria-activedescendant, aria-live are all present and correct.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: palette appears immediately without animation when motion is reduced.
