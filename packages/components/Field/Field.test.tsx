import { render, screen } from '../../../src/__test-utils__/render'
import { Field } from './Field'
import { Input } from '../Input/Input'

describe('Field', () => {
  it('renders label linked to control via htmlFor/id', () => {
    const { container } = render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Control>
          <input />
        </Field.Control>
      </Field.Root>,
    )
    const label = container.querySelector('label')
    const input = container.querySelector('input')
    expect(label).toBeTruthy()
    expect(input).toBeTruthy()
    expect(label!.htmlFor).toBe(input!.id)
  })

  it('shows Field.Error with role="alert" when error=true', () => {
    render(
      <Field.Root error>
        <Field.Label>Email</Field.Label>
        <Field.Control>
          <input />
        </Field.Control>
        <Field.Error>Invalid email</Field.Error>
      </Field.Root>,
    )
    const alert = screen.getByRole('alert')
    expect(alert).toBeTruthy()
    expect(alert.textContent).toBe('Invalid email')
  })

  it('hides Field.Error when error is not set', () => {
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Control>
          <input />
        </Field.Control>
        <Field.Error>Invalid email</Field.Error>
      </Field.Root>,
    )
    expect(screen.queryByText('Invalid email')).toBeNull()
  })

  it('sets aria-describedby to include description ID', () => {
    const { container } = render(
      <Field.Root>
        <Field.Label>Name</Field.Label>
        <Field.Control>
          <input />
        </Field.Control>
        <Field.Description>Enter your full name</Field.Description>
      </Field.Root>,
    )
    const input = container.querySelector('input')!
    const desc = screen.getByText('Enter your full name')
    expect(input.getAttribute('aria-describedby')).toContain(desc.id)
  })

  it('sets aria-describedby to include error ID when error=true', () => {
    const { container } = render(
      <Field.Root error>
        <Field.Label>Email</Field.Label>
        <Field.Control>
          <input />
        </Field.Control>
        <Field.Error>Bad email</Field.Error>
      </Field.Root>,
    )
    const input = container.querySelector('input')!
    const errorEl = screen.getByRole('alert')
    expect(input.getAttribute('aria-describedby')).toContain(errorEl.id)
  })

  it('sets aria-invalid on control when error=true', () => {
    const { container } = render(
      <Field.Root error>
        <Field.Label>Email</Field.Label>
        <Field.Control>
          <input />
        </Field.Control>
      </Field.Root>,
    )
    const input = container.querySelector('input')!
    expect(input.getAttribute('aria-invalid')).toBe('true')
  })

  it('propagates required to label and control', () => {
    const { container } = render(
      <Field.Root required>
        <Field.Label>Name</Field.Label>
        <Field.Control>
          <input />
        </Field.Control>
      </Field.Root>,
    )
    const input = container.querySelector('input')!
    expect(input.getAttribute('aria-required')).toBe('true')
    // Label should render the required asterisk
    expect(screen.getByText('*')).toBeTruthy()
  })

  it('propagates disabled to control', () => {
    const { container } = render(
      <Field.Root disabled>
        <Field.Label>Name</Field.Label>
        <Field.Control>
          <input />
        </Field.Control>
      </Field.Root>,
    )
    const input = container.querySelector('input')!
    expect(input.disabled).toBe(true)
  })

  it('throws when Field.Control has multiple children', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() =>
      render(
        <Field.Root>
          <Field.Control>
            <input />
            <input />
          </Field.Control>
        </Field.Root>,
      ),
    ).toThrow()
    consoleSpy.mockRestore()
  })

  it('works with textarea element', () => {
    const { container } = render(
      <Field.Root>
        <Field.Label>Bio</Field.Label>
        <Field.Control>
          <textarea />
        </Field.Control>
      </Field.Root>,
    )
    const label = container.querySelector('label')!
    const textarea = container.querySelector('textarea')!
    expect(label.htmlFor).toBe(textarea.id)
  })

  it('works with checkbox input', () => {
    const { container } = render(
      <Field.Root>
        <Field.Label>Agree</Field.Label>
        <Field.Control>
          <input type="checkbox" />
        </Field.Control>
      </Field.Root>,
    )
    const label = container.querySelector('label')!
    const checkbox = container.querySelector('input[type="checkbox"]')!
    expect(label.htmlFor).toBe(checkbox.id)
  })

  it('works with Input component', () => {
    const { container } = render(
      <Field.Root error>
        <Field.Label>Email</Field.Label>
        <Field.Control>
          <Input />
        </Field.Control>
        <Field.Description>Help text</Field.Description>
        <Field.Error>Error text</Field.Error>
      </Field.Root>,
    )
    const input = container.querySelector('input')!
    expect(input.id).toBeTruthy()
    expect(input.getAttribute('aria-describedby')).toBeTruthy()
  })
})
