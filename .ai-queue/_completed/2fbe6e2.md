<!-- auto-queue -->
# Commit History
- 2fbe6e2 — fix(a11y): use native <form> and <label> elements in Form and Label

# A11y Fix: Form & Label Primitive — Use Native `<form>` and `<label>` Elements

## Priority: CRITICAL

## Root Cause

- `styled(YStack, { tag: 'form' })` renders `<div tag="form">`, not `<form>`. Form submission via Enter key is broken. The `onSubmit` handler never fires.
- `styled(Text, ...)` with runtime `tag="label"` renders `<span>`, not `<label>`. The `htmlFor` attribute does nothing on a `<span>`.

## Scope

Files modified:
- `packages/components/Form/Form.tsx`
- `packages/primitives/Label.tsx` (or `packages/primitives/Label/Label.tsx`)

## Required Changes

### 1. Form.Root — Use native `<form>` element

Replace the styled FormFrame with a native `<form>`:

```tsx
// REMOVE this — renders as <div>:
const FormFrame = styled(YStack, { tag: 'form', ... })

// REPLACE — use native <form>:
function FormRoot({ onSubmit, children, ...props }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: /* from token */ }}
    >
      {children}
    </form>
  )
}
```

Or wrap a native `<form>` around the styled YStack:

```tsx
function FormRoot({ onSubmit, children, ...props }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit?.() }}>
      <FormFrameVisual {...props}>
        {children}
      </FormFrameVisual>
    </form>
  )
}
```

The key is that a native `<form>` element wraps the content, enabling:
- Enter-to-submit behavior
- Native form validation
- Proper form semantics for screen readers

### 2. Form.Label — Use native `<label>` element

Replace the styled label with a native `<label>` wrapping styled text:

```tsx
function FormLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor}>
      <StyledLabelText>{children}</StyledLabelText>
    </label>
  )
}
```

Or render a native `<label>` directly:

```tsx
function FormLabel({ htmlFor, children, ...props }) {
  return (
    <label htmlFor={htmlFor} style={{ fontFamily: 'inherit', fontWeight: 600, fontSize: 'inherit' }}>
      {children}
    </label>
  )
}
```

### 3. Label primitive — Use native `<label>` element

The Label primitive (`packages/primitives/Label.tsx` or similar) also uses the broken `tag: 'label'` pattern. Fix it the same way:

```tsx
function Label({ htmlFor, required, children, ...props }) {
  return (
    <label htmlFor={htmlFor}>
      <StyledLabelText {...props}>
        {children}
        {required && <RequiredIndicator>*</RequiredIndicator>}
      </StyledLabelText>
    </label>
  )
}
```

### 4. Form.ErrorMessage — ensure `role="alert"` works

The error message already uses `role="alert"` which is correct. Verify it still works after the form restructuring.

## Verification

- Form renders as `<form>` in DOM
- Enter key in an input inside the form triggers onSubmit
- Labels render as `<label>` — clicking focuses the associated input
- `htmlFor` correctly links label to input
- Build passes: `yarn build`

## Constraints

- Do NOT use `tag` prop in `styled()` — it doesn't work
- No hardcoded colors — theme tokens only
- Do NOT modify kitchen-sink demo files
