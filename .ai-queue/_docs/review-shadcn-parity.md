# @vlting/ui — shadcn/ui Parity Review

**Date:** 2026-02-24
**Reviewed against:** shadcn/ui (as of early 2026)
**Reviewer:** Automated quality audit (task 017)

---

## Executive Summary

- **Strong coverage:** 47 of ~57 shadcn/ui entries are present (82%). 9 components are missing or internal-only; most gaps are specialized (Chart, Direction, Sonner) rather than fundamental.
- **Quality is high for core components:** 9 of the top 20 components earned Grade A (Button, Input, Textarea, Checkbox, Switch, RadioGroup, Card, Toast, Badge). Semantic HTML, focus indicators, and token discipline are consistently strong.
- **Two critical a11y gaps:** DropdownMenu and NavigationMenu lack keyboard navigation (arrow keys, Escape) — violating WCAG 2.1.1. These are the highest-priority fixes.
- **Theming pipeline is production-ready:** 4 brand presets (default, fun, posh, shadcn) demonstrate full BrandDefinition flexibility. All components use design tokens. Minor gaps: font families hardcoded per brand, no runtime brand switching, shadow/overlay colors have hardcoded fallbacks.
- **API design is solid:** Compound component pattern (dot notation) is consistent and ergonomic. Controlled/uncontrolled support via `useControllableState` hook. Variant system (size, variant props) is uniform. Some Tamagui v2 RC type workarounds degrade DX slightly.

---

## 1. Component Coverage Gap Analysis

### Components We Have (Matching shadcn/ui)

| Component | Status | Notes |
|-----------|--------|-------|
| Accordion | Exported | Full implementation |
| Alert | Exported | Full implementation |
| AlertDialog | Exported | Full implementation |
| AspectRatio | Exported (primitive) | Full implementation |
| Avatar | Exported | Full implementation |
| Badge | Exported (primitive) | Full implementation |
| Breadcrumb | Exported | Full implementation |
| Button | Exported | Full implementation |
| Calendar | Exported | Full implementation |
| Card | Exported | Full implementation |
| Carousel | Exported | Full implementation |
| Checkbox | Exported | Full implementation |
| Collapsible | Exported | Full implementation |
| Combobox | Exported | Full implementation |
| Command | Exported | Full implementation |
| ContextMenu | Exported | Full implementation |
| DatePicker | Exported | Full implementation |
| Dialog | Exported | Full implementation |
| Drawer | Exported | Full implementation |
| DropdownMenu | Exported | Needs keyboard nav |
| Form | Exported | Full implementation |
| HoverCard | Exported | Full implementation |
| Input | Exported | Full implementation |
| InputOTP | Exported | Full implementation |
| Kbd | Exported (primitive) | Full implementation |
| Label | Exported (primitive) | Full implementation |
| Menubar | Exported | Full implementation |
| NavigationMenu | Exported | Needs keyboard nav |
| Pagination | Exported | Full implementation |
| Progress | Exported | Full implementation |
| RadioGroup | Exported | Full implementation |
| Resizable | Exported | Full implementation |
| ScrollArea | Exported | Partial (Scrollbar/Thumb/Corner are stubs) |
| Select | Exported | Full implementation |
| Separator | Exported (primitive) | Full implementation |
| Sidebar | Exported | Full implementation |
| Skeleton | Exported (primitive) | Full implementation |
| Slider | Exported | Full implementation |
| Switch | Exported | Full implementation |
| Tabs | Exported | Full implementation |
| Textarea | Exported | Full implementation |
| Toast | Exported | Full implementation |
| Toggle / ToggleGroup | Exported | Full implementation |
| Tooltip | Exported | Full implementation |
| Typography (H1-H4, P, etc.) | Exported | 13 sub-components |

### Components We're Missing or Have Internal-Only

