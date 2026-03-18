<!-- auto-queue -->
<!-- target-branch: feat/library-buildout/layout-typography -->
# Task: Layout Semantic Alternates

## Goal
Add semantic HTML alternates to layout primitives (Row, Column, Box) via Object.assign. Each alternate is its own `styled()` call with the same base styles but a different HTML element.

## Files
- `packages/stl-react/src/primitives/Row/Row.ts`
- `packages/stl-react/src/primitives/Column/Column.ts`
- `packages/stl-react/src/primitives/Box/Box.ts`

## Implementation Pattern

For each layout primitive, create alternates using the same base styles but different HTML elements:

### Row (base: `<section>`, display: flex, flexDirection: row)
```tsx
import { styled } from '../../config'

const ROW_STYLES = { display: 'flex', flexDirection: 'row' } as const
export const getRowStyles = () => ROW_STYLES

const RowBase = styled('section', getRowStyles(), { name: 'Row' })

export const Row = Object.assign(RowBase, {
  Div: styled('div', getRowStyles(), { name: 'Row.Div' }),
  Nav: styled('nav', getRowStyles(), { name: 'Row.Nav' }),
  Header: styled('header', getRowStyles(), { name: 'Row.Header' }),
  Footer: styled('footer', getRowStyles(), { name: 'Row.Footer' }),
  Main: styled('main', getRowStyles(), { name: 'Row.Main' }),
  Aside: styled('aside', getRowStyles(), { name: 'Row.Aside' }),
  Article: styled('article', getRowStyles(), { name: 'Row.Article' }),
  Span: styled('span', getRowStyles(), { name: 'Row.Span' }),
})
```

### Column (base: `<section>`, display: flex, flexDirection: column)
Same pattern as Row but with column styles.

### Box (base: `<div>`, variants: centered)
```tsx
const BOX_STYLES = {} as const
const BOX_VARIANTS = {
  centered: {
    true: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  },
}

const BoxBase = styled('div', BOX_STYLES, { name: 'Box', variants: BOX_VARIANTS })

export const Box = Object.assign(BoxBase, {
  Section: styled('section', BOX_STYLES, { name: 'Box.Section', variants: BOX_VARIANTS }),
  Nav: styled('nav', BOX_STYLES, { name: 'Box.Nav', variants: BOX_VARIANTS }),
  Header: styled('header', BOX_STYLES, { name: 'Box.Header', variants: BOX_VARIANTS }),
  Footer: styled('footer', BOX_STYLES, { name: 'Box.Footer', variants: BOX_VARIANTS }),
  Main: styled('main', BOX_STYLES, { name: 'Box.Main', variants: BOX_VARIANTS }),
  Aside: styled('aside', BOX_STYLES, { name: 'Box.Aside', variants: BOX_VARIANTS }),
  Article: styled('article', BOX_STYLES, { name: 'Box.Article', variants: BOX_VARIANTS }),
  Span: styled('span', BOX_STYLES, { name: 'Box.Span', variants: BOX_VARIANTS }),
})
```

## Key Rules
- Preserve existing base styles and variants exactly
- Preserve any existing `getRowStyles()` / `getColumnStyles()` exports
- Each alternate has its own `styled()` call — no Proxy, no defaultProps
- Name pattern: `Parent.Element` (e.g., `Row.Nav`, `Box.Section`)
- Don't add alternates that match the base element (Row is already `<section>`, so no `Row.Section`)
- Box already has `centered` variant — alternates must include same variants

## Stack/VStack/HStack
Stack, VStack, HStack are aliases for Column/Row. Check `packages/stl-react/src/primitives/Stack/Stack.ts` — if they re-export Column/Row directly, the alternates will propagate automatically. If they're independent, they may need their own alternates. Investigate and handle accordingly.

## Acceptance Criteria
- `<Row.Nav>` renders `<nav>` with flex row
- `<Column.Article>` renders `<article>` with flex column
- `<Box.Section>` renders `<section>` with centered variant working
- Closing tags show semantic element: `<Row.Nav>...</Row.Nav>`
- Existing `<Row>`, `<Column>`, `<Box>` behavior unchanged
- TypeScript compiles
