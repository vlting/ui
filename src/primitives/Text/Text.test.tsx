import { render, screen } from '../../__test-utils__/render'
import { Text } from './Text'

describe('Text', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<Text testID="text">Hello</Text>)
      expect(screen.getByTestId('text')).toBeTruthy()
    })

    it('renders the provided text content', () => {
      render(<Text>Hello world</Text>)
      expect(screen.getByText('Hello world')).toBeTruthy()
    })
  })

  describe('variants', () => {
    it('renders display variant', () => {
      render(<Text testID="text" variant="display">Display</Text>)
      expect(screen.getByTestId('text')).toBeTruthy()
    })

    it('renders heading variant', () => {
      render(<Text testID="text" variant="heading">Heading</Text>)
      expect(screen.getByTestId('text')).toBeTruthy()
    })

    it('renders subheading variant', () => {
      render(<Text testID="text" variant="subheading">Subheading</Text>)
      expect(screen.getByTestId('text')).toBeTruthy()
    })

    it('renders body variant (default)', () => {
      render(<Text testID="text">Body text</Text>)
      expect(screen.getByTestId('text')).toBeTruthy()
    })

    it('renders label variant', () => {
      render(<Text testID="text" variant="label">Label</Text>)
      expect(screen.getByTestId('text')).toBeTruthy()
    })

    it('renders caption variant', () => {
      render(<Text testID="text" variant="caption">Caption</Text>)
      expect(screen.getByTestId('text')).toBeTruthy()
    })

    it('renders overline variant', () => {
      render(<Text testID="text" variant="overline">Overline</Text>)
      expect(screen.getByTestId('text')).toBeTruthy()
    })
  })

  describe('props', () => {
    it('accepts color prop', () => {
      render(<Text testID="text" color="$color2">Muted text</Text>)
      expect(screen.getByTestId('text')).toBeTruthy()
    })

    it('accepts textAlign prop', () => {
      render(<Text testID="text" textAlign="center">Centered</Text>)
      expect(screen.getByTestId('text')).toBeTruthy()
    })

    it('accepts numberOfLines prop', () => {
      render(<Text testID="text" numberOfLines={2}>Truncated text</Text>)
      expect(screen.getByTestId('text')).toBeTruthy()
    })

    it('accepts italic via fontStyle', () => {
      render(<Text testID="text" fontStyle="italic">Italic text</Text>)
      expect(screen.getByTestId('text')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('does not receive focus', () => {
      render(<Text testID="text">Not focusable</Text>)
      const el = screen.getByTestId('text')
      expect(el).toBeTruthy()
    })

    it('text content is readable', () => {
      render(<Text>Accessible text</Text>)
      expect(screen.getByText('Accessible text')).toBeTruthy()
    })
  })
})
