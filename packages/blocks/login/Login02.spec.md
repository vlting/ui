# Block Spec — Login02

> **Baseline**: Satisfies [`QUALITY_BASELINE.md`](../../../packages/QUALITY_BASELINE.md).

## Purpose
- Two-column login layout with a cover image alongside the form
- Best for: marketing-oriented login pages, branded auth experiences
- When to use vs other variants: use Login02 when you have a hero image or illustration to display alongside the login form

## Layout
- Two-column layout on desktop (`$gtMd` — min-width 769px): left column = form, right column = image
- Left column: vertically and horizontally centered form content (max-width 400px)
- Right column: cover image element fills full height with overflow hidden
- On mobile (`$sm` — max-width 640px): image column is hidden (`display: 'none'`), only form shows
- Content within form column stacked vertically: logo, title, description, error, form fields, forgot password, submit, social, footer link

## Components Used
- `Field` (Root, Label, Control) — label/input association and accessibility
- `Input` — email and password fields
- `Button` — submit button and social provider buttons
- `Separator` (via AuthDivider) — visual divider before social section
- `Text` — headings, descriptions, error messages
- `View` / `YStack` / `XStack` — layout containers
- `styledHtml('form')` — semantic form element
- `styledHtml('button')` — forgot password interactive link

## Props Contract
- Reference TypeScript source: `Login02Props` in `Login02.tsx`
- Extends `LoginBlockProps` from `_shared/types.ts`
- Additional: `title?: string`, `description?: string`, `image?: ReactNode`

## Accessibility
- `<form>` landmark wraps all inputs
- Each input has associated `<label>` via Field.Label + Field.Control
- Submit button is `type="submit"`
- Error messages use `role="alert"`
- Social provider buttons are keyboard accessible
- Forgot password and signup links are interactive (`<a>` or `<button>`)
- Image column is presentational — does not require alt text from the block (consumers provide their own image element with alt)

## Cross-Platform
- Web: full support — two-column on desktop, single column on mobile
- RN: limited — image column hidden on narrow screens via media query

## Test Requirements
- Renders form with email and password fields
- Calls onSubmit with { email, password } on form submission
- Renders social providers when passed
- Renders forgot password link
- Renders signup footer link
- Shows error message when error prop is set
- Shows loading state on submit button
- Renders image when provided
- Form has `<form>` landmark
- All inputs have associated labels
