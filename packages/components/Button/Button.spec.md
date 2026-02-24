# Component Spec — Button

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

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
  - **Fitts's Law** — Multiple size variants (`xs`, `sm`, `md`, `lg`, `icon`) ensure adequate touch/click target sizes. The `lg` variant must be preferred for primary or mobile-first contexts.
  - **Hick's Law** — Variant and tone props must be used to visually distinguish primary actions from secondary ones, reducing decision time by establishing clear visual hierarchy.
  - **Doherty Threshold** — Press feedback and loading spinner must appear within a single animation frame to maintain perceived responsiveness.

---

## 3. Anatomy

Button is a compound component created via `withStaticProperties`. It consists of:

- **Button (root)** — A `forwardRef` wrapper around a styled `TamaguiButton.Frame` (`ButtonFrame`). Handles variant resolution, tone-to-theme mapping, size-to-token mapping, loading/disabled state, and context provisioning.
- **Button.Text** — A styled `Text` sub-component for button label text. Reads the parent `ButtonContext` to resolve text color based on the active variant.
- **Button.Icon** — A styled `XStack` sub-component for wrapping icon elements. Centered alignment.

When `loading` is `true`, children are replaced by a `Spinner` (with variant-appropriate color) plus a `VisuallyHidden` "Loading" label. The button becomes disabled.

When a `tone` other than `'neutral'` is set (or the variant is `'destructive'`), the root is wrapped in a Tamagui `<Theme>` to apply the corresponding color scheme.

> **TypeScript is the source of truth for props.** See `ButtonProps` in `Button.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

- **Idle** — Renders with variant-specific background and border. `default`/`solid` use `$color10` fill; `outline` has a `$borderColor` border; `ghost` is transparent; `secondary` uses `$color2`; `destructive` uses `$color10` with red theme; `link` is transparent with no padding.
- **Hover** — Variant-specific hover backgrounds (e.g., `$color11` for solid/default, `$backgroundHover` for outline/ghost, `$color3` for secondary).
- **Focus** — Visible focus ring via `focusVisibleStyle`: 2px solid outline with `$color10` color and 1px offset.
- **Active (press)** — Tamagui Button.Frame provides press feedback via its built-in press styles.
- **Disabled** — Opacity 0.5, `cursor: not-allowed`, `pointerEvents: none`. No visual feedback on press or hover. Derived from `disabled ?? loading ?? false`.
- **Loading** — Children are replaced by a `<Spinner size="small" />` with variant-appropriate color, plus a `<VisuallyHidden>Loading</VisuallyHidden>` announcement. Button becomes disabled. `aria-busy` is set.
- **Error** — Not applicable. Buttons do not have an error state.

### Keyboard Interaction

- Enter and Space must activate the button. This is provided by the underlying `TamaguiButton.Frame` which renders a native `<button>` element.
- Follows the WAI-ARIA APG [Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

### Motion

- Hover and press transitions are handled by Tamagui's built-in style animation.
- Must honor `prefers-reduced-motion` — when reduced motion is preferred, transitions should be instant or omitted.

---

## 5. Accessibility

- **Semantic element:** Renders as a native `<button>` element via `TamaguiButton.Frame`, which provides correct button semantics out of the box.
- **ARIA attributes:**
  - `aria-busy` is set to `true` when `loading` is `true`; omitted otherwise.
  - `aria-disabled` is set by the underlying Tamagui Button when the `disabled` prop is true.
  - When loading, a `<VisuallyHidden>Loading</VisuallyHidden>` provides a screen reader announcement.
- **Focus management:** The focus ring (`focusVisibleStyle`) is visible on keyboard focus. Focus must not be trapped inside the button.
- **Screen reader announcements:** Announces as a button natively. Announces disabled state via `aria-disabled`. Announces busy state via `aria-busy`. Loading text is announced via visually hidden content.
- **Contrast:** Button text and background combinations must meet WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for large text). This is enforced through theme token resolution.

---

## 6. Styling

- **Design tokens used:**
  - Colors: `$color10`, `$color11`, `$color1`, `$color2`, `$color3`, `$borderColor`, `$backgroundHover`, `$color` (text).
  - Font: `$body` family, `$3` weight.
  - Font sizes scale with size variant (`$1`, `$2`, `$4`, `$5`).
  - Sizes map to Tamagui size tokens via `SIZE_TOKEN_MAP`: `xs`=`$2`, `sm`=`$3`, `md`=`$4`, `lg`=`$5`, `icon`=`$4`.
  - Focus: `$color10` for outline color.
- **Responsive behavior:** The button accepts Tamagui media query props on the root frame. Consumers may apply responsive size or layout overrides. The component itself does not impose breakpoint-specific rules.
- **Reduced motion:** Hover and press transitions must degrade gracefully when `prefers-reduced-motion: reduce` is active.
- **Dark mode:** All visual tokens (`$color10`, `$borderColor`, `$backgroundHover`, `$color`) must resolve correctly in both light and dark themes. The button must remain legible and maintain contrast ratios in both modes. No hardcoded hex colors or pixel values are used.

---

## 7. Composition

- **What can contain this component:** Any layout primitive (YStack, XStack, View). Form containers. Pressable wrappers should be avoided since Button already handles press.
- **What this component can contain:** `Button.Text` for label text. `Button.Icon` for icon elements. A `Spinner` is rendered automatically when loading. Arbitrary children are allowed but discouraged beyond Text and Icon.
- **Anti-patterns:**
  - Do not nest interactive elements (links, other buttons) inside Button.
  - Do not use Button as a layout container.
  - Do not combine `loading` and custom children that duplicate the spinner.
  - Do not use `ghost` variant without sufficient surrounding context to indicate it is interactive.

---

## 8. Breaking Change Criteria

- Removing any prop from `ButtonProps` (`children`, `variant`, `tone`, `size`, `loading`, `disabled`, `onPress`, `asChild`).
- Removing `Button.Text` or `Button.Icon` static sub-components.
- Changing the variant value sets (e.g., removing `'ghost'` from `variant`).
- Changing default variant values (currently `default`, `neutral`, `md`).
- Removing `aria-busy` attribute when loading.
- Changing the loading behavior from replacing children with Spinner to something else.
- Removing ref forwarding support.
- Changing the underlying element from `<button>` to a different element.

---

## 9. Test Requirements

- **Behavioral tests:**
  - Renders children when not loading.
  - Renders Spinner when `loading` is `true`.
  - Applies disabled styles and attributes when `disabled` is `true`.
  - Applies disabled behavior when `loading` is `true` (derived disabled).
  - Each variant (`default`, `solid`, `secondary`, `destructive`, `outline`, `ghost`, `link`) renders without errors.
  - Each size (`xs`, `sm`, `md`, `lg`, `icon`) renders without errors.
  - Each tone (`neutral`, `primary`, `success`, `warning`, `danger`) renders without errors.
  - Tone wraps the button in the correct `<Theme>`.
- **Accessibility tests:**
  - Renders as a native `<button>` element.
  - `aria-busy` is set when loading.
  - `<VisuallyHidden>Loading</VisuallyHidden>` is rendered when loading.
  - Focus ring is visible on keyboard focus.
- **Visual regression:**
  - Each variant in idle, hover, focus, and disabled states.
  - Loading state with spinner.
