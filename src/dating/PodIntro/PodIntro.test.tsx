import { render, screen } from '../../__test-utils__/render'
import { PodIntro } from './PodIntro'

describe('PodIntro', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <PodIntro testID="pod-intro" />,
      )
      expect(screen.getByTestId('pod-intro')).toBeTruthy()
    })

    it('displays welcome message with default pod name', () => {
      render(
        <PodIntro testID="pod-intro" />,
      )
      expect(screen.getByText('Welcome to Your Pod!')).toBeTruthy()
    })

    it('displays welcome message with custom pod name', () => {
      render(
        <PodIntro podName="Book Club" testID="pod-intro" />,
      )
      expect(screen.getByText('Welcome to Book Club!')).toBeTruthy()
    })

    it('displays member count subtitle', () => {
      render(
        <PodIntro memberCount={5} testID="pod-intro" />,
      )
      expect(
        screen.getByText("You've been matched with 5 people this week"),
      ).toBeTruthy()
    })

    it('does not display member count when not provided', () => {
      render(
        <PodIntro testID="pod-intro" />,
      )
      expect(
        screen.queryByText(/You've been matched with/),
      ).toBeNull()
    })

    it('renders children', () => {
      render(
        <PodIntro testID="pod-intro">
          <div data-testid="child">Child content</div>
        </PodIntro>,
      )
      expect(screen.getByTestId('child')).toBeTruthy()
    })
  })

  describe('sub-components', () => {
    it('renders Welcome with custom pod name and member count', () => {
      render(
        <PodIntro.Welcome podName="Fun Pod" memberCount={4} />,
      )
      expect(screen.getByText('Welcome to Fun Pod!')).toBeTruthy()
      expect(
        screen.getByText("You've been matched with 4 people this week"),
      ).toBeTruthy()
    })

    it('renders Welcome with default pod name', () => {
      render(
        <PodIntro.Welcome />,
      )
      expect(screen.getByText('Welcome to Your Pod!')).toBeTruthy()
    })

    it('renders Members with children', () => {
      render(
        <PodIntro.Members>
          <div data-testid="member-child">Members list</div>
        </PodIntro.Members>,
      )
      expect(screen.getByText('Your Pod Members')).toBeTruthy()
      expect(screen.getByTestId('member-child')).toBeTruthy()
    })

    it('renders FirstActivity with children', () => {
      render(
        <PodIntro.FirstActivity>
          <div data-testid="activity-child">Activity content</div>
        </PodIntro.FirstActivity>,
      )
      expect(screen.getByText('Your first activity is ready!')).toBeTruthy()
      expect(screen.getByTestId('activity-child')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has role="region" on the container', () => {
      render(
        <PodIntro testID="pod-intro" />,
      )
      expect(screen.getByRole('region')).toBeTruthy()
    })

    it('has aria-label "Pod introduction"', () => {
      render(
        <PodIntro testID="pod-intro" />,
      )
      expect(
        screen.getByLabelText('Pod introduction'),
      ).toBeTruthy()
    })

    it('maintains aria-label regardless of podName', () => {
      render(
        <PodIntro podName="My Custom Pod" testID="pod-intro" />,
      )
      expect(
        screen.getByLabelText('Pod introduction'),
      ).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('exposes Welcome sub-component', () => {
      expect(PodIntro.Welcome).toBeDefined()
    })

    it('exposes Members sub-component', () => {
      expect(PodIntro.Members).toBeDefined()
    })

    it('exposes FirstActivity sub-component', () => {
      expect(PodIntro.FirstActivity).toBeDefined()
    })
  })
})
