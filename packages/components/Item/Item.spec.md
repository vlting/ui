# Component Spec — Item

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Generic list-item layout for menus, settings panels, contact lists, and any context requiring structured rows.
- **When to use:** List items needing a media element + text + optional trailing actions in a consistent layout.
- **When NOT to use:** Simple text-only lists (use `Text`), complex card layouts (use `Card`), navigation items (use `NavigationMenu`).

---

## 2. UX Intent

- **Primary interaction goal:** Scannable list with consistent structure across items.
- **Expected user mental model:** Each item is a row with a leading visual, main content area, and trailing actions.
- **UX laws applied:**
  - **Fitts's Law** — touch targets meet minimum sizing (44px default, 36px sm, 52px lg)
  - **Hick's Law** — each item presents a focused, limited set of information
  - **Gestalt Principles** — proximity groups media, content, and actions into a cohesive row

---

## 3. Anatomy

Compound component. Sub-components arrange horizontally inside the root:

- **Item (root)** — A styled `<div>` with horizontal flex layout. Variants for `theme`, `variant`, `size`, `align`, and `interactive`. [Planned]: `divider`, `disabled`, `selected`.
- **Item.Leading** — A styled `<div>` for leading visual content (icon, avatar, image). `flexShrink: 0`.
- **Item.Content** — A styled `<div>` wrapping Title and Description in a vertical stack. `flex: 1`, `minWidth: 0`.
- **Item.Title** — A styled `<span>` for primary text.
- **Item.Description** — A styled `<span>` for secondary text.
- **Item.Trailing** — A styled `<div>` for trailing interactive elements (buttons, badges, chevrons). `flexShrink: 0`.
- All sub-components except Root are optional.

> **TypeScript is the source of truth for props.** See `ItemProps` in `Item.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

- **Idle** — Renders with variant-specific appearance (transparent, tinted, or bordered).
- **Hover** (interactive only) — Background shifts to theme-specific hover token (`$<theme>3`).
- **Focus** (interactive only) — Visible outline ring using theme-specific outline token (e.g., `outline: '$neutral'`). Uses `$offsetDefault` offset.
- **Active/Press** (interactive only) — Background shifts to theme-specific press token (`$<theme>4`).
- **Selected** [Planned] — Background `$<theme>4` (slightly stronger than hover). Visual only — consumer owns `aria-selected`.
- **Disabled** [Planned] — `opacity: 0.5`, `pointerEvents: none`, `aria-disabled: true`, removed from tab order.

### Keyboard Interaction

- **Tab** — focuses the item (when `interactive` is set)
- **Enter / Space** — activates the item (consumer must attach `onClick`)
- No arrow key navigation — consumers wrap items in a list and manage focus if needed.

### Motion

- None. Hover and press feedback is immediate via STL pseudo-class props.
- `lowMotion`: transitions set to `none` on interactive states.

---

## 5. Accessibility

- **Semantic element:** Renders as `<div>`. Can be used inside `<ul>`/`<ol>` with element override, or standalone.
- **ARIA attributes:** No auto role beyond semantic HTML. Consumers set `role` based on context (`option` in a listbox, `menuitem` in a menu, etc.).
- **Focus management:** When `interactive` is set, `tabIndex: 0` is applied via `mapProps`. [Planned] When `disabled`, `tabIndex` is removed and `aria-disabled: true` is set.
- **Screen reader announcements:** Title and Description text are announced naturally via heading and paragraph semantics.
- **Contrast:** Title uses `$<theme>Text3` (primary text), Description uses `$<theme>Text4` (muted) — both must meet 4.5:1 against background.

---

## 6. Styling

### Variant axes

- **`theme`** (3): `primary | secondary | neutral` — core themes only. Default: `neutral`.
- **`variant`** (3): `ghost | subtle | outline`. Default: `outline`.
- **`size`** (3): `sm | md | lg`. Default: `md`.
- **`align`** (2): `top | center` — controls cross-axis alignment of Leading/Trailing relative to Content. `center` vertically centers all children; `top` aligns media with the title line (useful when Description is present). Default: `center`.
- **`interactive`**: boolean. Default: `false`.
- **`divider`** [Planned]: boolean. Default: `false`.
- **`disabled`** [Planned]: boolean. Default: `false`.
- **`selected`** [Planned]: boolean. Default: `false`.

### Size (padding density — height emerges from content)

| Size | py | px | gap | minHeight (floor) |
|------|----|----|-----|-------------------|
| `sm` | `$4` | `$8` | `$12` | `$36` |
| `md` | `$8` | `$12` | `$12` | `$44` |
| `lg` | `$12` | `$16` | `$12` | `$52` |

### Color contract (theme × variant)

- **ghost** — transparent bg, no border. Text uses `$<theme>Text3`.
- **subtle** — `$<theme>3` bg, `$card` radius. Text uses `$<theme>Text3`.
- **outline** — transparent bg, `$<theme>5` border, `$widthMin` border width, `$card` radius. Text uses `$<theme>Text3`.

### Interactive states (theme-aware, via compound variants)

- **Hover** — `bg: $<theme>3`
- **Press** — `bg: $<theme>4`
- **Focus** — `outline: $<theme>` (theme-specific outline scale token), `outlineOffset: $offsetDefault`

### Compound variant strategy

Use Badge's programmatic generation pattern to avoid hand-written per-theme tables:

```ts
const themes = ['primary', 'secondary', 'neutral'] as const

