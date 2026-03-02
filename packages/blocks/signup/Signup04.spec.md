# Block Spec — Signup04

> **Baseline**: Satisfies [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## Purpose
- Signup form with adjacent image inside card
- Use for compact signup with branding

## Layout
- Single Card with row layout on desktop
- Left side: form fields (padded)
- Right side: image (fills space, overflow hidden)
- On mobile: image hidden, single-column form

## Components Used
- `Card`, `AuthFormHeader`, `AuthSocialButtons`, `AuthDivider`, `AuthFooterLink` (from `login/_shared.tsx`)
- `Button`, `Input`, `Checkbox`, `Text` (from `@vlting/ui`)
- `styledHtml('form')` for the form element

## Props Contract
- See `Signup04Props` in `Signup04.tsx`
- Extends `SignupBlockProps` with `image?: ReactNode`

## Accessibility
- Form wrapped in `<form>` element
- All inputs have associated labels
- Error messages use `role="alert"`
- Image is decorative

## Cross-Platform
- Web: full support
- RN: limited (media queries)

## Test Requirements
- Renders name, email, and password fields
- Renders image when provided
- Calls onSubmit with { name, email, password }
- Shows error and loading states
- Renders terms checkbox when configured
