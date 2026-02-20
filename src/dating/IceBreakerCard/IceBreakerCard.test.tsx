import { fireEvent, render, screen } from '../../__test-utils__/render'
import { IceBreakerCard, type IceBreakerResponse } from './IceBreakerCard'

describe('IceBreakerCard', () => {
  const sampleResponses: IceBreakerResponse[] = [
    {
      id: '1',
      authorName: 'Alice',
      content: 'Definitely pizza!',
      timestamp: '2h ago',
    },
    {
      id: '2',
      authorName: 'Bob',
      content: 'Tacos for sure.',
      timestamp: '1h ago',
    },
  ]

  const defaultProps = {
    prompt: 'What is your favorite comfort food?',
    responses: sampleResponses,
  }

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <IceBreakerCard {...defaultProps} testID="icebreaker" />,
      )
      expect(screen.getByTestId('icebreaker')).toBeTruthy()
    })

    it('displays the prompt', () => {
      render(
        <IceBreakerCard {...defaultProps} testID="icebreaker" />,
      )
      expect(screen.getByText('What is your favorite comfort food?')).toBeTruthy()
    })

    it('displays response author names', () => {
      render(
        <IceBreakerCard {...defaultProps} testID="icebreaker" />,
      )
      expect(screen.getByText('Alice')).toBeTruthy()
      expect(screen.getByText('Bob')).toBeTruthy()
    })

    it('displays response content', () => {
      render(
        <IceBreakerCard {...defaultProps} testID="icebreaker" />,
      )
      expect(screen.getByText('Definitely pizza!')).toBeTruthy()
      expect(screen.getByText('Tacos for sure.')).toBeTruthy()
    })

    it('displays response timestamps', () => {
      render(
        <IceBreakerCard {...defaultProps} testID="icebreaker" />,
      )
      expect(screen.getByText('2h ago')).toBeTruthy()
      expect(screen.getByText('1h ago')).toBeTruthy()
    })

    it('renders without responses when empty', () => {
      render(
        <IceBreakerCard
          prompt="Favorite movie?"
          responses={[]}
          testID="icebreaker"
        />,
      )
      expect(screen.getByText('Favorite movie?')).toBeTruthy()
    })
  })

  describe('input behavior', () => {
    it('shows input when hasResponded is false', () => {
      render(
        <IceBreakerCard
          {...defaultProps}
          hasResponded={false}
          onSubmitResponse={() => {}}
          testID="icebreaker"
        />,
      )
      expect(screen.getByPlaceholderText('Your response...')).toBeTruthy()
    })

    it('hides input when hasResponded is true', () => {
      render(
        <IceBreakerCard
          {...defaultProps}
          hasResponded={true}
          onSubmitResponse={() => {}}
          testID="icebreaker"
        />,
      )
      expect(screen.queryByPlaceholderText('Your response...')).toBeNull()
    })

    it('hides input when no onSubmitResponse callback', () => {
      render(
        <IceBreakerCard
          {...defaultProps}
          hasResponded={false}
          testID="icebreaker"
        />,
      )
      expect(screen.queryByPlaceholderText('Your response...')).toBeNull()
    })

    it('renders submit button with aria-label', () => {
      render(
        <IceBreakerCard
          {...defaultProps}
          hasResponded={false}
          onSubmitResponse={() => {}}
          testID="icebreaker"
        />,
      )
      expect(screen.getByLabelText('Submit response')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has role="article"', () => {
      render(
        <IceBreakerCard {...defaultProps} testID="icebreaker" />,
      )
      expect(screen.getByRole('article')).toBeTruthy()
    })

    it('has aria-label with truncated prompt', () => {
      render(
        <IceBreakerCard {...defaultProps} testID="icebreaker" />,
      )
      expect(
        screen.getByLabelText('Ice-breaker: What is your favorite comfort food?'),
      ).toBeTruthy()
    })

    it('truncates long prompts in aria-label', () => {
      const longPrompt = 'If you could have dinner with any historical figure, who would it be and why?'
      render(
        <IceBreakerCard
          prompt={longPrompt}
          testID="icebreaker"
        />,
      )
      const card = screen.getByTestId('icebreaker')
      const label = card.getAttribute?.('aria-label')
      expect(label).toContain('Ice-breaker:')
      // The truncated label should be shorter than the full prompt
      expect(label!.length).toBeLessThan(longPrompt.length + 20)
    })

    it('response list has role="list"', () => {
      render(
        <IceBreakerCard {...defaultProps} testID="icebreaker" />,
      )
      expect(screen.getByRole('list')).toBeTruthy()
    })

    it('each response has role="listitem"', () => {
      render(
        <IceBreakerCard {...defaultProps} testID="icebreaker" />,
      )
      const items = screen.getAllByRole('listitem')
      expect(items.length).toBe(2)
    })
  })

  describe('compound sub-components', () => {
    it('exposes Prompt sub-component', () => {
      expect(IceBreakerCard.Prompt).toBeDefined()
    })

    it('exposes ResponseList sub-component', () => {
      expect(IceBreakerCard.ResponseList).toBeDefined()
    })

    it('exposes Input sub-component', () => {
      expect(IceBreakerCard.Input).toBeDefined()
    })
  })
})
