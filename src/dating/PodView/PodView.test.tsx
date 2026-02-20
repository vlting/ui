import { render, screen } from '../../__test-utils__/render'
import { PodView } from './PodView'

describe('PodView', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <PodView testID="podview" />,
      )
      expect(screen.getByTestId('podview')).toBeTruthy()
    })

    it('displays default pod name "Your Pod"', () => {
      render(
        <PodView testID="podview" />,
      )
      expect(screen.getByText('Your Pod')).toBeTruthy()
    })

    it('displays custom pod name', () => {
      render(
        <PodView podName="Coffee Crew" testID="podview" />,
      )
      expect(screen.getByText('Coffee Crew')).toBeTruthy()
    })

    it('displays member count', () => {
      render(
        <PodView memberCount={5} testID="podview" />,
      )
      expect(screen.getByText('5 members')).toBeTruthy()
    })

    it('uses singular "member" for count of 1', () => {
      render(
        <PodView memberCount={1} testID="podview" />,
      )
      expect(screen.getByText('1 member')).toBeTruthy()
    })

    it('does not show member count when not provided', () => {
      render(
        <PodView testID="podview" />,
      )
      expect(screen.queryByText('members')).toBeNull()
      expect(screen.queryByText('member')).toBeNull()
    })

    it('renders children', () => {
      render(
        <PodView testID="podview">
          <div data-testid="child">Child content</div>
        </PodView>,
      )
      expect(screen.getByTestId('child')).toBeTruthy()
    })
  })

  describe('sub-components', () => {
    it('renders MemberGrid with children', () => {
      render(
        <PodView.MemberGrid>
          <div data-testid="member-child">Member</div>
        </PodView.MemberGrid>,
      )
      expect(screen.getByText('Members')).toBeTruthy()
      expect(screen.getByTestId('member-child')).toBeTruthy()
    })

    it('renders Activity with children', () => {
      render(
        <PodView.Activity>
          <div data-testid="activity-child">Ice breaker card</div>
        </PodView.Activity>,
      )
      expect(screen.getByText('Activity')).toBeTruthy()
      expect(screen.getByTestId('activity-child')).toBeTruthy()
    })

    it('renders Countdown with children', () => {
      render(
        <PodView.Countdown>
          <div data-testid="countdown-child">Countdown</div>
        </PodView.Countdown>,
      )
      expect(screen.getByText('Time Remaining')).toBeTruthy()
      expect(screen.getByTestId('countdown-child')).toBeTruthy()
    })

    it('renders Header with custom podName and memberCount', () => {
      render(
        <PodView.Header podName="Test Pod" memberCount={3} />,
      )
      expect(screen.getByText('Test Pod')).toBeTruthy()
      expect(screen.getByText('3 members')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has role="region" on the container', () => {
      render(
        <PodView testID="podview" />,
      )
      expect(screen.getByRole('region')).toBeTruthy()
    })

    it('has aria-label matching pod name', () => {
      render(
        <PodView podName="Weekend Vibes" testID="podview" />,
      )
      expect(
        screen.getByLabelText('Weekend Vibes'),
      ).toBeTruthy()
    })

    it('has aria-label "Your Pod" by default', () => {
      render(
        <PodView testID="podview" />,
      )
      expect(
        screen.getByLabelText('Your Pod'),
      ).toBeTruthy()
    })

    it('MemberGrid has role="group" with aria-label', () => {
      render(
        <PodView.MemberGrid>
          <div>Content</div>
        </PodView.MemberGrid>,
      )
      expect(screen.getByRole('group')).toBeTruthy()
      expect(screen.getByLabelText('Pod members')).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('exposes Header sub-component', () => {
      expect(PodView.Header).toBeDefined()
    })

    it('exposes MemberGrid sub-component', () => {
      expect(PodView.MemberGrid).toBeDefined()
    })

    it('exposes Activity sub-component', () => {
      expect(PodView.Activity).toBeDefined()
    })

    it('exposes Countdown sub-component', () => {
      expect(PodView.Countdown).toBeDefined()
    })
  })
})
