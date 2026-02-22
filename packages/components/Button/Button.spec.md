# Component Spec — Button

## 1. Purpose

- Provides a single, composable action trigger for user interactions such as form submission, navigation initiation, or in-page actions.
- Should be used wherever the user needs to perform a discrete action (submit, confirm, cancel, toggle).
- Should NOT be used for navigation links (use an anchor or link component instead), for toggle groups, or for purely decorative elements.

---

## 2. UX Intent

- **Primary interaction goal:** Communicate a clear, tappable/clickable action with immediate visual feedback.
- **Expected user mental model:** "I press this and something happens." The button should look and behave like every other button the user has encountered across the web and native platforms (Jakob's Law).
- **UX laws applied:**
  - **Jakob's Law** — Button must follow standard platform button conventions (shape, feedback, disabled appearance).
  - **Fitts's Law** — Three size variants (`sm`, `md`, `lg`) ensure adequate touch/click target sizes. The `lg` variant must be preferred for primary or mobile-first contexts.
  - **Hick's Law** — Variant and tone props must be used to visually distinguish primary actions from secondary ones, reducing decision time by establishing clear visual hierarchy.
  - **Doherty Threshold** — Press feedback (scale + opacity) and loading spinner must appear within a single animation frame to maintain perceived responsiveness.

---

## 3. Visual Behavior

- **Layout:** Horizontal flex container (`XStack`). Icon, text, and spinner are centered both vertically and horizontally with a gap of `$1.5`.
- **Spacing:** Padding scales with `size` variant — `sm` uses tighter padding (`$1`/`$3`), `lg` uses wider padding (`$3`/`$5`).
- **Typography:** `Button.Text` uses `$body` font family with `$3` weight. Font size scales with size variant (`$2`, `$4`, `$5`).
- **Token usage:** All colors, spacing, radii, and font values must resolve from Tamagui design tokens. Border radius is `$4`. No hardcoded color or spacing values.
- **Responsive behavior:** The button accepts Tamagui media query props on the root frame. Consumers may apply responsive size or layout overrides. The component itself does not impose breakpoint-specific rules.

---

## 4. Interaction Behavior

- **States:**
  - **Idle** — Renders with variant-specific background and border.
  - **Hover** — No explicit hover style defined at this layer; theme or consumer may add one.
  - **Focus** — Visible 2px solid outline ring (`$outlineColor`) with 2px offset. Must be clearly visible for keyboard users.
  - **Active (press)** — Opacity reduces to 0.85 and scale reduces to 0.98, animated with the `fast` animation token.
  - **Disabled** — Opacity 0.5, `cursor: not-allowed`, `pointerEvents: none`. No visual feedback on press or hover.
  - **Loading** — Children are replaced by a `Spinner`. Button becomes disabled. `aria-busy` is set.
  - **Error** — Not applicable. Buttons do not have an error state.
- **Controlled vs uncontrolled:** Button is stateless. It does not manage open/closed or toggled state. All behavior is driven by consumer-provided props and callbacks.
- **Keyboard behavior:** Enter and Space must activate the button. This is expected to come from the underlying platform behavior or consumer code, not from this styled layer.
- **Screen reader behavior:** Announces as a button via `accessibilityRole="button"`. Announces disabled state via `aria-disabled`. Announces loading state via `aria-busy`.
- **Motion rules:** Press animation uses the `fast` token. Must honor `prefers-reduced-motion` — when reduced motion is preferred, scale and opacity transitions should be instant or omitted.

---

## 5. Accessibility Requirements

- **ARIA requirements:**
  - `accessibilityRole="button"` must always be set on the root frame.
  - `aria-disabled` must be `true` when the button is disabled or loading; omitted otherwise.
  - `aria-busy` must be `true` when loading; omitted otherwise.
- **Focus rules:** The focus outline ring (2px, `$outlineColor`, 2px offset) must be visible on keyboard focus. Focus must not be trapped inside the button.
- **Contrast expectations:** Button text and background combinations must meet WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for large text). This is enforced through theme token resolution.
- **Reduced motion behavior:** The `fast` press animation (scale + opacity) must degrade gracefully when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- **Required tokens:** `$color10` (solid background), `$borderColor` (outline border), `$outlineColor` (focus ring), `$body` (font family), `$color` (text color).
- **Prohibited hardcoded values:** No raw hex colors, pixel spacing, or font sizes. All values must reference tokens.
- **Dark mode expectations:** All visual tokens (`$color10`, `$borderColor`, `$outlineColor`, `$color`) must resolve correctly in both light and dark themes. The button must remain legible and maintain contrast ratios in both modes.

---

## 7. Composition Rules

- **What can wrap it:** Any layout primitive (YStack, XStack, View). Form containers. Pressable wrappers should be avoided since Button already handles press.
- **What it may contain:** `Button.Text` for label text. `Button.Icon` for icon elements. A `Spinner` is rendered automatically when loading. Arbitrary children are allowed but discouraged beyond Text and Icon.
- **Anti-patterns:**
  - Do not nest interactive elements (links, other buttons) inside Button.
  - Do not use Button as a layout container.
  - Do not combine `loading` and custom children that duplicate the spinner.
  - Do not use `ghost` variant without sufficient surrounding context to indicate it is interactive.

---

## 8. Performance Constraints

- **Memoization rules:** Button is a `forwardRef` component. Memoization is not required by default, but consumers rendering many buttons in a list should wrap callbacks in `useCallback`. The styled sub-components (`Button.Text`, `Button.Icon`) are static Tamagui styled components and do not re-render unnecessarily.
- **Virtualization:** Not applicable.
- **Render boundaries:** The loading state swap (children to Spinner) is a conditional render and should not cause layout thrashing when the button has a fixed `height` via the `size` variant.

---

## 9. Test Requirements

- **What must be tested:**
  - Renders children when not loading.
  - Renders Spinner when `loading` is `true`.
  - Applies disabled styles and attributes when `disabled` is `true`.
  - Applies disabled behavior when `loading` is `true` (derived disabled).
  - Each variant (`solid`, `outline`, `ghost`) renders without errors.
  - Each size (`sm`, `md`, `lg`) renders without errors.
  - Each tone (`neutral`, `primary`, `success`, `warning`, `danger`) renders without errors.
- **Interaction cases:**
  - `onPress` fires when clicked and not disabled.
  - `onPress` does not fire when `disabled` is `true`.
  - `onPress` does not fire when `loading` is `true`.
- **Accessibility checks:**
  - `accessibilityRole="button"` is present.
  - `aria-disabled` is set when disabled or loading.
  - `aria-busy` is set when loading.
  - Focus outline is visible on keyboard focus.
