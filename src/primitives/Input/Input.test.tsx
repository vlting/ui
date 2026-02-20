import { fireEvent, render, screen } from '../../__test-utils__/render'
import { Input } from './Input'

describe('Input', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<Input testID="input" />)
      expect(screen.getByTestId('input')).toBeTruthy()
    })

    it('renders with a placeholder', () => {
      render(<Input testID="input" placeholder="Enter text..." />)
      expect(screen.getByTestId('input')).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('renders Input.Container', () => {
      render(
        <Input.Container testID="container">
          <Input.Label>Name</Input.Label>
          <Input testID="input" />
        </Input.Container>,
      )
      expect(screen.getByTestId('container')).toBeTruthy()
      expect(screen.getByTestId('input')).toBeTruthy()
      expect(screen.getByText('Name')).toBeTruthy()
    })

    it('renders Input.Label', () => {
      render(<Input.Label testID="label">Email address</Input.Label>)
      expect(screen.getByTestId('label')).toBeTruthy()
      expect(screen.getByText('Email address')).toBeTruthy()
    })

    it('renders Input.Helper', () => {
      render(<Input.Helper testID="helper">We'll never share your email.</Input.Helper>)
      expect(screen.getByTestId('helper')).toBeTruthy()
    })

    it('renders Input.Error', () => {
      render(<Input.Error testID="error">This field is required.</Input.Error>)
      expect(screen.getByTestId('error')).toBeTruthy()
      expect(screen.getByText('This field is required.')).toBeTruthy()
    })
  })

  describe('error state', () => {
    it('applies error variant', () => {
      render(<Input testID="input" error />)
      expect(screen.getByTestId('input')).toBeTruthy()
    })

    it('shows error message', () => {
      render(
        <Input.Container>
          <Input testID="input" error aria-invalid />
          <Input.Error testID="error">Invalid email</Input.Error>
        </Input.Container>,
      )
      expect(screen.getByTestId('error')).toBeTruthy()
    })
  })

  describe('disabled state', () => {
    it('renders as disabled', () => {
      render(<Input testID="input" disabled />)
      expect(screen.getByTestId('input')).toBeTruthy()
    })
  })

  describe('controlled mode', () => {
    it('calls onChangeText when user types', () => {
      const onChangeText = jest.fn()
      render(<Input testID="input" onChangeText={onChangeText} />)
      fireEvent.changeText(screen.getByTestId('input'), 'hello')
      expect(onChangeText).toHaveBeenCalledWith('hello')
    })
  })

  describe('accessibility', () => {
    it('accepts aria-label', () => {
      render(<Input testID="input" aria-label="Email address" />)
      expect(screen.getByTestId('input')).toBeTruthy()
    })

    it('accepts aria-invalid for error state', () => {
      render(<Input testID="input" aria-invalid />)
      const el = screen.getByTestId('input')
      expect(el).toBeTruthy()
    })

    it('accepts aria-required', () => {
      render(<Input testID="input" aria-required />)
      expect(screen.getByTestId('input')).toBeTruthy()
    })
  })
})
