import { styled } from '../../config'

const COLUMN_STYLES = { display: 'flex', flexDirection: 'column' } as const
export const getColumnStyles = () => COLUMN_STYLES

const ColumnBase = styled('section', getColumnStyles(), { name: 'Column' })

export const Column = Object.assign(ColumnBase, {
  Div: styled('div', getColumnStyles(), { name: 'Column.Div' }),
  Nav: styled('nav', getColumnStyles(), { name: 'Column.Nav' }),
  Header: styled('header', getColumnStyles(), { name: 'Column.Header' }),
  Footer: styled('footer', getColumnStyles(), { name: 'Column.Footer' }),
  Main: styled('main', getColumnStyles(), { name: 'Column.Main' }),
  Aside: styled('aside', getColumnStyles(), { name: 'Column.Aside' }),
  Article: styled('article', getColumnStyles(), { name: 'Column.Article' }),
  Span: styled('span', getColumnStyles(), { name: 'Column.Span' }),
})
