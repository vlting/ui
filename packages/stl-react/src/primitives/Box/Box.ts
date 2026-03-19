import { styled } from '../../config'

const BOX_STYLES = {} as const
const BOX_VARIANTS = {
  centered: {
    true: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  },
} as const

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
