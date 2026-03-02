# Block Spec — Login03

> **Baseline**: Satisfies [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## Purpose
- Full-page login form with muted background color
- Use when the login needs to feel like a standalone page with visual distinction from the main app

## Layout
- Full viewport wrapper with `$color1` background, centered content
- Centered AuthFormCard containing the form
- Header (optional logo, title, description) → social providers → divider → email/password fields → forgot password link → submit button → signup footer link

## Components Used
- `AuthFormCard`, `AuthFormHeader`, `AuthSocialButtons`, `AuthDivider`, `AuthFooterLink` (from `_shared.tsx`)
- `Button`, `Input`, `Text` (from `@vlting/ui`)
- `styledHtml('form')` for the form element

## Props Contract
- See `Login03Props` in `Login03.tsx`
- Extends `LoginBlockProps` from `_shared/types.ts`

## Accessibility
- Form wrapped in `<form>` element
- All inputs have associated labels (via Input component)
- Error messages use `role="alert"`
- Interactive footer links use `<button>` or `<a>` elements
- Focus-visible styles on all interactive elements

## Cross-Platform
- Web: full support
- RN: supported (form layout is simple flexbox)

## Test Requirements
- Renders form with email and password fields
- Calls onSubmit with { email, password }
- Displays error message when provided
- Has muted background container
- Renders social providers when provided
- Renders forgot password link when configured
- Renders signup footer link when configured