| Component | Status | Priority | Effort | Cross-Platform? | Recommendation |
|-----------|--------|----------|--------|-----------------|----------------|
| **Table** | Exported | P0 | S | Web-only (native HTML) | Already exists and is exported. No gap. |
| **Sheet** | Internal only | P0 | S | Yes (Tamagui Sheet) | Export publicly — just add to `src/index.ts` |
| **Popover** | Internal only | P0 | S | Yes (Tamagui Popover) | Export publicly — just add to `src/index.ts` |
| **Field** | Missing | P1 | M | Yes | Composable form field wrapper (FieldLabel, FieldDescription, FieldError). Our Form has field context but no standalone Field. |
| **InputGroup** | Missing | P1 | M | Yes | Input with leading/trailing addons. Our Input has slots but no explicit InputGroup compound. |
| **Empty** | Missing | P2 | S | Yes | Empty state pattern (EmptyMedia, EmptyTitle, EmptyDescription). Simple styled compound. |
| **Item** | Missing | P2 | S | Yes | Generic list item layout. Simple styled compound. |
| **Direction** | Missing | P2 | S | Yes | RTL/LTR context provider. Simple context wrapper. |
| **Chart** | Missing | P2 | L | Web-only | Data visualization (Recharts wrapper). Specialized; not core design system. |
| **Sonner** | Missing | P2 | M | Partial | Modern toast replacement. Our Toast works; Sonner is an alternative approach. |

### Components We Have That shadcn Doesn't

| Component | Notes |
|-----------|-------|
| DateRangePicker | Separate from DatePicker |
| NativeSelect | Native `<select>` element |
| Loader | Spinner alias |
| Divider | Separate from Separator |
| Spacer, Box, Portal, VisuallyHidden | Primitives layer |
| Heading, Text, Icon | Primitives layer |
| ButtonGroup | Group variant |

---

## 2. Front-of-Frontend Quality Grades

### Top 20 Component Audit

| Component | Grade | Semantic HTML | DOM Depth | Accessibility | Focus | Tokens | Key Issues |
|-----------|-------|---------------|-----------|--------------|-------|--------|------------|
| **Button** | A | `<button>` native | 2 | Full ARIA, `aria-busy` | 2px outline | All tokens | — |
| **Input** | A | `<input>` + `<label>` | 2 | `aria-invalid`, `aria-describedby` | 2px outline | All tokens | — |
| **Textarea** | A | `<textarea>` + `<label>` | 2 | `aria-invalid`, `aria-describedby` | 2px outline | All tokens | — |
| **Checkbox** | A | Tamagui Checkbox + `<label>` | 2 | Native semantics | 2px outline | All tokens | — |
| **Switch** | A | Tamagui Switch | 2 | Native semantics | 2px outline | All tokens | — |
| **RadioGroup** | A | Tamagui RadioGroup + `<label>` | 2 | Context-based size | 2px outline | All tokens | — |
| **Card** | A | Styled container, `<h3>` title | 2 | Interactive variant with button | 2px outline | All tokens | — |
| **Toast** | A | Tamagui Toast (portal) | 3 | `role="status"`, variants | 2px outline | All tokens | — |
| **Badge** | A | Styled Text | 1 | Non-interactive | N/A | All tokens | — |
| **Select** | B | Tamagui Select | 3 | Keyboard via `_index` | 2px outline | All tokens | Manual _index workaround |
| **Dialog** | B | Portal modal | 3 | `role="dialog"`, overlay | 2px outline | All tokens | Minor wrapper overhead |
| **AlertDialog** | B | Portal modal | 3 | `role="alertdialog"` | 2px outline | All tokens | Double portal render |
| **Tabs** | B | Tamagui Tabs | 2 | Tab roles (automatic) | 2px outline | All tokens | Manual context read |
| **Accordion** | B | Tamagui Accordion | 3 | `aria-expanded` | 2px outline | All tokens | Inline transition style |
| **Form** | B | `<form>` semantic | 2 | `role="alert"` on error | 2px outline | All tokens | Error flag pattern |
| **Avatar** | B | Image + fallback | 2 | `role="img"` (legacy) | N/A | All tokens | Compound API missing aria-label |
| **Tooltip** | B | Tamagui Tooltip (portal) | 2 | `role="tooltip"` | N/A | All tokens | Content color contrast unverified |
| **Sidebar** | B | `role="complementary"` | 3 | `role="menu"` items | 2px outline | All tokens | Inline transition; web-only `styledHtml` |
| **DropdownMenu** | C | Custom impl, `role="menu"` | 3 | `aria-expanded` | 2px outline | All tokens | **No keyboard nav (arrow keys, Escape)** |
| **NavigationMenu** | C | Custom, `role="navigation"` | 3 | `aria-expanded` | 2px outline | All tokens | **No keyboard nav (arrow keys, Escape)** |

