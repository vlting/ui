# Block Spec — Login01

> **Baseline**: Satisfies [`QUALITY_BASELINE.md`](../../../packages/QUALITY_BASELINE.md).

## Purpose
- Simple centered login form for standard email/password authentication
- Best for: standalone login pages, modal login flows, minimal auth UIs
- When to use vs other variants: use Login01 when you need a single-column centered card with no cover imagery

## Layout
- Full-page centered layout (flex container, center-aligned vertically and horizontally)
- AuthFormCard at center with max-width 400px
- Content stacked vertically: logo, title, description, error (if any), form fields, forgot password link, submit button, social divider + providers (if any), footer link

## Components Used
- `Card` (via AuthFormCard) — form container
- `Field` (Root, Label, Control) — label/input association and accessibility
- `Input` — email and password fields
- `Button` — submit button and social provider buttons
- `Separator` (via AuthDivider) — visual divider before social section
- `Text` — headings, descriptions, error messages
- `View` / `YStack` — layout containers
- `styledHtml('form')` — semantic form element
- `styledHtml('button')` — forgot password interactive link

## Props Contract
- Reference TypeScript source: `Login01Props` in `Login01.tsx`
- Extends `LoginBlockProps` from `_shared/types.ts`
- Additional: `title?: string`, `description?: string`

## Accessibility
- `<form>` landmark wraps all inputs
- Each input has associated `<label>` via Field.Label + Field.Control
- Submit button is `type="submit"`
- Error messages use `role="alert"`
- Social provider buttons are keyboard accessible (native `<button>` elements)
- Forgot password and signup links are interactive (`<a>` or `<button>`)
- Focus flow: logo → email → password → forgot password → submit → social → footer link

## Cross-Platform
- Web: full support
- RN: full support — all Tamagui components render natively

## Test Requirements
- Renders form with email and password fields
- Calls onSubmit with { email, password } on form submission
- Renders social providers when passed
- Renders forgot password link
- Renders signup footer link
- Shows error message when error prop is set
- Shows loading state on submit button
- Form has `<form>` landmark
- All inputs have associated labels
