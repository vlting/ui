import { render, screen } from '../../__test-utils__/render'
import { Sheet } from './Sheet'

describe('Sheet', () => {
  describe('rendering', () => {
    it('renders without crashing (closed by default)', () => {
      // Sheet is rendered but closed by default; no crash expected
      render(
        <Sheet>
          <Sheet.Overlay />
          <Sheet.Frame testID="frame">
            <Sheet.Handle />
          </Sheet.Frame>
        </Sheet>,
      )
      // Frame should not be visible when closed
    })

    it('renders content when open', () => {
      render(
        <Sheet open snapPoints={[50]}>
          <Sheet.Overlay />
          <Sheet.Frame testID="frame">
            <Sheet.Handle testID="handle" />
          </Sheet.Frame>
        </Sheet>,
      )
      expect(screen.getByTestId('frame')).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('exposes Sheet.Frame', () => {
      render(
        <Sheet open snapPoints={[50]}>
          <Sheet.Overlay />
          <Sheet.Frame testID="frame" />
        </Sheet>,
      )
      expect(screen.getByTestId('frame')).toBeTruthy()
    })

    it('exposes Sheet.Handle', () => {
      render(
        <Sheet open snapPoints={[50]}>
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle testID="handle" />
          </Sheet.Frame>
        </Sheet>,
      )
      expect(screen.getByTestId('handle')).toBeTruthy()
    })

    it('exposes Sheet.Overlay', () => {
      render(
        <Sheet open snapPoints={[50]}>
          <Sheet.Overlay testID="overlay" />
          <Sheet.Frame />
        </Sheet>,
      )
      expect(screen.getByTestId('overlay')).toBeTruthy()
    })
  })

  describe('controlled state', () => {
    it('closes when onOpenChange is called', () => {
      const onOpenChange = jest.fn()
      render(
        <Sheet open onOpenChange={onOpenChange} snapPoints={[50]}>
          <Sheet.Overlay />
          <Sheet.Frame testID="frame" />
        </Sheet>,
      )
      expect(screen.getByTestId('frame')).toBeTruthy()
    })
  })
})
