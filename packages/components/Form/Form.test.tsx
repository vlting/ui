import { render, screen } from '../../../src/__test-utils__/render'
import { Form } from './Form'

describe('Form', () => {
  it('renders form element', () => {
    render(
      <Form.Root onSubmit={() => {}}>
        <Form.Field>
          <Form.Label>Name</Form.Label>
        </Form.Field>
      </Form.Root>,
    )
    expect(screen.getByText('Name')).toBeTruthy()
  })

  it('renders description text', () => {
    render(
      <Form.Root onSubmit={() => {}}>
        <Form.Field>
          <Form.Label>Email</Form.Label>
          <Form.Description>Enter your email</Form.Description>
        </Form.Field>
      </Form.Root>,
    )
    expect(screen.getByText('Enter your email')).toBeTruthy()
  })

  it('renders error message', () => {
    render(
      <Form.Root onSubmit={() => {}}>
        <Form.Field error>
          <Form.Label>Name</Form.Label>
          <Form.ErrorMessage>Required</Form.ErrorMessage>
        </Form.Field>
      </Form.Root>,
    )
    expect(screen.getByText('Required')).toBeTruthy()
  })

  it.skip('error message has role="alert"', () => {
    // TODO: Tamagui role rendering in JSDOM
    render(
      <Form.Root onSubmit={() => {}}>
        <Form.Field error>
          <Form.ErrorMessage>Error</Form.ErrorMessage>
        </Form.Field>
      </Form.Root>,
    )
    expect(screen.getByRole('alert')).toBeTruthy()
  })
})
