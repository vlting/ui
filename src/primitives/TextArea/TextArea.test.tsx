import { fireEvent, render, screen } from '../../__test-utils__/render'
import { TextArea } from './TextArea'

describe('TextArea', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<TextArea testID="textarea" />)
      expect(screen.getByTestId('textarea')).toBeTruthy()
    })

    it('renders with a placeholder', () => {
      render(<TextArea testID="textarea" placeholder="Write your message..." />)
      expect(screen.getByTestId('textarea')).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('renders TextArea.Container', () => {
      render(
        <TextArea.Container testID="container">
          <TextArea.Label>Description</TextArea.Label>
          <TextArea testID="textarea" />
        </TextArea.Container>,
      )
      expect(screen.getByTestId('container')).toBeTruthy()
      expect(screen.getByTestId('textarea')).toBeTruthy()
      expect(screen.getByText('Description')).toBeTruthy()
    })

    it('renders TextArea.Label', () => {
      render(<TextArea.Label testID="label">Message</TextArea.Label>)
      expect(screen.getByTestId('label')).toBeTruthy()
      expect(screen.getByText('Message')).toBeTruthy()
    })

    it('renders TextArea.Helper', () => {
      render(<TextArea.Helper testID="helper">Max 500 characters.</TextArea.Helper>)
      expect(screen.getByTestId('helper')).toBeTruthy()
    })

    it('renders TextArea.Error', () => {
      render(<TextArea.Error testID="error">Description is required.</TextArea.Error>)
      expect(screen.getByTestId('error')).toBeTruthy()
    })
  })

  describe('error state', () => {
    it('applies error variant', () => {
      render(<TextArea testID="textarea" error />)
      expect(screen.getByTestId('textarea')).toBeTruthy()
    })
  })

  describe('disabled state', () => {
    it('renders as disabled', () => {
      render(<TextArea testID="textarea" disabled />)
      expect(screen.getByTestId('textarea')).toBeTruthy()
    })
  })

  describe('controlled mode', () => {
    it('calls onChangeText when user types', () => {
      const onChangeText = jest.fn()
      render(<TextArea testID="textarea" onChangeText={onChangeText} />)
      fireEvent.changeText(screen.getByTestId('textarea'), 'Hello world')
      expect(onChangeText).toHaveBeenCalledWith('Hello world')
    })
  })

  describe('rows / size', () => {
    it('accepts rows prop for height configuration', () => {
      render(<TextArea testID="textarea" rows={4} />)
      expect(screen.getByTestId('textarea')).toBeTruthy()
    })

    it('accepts sm size variant', () => {
      render(<TextArea testID="textarea" textAreaSize="sm" />)
      expect(screen.getByTestId('textarea')).toBeTruthy()
    })

    it('accepts lg size variant', () => {
      render(<TextArea testID="textarea" textAreaSize="lg" />)
      expect(screen.getByTestId('textarea')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('accepts aria-label', () => {
      render(<TextArea testID="textarea" aria-label="Description" />)
      expect(screen.getByTestId('textarea')).toBeTruthy()
    })

    it('accepts aria-invalid for error state', () => {
      render(<TextArea testID="textarea" aria-invalid />)
      expect(screen.getByTestId('textarea')).toBeTruthy()
    })

    it('accepts aria-required', () => {
      render(<TextArea testID="textarea" aria-required />)
      expect(screen.getByTestId('textarea')).toBeTruthy()
    })
  })
})
