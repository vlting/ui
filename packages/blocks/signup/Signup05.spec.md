# Block Spec — Signup05

> **Baseline**: Satisfies [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## Purpose
- Social-first signup variant
- Use when social auth is the primary registration path

## Layout
- Centered AuthFormCard
- Social provider buttons at the top (prominent, full-width)
- Divider with "or"
- Email and password fields below (no name field)
- Submit button → login footer link

## Components Used
- `AuthFormCard`, `AuthFormHeader`, `AuthSocialButtons`, `AuthDivider`, `AuthFooterLink` (from `login/_shared.tsx`)
- `Button`, `Input`, `Text` (from `@vlting/ui`)
- `styledHtml('form')` for the form element

## Props Contract
- See `Signup05Props` in `Signup05.tsx`
- Extends `SignupBlockProps` (no name field, no terms checkbox)

## Accessibility
- Form wrapped in `<form>` element
- All inputs have associated labels
- Error messages use `role="alert"`
- Social buttons have accessible labels

## Cross-Platform
- Web: full support
- RN: supported

## Test Requirements
- Social providers render above the form
- Email and password fields render (no name field)
- Calls onSubmit with { email, password } (no name)
- Shows error and loading states
- Renders "Already have an account? Sign in" footer
