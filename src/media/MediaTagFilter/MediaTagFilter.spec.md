# Component Spec — MediaTagFilter

## 1. Purpose

Provides a set of selectable tag chips or toggle buttons for filtering a media library by category, type, or user-defined tag.

Use when: allowing users to narrow a media library to a specific subset using one or more tag-based filters.

Do NOT use when: filtering by complex multi-field criteria (use a full filter panel) or displaying tags as read-only metadata (use a tag display component).

---

## 2. UX Intent

- Primary interaction goal: allow users to quickly apply and remove tag-based filters with a single tap or click per tag.
- Expected user mental model: a horizontal row of pill/chip toggles, familiar from app store category filters and search facet bars.
- UX laws applied:
  - **Hick's Law** — a limited, scannable set of tags reduces decision time; overflow scrolls horizontally rather than wrapping to multiple rows.
  - **Fitts's Law** — each tag chip must be large enough to be comfortably tapped on mobile.
  - **Jakob's Law** — tag chip toggle behavior matches conventions from search facets and content filter bars.
  - **Gestalt (Similarity)** — all tags share the same chip shape and size; active tags differ only in fill/color.

---

## 3. Visual Behavior

- Layout: horizontal scrollable row of tag chips; chips do not wrap to multiple rows by default.
- Each chip displays the tag label and an optional count badge.
- Active/selected chips are visually distinguished from inactive chips via fill or border, not color alone.
- An "All" or "Clear" chip may be included to reset the filter state.
- Spacing: gaps between chips and chip internal padding reference space tokens.
- Typography: tag label uses a label/caption token; count badge uses a smaller numeric token.
- Token usage: chip background (active/inactive), border, text, and count badge colors reference theme tokens only.
- Responsive behavior: on narrow viewports the chip row scrolls horizontally; on wider viewports all chips may be visible without scrolling.

---

## 4. Interaction Behavior

- States:
  - **inactive**: chip in unselected state.
  - **active/selected**: chip visually highlighted.
  - **hover**: subtle background shift on hover.
  - **focus**: visible focus ring on the chip.
  - **disabled**: a tag may be individually disabled; reduced opacity, non-interactive.
- Supports single-select or multi-select mode depending on props.
- Controlled/uncontrolled: selected tags are controlled externally in controlled mode; fires an `onChange` callback with the new selection.
- Keyboard behavior: `Tab` moves focus between chips; `Space` or `Enter` toggles a chip.
- Screen reader behavior: each chip announces its label, count, and current selected/unselected state.
- Motion rules: toggle transitions respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA: the chip row uses `role="group"` with an `aria-label`; each chip uses `role="checkbox"` (multi-select) or `role="radio"` (single-select) with `aria-checked` or `aria-selected`.
- Active/inactive state must be communicated via `aria-checked` or `aria-selected`, not color alone.
- Focus: focus ring is visible on all chips; the chip row itself is keyboard-navigable.
- Contrast: chip text and background pairings meet WCAG 2.1 AA in both active and inactive states.
- Reduced motion: suppress toggle animations.

---

## 6. Theming Rules

- Required tokens: `background` (inactive chip), `backgroundSelected` (active chip), `borderColor`, `borderColorSelected`, `color`, `colorSelected`, `colorMuted`, `focusStyle`, `space`, `borderRadius`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or border-radius numbers.
- Dark mode: active and inactive chip states must maintain sufficient contrast in dark themes.

---

## 7. Composition Rules

- Typically composed above `MediaLibraryGrid` by the consumer.
- The consumer manages the filter state and passes selected tags as props.
- Anti-patterns:
  - Do not implement media filtering logic inside this component.
  - Do not hardcode tag labels or counts.
  - Do not use color alone to differentiate active from inactive chips.

---

## 8. Performance Constraints

- No internal data fetching or subscriptions.
- Memoize the chip list when the tag array is stable.
- Horizontal scroll must be smooth; avoid layout thrashing during scroll.

---

## 9. Test Requirements

- Renders all provided tags as chips.
- Pressing a chip fires `onChange` with the updated selection.
- Active chips are visually distinguished from inactive chips without relying on color alone.
- Disabled chips are non-interactive and announce their disabled state.
- Single-select mode allows only one active chip at a time.
- Multi-select mode allows multiple active chips simultaneously.
- Keyboard: Tab and Space/Enter navigate and toggle chips correctly.
- Screen reader announces chip label, count, and selected state.
- Passes axe accessibility audit in single-select and multi-select modes.
