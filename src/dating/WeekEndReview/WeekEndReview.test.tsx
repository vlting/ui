import { fireEvent, render, screen } from '../../__test-utils__/render'
import { WeekEndReview, type PodMember } from './WeekEndReview'

describe('WeekEndReview', () => {
  const members: PodMember[] = [
    { id: '1', name: 'Alice', photoSrc: 'https://example.com/alice.jpg' },
    { id: '2', name: 'Bob', photoSrc: 'https://example.com/bob.jpg' },
    { id: '3', name: 'Charlie' },
  ]

  const defaultProps = {
    members,
    selectedIds: [] as string[],
  }

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <WeekEndReview {...defaultProps} testID="review" />,
      )
      expect(screen.getByTestId('review')).toBeTruthy()
    })

    it('displays the title', () => {
      render(
        <WeekEndReview {...defaultProps} testID="review" />,
      )
      expect(screen.getByText('Week in Review')).toBeTruthy()
    })

    it('displays the match prompt', () => {
      render(
        <WeekEndReview {...defaultProps} testID="review" />,
      )
      expect(
        screen.getByText('Would you like to match with anyone from this week?'),
      ).toBeTruthy()
    })

    it('displays member names', () => {
      render(
        <WeekEndReview {...defaultProps} testID="review" />,
      )
      expect(screen.getByText('Alice')).toBeTruthy()
      expect(screen.getByText('Bob')).toBeTruthy()
      expect(screen.getByText('Charlie')).toBeTruthy()
    })

    it('displays "No members this week" when members is empty', () => {
      render(
        <WeekEndReview
          members={[]}
          selectedIds={[]}
          testID="review"
        />,
      )
      expect(screen.getByText('No members this week')).toBeTruthy()
    })

    it('displays summary with count', () => {
      render(
        <WeekEndReview
          members={members}
          selectedIds={['1', '2']}
          testID="review"
        />,
      )
      expect(screen.getByText('2 members selected')).toBeTruthy()
    })

    it('uses singular "member" for count of 1', () => {
      render(
        <WeekEndReview
          members={members}
          selectedIds={['1']}
          testID="review"
        />,
      )
      expect(screen.getByText('1 member selected')).toBeTruthy()
    })

    it('displays "0 members selected" when none selected', () => {
      render(
        <WeekEndReview {...defaultProps} testID="review" />,
      )
      expect(screen.getByText('0 members selected')).toBeTruthy()
    })
  })

  describe('selection behavior', () => {
    it('calls onToggleSelect when a member card is pressed', () => {
      const onToggle = jest.fn()
      render(
        <WeekEndReview
          {...defaultProps}
          onToggleSelect={onToggle}
          testID="review"
        />,
      )
      fireEvent.click(screen.getByLabelText('Select Alice'))
      expect(onToggle).toHaveBeenCalledWith('1')
    })

    it('calls onToggleSelect with correct id for different members', () => {
      const onToggle = jest.fn()
      render(
        <WeekEndReview
          {...defaultProps}
          onToggleSelect={onToggle}
          testID="review"
        />,
      )
      fireEvent.click(screen.getByLabelText('Select Bob'))
      expect(onToggle).toHaveBeenCalledWith('2')
    })

    it('shows selected state with accent border on selected members', () => {
      render(
        <WeekEndReview
          members={members}
          selectedIds={['1']}
          testID="review"
        />,
      )
      const checkbox = screen.getByLabelText('Select Alice')
      expect(checkbox.getAttribute?.('aria-checked')).toBe('true')
    })

    it('shows unselected state on non-selected members', () => {
      render(
        <WeekEndReview
          members={members}
          selectedIds={['1']}
          testID="review"
        />,
      )
      const checkbox = screen.getByLabelText('Select Bob')
      expect(checkbox.getAttribute?.('aria-checked')).toBe('false')
    })
  })

  describe('submit behavior', () => {
    it('shows submit button when onSubmit is provided', () => {
      render(
        <WeekEndReview
          {...defaultProps}
          onSubmit={() => {}}
          testID="review"
        />,
      )
      expect(screen.getByText('Confirm Matches')).toBeTruthy()
    })

    it('does not show submit button when onSubmit is not provided', () => {
      render(
        <WeekEndReview {...defaultProps} testID="review" />,
      )
      expect(screen.queryByText('Confirm Matches')).toBeNull()
    })

    it('disables submit when no members are selected', () => {
      render(
        <WeekEndReview
          members={members}
          selectedIds={[]}
          onSubmit={() => {}}
          testID="review"
        />,
      )
      const submitBtn = screen.getByTestId('review-submit')
      expect(submitBtn.getAttribute?.('aria-disabled')).toBe('true')
    })

    it('enables submit when members are selected', () => {
      const onSubmit = jest.fn()
      render(
        <WeekEndReview
          members={members}
          selectedIds={['1']}
          onSubmit={onSubmit}
          testID="review"
        />,
      )
      fireEvent.click(screen.getByTestId('review-submit'))
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('does not call onSubmit when no members selected', () => {
      const onSubmit = jest.fn()
      render(
        <WeekEndReview
          members={members}
          selectedIds={[]}
          onSubmit={onSubmit}
          testID="review"
        />,
      )
      fireEvent.click(screen.getByTestId('review-submit'))
      expect(onSubmit).not.toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('has role="region" on the container', () => {
      render(
        <WeekEndReview {...defaultProps} testID="review" />,
      )
      expect(screen.getByRole('region')).toBeTruthy()
    })

    it('has aria-label "Week in Review"', () => {
      render(
        <WeekEndReview {...defaultProps} testID="review" />,
      )
      expect(
        screen.getByLabelText('Week in Review'),
      ).toBeTruthy()
    })

    it('member cards have role="checkbox"', () => {
      render(
        <WeekEndReview
          {...defaultProps}
          onToggleSelect={() => {}}
          testID="review"
        />,
      )
      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes.length).toBe(3)
    })

    it('selected members have aria-checked="true"', () => {
      render(
        <WeekEndReview
          members={members}
          selectedIds={['2']}
          onToggleSelect={() => {}}
          testID="review"
        />,
      )
      const bobCheckbox = screen.getByLabelText('Select Bob')
      expect(bobCheckbox.getAttribute?.('aria-checked')).toBe('true')
    })

    it('each member has aria-label "Select {name}"', () => {
      render(
        <WeekEndReview
          {...defaultProps}
          onToggleSelect={() => {}}
          testID="review"
        />,
      )
      expect(screen.getByLabelText('Select Alice')).toBeTruthy()
      expect(screen.getByLabelText('Select Bob')).toBeTruthy()
      expect(screen.getByLabelText('Select Charlie')).toBeTruthy()
    })

    it('submit button has aria-label "Confirm Matches"', () => {
      render(
        <WeekEndReview
          {...defaultProps}
          onSubmit={() => {}}
          testID="review"
        />,
      )
      expect(screen.getByLabelText('Confirm Matches')).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('exposes MemberList sub-component', () => {
      expect(WeekEndReview.MemberList).toBeDefined()
    })

    it('exposes MatchPrompt sub-component', () => {
      expect(WeekEndReview.MatchPrompt).toBeDefined()
    })

    it('exposes Summary sub-component', () => {
      expect(WeekEndReview.Summary).toBeDefined()
    })
  })
})
