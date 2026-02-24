<!-- auto-queue -->
# Fix Example App Layout: Sidebar Height, Background, Nav Styling, and Anchor Scrolling

## Problems

Three issues on the kitchen-sink example app (visible at e.g. `http://localhost:5173/fun/components/buttons`):

### 1. Sidebar and background don't extend past viewport height
- In dark mode, the background color only covers ~1 viewport height. Below the fold, it's white.
- The sidebar disappears when you scroll down — it should remain visible (sticky) through the full page scroll.
- **Root cause likely**: The parent container of the sidebar + content area doesn't have `min-height: 100%` or the body/html doesn't propagate height correctly. The sidebar itself has `height: calc(100vh - 56px)` which is correct for sticky behavior, but the background container wrapping everything may not stretch to content height.

### 2. Side nav typography is broken
- Some text is huge, some is tiny — inconsistent after the recent "collapsing pages" refactor.
- **Expected**: Consistent, readable nav items. Group headings slightly smaller/muted as labels. Page links at a normal readable size. Sub-items slightly smaller than page links.
- Look at the commit `825968597a` ("feat(examples): restructure sidebar nav with sub-headings and semantic HTML") to see what changed and what the typography looked like before.

### 3. Sub-item anchor links should scroll to page sections
- The sub-titles in the sidebar should scroll to the corresponding sections on the page when clicked.
- These should be `<a href="#section-id">` links that smooth-scroll to the matching `id` on the page.
- The `Section` component in `examples/kitchen-sink/src/components/Section.tsx` likely already generates section IDs.

## Files to Investigate and Fix

1. **`examples/kitchen-sink/src/layouts/BrandLayout.tsx`** — Main layout with sidebar. Fix:
   - Background container must stretch to full content height (not just viewport)
   - Sidebar sticky behavior must work through full scroll
   - Nav item typography: consistent sizing for headings, links, and sub-items

2. **Page files** (`examples/kitchen-sink/src/pages/*.tsx`) — Check that sections have proper `id` attributes for anchor linking.

3. **`examples/kitchen-sink/src/components/Section.tsx`** — Check how section IDs are generated.

4. **Root HTML/CSS** — Check if `html`, `body`, or `#root` have height constraints that prevent background from stretching.

## Fix Approach

### Background/Height Fix
- Ensure the outermost layout container uses `min-height: 100vh` (not `height: 100vh`)
- The content area (where `<Outlet />` renders) should grow naturally with content
- The body/background wrapper must not clip at viewport height
- Check for any `overflow: hidden` that truncates content

### Sidebar Sticky Fix
- Sidebar should have `position: sticky`, `top: 56px` (header height), `height: calc(100vh - 56px)`, `overflow-y: auto`
- The sidebar's PARENT must NOT have `overflow: hidden` (breaks sticky positioning)
- The sidebar's parent must be a flex or grid container that stretches to full content height

### Typography Fix
- Compare current nav styling with the commit before `825968597a` (use `git diff` or `git show`)
- Group headings (`<h2>` or equivalent): should be small, uppercase, muted — like a section label
- Page links: normal size, readable, clearly clickable
- Sub-items: slightly smaller than page links, indented, styled as secondary links
- All text should use consistent font sizing — likely the refactor introduced semantic HTML elements (`<h2>`, `<ul>`, `<li>`) that carry browser default styles not overridden by the component styling

### Anchor Scroll Fix
- Sub-items should render as `<a href="#section-id">` where `section-id` matches the `id` prop on the corresponding `Section` component
- Add `scroll-behavior: smooth` to the scrolling container or use `scrollIntoView({ behavior: 'smooth' })`
- Highlight the active sub-item based on `currentHash` from `useLocation().hash`

## Verification

After fixing, use Playwright MCP to:
1. Navigate to `http://localhost:5173/fun/components/buttons`
2. Take a full-page screenshot — background should extend to full content height
3. Scroll down — sidebar should remain visible (sticky)
4. Check sidebar typography — consistent, readable sizing
5. Click a sub-item — page should smooth-scroll to that section
6. Check in both light and dark mode

## Scope
- **Modifies**: `examples/kitchen-sink/src/layouts/BrandLayout.tsx` (primary)
- **May modify**: `examples/kitchen-sink/src/components/Section.tsx`, `examples/kitchen-sink/src/index.css` or equivalent global styles, page files if section IDs are missing
- **Does NOT modify**: any library source code in `packages/` or `src/`
