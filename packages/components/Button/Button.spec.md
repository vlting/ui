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
  - **Hick's Law** — `theme` and `variant` props establish clear visual hierarchy, reducing decision time.
  - **Doherty Threshold** — Press feedback and loading spinner must appear within a single animation frame to maintain perceived responsiveness.

---

## 3. Anatomy

Button is a `forwardRef` wrapper around a styled `<button>` element (`ButtonFrame`). It uses the `styled()` options API with a `template` for rendering children, loading spinner, prefix, and suffix slots.

### Two-axis variant model

- **`theme`** — Controls which color palette is used: `primary | secondary | neutral | destructive`.
- **`variant`** — Controls how colors are applied: `solid | subtle | outline | ghost | link`.
- **`size`** — Controls dimensions: `xs | sm | md | lg | icon`.

Default: `{ theme: 'primary', variant: 'solid', size: 'md' }`.

### Color token pattern

All colors use the `$colorN` + `$colorTextN` pairing pattern (global to `@vlting/ui`, not Button-specific):
- **solid** — High N (step 9): filled background with contrast text.
- **subtle** — Low N (step 3): tinted background with darker text (step 11).
- **outline** — Transparent bg, border at step 7, text at step 11.
- **ghost** — Transparent bg, text at step 11.
- **link** — Transparent bg, text at step 9, underline, no padding.

All variants have hover/focus states with a background color change. Focus also shows an outline ring.

### Template slots

The `template` function renders:
- `prefix` — Optional leading content (icon, etc.)
- `children` — Main label content (replaced by `Spinner` when loading)
- `suffix` — Optional trailing content

### Loading state

When `loading` is `true`, children are replaced by a `Spinner` plus a `VisuallyHidden` "Loading" label. The button becomes disabled. `aria-busy` is set.

> **TypeScript is the source of truth for props.** See `ButtonProps` in `Button.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Idle** — Renders with theme×variant-specific background, border, and text color.
- **Hover** — Background shifts one step (e.g., step 9 → 10 for solid).
- **Focus** — Visible focus ring: 2px solid `$outlineColor`, 2px offset. Plus background shift.
- **Active (press)** — `transform: scale(0.98)` press feedback.
- **Disabled** — Opacity 0.5, `cursor: not-allowed`, `pointerEvents: none`. No visual feedback on press or hover. Derived from `disabled ?? loading ?? false`.
- **Loading** — Children replaced by Spinner + VisuallyHidden "Loading". Button disabled. `aria-busy` set.

### Keyboard Interaction

- Enter and Space activate the button (native `<button>` behavior).
- Follows the WAI-ARIA APG [Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

### Motion

- `lowMotion` STL condition: transitions set to `none`, no scale transform on press.
- Spinner degrades to reduced animation under `prefers-reduced-motion`.

---

## 5. Accessibility

- **Semantic element:** Native `<button>` with `type="button"`.
- **ARIA attributes:**
  - `aria-busy="true"` when loading; omitted otherwise.
  - `disabled` attribute set when disabled or loading.
  - VisuallyHidden "Loading" text for screen reader announcement.
- **Focus ring:** 2px solid `$outlineColor`, 2px offset via `$widthBase` and `$offsetDefault` tokens.
- **Contrast:** All theme×variant combinations meet WCAG 2.1 AA contrast ratios via `$colorN` + `$colorTextN` pairing.

---

## 6. Styling

- **Color tokens:** `$primaryN`, `$primaryTextN`, `$secondaryN`, `$colorN`, `$colorTextN`, `$redN`, `$redTextN` (N = palette step).
- **Font:** `$body` family, `$500` weight.
- **Font sizes:** Scale with size variant (`$buttonTiny`, `$buttonSmall`, `$button`, `$buttonLarge`).
- **Focus:** `$outlineColor` for ring, `$widthBase` width, `$offsetDefault` offset.
- **Reduced motion:** `lowMotion` condition zeroes transitions and transforms.
- **Dark mode:** All tokens resolve per color mode. No hardcoded hex/pixel values.

---

## 7. Composition

- **What can contain this component:** Any layout primitive, form containers.
- **What this component can contain:** Text, icons, or any ReactNode via `children`, `prefix`, `suffix`.
- **Anti-patterns:**
  - Do not nest interactive elements inside Button.
  - Do not use Button as a layout container.
  - Do not combine `loading` with custom spinner children.

---

## 8. Breaking Change Criteria

- Removing any prop from `ButtonProps`.
- Changing `theme` or `variant` value sets.
- Changing default variant values (`primary`, `solid`, `md`).
- Removing `aria-busy` when loading.
- Changing loading behavior (replacing children with Spinner).
- Removing ref forwarding or changing underlying element.

---

## 9. Test Requirements

- **Behavioral tests:**
  - Renders children when not loading.
  - Renders Spinner when `loading` is `true`.
  - Disabled styles/attributes when `disabled` is `true`.
  - Disabled behavior when `loading` is `true` (derived disabled).
  - Each theme (`primary`, `secondary`, `neutral`, `destructive`) renders without errors.
  - Each variant (`solid`, `subtle`, `outline`, `ghost`, `link`) renders without errors.
  - Each size (`xs`, `sm`, `md`, `lg`, `icon`) renders without errors.
  - `prefix` and `suffix` render alongside children.
- **Accessibility tests:**
  - Renders as native `<button>` with `type="button"`.
  - `aria-busy` set when loading.
  - VisuallyHidden "Loading" rendered when loading.
  - Focus ring visible on keyboard focus.
- **Visual regression:**
  - Each theme×variant combo in idle, hover, focus, disabled states.
  - Loading state with spinner.
