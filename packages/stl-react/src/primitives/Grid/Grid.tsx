import { forwardRef } from "react"
import { styled } from "../../config"
import { Box } from "../Box/Box"

const GridBase = styled(Box, { display: "grid" }, "Grid")

export const Grid = forwardRef<HTMLElement, any>(({ columns, gap, css, ...props }, ref) => {
  const gridCss = {
    ...css,
    ...(columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : {}),
    ...(gap !== undefined ? { gap: typeof gap === "number" ? `${gap}px` : gap } : {}),
  }
  return <GridBase {...props} ref={ref} css={gridCss} />
})
Grid.displayName = "Grid"
