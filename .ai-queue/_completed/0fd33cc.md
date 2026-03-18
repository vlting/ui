<!-- LAT: 2026-03-09T15:08:32Z -->
<!-- PID: 5792 -->
<!-- auto-queue -->
<!-- target-branch: feat/stl-components/simple-components -->
# Task: Migrate compound styled components (Item, Empty, Breadcrumb, Pagination, ButtonGroup)

These components use compound patterns with styled sub-components.

## Migration pattern
Import `styled` from `'../stl-react/src/config'`. Replace `styled(XStack/YStack/View/Text)` with `styled("div"/semantic-tag, css)`. Keep compound patterns.

## Files to modify

### `packages/components/Item/Item.tsx`
- Replace `styled(XStack)`, `styled(YStack)`, `styled(Text)` with stl equivalents
- Remove `withStaticProperties` — use simple `Item.Leading = ItemLeading` pattern
- Remove all @ts-expect-error comments (6)
- Use semantic tags: `"div"` for Root/Leading/Content/Trailing, `"span"` for Title/Description

### `packages/components/Empty/Empty.tsx`
- Replace `styledHtml('h3')`, `styled(View)`, `styled(Text)` with stl `styled()`
- Remove `as any` casts for styledHtml
- Keep compound pattern (Empty.Media, Empty.Title, etc.)

### `packages/components/Breadcrumb/Breadcrumb.tsx`
- Replace `styled(Text)` with stl equivalent
- Keep native `<nav>`, `<ol>`, `<li>`, `<a>` elements
- Remove @ts-expect-error comments (3)
- Keep the useEffect for CSS focus styles

### `packages/components/Pagination/Pagination.tsx`
- Replace `styled(XStack)`, `styled(Text)` with stl equivalents
- Remove @ts-expect-error comments (4)
- Keep computePageRange() calculation logic

### `packages/components/ButtonGroup/ButtonGroup.tsx`
- Replace `styled(View)` with stl `styled("div", css)`
- Keep dangerouslySetInnerHTML for CSS injection
- Remove any @ts-expect-error comments

## Acceptance criteria
- Zero Tamagui imports in all 5 files
- Zero @ts-expect-error comments
- All compound sub-component APIs preserved
