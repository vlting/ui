import { styled } from "../../config"

export const SubHeading = styled(
  "h2",
  {
    color: "$defaultHeading",
    typo: "$subHeading",
  },
  {
    flat: {
      true: {
        mb: "$0",
      },
    },
  },
  "SubHeading"
)
