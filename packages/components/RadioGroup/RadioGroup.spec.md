<!-- spec-version: 2 -->
<!-- AI: Prior design intent preserved in RadioGroup.spec.bak.md -->

# RadioGroup Specification

## Component Name
RadioGroup

---

## Purpose
Presents a set of mutually exclusive options where exactly one can be selected. Use when the user must choose one option from a small, visible set (2-7 items). Do NOT use for binary choices (use Switch/Checkbox) or large option sets (use Select).

---

## Supported Platforms

- [x] React (web)
- [ ] React Native

---

## Design System Constraints

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

- All styling via `styled()`. No plain `style={}`.
- All spacing/sizing via STL tokens.

---

## Component API

> See `RadioGroupRootProps` and `RadioGroupItemProps` in `RadioGroup.tsx` for the full typed API.

Root props: `value`, `defaultValue`, `onValueChange`, `orientation`, `disabled`, `size`, `name`, `aria-label`.
Item props: `value`, `disabled`, `children`.

---

## Composition Model

- **RadioGroup.Root** — Container with `role="radiogroup"`, manages selection state via context.
- **RadioGroup.Item** — Individual radio option: `<label>` wrapping a visually-hidden `<input type="radio">` + styled circle indicator + children.

---

## Layout Rules

- Root is flex container. `orientation="vertical"` (default) → column. `"horizontal"` → row.
- Gap: `$8` between items.
- Fixed indicator size per variant; does not stretch.

---

## Variants

Root:
- `orientation`: vertical, horizontal
- `disabled`: true

Item (via context):
- `size`: sm, md, lg (indicator + font size)
- `disabled`: true (opacity 0.5, no interaction)
- `selected`: true (filled dot indicator)

---

## Size Options

| Size | Circle | Dot | Font |
|------|--------|-----|------|
| sm   | 16×16  | 8×8 | $buttonSmall |
| md   | 20×20  | 8×8 | $button |
| lg   | 24×24  | 12×12 | $button |

---

## States

- **Unselected** — Circular border (`$neutral7`), empty interior.
- **Selected** — Border changes to `$primary9`, filled dot `$primary9`.
- **Disabled** — 50% opacity, no interaction.

---

## Interaction Model

- **Click** — Selects the item, deselects others.
- **Arrow Up/Down** (vertical) or **Arrow Left/Right** (horizontal) — Moves selection via roving tabindex.
- **Tab** — Enters/leaves the group (only one item tabbable).
- Follows [WAI-ARIA Radio Group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/).

---

## Accessibility

- `role="radiogroup"` on Root.
- Native `<input type="radio">` with `role="radio"` on items.
- `aria-checked` via native checked state.
- `aria-label` on root for group labeling.
- Roving tabindex for keyboard navigation.
- Auto-generated `name` via `useId()` if not provided.

---

## Platform Implementation Notes

### React (Web)

- Uses `useControllableState` for controlled/uncontrolled value.
- Uses `useRovingTabIndex` for arrow-key navigation.
- React context passes shared state to items.
- Visually-hidden `<input type="radio">` for native form behavior + a11y.

### React Native

Not yet implemented.

---

## Theming Behavior

- Selected indicator: `$primary9`. Unselected border: `$neutral7`.
- Dark mode: token-based, resolves automatically.

---

## Edge Cases

- No items: renders empty container.
- Item disabled individually while group is enabled.
- Rapid re-renders with controlled value.

---

## Stories / Preview Cases

- Default (vertical, md)
- Horizontal orientation
- Each size
- With defaultValue
- Disabled group

---

## Test Requirements

- **Behavioral**: selecting an item deselects others; `onValueChange` fires with correct value; controlled and uncontrolled modes; disabled prevents selection.
- **Accessibility**: `role="radiogroup"` on root; `role="radio"` on items; checked state toggles; arrow keys move selection; Tab enters/leaves group.
- **Visual regression**: unselected, selected, disabled, horizontal, each size.

---

## Implementation Constraints

- Must use `useRovingTabIndex` for keyboard navigation.
- Arrow keys select (per WAI-ARIA radio pattern).

---

## Open Questions

None.

---

## Change Log

- 2026-03-19: Initial implementation — web only.
