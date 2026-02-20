import { fireEvent, render, screen } from '../../__test-utils__/render'
import { MatchCard } from './MatchCard'

describe('MatchCard', () => {
  const defaultProps = {
    name: 'Alex',
    age: 28,
    photoSrc: 'https://example.com/alex.jpg',
    bio: 'Love hiking and coffee.',
  }

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <MatchCard {...defaultProps} testID="match" />,
      )
      expect(screen.getByTestId('match')).toBeTruthy()
    })

    it('displays the name', () => {
      render(
        <MatchCard {...defaultProps} testID="match" />,
      )
      expect(screen.getByText('Alex')).toBeTruthy()
    })

    it('displays the age', () => {
      render(
        <MatchCard {...defaultProps} testID="match" />,
      )
      expect(screen.getByText('28')).toBeTruthy()
    })

    it('displays the bio', () => {
      render(
        <MatchCard {...defaultProps} testID="match" />,
      )
      expect(screen.getByText('Love hiking and coffee.')).toBeTruthy()
    })

    it('renders photo with alt text', () => {
      render(
        <MatchCard {...defaultProps} testID="match" />,
      )
      const img = screen.getAllByRole('img').find(
        (el) => el.getAttribute?.('alt') === 'Alex',
      )
      expect(img).toBeTruthy()
    })

    it('renders without bio when not provided', () => {
      render(
        <MatchCard
          name="Sam"
          age={25}
          photoSrc="https://example.com/sam.jpg"
          testID="match"
        />,
      )
      expect(screen.getByText('Sam')).toBeTruthy()
      expect(screen.getByText('25')).toBeTruthy()
    })
  })

  describe('isNew badge', () => {
    it('shows "New" badge when isNew is true', () => {
      render(
        <MatchCard {...defaultProps} isNew={true} testID="match" />,
      )
      expect(screen.getByText('New')).toBeTruthy()
    })

    it('does not show "New" badge when isNew is false', () => {
      render(
        <MatchCard {...defaultProps} isNew={false} testID="match" />,
      )
      expect(screen.queryByText('New')).toBeNull()
    })

    it('New badge has aria-label "New match"', () => {
      render(
        <MatchCard {...defaultProps} isNew={true} testID="match" />,
      )
      expect(screen.getByLabelText('New match')).toBeTruthy()
    })
  })

  describe('callbacks', () => {
    it('calls onPress when the card is pressed', () => {
      const onPress = jest.fn()
      render(
        <MatchCard
          {...defaultProps}
          onPress={onPress}
          testID="match"
        />,
      )
      fireEvent.click(screen.getByTestId('match'))
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('does not crash when pressed without onPress', () => {
      render(
        <MatchCard {...defaultProps} testID="match" />,
      )
      // Should not throw
      expect(screen.getByTestId('match')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has role="button" when onPress is provided', () => {
      render(
        <MatchCard
          {...defaultProps}
          onPress={() => {}}
          testID="match"
        />,
      )
      const el = screen.getByTestId('match')
      expect(el.getAttribute?.('role')).toBe('button')
    })

    it('has aria-label including name and age', () => {
      render(
        <MatchCard
          {...defaultProps}
          onPress={() => {}}
          testID="match"
        />,
      )
      expect(
        screen.getByLabelText('Match with Alex, 28'),
      ).toBeTruthy()
    })

    it('photo has a non-empty alt attribute', () => {
      render(
        <MatchCard {...defaultProps} testID="match" />,
      )
      const images = screen.getAllByRole('img')
      const hasAlt = images.some(
        (el) => el.getAttribute?.('alt') && el.getAttribute('alt') !== '',
      )
      expect(hasAlt).toBe(true)
    })
  })

  describe('compound sub-components', () => {
    it('exposes Photo sub-component', () => {
      expect(MatchCard.Photo).toBeDefined()
    })

    it('exposes Name sub-component', () => {
      expect(MatchCard.Name).toBeDefined()
    })

    it('exposes Age sub-component', () => {
      expect(MatchCard.Age).toBeDefined()
    })

    it('exposes Bio sub-component', () => {
      expect(MatchCard.Bio).toBeDefined()
    })
  })
})
