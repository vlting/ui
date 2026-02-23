<!-- auto-queue -->
# Commit History
- `9396208` fix(components): button focus outline color and accordion shadcn styling
- `92d9bde` fix(components): button focus outline and accordion shadcn styling (#001)

# 001 — Button Focus Outline Colors & Accordion shadcn Restyling

## Summary

1. Fix Button focus outline colors to match the variant's background (high-contrast) or fall back to `$color10` (low-contrast variants).
2. Restyle Accordion to match shadcn: no bordered box on triggers, just subtle separator lines between items.

## Scope

- `packages/components/Button/Button.tsx`
- `packages/components/Accordion/Accordion.tsx`

## Tasks

### 1. Button — Per-variant focus outline color

**Problem:** The focus outline color doesn't follow the rule: "same color as the control's background for high-contrast backgrounds, or the default button background (`$color10`) for low-contrast backgrounds."

**File:** `packages/components/Button/Button.tsx`

**Current state:** `ButtonFrame` has a single `focusVisibleStyle` with `outlineColor: '$outlineColor'` (theme palette index 5, a mid-tone). This is applied regardless of variant.

**Required behavior:**
- **default / solid / destructive** (bg = `$color10`): outline color = `$color10` (matches their background)
- **secondary** (bg = `$color2`): outline color = `$color10` (because `$color2` is too light/low-contrast for an outline)
- **outline / ghost / link** (bg = transparent): outline color = `$color10` (the standard button accent)

Since ALL variants should use `$color10` as focus outline color, the fix is straightforward: change `outlineColor: '$outlineColor'` to `outlineColor: '$color10'` in the `focusVisibleStyle`.

```ts
focusVisibleStyle: {
  outlineWidth: 2,
  outlineOffset: 1,
  outlineColor: '$color10',
  outlineStyle: 'solid',
},
```

Note: For the `destructive` variant, the component wraps in `<Theme name="red">`, so `$color10` within that context will be the red accent — which is exactly correct (the outline should match the destructive button's red background).

### 2. Accordion — Match shadcn styling

**Problem:** The accordion currently looks nothing like shadcn. The trigger appears to have a bordered box; it should be borderless. Items should just have a subtle separator line between them.

**File:** `packages/components/Accordion/Accordion.tsx`

**Current state:**
- `Accordion.Item` has `borderBottomWidth={1}` and `borderBottomColor="$borderColor"` — this is the correct separator line, keep it.
- `Accordion.Trigger` is wrapped in `TamaguiAccordionHeaderJsx` with `unstyled backgroundColor="transparent"`. The trigger itself has `unstyled`, `backgroundColor="transparent"`, `paddingVertical="$3"`, `paddingHorizontal="$1"`.
- The issue is likely that Tamagui's `Accordion.Header` or `Accordion.Trigger` adds a default border/box even with `unstyled`.

**shadcn accordion reference:**
- Items have a bottom border only (no left/right/top borders, no background)
- The trigger is a full-width button with text on the left and a chevron (▼) on the right
- The chevron rotates 180° when open
- No background on the trigger at all — just text, transparent
- Hover shows a subtle background change on the trigger
- The trigger has `padding-top` and `padding-bottom` but no horizontal padding (or minimal)

**Fix:**
1. Ensure `Accordion.Header` has NO default styling: add `borderWidth={0}`, `padding={0}`, `margin={0}`, `backgroundColor="transparent"` explicitly
2. Ensure `Accordion.Trigger` has NO box styling: add `borderWidth={0}` explicitly, keep `backgroundColor="transparent"`
3. Change the +/− icon to a chevron (▼ / ▲, or a `>` character that rotates). shadcn uses a downward chevron that rotates 180° when open. Use `▼` or `⌄` character, with a CSS rotation: `transform: rotate(180deg)` when open.
4. Remove `paddingHorizontal="$1"` from the trigger — shadcn uses no horizontal padding on accordion triggers (or very minimal like `$0.5`). Set to `0`.
5. Similarly in `Content`, change `paddingHorizontal="$1"` to `0` to align with the trigger text.
6. The overall look: flush left text, subtle hover, bottom border line only.

## Acceptance Criteria

- [ ] Button focus outline uses `$color10` in all variants (adapts via Theme wrapper for destructive)
- [ ] Accordion items have only a subtle bottom border line — no box/container styling on the trigger
- [ ] Accordion trigger has a chevron that visually indicates open/closed state (rotated or changed)
- [ ] Accordion trigger has transparent background with subtle hover state
- [ ] No TypeScript errors
