<!-- auto-queue -->
# Commit History
- 6bfe78b — fix(a11y): use native <nav>, <ol>, <li>, <a>, <h3> in Breadcrumb and Card

# A11y Fix: Breadcrumb & Card — Use Native `<nav>`, `<a>`, `<h3>` Elements

## Priority: MEDIUM-HIGH

## Root Cause

- `styled(XStack, { tag: 'nav' })` renders `<div tag="nav">`, not `<nav>`.
- `styled(Text, ...)` with runtime `tag="a"` renders `<span>`, not `<a>`. Links are not navigable.
- `styled(Text, { tag: 'h3' })` renders `<span tag="h3">`, not `<h3>`. Heading hierarchy is broken.

## Scope

Files modified:
- `packages/components/Breadcrumb/Breadcrumb.tsx`
- `packages/components/Card/Card.tsx`

## Required Changes

### 1. Breadcrumb — Use native `<nav>`, `<ol>`, `<li>`, `<a>`

The WCAG breadcrumb pattern uses `<nav aria-label="Breadcrumb">` containing an `<ol>` with `<li>` items:

```tsx
function BreadcrumbRoot({ children }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol style={{ display: 'flex', alignItems: 'center', listStyle: 'none', padding: 0, margin: 0, gap: 8 }}>
        {children}
      </ol>
    </nav>
  )
}

function BreadcrumbItem({ children }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center' }}>
      {children}
    </li>
  )
}

function BreadcrumbLink({ href, onPress, children }) {
  return (
    <a
      href={href || '#'}
      onClick={(e) => { if (onPress) { e.preventDefault(); onPress() } }}
      style={{
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      <StyledBreadcrumbLinkText>{children}</StyledBreadcrumbLinkText>
    </a>
  )
}

function BreadcrumbPage({ children }) {
  return (
    <span aria-current="page">
      <StyledBreadcrumbPageText>{children}</StyledBreadcrumbPageText>
    </span>
  )
}

function BreadcrumbSeparator({ children }) {
  return (
    <li role="presentation" aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
      <StyledSeparatorText>{children || '/'}</StyledSeparatorText>
    </li>
  )
}
```

Key changes:
- `BreadcrumbRoot` renders native `<nav>` with `<ol>`
- `BreadcrumbItem` renders `<li>`
- `BreadcrumbLink` renders native `<a>`
- `BreadcrumbSeparator` renders `<li>` with `aria-hidden`
- Keep styled Text components for visual styling, but wrap in semantic HTML

### 2. Add focus styles to breadcrumb links

Add visible focus ring on the `<a>` elements:
```css
a:focus-visible {
  outline: 2px solid /* outlineColor */;
  outline-offset: 2px;
  border-radius: 2px;
}
```

Or use inline style on the `<a>` element.

### 3. Card — CardTitle as native `<h3>`

Replace the styled Text with a native `<h3>`:

```tsx
function CardTitle({ children, ...props }) {
  return (
    <h3 style={{ margin: 0, fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>
      <StyledCardTitleText {...props}>{children}</StyledCardTitleText>
    </h3>
  )
}
```

Or render `<h3>` directly with Tamagui token-based inline styles.

### 4. Card — Interactive variant a11y

When `interactive=true`, the Card already has `role="button"`, `tabIndex={0}`, `onKeyDown` for Enter/Space, and `focusStyle`. Verify these still work. If `focusStyle` doesn't apply (since CardFrame is a styled Tamagui component), add inline focus styles:

```tsx
focusVisibleStyle: {
  outlineWidth: 2,
  outlineColor: '$outlineColor',
  outlineStyle: 'solid',
  outlineOffset: 2,
},
```

## Verification

- Breadcrumb renders as `<nav>` → `<ol>` → `<li>` → `<a>` in DOM
- Links are keyboard-focusable and navigable
- `aria-current="page"` on current page item
- CardTitle renders as `<h3>` in DOM
- Interactive card is keyboard-focusable with visible focus ring
- Build passes: `yarn build`

## Constraints

- Do NOT use `tag` prop in `styled()` — it doesn't work
- No hardcoded colors — theme tokens only
- Do NOT modify kitchen-sink demo files
