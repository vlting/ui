import { styled } from '../stl-react/src/config'

export const Box = styled(
  "div",
  {},
  {
    centered: {
      true: { display: "flex", alignItems: "center", justifyContent: "center" },
    },
  },
  "Box"
)
