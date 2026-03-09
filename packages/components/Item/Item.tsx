import type { ComponentProps } from 'react'
import { styled } from '../../stl-react/src/config'

const ItemRoot = styled(
  "div",
  {
    display: "flex",
    flexDirection: "row",
    paddingTop: "$2",
    paddingBottom: "$2",
    paddingLeft: "$3",
    paddingRight: "$3",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    minHeight: "44px",
  },
  {
    size: {
      sm: { paddingTop: "6px", paddingBottom: "6px", paddingLeft: "$2", paddingRight: "$2", gap: "$2", minHeight: "36px" },
      md: { paddingTop: "$2", paddingBottom: "$2", paddingLeft: "$3", paddingRight: "$3", gap: "10px", minHeight: "44px" },
      lg: { paddingTop: "$3", paddingBottom: "$3", paddingLeft: "$4", paddingRight: "$4", gap: "$3", minHeight: "52px" },
    },
    interactive: {
      true: { cursor: "pointer", borderRadius: "$3" },
    },
  },
  "Item"
)

const ItemLeading = styled(
  "div",
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  "ItemLeading"
)

const ItemContent = styled(
  "div",
  {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    gap: "$1",
  },
  "ItemContent"
)

const ItemTitle = styled(
  "span",
  {
    fontFamily: "$body",
    fontWeight: "$500",
  },
  {
    size: {
      sm: { fontSize: "$14" },
      md: { fontSize: "$16" },
      lg: { fontSize: "$18" },
    },
  },
  "ItemTitle"
)

const ItemDescription = styled(
  "span",
  {
    fontFamily: "$body",
    color: "$secondaryText12",
  },
  {
    size: {
      sm: { fontSize: "$12" },
      md: { fontSize: "$14" },
      lg: { fontSize: "$16" },
    },
  },
  "ItemDescription"
)

const ItemTrailing = styled(
  "div",
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  "ItemTrailing"
)

export const Item = Object.assign(ItemRoot, {
  Leading: ItemLeading,
  Content: ItemContent,
  Title: ItemTitle,
  Description: ItemDescription,
  Trailing: ItemTrailing,
})

export type ItemProps = ComponentProps<typeof ItemRoot>
export type ItemLeadingProps = ComponentProps<typeof ItemLeading>
export type ItemContentProps = ComponentProps<typeof ItemContent>
export type ItemTitleProps = ComponentProps<typeof ItemTitle>
export type ItemDescriptionProps = ComponentProps<typeof ItemDescription>
export type ItemTrailingProps = ComponentProps<typeof ItemTrailing>
