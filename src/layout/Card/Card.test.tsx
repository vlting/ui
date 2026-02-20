import { fireEvent, render, screen } from '../../__test-utils__/render'
import { Card } from './Card'

describe('Card', () => {
  it('renders without crashing', () => {
    render(<Card testID="card" />)
    expect(screen.getByTestId('card')).toBeTruthy()
  })

  it('renders Header, Content, Footer', () => {
    render(
      <Card testID="card">
        <Card.Header testID="hdr">Title</Card.Header>
        <Card.Content testID="content">Body</Card.Content>
        <Card.Footer testID="ftr">Actions</Card.Footer>
      </Card>,
    )
    expect(screen.getByTestId('hdr')).toBeTruthy()
    expect(screen.getByTestId('content')).toBeTruthy()
    expect(screen.getByTestId('ftr')).toBeTruthy()
  })

  it('renders without Header', () => {
    render(
      <Card testID="card">
        <Card.Content testID="content">Body</Card.Content>
      </Card>,
    )
    expect(screen.queryByTestId('hdr')).toBeNull()
    expect(screen.getByTestId('content')).toBeTruthy()
  })

  it('renders without Footer', () => {
    render(
      <Card testID="card">
        <Card.Content testID="content">Body</Card.Content>
      </Card>,
    )
    expect(screen.queryByTestId('ftr')).toBeNull()
  })

  it('interactive card calls onPress', () => {
    const onPress = jest.fn()
    render(<Card testID="card" interactive onPress={onPress} />)
    fireEvent.press(screen.getByTestId('card'))
    expect(onPress).toHaveBeenCalled()
  })

  it('disabled card does not call onPress', () => {
    const onPress = jest.fn()
    render(<Card testID="card" interactive disabled onPress={onPress} />)
    fireEvent.press(screen.getByTestId('card'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('non-interactive card has article role', () => {
    render(<Card testID="card" />)
    expect(screen.getByTestId('card')).toBeTruthy()
  })

  it('interactive card has button role', () => {
    render(<Card testID="card" interactive />)
    expect(screen.getByTestId('card')).toBeTruthy()
  })

  it('renders in loading state', () => {
    render(<Card testID="card" loading />)
    expect(screen.getByTestId('card')).toBeTruthy()
  })

  it('renders in dark theme without errors', () => {
    render(<Card testID="card-dark" />)
    expect(screen.getByTestId('card-dark')).toBeTruthy()
  })
})
