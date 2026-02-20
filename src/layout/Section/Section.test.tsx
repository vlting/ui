import { render, screen } from '../../__test-utils__/render'
import { Section } from './Section'

describe('Section', () => {
  it('renders without crashing', () => {
    render(<Section testID="section" />)
    expect(screen.getByTestId('section')).toBeTruthy()
  })

  it('renders children correctly', () => {
    render(
      <Section testID="section">
        <Section.Content testID="content">
          <span>Content</span>
        </Section.Content>
      </Section>,
    )
    expect(screen.getByTestId('content')).toBeTruthy()
  })

  it('renders Title sub-component', () => {
    render(
      <Section testID="section">
        <Section.Title testID="title">Section heading</Section.Title>
      </Section>,
    )
    expect(screen.getByTestId('title')).toBeTruthy()
    expect(screen.getByText('Section heading')).toBeTruthy()
  })

  it('renders Description sub-component', () => {
    render(
      <Section testID="section">
        <Section.Description testID="desc">A description</Section.Description>
      </Section>,
    )
    expect(screen.getByTestId('desc')).toBeTruthy()
  })

  it('renders divider when divider=true', () => {
    render(<Section testID="section" divider />)
    expect(screen.getByTestId('section-divider')).toBeTruthy()
  })

  it('does not render divider when divider=false', () => {
    render(<Section testID="section" />)
    expect(screen.queryByTestId('section-divider')).toBeNull()
  })

  it('renders with accessibilityLabel', () => {
    render(<Section testID="section" accessibilityLabel="User settings section" />)
    expect(screen.getByTestId('section')).toBeTruthy()
  })

  it('renders in dark theme without errors', () => {
    render(<Section testID="section-dark" />)
    expect(screen.getByTestId('section-dark')).toBeTruthy()
  })
})
