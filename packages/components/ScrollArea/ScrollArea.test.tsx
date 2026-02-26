import { render, screen } from '../../../src/__test-utils__/render'
import { ScrollArea } from './ScrollArea'

describe('ScrollArea', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <ScrollArea.Root>
          <ScrollArea.Viewport>
            <div>Scrollable content</div>
          </ScrollArea.Viewport>
        </ScrollArea.Root>,
      ),
    ).not.toThrow()
  })

  it('renders children content', () => {
    render(
      <ScrollArea.Root>
        <ScrollArea.Viewport>
          <p>Visible content</p>
        </ScrollArea.Viewport>
      </ScrollArea.Root>,
    )
    expect(screen.getByText('Visible content')).toBeTruthy()
  })

  it('renders with horizontal orientation', () => {
    expect(() =>
      render(
        <ScrollArea.Root orientation="horizontal">
          <ScrollArea.Viewport orientation="horizontal">
            <div>Wide content</div>
          </ScrollArea.Viewport>
        </ScrollArea.Root>,
      ),
    ).not.toThrow()
  })

  it('renders with type prop', () => {
    const types = ['auto', 'always', 'scroll', 'hover'] as const
    for (const type of types) {
      const { unmount } = render(
        <ScrollArea.Root type={type}>
          <ScrollArea.Viewport>
            <div>Content</div>
          </ScrollArea.Viewport>
        </ScrollArea.Root>,
      )
      unmount()
    }
  })

  it('renders stub sub-components without crashing', () => {
    expect(() =>
      render(
        <ScrollArea.Root>
          <ScrollArea.Viewport>
            <div>Content</div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar />
          <ScrollArea.Thumb />
          <ScrollArea.Corner />
        </ScrollArea.Root>,
      ),
    ).not.toThrow()
  })
})
