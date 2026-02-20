import { fireEvent, render, screen } from '../../__test-utils__/render'
import { MatchRequestButton } from './MatchRequestButton'

describe('MatchRequestButton', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<MatchRequestButton status="none" testID="btn" />)
      expect(screen.getByTestId('btn')).toBeTruthy()
    })

    it('renders "Send Match Request" for none status', () => {
      render(<MatchRequestButton status="none" testID="btn" />)
      expect(screen.getByText('Send Match Request')).toBeTruthy()
    })

    it('renders "Cancel Request" for sent status', () => {
      render(<MatchRequestButton status="sent" testID="btn" />)
      expect(screen.getByText('Cancel Request')).toBeTruthy()
    })

    it('renders "Match Back!" for received status', () => {
      render(<MatchRequestButton status="received" testID="btn" />)
      expect(screen.getByText('Match Back!')).toBeTruthy()
    })

    it('renders "Matched!" for mutual status', () => {
      render(<MatchRequestButton status="mutual" testID="btn" />)
      expect(screen.getByText('Matched!')).toBeTruthy()
    })
  })

  describe('interaction', () => {
    it('fires onPress when clicked in none status', () => {
      const onPress = jest.fn()
      render(<MatchRequestButton status="none" onPress={onPress} testID="btn" />)
      fireEvent.click(screen.getByTestId('btn'))
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('fires onPress when clicked in sent status', () => {
      const onPress = jest.fn()
      render(<MatchRequestButton status="sent" onPress={onPress} testID="btn" />)
      fireEvent.click(screen.getByTestId('btn'))
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('fires onPress when clicked in received status', () => {
      const onPress = jest.fn()
      render(<MatchRequestButton status="received" onPress={onPress} testID="btn" />)
      fireEvent.click(screen.getByTestId('btn'))
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('does not fire onPress when mutual status (auto-disabled)', () => {
      const onPress = jest.fn()
      render(<MatchRequestButton status="mutual" onPress={onPress} testID="btn" />)
      fireEvent.click(screen.getByTestId('btn'))
      expect(onPress).not.toHaveBeenCalled()
    })
  })

  describe('disabled state', () => {
    it('does not fire onPress when disabled', () => {
      const onPress = jest.fn()
      render(<MatchRequestButton status="none" onPress={onPress} disabled testID="btn" />)
      fireEvent.click(screen.getByTestId('btn'))
      expect(onPress).not.toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('has correct role for none status', () => {
      render(<MatchRequestButton status="none" testID="btn" />)
      expect(screen.getByRole('button')).toBeTruthy()
    })

    it('renders correct label text for each status', () => {
      const { rerender } = render(<MatchRequestButton status="none" />)
      expect(screen.getByText('Send Match Request')).toBeTruthy()

      rerender(<MatchRequestButton status="sent" />)
      expect(screen.getByText('Cancel Request')).toBeTruthy()

      rerender(<MatchRequestButton status="received" />)
      expect(screen.getByText('Match Back!')).toBeTruthy()

      rerender(<MatchRequestButton status="mutual" />)
      expect(screen.getByText('Matched!')).toBeTruthy()
    })
  })
})
