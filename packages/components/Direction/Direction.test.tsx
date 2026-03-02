import { render, screen } from '../../../src/__test-utils__/render'
import { Direction, DirectionProvider, useDirection } from './Direction'

function DirectionReader() {
  const dir = useDirection()
  return <span data-testid="dir">{dir}</span>
}

describe('Direction', () => {
  it('provides ltr direction by default', () => {
    render(
      <DirectionProvider>
        <DirectionReader />
      </DirectionProvider>,
    )
    expect(screen.getByTestId('dir').textContent).toBe('ltr')
  })

  it('provides rtl direction when dir="rtl"', () => {
    render(
      <DirectionProvider dir="rtl">
        <DirectionReader />
      </DirectionProvider>,
    )
    expect(screen.getByTestId('dir').textContent).toBe('rtl')
  })

  it('useDirection returns ltr fallback outside provider', () => {
    render(<DirectionReader />)
    expect(screen.getByTestId('dir').textContent).toBe('ltr')
  })

  it('exports Direction.Provider compound', () => {
    render(
      <Direction.Provider dir="rtl">
        <DirectionReader />
      </Direction.Provider>,
    )
    expect(screen.getByTestId('dir').textContent).toBe('rtl')
  })
})
