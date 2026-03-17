import { render, screen } from '../../../src/__test-utils__/render'
import { Card } from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card data-testid="card">
        <div>Content</div>
      </Card>,
    )
    expect(screen.getByTestId('card')).toBeTruthy()
  })

  it('renders Card.Header', () => {
    render(
      <Card>
        <Card.Header data-testid="header">Header</Card.Header>
      </Card>,
    )
    expect(screen.getByTestId('header')).toBeTruthy()
  })

  it('renders Card.Content', () => {
    render(
      <Card>
        <Card.Content data-testid="content">Body</Card.Content>
      </Card>,
    )
    expect(screen.getByTestId('content')).toBeTruthy()
  })

  it('renders Card.Footer', () => {
    render(
      <Card>
        <Card.Footer data-testid="footer">Footer</Card.Footer>
      </Card>,
    )
    expect(screen.getByTestId('footer')).toBeTruthy()
  })

  it('renders Card.Title', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Title</Card.Title>
        </Card.Header>
      </Card>,
    )
    expect(screen.getByText('Title')).toBeTruthy()
  })

  it('renders Card.Description', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Description>Desc</Card.Description>
        </Card.Header>
      </Card>,
    )
    expect(screen.getByText('Desc')).toBeTruthy()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(
        <Card size={size} data-testid="card">
          Card
        </Card>,
      )
      expect(screen.getByTestId('card')).toBeTruthy()
      unmount()
    }
  })

  it('renders each elevation variant', () => {
    const elevations = ['flat', 'normal', 'raised'] as const
    for (const elevation of elevations) {
      const { unmount } = render(
        <Card elevation={elevation} data-testid="card">
          Card
        </Card>,
      )
      expect(screen.getByTestId('card')).toBeTruthy()
      unmount()
    }
  })

  it('renders with interactive variant', () => {
    render(
      <Card interactive data-testid="card">
        Click
      </Card>,
    )
    expect(screen.getByTestId('card')).toBeTruthy()
  })

  it('renders each theme variant', () => {
    const themes = ['primary', 'secondary', 'neutral'] as const
    for (const theme of themes) {
      const { unmount } = render(
        <Card theme={theme} data-testid="card">
          Card
        </Card>,
      )
      expect(screen.getByTestId('card')).toBeTruthy()
      unmount()
    }
  })

  it('renders interactive with each theme', () => {
    const themes = ['primary', 'secondary', 'neutral'] as const
    for (const theme of themes) {
      const { unmount } = render(
        <Card interactive theme={theme} data-testid="card">
          Interactive
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card).toBeTruthy()
      expect(card.getAttribute('role')).toBe('button')
      expect(card.getAttribute('tabindex')).toBe('0')
      unmount()
    }
  })
})
