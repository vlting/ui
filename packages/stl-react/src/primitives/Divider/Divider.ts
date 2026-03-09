import { styled } from "../../config"

export const Divider = styled(
  "hr",
  {
    border: "none",
    margin: "$0",
    height: "1px",
    width: "100%",
    backgroundColor: "$borderColor",
  },
  {
    orientation: {
      horizontal: { height: "1px", width: "100%", marginTop: "$2", marginBottom: "$2" },
      vertical: { width: "1px", height: "100%", marginLeft: "$2", marginRight: "$2" },
    },
  },
  "Divider"
)
