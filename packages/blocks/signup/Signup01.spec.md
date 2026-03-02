# Block Spec — Signup01

> **Baseline**: Satisfies [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## Purpose
- Standard centered signup card
- Use for simple registration flows

## Layout
- Centered AuthFormCard
- Header (logo, title, description) → social providers → divider → name/email/password fields → optional terms checkbox → submit button → login footer link

## Components Used
- `AuthFormCard`, `AuthFormHeader`, `AuthSocialButtons`, `AuthDivider`, `AuthFooterLink` (from `login/_shared.tsx`)
- `Button`, `Input`, `Checkbox`, `Text` (from `@vlting/ui`)
- `styledHtml('form')` for the form element

## Props Contract
- See `Signup01Props` in `Signup01.tsx`
- Extends `SignupBlockProps` from `_shared/types.ts`

## Accessibility
- Form wrapped in `<form>` element
- All inputs have associated labels
- Error messages use `role="alert"`
- Terms checkbox is a native `<label>` wrapping `<input type="checkbox">`
- Focus-visible styles on all interactive elements

## Cross-Platform
- Web: full support
- RN: supported (simple form layout)

## Test Requirements
- Renders name, email, and password fields
- Calls onSubmit with { name, email, password }
- Renders social providers when provided
- Renders terms checkbox when termsHref is provided
- Renders "Already have an account? Sign in" footer
- Shows error and loading states