const variantStyles = {
  ghost: (t: string) => ({ color: `$${t}Text3` }) as STL,
  subtle: (t: string) => ({ bg: `$${t}3`, radius: '$card', color: `$${t}Text3` }) as STL,
  outline: (t: string) => ({
    bg: 'transparent', border: `$${t}5`, borderWidth: '$widthMin', radius: '$card'
  }) as STL,
}

const interactiveStyles = (t: string) => ({
  ':interact': { bg: `$${t}3` },
  ':pressed': { bg: `$${t}4` },
  ':focus': { outline: `$${t}` },
}) as STL
```

Generated compounds: ~12 total (9 theme×variant + 3 theme×interactive).

### Design tokens

- **Radius:** `$card` — applied by `subtle` and `outline` variants.
- **Font:** `$body` family. Title uses `$500` weight, `$p` size, `$listItem` line-height. Description uses `$small` size, `$400` weight.
- **Alignment:** Leading and Trailing use `minHeight: '$20'` (matching title line-height) with internal centering, so media aligns with the title line when `align: 'top'`.
- **Colors:** Title `$<theme>Text3` (inherited from root compound variants), Description `$<theme>Text4` (via own `theme` variant, defaults to `neutral`).
- **Divider** [Planned]**:** bottom border `$<theme>5`, `$widthMin` width.
- **Dark mode:** Automatic via token system; no component-specific overrides needed.
- **Responsive behavior:** Full width, adapts to container. No breakpoint-specific behavior.
- **Reduced motion:** `lowMotion` zeroes transitions on interactive states.

### mapProps

```ts
mapProps: (p) => ({
  ...p,
  tabIndex: p.interactive ? (p.tabIndex ?? 0) : p.tabIndex,
})
```

> **Note:** `aria-disabled` handling will be added when the `disabled` axis is implemented.

---

## 7. Composition

- **What can contain this component:** Any layout container, `<ul>`/`<ol>` (with element override), or `ScrollView`/`FlatList`.
- **What this component can contain:**
  - `Item.Leading`: Avatar, Icon, Checkbox, RadioGroup.Item
  - `Item.Content`: Always contains `Item.Title`; `Item.Description` is optional
  - `Item.Trailing`: Button, Badge, Icon, Switch
- **Anti-patterns:** Do not nest `Item` inside `Item`. Do not place complex forms inside `Item`. Do not use `Item` outside a list context without overriding the element.

---

## 8. Breaking Change Criteria

- Removing or renaming any sub-component (`Leading`, `Content`, `Title`, `Description`, `Trailing`)
- Removing any variant axis (`theme`, `variant`, `size`, `interactive`, `divider`, `disabled`, `selected`)
- Changing variant value sets or default values
- Changing the rendered element type
- Changing `mapProps` behavior (tabIndex, aria-disabled)

---

## 9. Test Requirements

- **Behavioral tests:**
  - Root renders as `<div>`.
  - Title renders as `<span>`, Description renders as `<span>`.
  - All 5 sub-components render without errors.
  - Renders with only Content + Title (minimal usage).
  - Each theme (`primary`, `secondary`, `neutral`) renders without error.
  - Each variant (`ghost`, `subtle`, `outline`) renders without error.
  - Each size (`sm`, `md`, `lg`) applies correct padding.
  - `interactive` adds cursor pointer, hover, press, and focus styles.
  - [Planned] `divider` renders bottom border.
  - [Planned] `disabled` sets `opacity: 0.5`, `aria-disabled: true`, removes from tab order.
  - [Planned] `selected` applies background.
- **Accessibility tests:**
  - No ARIA roles set by default (semantic `<div>`).
  - When `interactive`, `tabIndex: 0` is set.
  - [Planned] When `disabled`, `aria-disabled: true` is set and `tabIndex` is removed.
  - Text contrast meets AA ratios for Title and Description against each variant background.
- **Visual regression:**
  - Ghost, subtle, and outline variants across all themes.
  - Interactive hover, focus, and press states per theme.
  - [Planned] Selected state per theme.
  - [Planned] Disabled state.
  - [Planned] Divider rendering.
