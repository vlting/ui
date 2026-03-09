import { styled } from "../../config"

export const Spacer = styled(
  "div",
  { flex: 1 },
  {
    size: {
      xs: { flex: "0 0 auto", width: "2px", height: "2px" },
      sm: { flex: "0 0 auto", width: "4px", height: "4px" },
      md: { flex: "0 0 auto", width: "8px", height: "8px" },
      lg: { flex: "0 0 auto", width: "16px", height: "16px" },
      xl: { flex: "0 0 auto", width: "24px", height: "24px" },
    },
  },
  "Spacer"
)
