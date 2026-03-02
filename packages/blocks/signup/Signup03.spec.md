# Block Spec — Signup03

> **Baseline**: Satisfies [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## Purpose
- Muted background signup variant
- Use for standalone signup pages with visual distinction

## Layout
- Full viewport wrapper with `$color1` background, centered content
- Centered AuthFormCard containing the form
- Same form content as Signup01

## Components Used
- `AuthFormCard`, `AuthFormHeader`, `AuthSocialButtons`, `AuthDivider`, `AuthFooterLink` (from `login/_shared.tsx`)
- `Button`, `Input`, `Checkbox`, `Text` (from `@vlting/ui`)
- `styledHtml('form')` for the form element

## Props Contract
- See `Signup03Props` in `Signup03.tsx`
- Same as Signup01Props

## Accessibility
- Form wrapped in `<form>` element
- All inputs have associated labels
- Error messages use `role="alert"`

## Cross-Platform
- Web: full support
- RN: supported

## Test Requirements
- Renders name, email, and password fields
- Has muted background container
- Calls onSubmit with { name, email, password }
- Shows error and loading states
- Renders terms checkbox when configured
