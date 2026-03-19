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
