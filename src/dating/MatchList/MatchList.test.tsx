import { fireEvent, render, screen } from '../../__test-utils__/render'
import { MatchList, type MatchItem, type MatchListSection } from './MatchList'

describe('MatchList', () => {
  const sampleMatches: MatchItem[] = [
    {
      id: '1',
      name: 'Alex',
      age: 28,
      photoSrc: 'https://example.com/alex.jpg',
      bio: 'Love hiking and coffee.',
      isNew: true,
    },
    {
      id: '2',
      name: 'Sam',
      age: 25,
      photoSrc: 'https://example.com/sam.jpg',
      bio: 'Musician and traveler.',
      isNew: false,
    },
    {
      id: '3',
      name: 'Riley',
      age: 30,
      photoSrc: 'https://example.com/riley.jpg',
    },
  ]

  const sampleSections: MatchListSection[] = [
    {
      title: 'New Matches',
      data: [sampleMatches[0]],
    },
    {
      title: 'Conversations',
      data: [sampleMatches[1], sampleMatches[2]],
    },
  ]

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <MatchList matches={sampleMatches} testID="match-list" />,
      )
      expect(screen.getByTestId('match-list')).toBeTruthy()
    })

    it('displays all match names', () => {
      render(
        <MatchList matches={sampleMatches} testID="match-list" />,
      )
      expect(screen.getByText('Alex')).toBeTruthy()
      expect(screen.getByText('Sam')).toBeTruthy()
      expect(screen.getByText('Riley')).toBeTruthy()
    })

    it('displays match ages', () => {
      render(
        <MatchList matches={sampleMatches} testID="match-list" />,
      )
      expect(screen.getByText('28')).toBeTruthy()
      expect(screen.getByText('25')).toBeTruthy()
      expect(screen.getByText('30')).toBeTruthy()
    })

    it('displays match bios', () => {
      render(
        <MatchList matches={sampleMatches} testID="match-list" />,
      )
      expect(screen.getByText('Love hiking and coffee.')).toBeTruthy()
      expect(screen.getByText('Musician and traveler.')).toBeTruthy()
    })
  })

  describe('sections', () => {
    it('renders section headers when sections are provided', () => {
      render(
        <MatchList
          matches={[]}
          sections={sampleSections}
          testID="match-list"
        />,
      )
      expect(screen.getByText('New Matches')).toBeTruthy()
      expect(screen.getByText('Conversations')).toBeTruthy()
    })

    it('renders items within sections', () => {
      render(
        <MatchList
          matches={[]}
          sections={sampleSections}
          testID="match-list"
        />,
      )
      expect(screen.getByText('Alex')).toBeTruthy()
      expect(screen.getByText('Sam')).toBeTruthy()
      expect(screen.getByText('Riley')).toBeTruthy()
    })
  })

  describe('loading state', () => {
    it('renders skeleton cards when isLoading is true', () => {
      render(
        <MatchList
          matches={[]}
          isLoading={true}
          testID="match-list"
        />,
      )
      expect(screen.getByTestId('match-list')).toBeTruthy()
    })

    it('has aria-busy when loading', () => {
      render(
        <MatchList
          matches={[]}
          isLoading={true}
          testID="match-list"
        />,
      )
      const el = screen.getByTestId('match-list')
      expect(el.getAttribute?.('aria-busy')).toBe('true')
    })

    it('has aria-label describing loading state', () => {
      render(
        <MatchList
          matches={[]}
          isLoading={true}
          testID="match-list"
        />,
      )
      expect(screen.getByLabelText('Loading matches')).toBeTruthy()
    })
  })

  describe('error state', () => {
    it('shows error message when isError is true', () => {
      render(
        <MatchList
          matches={[]}
          isError={true}
          testID="match-list"
        />,
      )
      expect(
        screen.getByText('Something went wrong loading your matches.'),
      ).toBeTruthy()
    })

    it('shows retry button when onRetry is provided', () => {
      const onRetry = jest.fn()
      render(
        <MatchList
          matches={[]}
          isError={true}
          onRetry={onRetry}
          testID="match-list"
        />,
      )
      expect(screen.getByText('Retry')).toBeTruthy()
    })

    it('calls onRetry when retry button is pressed', () => {
      const onRetry = jest.fn()
      render(
        <MatchList
          matches={[]}
          isError={true}
          onRetry={onRetry}
          testID="match-list"
        />,
      )
      fireEvent.click(screen.getByLabelText('Retry loading matches'))
      expect(onRetry).toHaveBeenCalledTimes(1)
    })

    it('has error aria-label', () => {
      render(
        <MatchList
          matches={[]}
          isError={true}
          testID="match-list"
        />,
      )
      expect(screen.getByLabelText('Error loading matches')).toBeTruthy()
    })
  })

  describe('empty state', () => {
    it('shows default empty message when matches is empty', () => {
      render(
        <MatchList matches={[]} testID="match-list" />,
      )
      expect(screen.getByText('No matches yet')).toBeTruthy()
    })

    it('shows custom empty message', () => {
      render(
        <MatchList
          matches={[]}
          emptyMessage="Keep swiping to find your match!"
          testID="match-list"
        />,
      )
      expect(screen.getByText('Keep swiping to find your match!')).toBeTruthy()
    })

    it('empty state has accessible label', () => {
      render(
        <MatchList matches={[]} testID="match-list" />,
      )
      expect(screen.getByLabelText('No matches yet')).toBeTruthy()
    })
  })

  describe('callbacks', () => {
    it('calls onSelect with the match id when a card is pressed', () => {
      const onSelect = jest.fn()
      render(
        <MatchList
          matches={sampleMatches}
          onSelect={onSelect}
          testID="match-list"
        />,
      )
      fireEvent.click(screen.getByLabelText('Match with Alex, 28'))
      expect(onSelect).toHaveBeenCalledWith('1')
    })

    it('does not crash when no onSelect provided', () => {
      render(
        <MatchList matches={sampleMatches} testID="match-list" />,
      )
      expect(screen.getByTestId('match-list')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has role="list" on the container', () => {
      render(
        <MatchList matches={sampleMatches} testID="match-list" />,
      )
      expect(screen.getByRole('list')).toBeTruthy()
    })

    it('each item has role="listitem"', () => {
      render(
        <MatchList matches={sampleMatches} testID="match-list" />,
      )
      const items = screen.getAllByRole('listitem')
      expect(items.length).toBe(3)
    })

    it('section headers have role="heading"', () => {
      render(
        <MatchList
          matches={[]}
          sections={sampleSections}
          testID="match-list"
        />,
      )
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBe(2)
    })

    it('isNew match shows "New" badge with aria-label', () => {
      render(
        <MatchList matches={sampleMatches} testID="match-list" />,
      )
      expect(screen.getByLabelText('New match')).toBeTruthy()
    })
  })
})
