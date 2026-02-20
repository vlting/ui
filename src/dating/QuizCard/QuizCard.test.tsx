import { fireEvent, render, screen } from '../../__test-utils__/render'
import { QuizCard, type QuizOption, type QuizResult } from './QuizCard'

describe('QuizCard', () => {
  const options: QuizOption[] = [
    { id: 'a', label: 'Dogs' },
    { id: 'b', label: 'Cats' },
    { id: 'c', label: 'Both' },
  ]

  const results: QuizResult[] = [
    { optionId: 'a', count: 5, percentage: 50 },
    { optionId: 'b', count: 3, percentage: 30 },
    { optionId: 'c', count: 2, percentage: 20 },
  ]

  const defaultProps = {
    question: 'Dogs or cats?',
    options,
  }

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <QuizCard {...defaultProps} testID="quiz" />,
      )
      expect(screen.getByTestId('quiz')).toBeTruthy()
    })

    it('displays the question', () => {
      render(
        <QuizCard {...defaultProps} testID="quiz" />,
      )
      expect(screen.getByText('Dogs or cats?')).toBeTruthy()
    })

    it('displays all option labels', () => {
      render(
        <QuizCard {...defaultProps} testID="quiz" />,
      )
      expect(screen.getByText('Dogs')).toBeTruthy()
      expect(screen.getByText('Cats')).toBeTruthy()
      expect(screen.getByText('Both')).toBeTruthy()
    })
  })

  describe('option selection', () => {
    it('calls onSelect when an option is pressed', () => {
      const onSelect = jest.fn()
      render(
        <QuizCard
          {...defaultProps}
          onSelect={onSelect}
          testID="quiz"
        />,
      )
      fireEvent.click(screen.getByLabelText('Dogs'))
      expect(onSelect).toHaveBeenCalledWith('a')
    })

    it('highlights the selected option', () => {
      render(
        <QuizCard
          {...defaultProps}
          selectedOption="b"
          testID="quiz"
        />,
      )
      const catRadio = screen.getByLabelText('Cats')
      expect(catRadio.getAttribute?.('aria-checked')).toBe('true')
    })

    it('does not highlight unselected options', () => {
      render(
        <QuizCard
          {...defaultProps}
          selectedOption="b"
          testID="quiz"
        />,
      )
      const dogRadio = screen.getByLabelText('Dogs')
      expect(dogRadio.getAttribute?.('aria-checked')).toBe('false')
    })

    it('disables options when already selected', () => {
      const onSelect = jest.fn()
      render(
        <QuizCard
          {...defaultProps}
          selectedOption="a"
          onSelect={onSelect}
          testID="quiz"
        />,
      )
      fireEvent.click(screen.getByLabelText('Cats'))
      expect(onSelect).not.toHaveBeenCalled()
    })
  })

  describe('results view', () => {
    it('shows results with percentages when showResults is true', () => {
      render(
        <QuizCard
          {...defaultProps}
          showResults={true}
          results={results}
          selectedOption="a"
          testID="quiz"
        />,
      )
      expect(screen.getByText('50%')).toBeTruthy()
      expect(screen.getByText('30%')).toBeTruthy()
      expect(screen.getByText('20%')).toBeTruthy()
    })

    it('shows option labels in results view', () => {
      render(
        <QuizCard
          {...defaultProps}
          showResults={true}
          results={results}
          selectedOption="a"
          testID="quiz"
        />,
      )
      expect(screen.getByText('Dogs')).toBeTruthy()
      expect(screen.getByText('Cats')).toBeTruthy()
      expect(screen.getByText('Both')).toBeTruthy()
    })

    it('shows options (not results) when showResults is false', () => {
      render(
        <QuizCard {...defaultProps} testID="quiz" />,
      )
      expect(screen.queryByText('50%')).toBeNull()
      expect(screen.getByRole('radiogroup')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has aria-label on the container', () => {
      render(
        <QuizCard {...defaultProps} testID="quiz" />,
      )
      expect(
        screen.getByLabelText('Quiz: Dogs or cats?'),
      ).toBeTruthy()
    })

    it('options have role="radiogroup"', () => {
      render(
        <QuizCard {...defaultProps} testID="quiz" />,
      )
      expect(screen.getByRole('radiogroup')).toBeTruthy()
    })

    it('each option has role="radio"', () => {
      render(
        <QuizCard {...defaultProps} testID="quiz" />,
      )
      const radios = screen.getAllByRole('radio')
      expect(radios.length).toBe(3)
    })

    it('selected option has aria-checked="true"', () => {
      render(
        <QuizCard
          {...defaultProps}
          selectedOption="a"
          testID="quiz"
        />,
      )
      const dogRadio = screen.getByLabelText('Dogs')
      expect(dogRadio.getAttribute?.('aria-checked')).toBe('true')
    })

    it('unselected options have aria-checked="false"', () => {
      render(
        <QuizCard
          {...defaultProps}
          selectedOption="a"
          testID="quiz"
        />,
      )
      const catRadio = screen.getByLabelText('Cats')
      expect(catRadio.getAttribute?.('aria-checked')).toBe('false')
    })
  })

  describe('compound sub-components', () => {
    it('exposes Question sub-component', () => {
      expect(QuizCard.Question).toBeDefined()
    })

    it('exposes Options sub-component', () => {
      expect(QuizCard.Options).toBeDefined()
    })

    it('exposes Results sub-component', () => {
      expect(QuizCard.Results).toBeDefined()
    })
  })
})
