<!-- spec-version: 2 -->

# Component Specification Template

## Component Name
<ComponentName>

---

## Purpose
Describe the role of this component in the design system.

Constraints:
- Must align with the existing design system.
- Must use existing theme tokens.
- Must not introduce arbitrary spacing, colors, typography, or radii.

---

## Supported Platforms

Indicate supported targets.

- [ ] React (web)
- [ ] React Native
- [ ] Other:

Notes:
- Platform differences must be explicitly documented.
- Shared behavior should remain consistent across platforms.

---

## Design System Constraints

The component **must adhere to the design system layer**.

Rules:

1. Only use **existing design tokens**.
2. Do not introduce raw values (colors, spacing, typography, radii).
3. If a required token does not exist:
   - Document it under **Required Token Additions**.
   - Do not invent a value.

Required Token Additions (if any):

```
<token_name>
<token_purpose>
```

---

## Component API

Provide the public component interface.

```ts
type <ComponentName>Props = {
  /* props */
}
```

Include:

- optional vs required props
- default values
- controlled vs uncontrolled behavior if applicable

Defaults:

```
<prop>: <default_value>
```

---

## Composition Model

Describe how the component is intended to be composed.

Examples:

```
<ComponentName>
  ...
</ComponentName>
```

If the component supports slots, subcomponents, or compound patterns, document them here.

---

## Layout Rules

Describe layout behavior without inventing tokens.

Topics to define if relevant:

- internal spacing
- alignment
- icon placement
- content flow
- min/max dimensions
- intrinsic vs container-driven sizing

All layout decisions must use design tokens.

---

## Variants

List supported variants if applicable.

```
variant:
  - <variant_name>
  - <variant_name>
```

Variant rules:

- Each variant must map to design tokens.
- Variants must not introduce new visual primitives.

Variant behavior:

```
<variant_name>
description:
token usage:
interaction differences:
```

---

## Size Options

Document size variants if applicable.

```
size:
  - <size_name>
  - <size_name>
```

Define how size affects:

- padding
- typography
- icon size
- layout

All values must come from tokens.

---

## States

Document all supported states.

```
states:
  - default
  - hover
  - focus-visible
  - active
  - disabled
  - loading
  - pressed
  - selected
  - other:
```

For each state describe:

```
state:
behavior:
visual_changes:
token_usage:
interaction_rules:
```

---

## Interaction Model

Describe how users interact with the component.

Topics:

- pointer interaction
- keyboard interaction
- gesture interaction (mobile)
- focus behavior
- event triggers

---

## Accessibility

Document accessibility requirements.

Topics to specify:

- semantic role
- ARIA attributes
- screen reader expectations
- keyboard support
- focus management

---

## Platform Implementation Notes

### React (Web)

Notes such as:

- semantic elements
- browser behavior constraints
- focus handling
- event propagation

### React Native

Notes such as:

- gesture handling
- platform parity differences
- accessibility mapping

---

## Theming Behavior

Describe how the component interacts with the theme system.

Topics:

- which tokens it consumes
- which tokens may vary by theme
- whether it supports contextual theming

Do not define token values.

---

## Edge Cases

Document unusual scenarios the component must handle.

Examples:

- long content
- no content
- icon-only usage
- nested layouts
- async states
- dynamic resizing

---

## Stories / Preview Cases

List preview cases for Storybook or similar tools.

```
<ComponentName> / Default
<ComponentName> / Variants
<ComponentName> / Sizes
<ComponentName> / States
<ComponentName> / Edge Cases
```

---

## Test Requirements

Define required tests.

Examples:

- state transitions
- keyboard interaction
- accessibility checks
- layout stability
- token usage verification

---

## Implementation Constraints

Rules for implementation:

- Must not hardcode visual values.
- Must consume design tokens.
- Must support theming infrastructure.
- Must not introduce styling outside the system primitives.
- Must follow existing component architecture patterns.

---

## Open Questions

Document unresolved design or API decisions.

```
<Question>
```

---

## Change Log

```
version:
changes:
reason:
```
