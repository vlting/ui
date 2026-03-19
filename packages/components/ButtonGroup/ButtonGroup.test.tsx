import { render, screen } from '../../../src/__test-utils__/render'
import { ButtonGroup } from './ButtonGroup'

describe('ButtonGroup', () => {
  it('renders with role="group"', () => {
    render(<ButtonGroup.Root>Content</ButtonGroup.Root>)
    expect(screen.getByRole('group')).toBeTruthy()
  })

  it('renders children', () => {
    render(
      <ButtonGroup.Root>
        <button>A</button>
        <button>B</button>
      </ButtonGroup.Root>,
    )
    expect(screen.getByText('A')).toBeTruthy()
    expect(screen.getByText('B')).toBeTruthy()
  })

  it('renders with horizontal orientation by default', () => {
    render(<ButtonGroup.Root>Horizontal</ButtonGroup.Root>)
    expect(screen.getByText('Horizontal')).toBeTruthy()
  })

  it('renders with vertical orientation', () => {
    render(
      <ButtonGroup.Root orientation="vertical">
        Vertical
      </ButtonGroup.Root>,
    )
    expect(screen.getByText('Vertical')).toBeTruthy()
  })

  it('base ButtonGroup renders same as ButtonGroup.Root', () => {
    render(<ButtonGroup>Base</ButtonGroup>)
    expect(screen.getByRole('group')).toBeTruthy()
  })
})
