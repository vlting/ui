import { fireEvent, render, screen } from '../../__test-utils__/render'
import { ProfilePreviewCard } from './ProfilePreviewCard'

describe('ProfilePreviewCard', () => {
  const defaultProps = {
    name: 'Alice',
    age: 28,
    photoSrc: 'https://example.com/photo.jpg',
    bio: 'Love hiking and coffee',
    interests: ['Hiking', 'Coffee', 'Photography'],
  }

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <ProfilePreviewCard {...defaultProps} testID="profile-card" />,
      )
      expect(screen.getByTestId('profile-card')).toBeTruthy()
    })

    it('displays the name', () => {
      render(
        <ProfilePreviewCard {...defaultProps} testID="profile-card" />,
      )
      expect(screen.getByText('Alice')).toBeTruthy()
    })

    it('displays the age', () => {
      render(
        <ProfilePreviewCard {...defaultProps} testID="profile-card" />,
      )
      expect(screen.getByText('28')).toBeTruthy()
    })

    it('displays the bio', () => {
      render(
        <ProfilePreviewCard {...defaultProps} testID="profile-card" />,
      )
      expect(screen.getByText('Love hiking and coffee')).toBeTruthy()
    })

    it('displays interest chips', () => {
      render(
        <ProfilePreviewCard {...defaultProps} testID="profile-card" />,
      )
      expect(screen.getByText('Hiking')).toBeTruthy()
      expect(screen.getByText('Coffee')).toBeTruthy()
      expect(screen.getByText('Photography')).toBeTruthy()
    })

    it('renders without age when not provided', () => {
      render(
        <ProfilePreviewCard
          name="Bob"
          photoSrc="https://example.com/photo.jpg"
          testID="profile-card"
        />,
      )
      expect(screen.getByText('Bob')).toBeTruthy()
    })

    it('renders without bio when not provided', () => {
      render(
        <ProfilePreviewCard
          name="Charlie"
          photoSrc="https://example.com/photo.jpg"
          testID="profile-card"
        />,
      )
      expect(screen.queryByText('Love hiking and coffee')).toBeNull()
    })

    it('renders without interests when not provided', () => {
      render(
        <ProfilePreviewCard
          name="Dana"
          photoSrc="https://example.com/photo.jpg"
          testID="profile-card"
        />,
      )
      expect(screen.queryByRole('list')).toBeNull()
    })
  })

  describe('interactions', () => {
    it('calls onPress when pressed', () => {
      const onPress = jest.fn()
      render(
        <ProfilePreviewCard
          {...defaultProps}
          onPress={onPress}
          testID="profile-card"
        />,
      )
      fireEvent.click(screen.getByTestId('profile-card'))
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('renders as non-pressable when onPress is not provided', () => {
      render(
        <ProfilePreviewCard {...defaultProps} testID="profile-card" />,
      )
      // Should not have role="button" on the container
      const card = screen.getByTestId('profile-card')
      expect(card.getAttribute?.('role')).not.toBe('button')
    })
  })

  describe('accessibility', () => {
    it('has aria-label with name and age when pressable', () => {
      render(
        <ProfilePreviewCard
          {...defaultProps}
          onPress={() => {}}
          testID="profile-card"
        />,
      )
      expect(
        screen.getByLabelText('View profile of Alice, 28'),
      ).toBeTruthy()
    })

    it('has aria-label with name only when age is missing', () => {
      render(
        <ProfilePreviewCard
          name="Eve"
          photoSrc="https://example.com/photo.jpg"
          onPress={() => {}}
          testID="profile-card"
        />,
      )
      expect(
        screen.getByLabelText('View profile of Eve'),
      ).toBeTruthy()
    })

    it('has role="button" when onPress is provided', () => {
      render(
        <ProfilePreviewCard
          {...defaultProps}
          onPress={() => {}}
          testID="profile-card"
        />,
      )
      const btn = screen.getByRole('button')
      expect(btn).toBeTruthy()
    })

    it('interest chips have role="list" and role="listitem"', () => {
      render(
        <ProfilePreviewCard {...defaultProps} testID="profile-card" />,
      )
      expect(screen.getByRole('list')).toBeTruthy()
      const items = screen.getAllByRole('listitem')
      expect(items.length).toBe(3)
    })
  })

  describe('compound sub-components', () => {
    it('exposes Photo sub-component', () => {
      expect(ProfilePreviewCard.Photo).toBeDefined()
    })

    it('exposes Name sub-component', () => {
      expect(ProfilePreviewCard.Name).toBeDefined()
    })

    it('exposes Bio sub-component', () => {
      expect(ProfilePreviewCard.Bio).toBeDefined()
    })

    it('exposes Interests sub-component', () => {
      expect(ProfilePreviewCard.Interests).toBeDefined()
    })
  })
})
