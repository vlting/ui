import { fireEvent, render, screen } from '../../__test-utils__/render'
import { PodMemberCard } from './PodMemberCard'

describe('PodMemberCard', () => {
  const defaultProps = {
    name: 'Jordan',
    photoSrc: 'https://example.com/jordan.jpg',
    bio: 'Loves hiking and adventure.',
    matchStatus: 'none' as const,
  }

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <PodMemberCard {...defaultProps} testID="pod-member" />,
      )
      expect(screen.getByTestId('pod-member')).toBeTruthy()
    })

    it('displays the name', () => {
      render(
        <PodMemberCard {...defaultProps} testID="pod-member" />,
      )
      expect(screen.getByText('Jordan')).toBeTruthy()
    })

    it('displays the bio', () => {
      render(
        <PodMemberCard {...defaultProps} testID="pod-member" />,
      )
      expect(screen.getByText('Loves hiking and adventure.')).toBeTruthy()
    })

    it('renders without bio when not provided', () => {
      render(
        <PodMemberCard
          name="Alex"
          testID="pod-member"
        />,
      )
      expect(screen.getByText('Alex')).toBeTruthy()
    })

    it('renders avatar image when photoSrc is provided', () => {
      render(
        <PodMemberCard {...defaultProps} testID="pod-member" />,
      )
      const images = screen.getAllByRole('img')
      expect(images.length).toBeGreaterThanOrEqual(1)
    })

    it('renders placeholder when no photoSrc', () => {
      render(
        <PodMemberCard
          name="Sam"
          testID="pod-member"
        />,
      )
      expect(screen.getByTestId('pod-member')).toBeTruthy()
      expect(screen.getByText('Sam')).toBeTruthy()
    })
  })

  describe('match status', () => {
    it('renders nothing for match badge when status is none', () => {
      render(
        <PodMemberCard
          {...defaultProps}
          matchStatus="none"
          testID="pod-member"
        />,
      )
      expect(screen.queryByLabelText('Match pending')).toBeNull()
      expect(screen.queryByLabelText('Mutual match')).toBeNull()
    })

    it('renders pending badge when matchStatus is pending', () => {
      render(
        <PodMemberCard
          {...defaultProps}
          matchStatus="pending"
          testID="pod-member"
        />,
      )
      expect(screen.getByLabelText('Match pending')).toBeTruthy()
    })

    it('renders mutual badge when matchStatus is mutual', () => {
      render(
        <PodMemberCard
          {...defaultProps}
          matchStatus="mutual"
          testID="pod-member"
        />,
      )
      expect(screen.getByLabelText('Mutual match')).toBeTruthy()
    })
  })

  describe('match request button', () => {
    it('renders heart button when onMatchRequest is provided', () => {
      const onMatchRequest = jest.fn()
      render(
        <PodMemberCard
          {...defaultProps}
          onMatchRequest={onMatchRequest}
          testID="pod-member"
        />,
      )
      expect(screen.getByLabelText('Send match request')).toBeTruthy()
    })

    it('does not render heart button when onMatchRequest is not provided', () => {
      render(
        <PodMemberCard {...defaultProps} testID="pod-member" />,
      )
      expect(screen.queryByLabelText('Send match request')).toBeNull()
    })

    it('calls onMatchRequest when heart button is pressed', () => {
      const onMatchRequest = jest.fn()
      render(
        <PodMemberCard
          {...defaultProps}
          onMatchRequest={onMatchRequest}
          testID="pod-member"
        />,
      )
      fireEvent.click(screen.getByLabelText('Send match request'))
      expect(onMatchRequest).toHaveBeenCalledTimes(1)
    })
  })

  describe('callbacks', () => {
    it('calls onPress when the card is pressed', () => {
      const onPress = jest.fn()
      render(
        <PodMemberCard
          {...defaultProps}
          onPress={onPress}
          testID="pod-member"
        />,
      )
      fireEvent.click(screen.getByTestId('pod-member'))
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('renders as non-pressable when no onPress', () => {
      render(
        <PodMemberCard {...defaultProps} testID="pod-member" />,
      )
      expect(screen.getByTestId('pod-member')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has role="button" when onPress is provided', () => {
      render(
        <PodMemberCard
          {...defaultProps}
          onPress={() => {}}
          testID="pod-member"
        />,
      )
      const el = screen.getByTestId('pod-member')
      expect(el.getAttribute?.('role')).toBe('button')
    })

    it('has aria-label including name', () => {
      render(
        <PodMemberCard
          {...defaultProps}
          onPress={() => {}}
          testID="pod-member"
        />,
      )
      expect(
        screen.getByLabelText('Pod member Jordan'),
      ).toBeTruthy()
    })

    it('photo image has alt text', () => {
      render(
        <PodMemberCard {...defaultProps} testID="pod-member" />,
      )
      const img = screen.getAllByRole('img').find(
        (el) => el.getAttribute?.('alt') === 'Jordan',
      )
      expect(img).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('exposes Photo sub-component', () => {
      expect(PodMemberCard.Photo).toBeDefined()
    })

    it('exposes Name sub-component', () => {
      expect(PodMemberCard.Name).toBeDefined()
    })

    it('exposes Bio sub-component', () => {
      expect(PodMemberCard.Bio).toBeDefined()
    })

    it('exposes MatchButton sub-component', () => {
      expect(PodMemberCard.MatchButton).toBeDefined()
    })
  })
})
