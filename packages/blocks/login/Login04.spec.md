# Block Spec — Login04

> **Baseline**: Satisfies [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## Purpose
- Login form with an adjacent image inside a single card
- Use when you want a compact hero-style login with visual branding inside the card boundary

## Layout
- Single Card with `flexDirection: 'row'` on desktop
- Left side: form fields (padded)
- Right side: image (fills space, overflow hidden)
- On mobile: image hidden, single-column form only

## Components Used
- `Card`, `AuthFormHeader`, `AuthSocialButtons`, `AuthDivider`, `AuthFooterLink` (from `_shared.tsx`)
- `Button`, `Input`, `Text` (from `@vlting/ui`)
- `styledHtml('form')` for the form element

## Props Contract
- See `Login04Props` in `Login04.tsx`
- Extends `LoginBlockProps` from `_shared/types.ts`
- Additional: `image?: ReactNode` for the adjacent image

## Accessibility
- Form wrapped in `<form>` element
- All inputs have associated labels
- Error messages use `role="alert"`
- Image is decorative — provided by consumer as ReactNode (consumer handles alt text if needed)
- Focus-visible styles on all interactive elements

## Cross-Platform
- Web: full support
- RN: limited (media queries for responsive layout are web-focused)

## Test Requirements
- Renders form with email and password fields
- Renders image when provided
- Calls onSubmit with { email, password }
- Displays error message when provided
- Renders social providers when provided
- Renders forgot password link when configured
- Renders signup footer link when configured
