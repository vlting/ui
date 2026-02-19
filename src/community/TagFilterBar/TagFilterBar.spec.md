# Component Spec — TagFilterBar

## 1. Purpose

Presents a horizontal row of selectable tag chips or filter buttons that allow users to filter a community thread list or content feed by topic tags.

Use when: A community or content list supports tag-based filtering and the user needs to quickly narrow down the visible content by selecting one or more tags.

Do NOT use when: There are no tags or categories to filter by, or when advanced multi-criteria filtering is needed (use a full filter panel instead).

---

## 2. UX Intent

- Primary interaction goal: Help users find relevant threads quickly by narrowing the feed to topics they care about.
- Expected user mental model: A horizontal tag/chip row similar to YouTube categories, Reddit flair filters, or Stack Overflow tag filters — familiar, scannable, and low-friction.
- UX laws applied:
  - Hick's Law: Limit the number of visible tags to what fits the viewport without wrapping (typically 5-8); additional tags are accessible via horizontal scroll or an overflow menu.
  - Fitts's Law: Tag chips must be large enough to tap comfortably on mobile.
  - Serial Position Effect: The most popular or default "All" tag should appear first.

---

## 3. Visual Behavior

- Layout: Horizontal row of chip/pill elements. An "All" or "Everything" chip appears first and acts as a reset. Additional tag chips follow. On overflow, the row scrolls horizontally without wrapping.
- Spacing: Consistent horizontal gap between chips using a spacing token. The row has horizontal padding matching the surrounding content layout.
- Typography: Tag label text uses a small to medium body token, bold or medium weight. Selected chip text uses the active state text token.
- Token usage: Chip default background, chip selected/active background, chip selected text color, chip border, chip hover state — all from theme tokens.
- Responsive behavior: On mobile, the row scrolls horizontally. Scroll indicators (fade gradients at edges) indicate overflow content. On wider viewports, all tags may be visible without scrolling.

---

## 4. Interaction Behavior

- States:
  - Idle: No tag is active; "All" chip is selected by default.
  - Tag selected: The selected chip is visually highlighted; the "All" chip is deselected.
  - Multi-select (if supported): Multiple chips are selected simultaneously.
  - Loading: Skeleton chips are shown while tags are being loaded.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the tag list, selected tag(s), and onChange callback.
- Keyboard behavior: Tab focuses the tag bar container. Arrow Left/Right navigates between chips (roving tabindex). Enter/Space toggles the focused chip. Home/End jump to first/last chip.
- Screen reader behavior: The filter bar is a `role="group"` with an accessible label (e.g., "Filter by tag"). Each chip is a toggle button with `aria-pressed` reflecting its selected state.
- Motion rules: Selecting a chip triggers a subtle background transition. Reduced motion: instant color change.

---

## 5. Accessibility Requirements

- ARIA requirements: Container uses `role="group"` and `aria-label="Filter by tag"`. Each chip uses `role="button"` or is a `<button>` element with `aria-pressed`. The "All" chip indicates the reset state clearly.
- Focus rules: Roving tabindex within the chip group — only one chip is in the tab order at a time. Arrow keys move focus without activating chips.
- Contrast expectations: All chip labels meet WCAG AA against both default and selected chip backgrounds. Selected chip must be distinguishable from unselected without relying on color alone (e.g., bold weight or underline).
- Reduced motion behavior: Chip background transition animations are suppressed.

---

## 6. Theming Rules

- Required tokens: chip default background, chip hover background, chip selected background, chip default text color, chip selected text color, chip border color, chip selected border color, spacing token for chip padding, spacing token for chip gap, border radius token for chip (pill shape).
- Prohibited hardcoded values: No hardcoded colors, pixel sizes, or border radii.
- Dark mode expectations: Chip backgrounds and text colors adapt to dark theme tokens. Selected state remains visually distinct in dark mode.

---

## 7. Composition Rules

- What can wrap it: Placed above a `ThreadList` or content feed, typically below a `CommunityHeader` or page navigation bar.
- What it may contain: A set of tag chip elements. May include an "All" reset chip and a trailing overflow indicator or "More" button when tags exceed the visible area.
- Anti-patterns:
  - Do not embed tag data-fetching inside this component.
  - Do not allow the filter bar to wrap onto multiple lines — horizontal scroll is the correct overflow behavior.
  - Do not use this component for multi-criteria filter forms; it is specifically for single-dimension tag filtering.

---

## 8. Performance Constraints

- Memoization rules: The tag bar should be memoized. Each chip should be memoized by tag ID. Re-renders occur only when the selected tag or tag list changes.
- Virtualization: Not applicable — the visible set of chips is intentionally limited.
- Render boundaries: No data-fetching inside this component.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct tag chips for the provided list.
  - The "All" chip is selected by default when no tag filter is active.
  - Selecting a tag chip fires the onChange callback with the correct tag.
  - Selecting "All" clears the active filter.
  - Loading state renders skeleton chips.
- Interaction cases:
  - Arrow Left/Right navigate between chips.
  - Enter/Space toggles the focused chip.
  - Home/End jump to first and last chip.
  - Horizontal scroll works on overflow.
- Accessibility checks:
  - `role="group"` and `aria-label` present.
  - Each chip has `aria-pressed` reflecting selection state.
  - Roving tabindex behavior is correct.
  - Selected state is distinguishable without color alone.
  - Reduced motion: selection transition animations suppressed.
