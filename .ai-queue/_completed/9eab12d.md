<!-- auto-queue -->
# Commit History
- `cd1dc15` feat(examples): fix heading hierarchy, add section IDs, deduplicate helpers
- `9eab12d` feat(examples): fix heading hierarchy, add section IDs, deduplicate helpers (#005) [merge]

# Example App: Page Heading Hierarchy + Semantic HTML Audit

## Context

All kitchen-sink example app pages use a `Section` helper that renders Tamagui `Heading` components, but:
1. Page titles don't specify `level={1}` (they default to level 2)
2. Section headings inside pages use custom font sizes instead of the `level` prop
3. Section headings need `id` attributes so the sidebar can link to them with anchor links
4. The pages should use semantic HTML throughout — this is critically important

## Requirements

### 1. Fix heading hierarchy on every page

Each page should follow this heading hierarchy:
- **Page title** (e.g., "Buttons & Actions"): Use `level={1}` to render as `<h1>`
- **Section title** (e.g., "Button", "ButtonGroup"): Use `level={2}` to render as `<h2>`

Currently, page titles use `<Heading fontFamily="$heading" fontSize="$8" fontWeight="$5">` with no `level` (defaults to 2). Change to `level={1}`.

Currently, section titles use `<Heading fontFamily="$heading" fontSize="$6" fontWeight="$4">` with no `level`. Change to `level={2}` (or `level={3}` — use your judgment for what makes most semantic sense given that there's one `<h1>` per page and multiple sections).

### 2. Add `id` attributes to section headings

Each `<Section>` component must add an `id` to its heading so the sidebar nav can link to it with `#anchor` links. The `id` should be a URL-friendly slug of the title:
- "Button" -> `id="button"`
- "ButtonGroup" -> `id="buttongroup"`
- "Stack / VStack / HStack" -> `id="stack-vstack-hstack"`
- "Drawers & Panels" -> `id="drawers-panels"`
- "useControllableState" -> `id="usecontrollablestate"`

Use a simple slugify approach: lowercase, replace spaces and special chars with hyphens, remove consecutive hyphens.

### 3. Deduplicate the Section and DemoCard helpers

Currently, `Section` and `DemoCard` are duplicated in EVERY page file (ButtonsPage, PrimitivesPage, FormsPage, DataDisplayPage, OverlaysPage, MenusPage, ComposedPage, HooksPage). Extract them into a shared module:
- Create `examples/kitchen-sink/src/components/Section.tsx` — exports `Section` and `DemoCard`
- Update all page files to import from this shared module instead of defining locally

### 4. Semantic HTML audit

Review each page for non-semantic HTML patterns and fix them. Specifically:
- Use `Heading` with correct `level` props (not custom fontSize overrides)
- Ensure the `Heading` component from `@vlting/ui` is used (not from `tamagui` directly) where possible, since the UI lib's Heading will render semantic `<hN>` elements after segment 003 lands
- If any page uses `<span>`, `<div>`, or Tamagui `Text` where a semantic HTML element would be more appropriate (e.g., `<p>` for body text, `<h1>`-`<h6>` for headings), fix it

## Scope

- `examples/kitchen-sink/src/components/Section.tsx` — NEW shared Section/DemoCard module
- `examples/kitchen-sink/src/pages/ButtonsPage.tsx`
- `examples/kitchen-sink/src/pages/PrimitivesPage.tsx`
- `examples/kitchen-sink/src/pages/FormsPage.tsx`
- `examples/kitchen-sink/src/pages/DataDisplayPage.tsx`
- `examples/kitchen-sink/src/pages/OverlaysPage.tsx`
- `examples/kitchen-sink/src/pages/MenusPage.tsx`
- `examples/kitchen-sink/src/pages/ComposedPage.tsx`
- `examples/kitchen-sink/src/pages/HooksPage.tsx`
