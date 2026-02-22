<!-- auto-queue -->
# Task 004: Implement Simple Styled Components

## Objective
Based on the component audit (`docs/component-audit.md`), implement all missing simple styled components. These are single-purpose, self-contained components that combine a headless behavior with branded styling.

## Likely Missing Components
(Confirm against audit doc):

- **Select** — Dropdown select with trigger, content, items. Tamagui has `@tamagui/select`.
- **Checkbox** — Styled checkbox (we have HeadlessCheckbox — this adds the styled layer)
- **RadioGroup** — Radio button group
- **Switch / Toggle** — On/off toggle
- **Textarea** — Multi-line text input
- **Slider** — Range slider
- **Progress** — Progress bar
- **Avatar** — User avatar with image + fallback initials
- **Badge** — Status indicator (if not placed in primitives)
- **Alert** — Informational banner (info, warning, error, success variants)
- **Tooltip** — Hover tooltip. Tamagui has `@tamagui/tooltip`.
- **Popover** — Triggered floating content. Tamagui has `@tamagui/popover`.
- **Toggle / ToggleGroup** — Pressable toggle buttons

## Implementation Guidelines

### Where to put files
- `packages/components/<ComponentName>/` directory with:
  - `<ComponentName>.tsx` — main component
  - `index.ts` — barrel export
- Export from `packages/components/index.ts`
- Re-export from `src/index.ts`

### Styling approach — shadcn/ui philosophy
This is critical. Every component must follow the shadcn/ui visual language:

1. **Neutral by default.** The base/default variant of every component uses neutral colors (grays from the theme palette). No accent color unless explicitly using an "accent" or "primary" variant.

2. **Accent color is opt-in.** Only specific variants use the brand accent color:
   - Button: `variant="default"` (filled accent), all others neutral
   - Checkbox/Radio/Switch: checked state uses accent
   - Slider/Progress: filled portion uses accent
   - Badge: `variant="default"` uses accent, `variant="outline"` / `variant="secondary"` are neutral
   - Everything else: neutral

3. **Minimal decoration.** Thin borders, subtle shadows, small radii. Let the brand config control these via tokens.

4. **Consistent interactive states:**
   - Hover: subtle background shift (1-2 palette steps)
   - Active/pressed: slightly darker
   - Focus: outline ring (controlled by brand's `outline` config)
   - Disabled: reduced opacity (0.5)

5. **Variants pattern.** Each component should have a `variant` prop where applicable:
   - Button: `default` (accent filled), `secondary` (neutral filled), `outline` (bordered), `ghost` (transparent), `link` (text-only), `destructive` (red)
   - Badge: `default` (accent), `secondary` (neutral), `outline` (bordered), `destructive` (red)
   - Alert: `default` (neutral), `destructive` (red)

### Using Tamagui built-ins
Where Tamagui provides built-in components (Select, Popover, Tooltip, Sheet, Toast), USE them as the foundation and wrap/style them rather than building from scratch. Check what's available at `tamagui` and `@tamagui/*` packages.

### Known Tamagui v2 issues
- Same `styled()`, `GetProps<>`, and JSX compat issues as in Task 003
- `Popover.Trigger`/`Popover.Content` children typed as `undefined` — cast sub-components
- Tamagui's `Select` may need careful typing work

## Verification
- All new components export from `@vlting/ui`
- Each renders correctly with all 3 brands (default, fun, posh)
- Variants work as expected
- Accent color only appears where specified
- Interactive states (hover, focus, disabled) all work
