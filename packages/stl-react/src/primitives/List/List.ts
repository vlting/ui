import { styled } from "../../config"

const LIST_STYLES = {
  mt: "$0",
  mb: "$20",
} as const
export const getListStyles = () => LIST_STYLES
export const getListVariants = () =>
  ({
    column: {
      true: {
        display: "flex",
        flexDirection: "column",
        gap: "$8",
      },
    },
    row: {
      true: {
        display: "flex",
        gap: "$8",
      },
    },
  } as const)
export const List = styled("ul", getListStyles(), getListVariants(), "List")
