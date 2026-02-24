import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Field } from './Field'

describe('Field', () => {
  it('renders label text', () => {
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Control>
          <input />
        </Field.Control>
      </Field.Root>
    )
    expect(screen.getByText('Email')).toBeTruthy()
  })

  it('renders description text', () => {
    render(
      <Field.Root>
        <Field.Label>Name</Field.Label>
        <Field.Control>
          <input />
        </Field.Control>
        <Field.Description>Enter your full name</Field.Description>
      </Field.Root>
    )
    expect(screen.getByText('Enter your full name')).toBeTruthy()
  })

  it('renders error message when error is true', () => {
    render(
      <Field.Root error>
        <Field.Label>Email</Field.Label>
        <Field.Control>
          <input />
        </Field.Control>
        <Field.Error>Invalid email</Field.Error>
      </Field.Root>
    )
    expect(screen.getByText('Invalid email')).toBeTruthy()
  })

  it('hides error message when error is false', () => {
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Control>
          <input />
        </Field.Control>
        <Field.Error>Invalid email</Field.Error>
      </Field.Root>
    )
    expect(screen.queryByText('Invalid email')).toBeNull()
  })

  it('hides description when error is shown', () => {
    render(
      <Field.Root error>
        <Field.Label>Email</Field.Label>
        <Field.Control>
          <input />
        </Field.Control>
        <Field.Description>Helper text</Field.Description>
        <Field.Error>Error text</Field.Error>
      </Field.Root>
    )
    expect(screen.queryByText('Helper text')).toBeNull()
    expect(screen.getByText('Error text')).toBeTruthy()
  })

  it('error message has role="alert"', () => {
    render(
      <Field.Root error>
        <Field.Label>Email</Field.Label>
        <Field.Control>
          <input />
        </Field.Control>
        <Field.Error>Required</Field.Error>
      </Field.Root>
    )
    expect(screen.getByRole('alert')).toBeTruthy()
  })

  it('links label to control via htmlFor/id', () => {
    const { container } = render(
      <Field.Root>
        <Field.Label>Username</Field.Label>
        <Field.Control>
          <input />
        </Field.Control>
      </Field.Root>
    )
    const label = container.querySelector('label')
    const input = container.querySelector('input')
    expect(label).toBeTruthy()
    expect(input).toBeTruthy()
    if (label && input) {
      expect(label.htmlFor).toBe(input.id)
    }
  })

  it('sets aria-invalid on control when error', () => {
    const { container } = render(
      <Field.Root error>
        <Field.Label>Email</Field.Label>
        <Field.Control>
          <input />
        </Field.Control>
        <Field.Error>Bad</Field.Error>
      </Field.Root>
    )
    const input = container.querySelector('input')
    expect(input?.getAttribute('aria-invalid')).toBe('true')
  })

  it('renders without crashing with all sub-components', () => {
    expect(() =>
      render(
        <Field.Root error disabled>
          <Field.Label>Full Field</Field.Label>
          <Field.Control>
            <input placeholder="test" />
          </Field.Control>
          <Field.Description>Help</Field.Description>
          <Field.Error>Error</Field.Error>
        </Field.Root>
      )
    ).not.toThrow()
  })
})
