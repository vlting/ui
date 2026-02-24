<!-- auto-queue -->
# Commit History
- `db3e1de` fix(primitives): render semantic HTML heading elements in Heading component
- `9ada87d` fix(primitives): render semantic HTML heading elements (#003) [merge]

# UI Library: Semantic HTML for Heading Primitive + Sidebar GroupLabel

## Context

The `Heading` component currently uses `styled(Text, { accessibilityRole: 'header' })` which renders a `<span>` (or `<div>`) with `role="heading"` in the DOM. This is NOT semantic HTML. The `level` prop (1-6) is purely visual and does not produce `<h1>`-`<h6>` elements.

The user has explicitly demanded: **USE SEMANTIC HTML**. Headings must render as actual `<h1>` through `<h6>` elements based on the `level` prop.

Similarly, `Sidebar.GroupLabel` renders as a styled `Text` (span) but should use a semantic heading element.

## Requirements

### 1. Fix `Heading` to render semantic `<hN>` elements

The `level` prop must map to the corresponding HTML heading element:
- `level={1}` renders `<h1>`
- `level={2}` renders `<h2>` (default)
- `level={3}` renders `<h3>`
- `level={4}` renders `<h4>`
- `level={5}` renders `<h5>`
- `level={6}` renders `<h6>`

**Implementation approach**: Since Tamagui v2's `styled()` `tag` prop does NOT change the rendered element (see MEMORY.md — this is a known v2 RC bug), you should use one of these approaches:
- Use `styledHtml('h1', {...})`, `styledHtml('h2', {...})` etc. to create per-level base components, then use a wrapper that selects the right one based on the `level` prop
- Or use a React component that renders the correct `<hN>` element and applies Tamagui styling via className/style

The Typography module (`packages/components/Typography/Typography.tsx`) already has working semantic `H1`-`H4` components using `styledHtml()` — reference that pattern.

**Keep the existing API**: The `level` prop, font size/weight token mappings, and `HeadingProps` export must remain unchanged. This is a rendering fix, not an API change.

### 2. Fix `Sidebar.GroupLabel` to use a semantic heading

`GroupLabel` currently renders a `TextJsx` element (styled span). It should render as a semantic heading element (e.g., `<h3>` or configurable). When `collapsed` is true, it should still return null.

### 3. Update spec and contract files

Update the following to reflect the new semantic HTML rendering:
- `Heading.spec.md` — Update sections that say `accessibilityRole: 'header'` is the heading mechanism. Now the element itself IS a heading element. `aria-level` is no longer needed since the element tag communicates the level.
- `Heading.contract.md` — Update "Behavioral Guarantees" section 2 which explicitly says "It does not map to HTML heading elements (`h1`-`h6`) at the render level" — this must now say it DOES. Update "Breaking Change Criteria" section 5 which says the base element is `Text`.

## Scope

- `packages/primitives/Heading.tsx` — Core implementation change
- `packages/primitives/Heading.spec.md` — Spec update
- `packages/primitives/Heading.contract.md` — Contract update
- `packages/components/Sidebar/Sidebar.tsx` — GroupLabel semantic fix
