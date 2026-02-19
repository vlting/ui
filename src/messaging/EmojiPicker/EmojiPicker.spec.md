# Component Spec — EmojiPicker

## 1. Purpose

Presents a searchable grid of emoji characters organized by category, allowing users to select an emoji to insert into a message or reaction.

Use when: a user needs to insert an emoji into a text composition area or add a reaction to a message.

Do NOT use when: selecting non-emoji symbols or icons (use an icon picker) or for emoji rendering inline (render emoji directly in text).

---

## 2. UX Intent

- Primary interaction goal: allow users to find and select an emoji quickly, with minimal steps.
- Expected user mental model: a floating panel with emoji organized in a grid, a category tab bar, and a search input — consistent with Slack, iMessage, and Discord emoji pickers.
- UX laws applied:
  - **Hick's Law** — a search input and category tabs reduce the number of emoji the user must scan.
  - **Gestalt (Similarity, Proximity)** — emoji are arranged in a uniform grid; category headers visually separate groups.
  - **Fitts's Law** — individual emoji cells must be large enough for comfortable tap and click targets.
  - **Miller's Law** — display a manageable number of emoji per category section; rely on scroll for the full set.
  - **Jakob's Law** — follows emoji picker conventions from well-known messaging apps.

---

## 3. Visual Behavior

- Layout: a panel containing a search input, a scrollable category tab bar, and a grid of emoji; a "recently used" section at the top (optional).
- Each emoji cell is a square tap target of consistent size.
- Category tabs are icon-only or icon + label; the active category is highlighted.
- Hovering or focusing an emoji cell shows the emoji name in a tooltip or status bar.
- Spacing: cell size, grid gap, and panel padding reference size and space tokens.
- Typography: category labels use caption token; emoji name tooltip uses caption/muted token.
- Token usage: panel background, border, search input, active category tab, and hover state colors reference theme tokens only.
- Responsive behavior: on narrow viewports the panel may occupy more horizontal space; the grid adjusts column count to the panel width.

---

## 4. Interaction Behavior

- States:
  - **idle**: grid shows the default or "recently used" category.
  - **searching**: search input filters the grid in real time.
  - **no results**: a "No emoji found" message is displayed.
  - **hover/focus**: hovered/focused emoji cell is highlighted.
  - **selected**: fires `onEmojiSelect` callback and optionally dismisses the picker.
- Controlled: open/closed state is managed externally; the picker fires `onEmojiSelect` and `onClose`.
- Keyboard behavior: `Tab` / arrow keys navigate between emoji cells; `Enter` selects; `Escape` closes the picker; category tabs are navigable by Tab and arrow keys.
- Screen reader behavior: each emoji cell announces its emoji character and name (e.g., "Grinning Face"); the panel is a `dialog` or `listbox` with an accessible label.
- Motion rules: panel open/close transition respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA: the picker panel uses `role="dialog"` (when floating) or `role="listbox"` with `aria-label`; each emoji uses `role="option"` or `role="button"` with an `aria-label` of the emoji name.
- Search input has a visible label or `aria-label`.
- Focus: on open, focus moves to the search input; on close, focus returns to the trigger.
- Focus trap: keyboard focus must not escape the picker while it is open.
- Contrast: all UI controls (tabs, search, close button) meet WCAG 2.1 AA.
- Reduced motion: disable open/close animations; suppress hover transitions.

---

## 6. Theming Rules

- Required tokens: `background`, `backgroundHover`, `borderColor`, `color`, `colorMuted`, `backgroundSelected` (active tab), `focusStyle`, `space`, `size` (cell size).
- Prohibited hardcoded values: no literal color strings, pixel cell sizes, or panel dimensions.
- Dark mode: panel background, search input, and tab tokens must resolve correctly with sufficient contrast.

---

## 7. Composition Rules

- Typically rendered as a floating panel anchored to a trigger button in `MessageInput` or a reaction control.
- The consumer controls open/closed state and handles the `onEmojiSelect` callback.
- The emoji dataset is provided externally or bundled as a static data file; the component does not fetch emoji data from an API.
- Anti-patterns:
  - Do not hardcode emoji category names or character sets inside the component.
  - Do not implement message composition logic inside the picker.
  - Do not embed the picker inside another picker.

---

## 8. Performance Constraints

- Emoji grid must not render thousands of DOM nodes; virtualize or paginate category sections.
- Search filtering must be synchronous and non-blocking for datasets under 5,000 emoji.
- Memoize the emoji grid when the search query is unchanged.

---

## 9. Test Requirements

- Renders the emoji grid with category tabs.
- Typing in the search input filters emoji in real time.
- No-results state renders an empty message.
- Pressing an emoji cell fires `onEmojiSelect` with the correct emoji character.
- Escape key fires `onClose`.
- Focus moves to the search input on open and returns to the trigger on close.
- Focus is trapped within the picker while open.
- Each emoji cell announces its name via `aria-label`.
- Category tabs are keyboard-navigable.
- Passes axe accessibility audit in idle and search states.
