import { styled, Text, View } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const StyledTable = styled(View, {
  tag: 'table',
  width: '100%',
  borderCollapse: 'collapse',
})

// @ts-expect-error Tamagui v2 RC
const StyledHeader = styled(View, {
  tag: 'thead',
})

// @ts-expect-error Tamagui v2 RC
const StyledBody = styled(View, {
  tag: 'tbody',
})

// @ts-expect-error Tamagui v2 RC
const StyledFooter = styled(View, {
  tag: 'tfoot',
})

// @ts-expect-error Tamagui v2 RC
const StyledRow = styled(View, {
  tag: 'tr',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
})

// @ts-expect-error Tamagui v2 RC
const StyledHead = styled(Text, {
  tag: 'th',
  fontFamily: '$body',
  fontWeight: '$4',
  fontSize: '$3',
  color: '$colorSubtitle',
  paddingVertical: '$2',
  paddingHorizontal: '$3',
  textAlign: 'left',
})

// @ts-expect-error Tamagui v2 RC
const StyledCell = styled(Text, {
  tag: 'td',
  fontFamily: '$body',
  fontSize: '$3',
  color: '$color',
  paddingVertical: '$2',
  paddingHorizontal: '$3',
})

// @ts-expect-error Tamagui v2 RC
const StyledCaption = styled(Text, {
  tag: 'caption',
  fontFamily: '$body',
  fontSize: '$2',
  color: '$colorSubtitle',
  paddingVertical: '$2',
  textAlign: 'left',
})

export const Table = {
  Root: StyledTable,
  Header: StyledHeader,
  Body: StyledBody,
  Footer: StyledFooter,
  Row: StyledRow,
  Head: StyledHead,
  Cell: StyledCell,
  Caption: StyledCaption,
}
