<!-- spec-version: 2 -->

# InputOTP Specification

## Component Name
InputOTP

---

## Purpose

Multi-digit OTP (one-time password) input with individual character slots. Use for verification codes, 2FA inputs, and PIN entry. Do NOT use for regular text input or passwords.

---

## Supported Platforms

- [x] React (web)
- [ ] React Native

---

## Design System Constraints

- All styling via `styled()` — no inline `style={}`
- All colors from STL tokens — zero hardcoded values
- Hidden input pattern for a11y and mobile autofill

---

## Component API

### InputOTP.Root
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxLength` | `number` | (required) | Number of digits/characters |
| `value` | `string` | — | Controlled value |
| `onChange` | `(value: string) => void` | — | Value change callback |
| `onComplete` | `(value: string) => void` | — | Fires when all slots filled |
| `pattern` | `string` | `'[0-9]'` | Regex pattern to validate each character |
| `disabled` | `boolean` | — | Disable all interaction |

### InputOTP.Group
Container for slots. No special props.

### InputOTP.Slot
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `index` | `number` | (required) | Zero-based slot position |

### InputOTP.Separator
Visual separator between groups. Renders `·` by default. Accepts children for custom content.

---

## Composition Model

Compound component: `InputOTP.Root` > `InputOTP.Group` > `InputOTP.Slot` with optional `InputOTP.Separator` between groups.

---

## Layout Rules

- Root: `inline-flex`, `position: relative`
- Group: `inline-flex`, `gap: $4`
- Slot: `$40` width, `$44` height, centered content
- Hidden input covers entire root area (opacity 0, not display:none — mobile autofill needs real dimensions)

---

## Variants

None — single visual style.

---

## Size Options

Single size. Slot: 40×44px.

---

## States

- **Empty** — all slots show empty
- **Filling** — active slot highlighted with focus outline, previous slots show entered characters
- **Complete** — all slots filled, `onComplete` fires
- **Disabled** — opacity 0.5, non-interactive

---

## Interaction Model

- **Typing:** fills current slot, auto-advances
- **Backspace:** clears last character, moves cursor back
- **Paste:** filters valid chars, fills up to maxLength
- **Click:** focuses hidden input
- **Tab:** moves focus to/from component

---

## Accessibility

- Hidden `<input type="text">` captures all keyboard input
- `inputMode="numeric"` — numeric keyboard on mobile
- `autoComplete="one-time-code"` — OS/browser OTP autofill
- `aria-label="Enter N-digit code"` on hidden input
- Separator has `aria-hidden="true"`

---

## Platform Implementation Notes

### React (Web)
Single hidden input with context-driven slot display. `onInput` for character entry, `onKeyDown` for backspace, `onPaste` for clipboard.

### React Native
Not yet implemented.

---

## Theming Behavior

Token-driven: `$surface1` slot background, `$neutralMin` border, `$neutralText3` text color, `$neutral` focus outline, `$neutral6` separator color.

---

## Edge Cases

- Pattern validation uses `new RegExp` with try/catch for invalid patterns
- Paste with mixed valid/invalid chars: only valid chars are kept
- Value longer than maxLength: truncated

---

## Stories / Preview Cases

1. 6-digit OTP split into two groups of 3 with separator
2. 4-digit PIN single group
3. Disabled state

---

## Test Requirements

- Renders slot elements without error
- Renders with separator between groups
- Hidden input has correct attributes (type, inputMode, autoComplete, maxLength)
- Disabled state disables hidden input
- Throws when Slot used outside Root

---

## Implementation Constraints

- Single hidden input — NEVER per-slot inputs
- `forwardRef` on Root
- Context for slot state propagation

---

## Open Questions

None.

---

## Change Log

- v1: Initial implementation with hidden input pattern, compound component API
