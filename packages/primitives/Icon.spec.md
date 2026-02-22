# Component Spec — Icon

## 1. Purpose

- Provides a standardized wrapper for rendering icon components with consistent size and color props.
- Should be used whenever an icon needs to be rendered alongside text, inside buttons, or in any context requiring a uniform icon interface.
- Should NOT be used for large illustrative graphics or images (use Image or SVG components instead).
- Should NOT be used as a standalone interactive element; wrap it in a pressable component (Button, Pressable) for interactivity.

---

## 2. UX Intent

- Primary interaction goal: present a recognizable visual symbol that supports comprehension of adjacent text or actions.
- Expected user mental model: a small graphic symbol (like a toolbar icon or inline glyph) whose size and color integrate seamlessly with surrounding UI.
- **Fitts's Law (2.3):** Icon itself is not interactive, but when placed inside a button or pressable, the icon contributes to the touch target's visual affordance. The default 20px size provides a reasonable minimum for visual recognition.
- **Clarity over Cleverness (3.1):** Icons must be universally recognizable. The wrapper does not modify icon behavior, ensuring the icon renders exactly as its source component intends.

---

## 3. Visual Behavior

- Layout rules: renders the icon component directly with no wrapping container element. The icon occupies space according to its `size` prop.
- Spacing expectations: no default margin or padding. Spacing around the icon must be managed by the parent layout.
- Typography rules: not applicable (Icon does not render text).
- Token usage: `color` accepts a raw string or resolved Tamagui token color. `size` is a raw number (pixels), not a Tamagui token. This component does not participate in the Tamagui styled system.
- Responsive behavior: does not support Tamagui media-query props directly. Consumers who need responsive icon sizing must manage it at the usage site.

---

## 4. Interaction Behavior

- States: Icon is non-interactive. It has no hover, focus, active, disabled, loading, or error states of its own.
- Controlled vs uncontrolled: not applicable (stateless).
- Keyboard behavior: not focusable. Must not appear in the tab order.
- Screen reader behavior: decorative by default. The icon is invisible to assistive technology unless the consuming icon component provides its own accessibility attributes, or the consumer wraps Icon with `accessibilityLabel`.
- Motion rules: no motion. Icons must not animate unless the consumer explicitly animates the parent.

---

## 5. Accessibility Requirements

- ARIA requirements: no role or label is set by default. Icons are treated as decorative.
  - When the icon conveys meaning (e.g., a status indicator without adjacent text), the consumer must provide `accessibilityLabel` or `aria-label` on a wrapping element.
  - When the icon is purely decorative (e.g., inside a labeled button), no additional accessibility attributes are needed.
- Focus rules: must never receive focus.
- Contrast expectations: the icon's `color` must meet WCAG 3:1 contrast ratio for non-text graphical elements against its background. This is a consumer and theme-level responsibility.
- Reduced motion behavior: not applicable (no inherent animation).

---

## 6. Theming Rules

- Required tokens: none. Icon does not consume Tamagui tokens directly.
- Prohibited hardcoded values: consumers should pass theme-resolved colors (e.g., via Tamagui's `useTheme()` hook) rather than hardcoded hex values, to maintain dark/light mode compatibility.
- Dark mode expectations: since Icon passes `color` through to the underlying icon component, the consumer must ensure the color adapts to the active theme.

---

## 7. Composition Rules

- What can wrap it: Button, Pressable, HStack, VStack, Box, or any layout container. When Icon conveys meaning, it should be wrapped in an accessible container.
- What it may contain: nothing. Icon renders a single icon component and does not accept children.
- Anti-patterns:
  - Do not use Icon as a clickable element on its own; wrap it in a Button or Pressable.
  - Do not pass complex components as the `icon` prop; it must conform to the `IconFC` signature (`{ size?: number; color?: string }`).
  - Do not rely on the icon alone to convey critical information without a text label or `accessibilityLabel`.

---

## 8. Performance Constraints

- Memoization rules: do not memoize Icon by default. It is a trivial render pass-through. If the parent re-renders frequently and the icon component is expensive, memoize at the usage site.
- Virtualization: not applicable.
- Render boundaries: Icon does not establish a React error boundary or Suspense boundary.

---

## 9. Test Requirements

- What must be tested:
  - Renders the provided `icon` component.
  - Forwards `size` prop to the icon component (default: 20).
  - Forwards `color` prop to the icon component (default: undefined).
  - Does not render a wrapping container element.
  - Accepts any component matching the `IconFC` type signature.
- Interaction cases: not applicable (non-interactive).
- Accessibility checks:
  - No role or label is set by default.
  - Verify the icon is treated as decorative when no accessibility attributes are provided.