### Grade Distribution

- **Grade A** (9): Button, Input, Textarea, Checkbox, Switch, RadioGroup, Card, Toast, Badge
- **Grade B** (9): Select, Dialog, AlertDialog, Tabs, Accordion, Form, Avatar, Tooltip, Sidebar
- **Grade C** (2): DropdownMenu, NavigationMenu

### Key Strengths Across All Components

1. **Semantic HTML enforcement** — Interactive components use native elements (`<button>`, `<input>`, `<label>`) instead of div+ARIA patterns
2. **Consistent focus indicators** — 2px solid outline with `$outlineColor` token across all interactive components
3. **Full token discipline** — Colors, spacing, typography, border-radius all from design tokens; no hardcoded hex/px values found in the top 20
4. **Compound component pattern** — Well-structured via `withStaticProperties` or object literal exports
5. **ARIA attributes** — Proper use of `aria-invalid`, `aria-describedby`, `aria-expanded`, `aria-busy`
6. **Error states** — Form components consistently handle error with both visual and ARIA signals

### Key Weaknesses

1. **DropdownMenu & NavigationMenu** — No arrow key / Escape keyboard navigation (WCAG 2.1.1 violation)
2. **Animation tokens** — Accordion and Sidebar use inline CSS `transition` instead of Tamagui animation tokens
3. **Web-only patterns** — Sidebar's `styledHtml('h3')` has no React Native fallback documented
4. **Tamagui v2 RC type workarounds** — Frequent `@ts-expect-error` and type casts (not component authors' fault, but degrades DX)

---

## 3. Theming & Customizability Assessment

### Brand Pipeline

```
BrandDefinition → createBrandConfig() → createTamagui() → TamaguiProvider
```

The pipeline is well-designed and production-ready:

1. **Can every visual aspect be themed?** Yes — all components use `$token` references. Colors, spacing, radius, shadows, typography, and animations are all brand-configurable. No hardcoded visual values in component source.

2. **Are the 4 brand presets meaningfully different?**

| Aspect | Default | Fun | Posh | shadcn |
|--------|---------|-----|------|--------|
| Accent | YInMn Blue | Purple | Pure Black | Destructive Red |
| Neutrals | Cool blue-tinted | Purple-tinted | True gray | Pure neutral |
| Radius | 9px default | 14px (generous) | 0px (square) | 8px |
| Borders | Standard (1-3px) | None (all 0px) | Very thin (0.5-1.5px) | Standard (1px) |
| Shadows | Soft, subtle | Flat/none | Soft, diffused | Tailwind-style |
| Heading font | Inter (sans) | DM Serif (serif) | Cormorant (serif) | Inter (sans) |

Yes — presets are distinctly different across all visual dimensions. Fun is borderless+round, Posh is sharp+editorial, shadcn matches Tailwind ecosystem conventions.

3. **Can a consumer create a custom brand?** Yes — `BrandDefinition` interface is comprehensive. A consumer can override palettes, tokens, shadows, overlay, fonts, typography transforms, animations, and media queries. The `createBrandConfig()` factory handles all merging with base defaults.

4. **Component themes**: The system uses Tamagui's palette-based theming with semantic color mapping (12-step palette → semantic roles like background, color, border). Accent color themes are generated for 7 colors (blue, red, green, orange, purple, pink, yellow) with surface variants (surface1-3, inverse). However, there are no per-component theme overrides (e.g., `theme_Button` is not used).

5. **Dark mode**: Every component inherits dark mode automatically through the theme system. Light and dark palettes are inverted. All brand presets define both light and dark palettes.

6. **Gaps**:
   - **Font families** are hardcoded per brand (e.g., Inter, DM Serif) — not tokenized
   - **No runtime brand switching** — brands are compile-time only; switching requires page reload
   - **Shadow colors** have hardcoded fallbacks in `buildThemes` (`rgba(0,0,0,0.15)` / `rgba(0,0,0,0.40)`)
   - **Overlay backgrounds** also have hardcoded fallbacks
   - **No per-component theme customization** (no `theme_Button`, `theme_Dialog` etc.)
   - **Animation driver** is CSS-only (no reanimated for React Native)

---

## 4. API Design Comparison

### 4.1 Compound Component Pattern

**Our approach:** Dot notation (`Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`)
**shadcn approach:** Flat imports (`DialogRoot`, `DialogTrigger`, `DialogContent`)

**Assessment:** Our dot notation is more ergonomic for compound components — it provides discoverability via autocomplete after typing `Dialog.`, groups related parts visually, and reduces import clutter. This is a deliberate design choice that works well.

### 4.2 Prop Naming

Props are consistent across the library:
- `size` → `'sm' | 'md' | 'lg'` (uniform)
- `variant` → component-specific string unions
- `disabled` → boolean
- `onValueChange` / `onCheckedChange` / `onOpenChange` → callback naming follows Radix conventions
- `defaultValue` / `value` → controlled/uncontrolled pair

**Assessment:** Naming is consistent with both Radix/shadcn conventions and React community norms. Good.

### 4.3 Variant System

We use typed props (`size`, `variant`) with exhaustive string unions. shadcn uses `cva` (class-variance-authority) with Tailwind classes. Our approach is more type-safe and integrates with Tamagui's token system, but loses the ability to extend variants at the consumer level (shadcn allows `cn()` overrides).

**Assessment:** Our approach is correct for a cross-platform design system. The tradeoff (type safety vs. consumer-level override flexibility) is appropriate.

### 4.4 Controlled vs Uncontrolled

All form components support both patterns via the `useControllableState` hook:
- `value` / `onValueChange` (controlled)
- `defaultValue` (uncontrolled)

**Assessment:** Excellent. Consistent and follows React best practices.

### 4.5 Composition

Components compose well via the compound pattern. Children-based composition is the primary pattern. No overly opinionated layouts that restrict composition.

**Assessment:** Good flexibility without sacrificing structure.

### 4.6 Mobile-Specific Considerations

- Most components work cross-platform via Tamagui
- `styledHtml()` components (Typography, Toggle, Table, Sidebar GroupLabel) are web-only
- No documented React Native fallbacks for web-only components
- Sheet component (Tamagui Sheet) works on both platforms

**Assessment:** Cross-platform story is good for most components. Web-only components should be documented as such, and RN alternatives should be suggested.

---

## 5. Prioritized Recommendations

### Quick Wins (S — single task each)

1. **Export Sheet and Popover as public components** — They're fully implemented internally. Add to `src/index.ts` barrel export with proper type exports. (P0)

2. **Fix ScrollArea stubs** — `Scrollbar`, `Thumb`, `Corner` are stub components. Either implement or document that they're passthrough/no-ops by design. (P1)

3. **Replace inline transitions with animation tokens** — Accordion's `transition: 'transform 200ms ease'` and Sidebar's inline width transition should use Tamagui animation tokens for consistency. (P1)

### Medium Effort (M — a few sessions each)

4. **Add keyboard navigation to DropdownMenu and NavigationMenu** — Critical WCAG 2.1.1 fix. Implement arrow key traversal, Enter activation, Escape dismissal per WAI-ARIA APG menu pattern. Consider migrating to Tamagui menu primitives. (P0)

5. **Create Field component** — Standalone composable form field wrapper (`Field`, `FieldLabel`, `FieldDescription`, `FieldError`) that doesn't require being inside a Form. Our Form has field context but no standalone usage. (P1)

### Large Initiatives (L — epic-level)

6. **RTL support infrastructure** — No Direction provider exists. Need `DirectionProvider` context, `useDirection()` hook, and component-level RTL-aware layout (flip margins, paddings, icons). (P2)

7. **Tamagui v2 stable migration** — When v2 exits RC, remove all `@ts-expect-error` workarounds, fix `GetProps<>` bugs, remove type casts. Will improve DX significantly. (P2)

8. **React Native verification** — Run all components in RN environment; document web-only components; provide RN fallbacks for `styledHtml()` components. (P2)

9. **Runtime brand switching** — Currently brands are compile-time only. Allow switching TamaguiProvider config at runtime without page reload. (P2)

10. **Chart component** — Data visualization wrapper (Recharts or Victory Native for cross-platform). Specialized; consider whether this belongs in the core design system or as an addon. (P2)
