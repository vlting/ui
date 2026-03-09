import { styled } from "../../config"
import { getTextStyles } from "../Text/Text"

export const ListItem = styled(
  "li",
  {
    ...getTextStyles(),
    lineHeight: "$listItem",
  },
  "ListItem"
)
