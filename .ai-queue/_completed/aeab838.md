# Commit History

- `0cabe33` — docs: create shared FRONTEND_QUALITY.contract.md and link from all contracts
- `aeab838` — merge commit into main

---

<!-- auto-queue -->
# Create Shared Front-of-Frontend Quality Contract

## Objective

Create a reusable quality contract file that all component-level contracts can reference. This contract codifies the "front of frontend" quality standards that every UI component in the system must meet — covering rendered markup quality, accessibility guarantees, DOM structure, and spacing discipline.

## Context

Currently, each component has its own `.contract.md` (e.g., `Button.contract.md`, `Input.contract.md`). These contracts define per-component API, behavior, and accessibility guarantees. However, there are shared quality expectations that apply to ALL components — and repeating them in every contract would be redundant and error-prone.

This task creates a single shared contract that defines the baseline.

## Deliverable

Create `packages/FRONTEND_QUALITY.contract.md` with the following sections:

### 1. Rendered Markup Quality

**Every component must produce semantically correct HTML:**
- Interactive components (`Button`, `Input`, `Select`, `Checkbox`, etc.) must render the correct native HTML element (`<button>`, `<input>`, `<select>`, etc.) — not a `<div>` with ARIA role patching
- Container components (`Card`, `Dialog`, `Sheet`, etc.) must use appropriate landmark or sectioning elements where applicable
- Text components must use the correct element for their purpose (`<p>`, `<h1>`–`<h6>`, `<span>`, `<label>`, `<code>`, `<blockquote>`, etc.)
- List-based components must render `<ul>`/`<ol>`/`<li>` structures

**DOM structure requirements:**
- Maximum 3 levels of nesting within a single component's rendered output (excluding children passed by consumers)
- No element may exist solely to apply a single CSS property — that property must be moved to an existing element
- Compound sub-components (e.g., `.Text`, `.Icon`) should not introduce wrapper elements beyond the styled element itself

### 2. Accessibility Baseline (WCAG 2.2 AA)

**All components must meet these requirements without consumer opt-in:**

| Requirement | Standard | Verification |
|---|---|---|
| Keyboard operability | WCAG 2.1.1 | Tab, Enter, Space, Escape, Arrow keys as appropriate for the widget role |
| Visible focus indicator | WCAG 2.4.7 / 2.4.11 | 2px solid outline, 2px offset, 3:1 contrast ratio against adjacent colors |
| Text contrast | WCAG 1.4.3 | 4.5:1 normal text, 3:1 large text — enforced via design tokens |
| Non-text contrast | WCAG 1.4.11 | 3:1 for UI component boundaries and states |
| Touch target size | WCAG 2.5.8 | Minimum 24x24px, recommended 44x44px for primary actions |
| Name/Role/Value | WCAG 4.1.2 | Correct ARIA role (prefer native semantics), accessible name, current value |
| Error identification | WCAG 3.3.1 | `aria-invalid`, visible error text, `aria-describedby` linking |
| Labels | WCAG 1.3.1 / 3.3.2 | Every form control has a visible, associated `<label>` |
| Reduced motion | WCAG 2.3.3 | Respect `prefers-reduced-motion`; animations enhance, never required |

### 3. Styling & Token Discipline

- All color values resolve through design tokens — no hex/rgb/hsl literals in component code
- All spacing values use the space token scale (`$0.5` through `$10`)
- All font sizes use the font size token scale
- All border radii use the radius token scale
- Focus styles use the standard pattern: `focusVisibleStyle: { outlineWidth: 2, outlineOffset: 1, outlineColor: '$color10', outlineStyle: 'solid' }`
- Press/hover styles use token-based colors and `animation: 'fast'`

### 4. Cross-Platform Considerations

- Components must work on web and React Native (Tamagui handles this, but component authors must not introduce web-only APIs without fallbacks)
- Use Tamagui style props for layout — not raw CSS (`className`, `style={{}}` on web, etc.)
- Exceptions: `styledHtml()` elements are web-only by nature and should have React Native alternatives or be clearly documented as web-only

### 5. Verification Protocol

After creating or modifying ANY component:

1. **Static audit**: Run AccessLint `audit_html` on the component's representative rendered HTML
2. **Contrast check**: If colors were changed, use AccessLint `calculate_contrast_ratio`
3. **DOM inspection**: Count nesting levels in rendered output — flag if >3 levels within the component
4. **Keyboard test**: Verify Tab, Enter/Space activation, Escape dismissal (where applicable)
5. **Screen reader test**: Verify accessible name, role, and state announcements

## Also Update Existing Component Contracts

After creating the shared contract, add a reference line to the TOP of each existing `.contract.md` file:

```markdown
> **Baseline**: This component must also satisfy all requirements in [`FRONTEND_QUALITY.contract.md`](../FRONTEND_QUALITY.contract.md).
```

Add this reference to these files:
- `packages/components/Button/Button.contract.md`
- `packages/components/Card/Card.contract.md`
- `packages/components/Input/Input.contract.md`
- `packages/components/Dialog/Dialog.contract.md`
- `packages/components/Tabs/Tabs.contract.md`
- `packages/primitives/Box.contract.md`
- `packages/primitives/Divider.contract.md`
- `packages/primitives/Heading.contract.md`
- `packages/primitives/Icon.contract.md`
- `packages/primitives/Portal.contract.md`
- `packages/primitives/Spacer.contract.md`
- `packages/primitives/Stack.contract.md`
- `packages/primitives/Text.contract.md`
- `packages/hooks/useControllableState.contract.md`
- `packages/hooks/useFocusTrap.contract.md`
- `packages/hooks/useKeyboardNavigation.contract.md`
- `packages/utils/cn.contract.md`
- `packages/utils/composeEventHandlers.contract.md`
- `packages/utils/mergeRefs.contract.md`
- `src/provider/provider.contract.md`

For hook and utility contracts, use a note: `> **Note**: This is a non-visual utility. The FRONTEND_QUALITY.contract.md baseline applies only to components that produce rendered output.`

## Scope
- **Creates**: `packages/FRONTEND_QUALITY.contract.md`
- **Modifies**: All existing `.contract.md` files listed above (adding one reference line each)
- **Does NOT modify**: any source code, constitution files, or non-contract files
