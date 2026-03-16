import { render, screen } from '../../../src/__test-utils__/render'
import { Alert } from './Alert'

describe('Alert', () => {
  it('renders title and description', () => {
    render(
      <Alert.Root>
        <Alert.Title>Warning</Alert.Title>
        <Alert.Description>Something happened</Alert.Description>
      </Alert.Root>,
    )
    expect(screen.getByText('Warning')).toBeTruthy()
    expect(screen.getByText('Something happened')).toBeTruthy()
  })

  it('renders icon', () => {
    render(
      <Alert.Root>
        <Alert.Icon data-testid="icon">!</Alert.Icon>
        <Alert.Title>Info</Alert.Title>
      </Alert.Root>,
    )
    expect(screen.getByTestId('icon')).toBeTruthy()
  })

  it('has role="status" for default (primary) theme', () => {
    render(
      <Alert.Root data-testid="alert">
        <Alert.Title>Info</Alert.Title>
      </Alert.Root>,
    )
    expect(screen.getByTestId('alert').getAttribute('role')).toBe('status')
  })

  it('has role="alert" for error theme', () => {
    render(
      <Alert.Root theme="error" data-testid="alert">
        <Alert.Title>Error</Alert.Title>
      </Alert.Root>,
    )
    expect(screen.getByTestId('alert').getAttribute('role')).toBe('alert')
  })

  it('has role="status" for non-error themes', () => {
    const themes = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'info'] as const
    themes.forEach((theme) => {
      const { unmount } = render(
        <Alert.Root theme={theme} data-testid="alert">
          <Alert.Title>Test</Alert.Title>
        </Alert.Root>,
      )
      expect(screen.getByTestId('alert').getAttribute('role')).toBe('status')
      unmount()
    })
  })

  it('renders with error theme', () => {
    render(
      <Alert.Root theme="error">
        <Alert.Title>Error</Alert.Title>
      </Alert.Root>,
    )
    expect(screen.getByText('Error')).toBeTruthy()
  })

  it('renders with each theme without error', () => {
    const themes = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'] as const
    themes.forEach((theme) => {
      const { unmount } = render(
        <Alert.Root theme={theme}>
          <Alert.Title>{theme}</Alert.Title>
        </Alert.Root>,
      )
      expect(screen.getByText(theme)).toBeTruthy()
      unmount()
    })
  })
})
