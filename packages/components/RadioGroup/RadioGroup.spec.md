<!-- spec-version: 2 -->
<!-- AI: Fill this spec when this component is actively worked on. See RadioGroup.spec.bak.md for prior design intent. -->

# RadioGroup Specification

## Component Name
RadioGroup

---

## Purpose

---

## Supported Platforms

- [ ] React (web)
- [ ] React Native

---

## Design System Constraints

---

## Component API

---

## Composition Model

---

## Layout Rules

---

## Variants

### Error

- `error` boolean prop on `RadioGroup.Root` triggers the error variant
- Error variant changes border color of each radio circle indicator (on `RadioGroup.Item`) to `$error9`
- `mapProps` on the root sets `aria-invalid: 'true'` when `error` is true
- Focus ring on each radio item changes from `$neutral` outline to `$error` outline when in error state
- Error state propagates from Root to Items via context (items inherit the error visual without individual `error` props)

**Implementation pattern** (follows Input/Textarea/NativeSelect convention):
```
// RadioGroup.Item styled with error variant
styled(RadioItemPrimitive, {
  // ...base styles
  variants: {
    error: {
      true: {
        borderColor: '$error9',
        ':focus': { outline: '$error' },
      },
    },
  },
} as const)

// RadioGroup.Root uses mapProps for aria-invalid
styled(RadioGroupPrimitive, {
  // ...base styles
} as const, {
  mapProps: (props) => ({
    ...props,
    'aria-invalid': props.error ? 'true' : undefined,
  }),
})
```

---

## Size Options

---

## States

---

## Interaction Model

---

## Accessibility

- When `error` is true, `aria-invalid="true"` is set on the radiogroup root element via `mapProps`
- Error state must be communicated to screen readers through the `aria-invalid` attribute on the group
- Focus indicator on each radio item must remain visible in error state (switches from `$neutral` to `$error` outline)

---

## Platform Implementation Notes

### React (Web)

### React Native

---

## Theming Behavior

---

## Edge Cases

---

## Stories / Preview Cases

---

## Test Requirements

- Error state applies `$error9` border color to each radio circle indicator
- Error state sets `aria-invalid="true"` on the radiogroup root element
- Error state changes focus outline on radio items from `$neutral` to `$error`
- Error state is purely visual + ARIA — does not affect selection behavior

---

## Implementation Constraints

---

## Open Questions

---

## Change Log
