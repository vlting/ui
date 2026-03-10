import type React from 'react'
import type { ComponentProps } from 'react'
import { styled } from '../../stl-react/src/config'

const CardFrame = styled(
  "article",
  {
    display: "flex",
    flexDirection: "column",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "$borderColor",
    borderRadius: "$4",
    overflow: "hidden",
    backgroundColor: "$surface1",
  },
  {
    size: {
      sm: { padding: "$2" },
      md: { padding: "0px" },
      lg: { padding: "0px" },
    },
    elevated: {
      true: { borderWidth: "0px", boxShadow: "var(--stl-shadow-sm, 0 1px 3px rgba(0,0,0,0.08))" },
    },
    interactive: {
      true: { cursor: "pointer" },
    },
  },
  "Card"
)

const CardHeader = styled(
  "header",
  {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "$4",
    paddingRight: "$4",
    paddingTop: "$4",
    paddingBottom: "$2",
    gap: "$1",
    flexShrink: 0,
  },
  "CardHeader"
)

const CardContent = styled(
  "div",
  {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "$4",
    paddingRight: "$4",
    paddingTop: "$2",
    paddingBottom: "$2",
    flex: 1,
    overflow: "hidden",
  },
  "CardContent"
)

const CardFooter = styled(
  "div",
  {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "$4",
    paddingRight: "$4",
    paddingTop: "$2",
    paddingBottom: "$4",
    flexShrink: 0,
  },
  "CardFooter"
)

const CardTitleText = styled(
  "span",
  { fontFamily: "$heading", fontWeight: "$600" },
  {
    size: {
      sm: { fontSize: "$16" },
      md: { fontSize: "$18" },
      lg: { fontSize: "$21" },
    },
  },
  "CardTitle"
)

function CardTitle({
  children,
  size = 'md',
}: { children?: React.ReactNode; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <h3 style={{ margin: 0 }}>
      <CardTitleText size={size}>{children}</CardTitleText>
    </h3>
  )
}

const CardDescription = styled(
  "p",
  { fontFamily: "$body", color: "$secondaryText12", margin: "0px" },
  {
    size: {
      sm: { fontSize: "$12" },
      md: { fontSize: "$14" },
      lg: { fontSize: "$16" },
    },
  },
  "CardDescription"
)

export interface CardProps extends ComponentProps<typeof CardFrame> {
  size?: 'sm' | 'md' | 'lg'
  elevated?: boolean
  interactive?: boolean
}

function CardRoot({ size = 'md', ...props }: CardProps) {
  return <CardFrame size={size} {...props} />
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
})
