# Component Spec — Provider

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../packages/QUALITY_BASELINE.md).

## 1. Purpose

- Provides the design system's theme, configuration, and global context to all descendant components.
- Use when bootstrapping a consumer application, a story environment, or a test render that uses design system components.
- Do NOT omit — all design system components require this Provider to resolve tokens and themes.

---

## 2. UX Intent

- Non-visual infrastructure component with no direct user interaction.
- **Tesler's Law** — configuration complexity is absorbed by sane defaults so most consumers can use `<Provider>` with no props.

---

## 3. Anatomy

Wraps `TamaguiProvider` from Tamagui. Renders no visible UI surface — passes children through without adding layout-affecting wrapper elements.

- `config`: optional Tamagui configuration object (defaults to the built-in `tamagui.config`).
- `defaultTheme`: `'light' | 'dark'` — initial active theme.
- `children`: the application tree.

> **TypeScript is the source of truth for props.** See `ProviderProps` in `Provider.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

No interactive states. The Provider is an infrastructure boundary.

### Keyboard Interaction

None — does not intercept keyboard events.

### Motion

None.

---

## 5. Accessibility

- **ARIA attributes:** None. The Provider adds no ARIA attributes.
- **Focus management:** No effect on focus behavior.
- **Contrast:** The Provider establishes the color tokens that descendants use to meet contrast requirements, but does not enforce contrast itself.

---

## 6. Styling

- **Design tokens used:** The Provider makes all design tokens (color, size, space, radius, zIndex) available to descendants. It does not apply tokens to itself.
- **Responsive behavior:** Establishes media query breakpoints available to descendants.
- **Dark mode:** When `defaultTheme="dark"`, all descendants resolve tokens to dark-mode values. Theme switching is supported by re-rendering with a new `defaultTheme` or via descendant theme override.

---

## 7. Composition

- **What can contain this component:** Should sit at the application root or isolated render context (Storybook decorator, test utility). Nothing from the design system should wrap Provider.
- **What this component can contain:** Any tree of design system components or application content.
- **Anti-patterns:** Do not nest multiple Providers without explicit intent (theme overrides). Do not pass runtime-computed `config` on every render — the config object should be a stable module-level constant.

---

## 8. Breaking Change Criteria

- Changing the default config import path.
- Removing `defaultTheme` prop.
- Adding wrapper elements that affect layout.
- Changing the `ProviderProps` interface.

---

## 9. Test Requirements

- **Behavioral tests:** Verify descendants render correctly with default config. Verify `defaultTheme="dark"` is applied. Verify custom `config` is accepted. Verify no visible wrapper element is added.
- **Accessibility tests:** Verify no unexpected ARIA roles or attributes in the rendered output. Verify theme context propagates to all descendants.
