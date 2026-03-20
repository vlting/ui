import { render, screen, fireEvent } from '../../../src/__test-utils__/render'
import { Form } from './Form'
import { Field } from '../Field/Field'

describe('Form', () => {
  it('renders as a form element', () => {
    const { container } = render(
      <Form.Root>
        <span>content</span>
      </Form.Root>,
    )
    expect(container.querySelector('form')).toBeTruthy()
  })

  it('calls onSubmit with preventDefault', () => {
    const handleSubmit = jest.fn()
    const { container } = render(
      <Form.Root onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form.Root>,
    )
    const form = container.querySelector('form')!
    fireEvent.submit(form)
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    // preventDefault was called (event default prevented)
    const event = handleSubmit.mock.calls[0]![0]
    expect(event.defaultPrevented).toBe(true)
  })

  it('renders children inside form', () => {
    render(
      <Form.Root>
        <span>Child content</span>
      </Form.Root>,
    )
    expect(screen.getByText('Child content')).toBeTruthy()
  })

  it('forwards noValidate attribute', () => {
    const { container } = render(
      <Form.Root noValidate>
        <span>content</span>
      </Form.Root>,
    )
    const form = container.querySelector('form')!
    expect(form.noValidate).toBe(true)
  })

  it('composes with Field.Root children', () => {
    const { container } = render(
      <Form.Root>
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Field.Control>
            <input />
          </Field.Control>
        </Field.Root>
      </Form.Root>,
    )
    const form = container.querySelector('form')!
    const label = form.querySelector('label')!
    const input = form.querySelector('input')!
    expect(label.htmlFor).toBe(input.id)
  })
})
