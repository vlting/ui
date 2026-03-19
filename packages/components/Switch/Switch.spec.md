<!-- spec-version: 2 -->
<!-- AI: Fill this spec when this component is actively worked on. See Switch.spec.bak.md for prior design intent. -->

# Switch Specification

## Component Name
Switch

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

- `error` boolean prop triggers the error variant on `styled()`
- Error variant changes border/outline color of the switch track to `$error9`
- `mapProps` sets `aria-invalid: 'true'` on the switch when `error` is true
- Focus ring changes from `$neutral` outline to `$error` outline when in error state

**Implementation pattern** (follows Input/Textarea/NativeSelect convention):
```
styled(SwitchPrimitive, {
  // ...base styles
  variants: {
    error: {
      true: {
        borderColor: '$error9',
        ':focus': { outline: '$error' },
      },
    },
  },
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

- When `error` is true, `aria-invalid="true"` is set on the switch element via `mapProps`
- Error state must be communicated to screen readers through the `aria-invalid` attribute
- Focus indicator must remain visible in error state (switches from `$neutral` to `$error` outline)

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

- Error state applies `$error9` border color to switch track
- Error state sets `aria-invalid="true"` on the switch element
- Error state changes focus outline from `$neutral` to `$error`
- Error state is purely visual + ARIA — does not affect on/off behavior

---

## Implementation Constraints

---

## Open Questions

---

## Change Log
