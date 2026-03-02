# Block Spec — Login05

> **Baseline**: Satisfies [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## Purpose
- Email-only login form for magic link or passwordless authentication flows
- Use when the authentication method doesn't require a password field

## Layout
- Centered AuthFormCard
- Header (optional logo, title, description) → social providers → divider → email field → submit button → signup footer link
- No password field, no forgot password link

## Components Used
- `AuthFormCard`, `AuthFormHeader`, `AuthSocialButtons`, `AuthDivider`, `AuthFooterLink` (from `_shared.tsx`)
- `Button`, `Input`, `Text` (from `@vlting/ui`)
- `styledHtml('form')` for the form element

## Props Contract
- See `Login05Props` in `Login05.tsx`
- Extends `LoginBlockProps` from `_shared/types.ts`
- Additional: `submitText?: string` (defaults to "Sign in with email")

## Accessibility
- Form wrapped in `<form>` element
- Email input has associated label
- Error messages use `role="alert"`
- Interactive footer links use `<button>` or `<a>` elements
- Focus-visible styles on all interactive elements

## Cross-Platform
- Web: full support
- RN: supported (simple form layout)

## Test Requirements
- Renders form with email field only (NO password field)
- Calls onSubmit with { email } only
- Does NOT render forgot password link
- Displays error message when provided
- Displays custom submit text when provided
- Renders social providers when provided
- Renders signup footer link when configured
