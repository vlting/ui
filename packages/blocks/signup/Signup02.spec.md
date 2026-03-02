# Block Spec — Signup02

> **Baseline**: Satisfies [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## Purpose
- Two-column signup with cover image
- Use for marketing-oriented signup pages

## Layout
- Full viewport, two-column: left = form, right = image
- On mobile: image hidden, single-column form
- Form content same as Signup01

## Components Used
- `AuthFormCard`, `AuthFormHeader`, `AuthSocialButtons`, `AuthDivider`, `AuthFooterLink` (from `login/_shared.tsx`)
- `Button`, `Input`, `Checkbox`, `Text` (from `@vlting/ui`)
- `styledHtml('form')` for the form element

## Props Contract
- See `Signup02Props` in `Signup02.tsx`
- Extends `SignupBlockProps` with `image?: ReactNode`

## Accessibility
- Form wrapped in `<form>` element
- All inputs have associated labels
- Error messages use `role="alert"`
- Image is decorative (consumer provides alt text)

## Cross-Platform
- Web: full support
- RN: limited (media queries for responsive layout)

## Test Requirements
- Renders name, email, and password fields
- Renders image when provided
- Calls onSubmit with { name, email, password }
- Shows error and loading states
- Renders terms checkbox when configured
