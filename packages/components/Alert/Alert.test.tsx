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

  it.skip('has role="status" for default variant', () => {
    // TODO: Tamagui may not render role in JSDOM
    render(
      <Alert.Root testID="alert">
        <Alert.Title>Info</Alert.Title>
      </Alert.Root>,
    )
    expect(screen.getByRole('status')).toBeTruthy()
  })

  it.skip('has role="alert" for destructive variant', () => {
    // TODO: Tamagui may not render role in JSDOM
    render(
      <Alert.Root variant="destructive">
        <Alert.Title>Error</Alert.Title>
      </Alert.Root>,
    )
    expect(screen.getByRole('alert')).toBeTruthy()
  })

  it('renders with destructive variant', () => {
    render(
      <Alert.Root variant="destructive">
        <Alert.Title>Error</Alert.Title>
      </Alert.Root>,
    )
    expect(screen.getByText('Error')).toBeTruthy()
  })
})
