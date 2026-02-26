import { render, screen } from '../../../src/__test-utils__/render'
import { Tooltip, TooltipProvider } from './Tooltip'

describe('Tooltip', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <TooltipProvider>
          <Tooltip content="Help text">
            <button type="button">Hover me</button>
          </Tooltip>
        </TooltipProvider>,
      ),
    ).not.toThrow()
  })

  it('renders trigger content', () => {
    render(
      <TooltipProvider>
        <Tooltip content="Tooltip text">
          <button type="button">Trigger</button>
        </Tooltip>
      </TooltipProvider>,
    )
    expect(screen.getByText('Trigger')).toBeTruthy()
  })

  it('renders with side prop', () => {
    const sides = ['top', 'right', 'bottom', 'left'] as const
    for (const side of sides) {
      const { unmount } = render(
        <TooltipProvider>
          <Tooltip content="Tip" side={side}>
            <button type="button">Btn</button>
          </Tooltip>
        </TooltipProvider>,
      )
      unmount()
    }
  })

  it('renders with custom delay', () => {
    expect(() =>
      render(
        <TooltipProvider delay={500}>
          <Tooltip content="Delayed" delay={300}>
            <button type="button">Wait</button>
          </Tooltip>
        </TooltipProvider>,
      ),
    ).not.toThrow()
  })

  it('renders with align prop', () => {
    const aligns = ['start', 'center', 'end'] as const
    for (const align of aligns) {
      const { unmount } = render(
        <TooltipProvider>
          <Tooltip content="Aligned" align={align}>
            <button type="button">Btn</button>
          </Tooltip>
        </TooltipProvider>,
      )
      unmount()
    }
  })
})
