import { forwardRef } from 'react'
import { styled } from '../../config'
import { Box } from '../Box/Box'

const GridBase = styled(Box, { stl: { display: 'grid' }, styleName: 'Grid' })

export const Grid = forwardRef<HTMLElement, any>(
  ({ columns, gap, stl, ...props }, ref) => {
    const gridStl = {
      ...stl,
      ...(columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : {}),
      ...(gap !== undefined ? { gap: typeof gap === 'number' ? `${gap}px` : gap } : {}),
    }
    return <GridBase {...props} ref={ref} stl={gridStl} />
  },
)
Grid.displayName = 'Grid'
