import { styled } from "../../config"

export const Heading = styled(
  "h1",
  {
    color: "$defaultHeading",
    typo: "$heading",
  },
  {
    flat: {
      true: {
        mb: "$0",
      },
    },
  },
  "Heading"
)
