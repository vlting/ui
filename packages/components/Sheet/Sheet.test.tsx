import { render, screen, fireEvent } from '../../../src/__test-utils__/render'
import { Sheet } from './Sheet'

describe('Sheet', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <Sheet.Root>
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle />
            Content
          </Sheet.Frame>
        </Sheet.Root>,
      ),
    ).not.toThrow()
  })

  it('renders with open prop', () => {
    expect(() =>
      render(
        <Sheet.Root open onOpenChange={() => {}}>
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle />
            Sheet content
          </Sheet.Frame>
        </Sheet.Root>,
      ),
    ).not.toThrow()
  })

  it('renders with snap points', () => {
    expect(() =>
      render(
        <Sheet.Root snapPoints={[50, 100]}>
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle />
            Snapping sheet
          </Sheet.Frame>
        </Sheet.Root>,
      ),
    ).not.toThrow()
  })

  it('renders ScrollView inside Frame', () => {
    expect(() =>
      render(
        <Sheet.Root>
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle />
            <Sheet.ScrollView>Long scrollable content</Sheet.ScrollView>
          </Sheet.Frame>
        </Sheet.Root>,
      ),
    ).not.toThrow()
  })

  describe('open/close states', () => {
    it('does not render frame when closed', () => {
      render(
        <Sheet.Root>
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle />
            Hidden content
          </Sheet.Frame>
        </Sheet.Root>,
      )
      expect(screen.queryByText('Hidden content')).toBeNull()
    })

    it('renders frame when open', () => {
      render(
        <Sheet.Root open onOpenChange={() => {}}>
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle />
            Visible content
          </Sheet.Frame>
        </Sheet.Root>,
      )
      expect(screen.getByText('Visible content')).toBeTruthy()
    })
  })

  describe('ARIA attributes', () => {
    it('has role="dialog" on frame', () => {
      render(
        <Sheet.Root open onOpenChange={() => {}}>
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle />
            Content
          </Sheet.Frame>
        </Sheet.Root>,
      )
      expect(screen.getByRole('dialog')).toBeTruthy()
    })

    it('has aria-modal="true" on frame', () => {
      render(
        <Sheet.Root open onOpenChange={() => {}}>
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle />
            Content
          </Sheet.Frame>
        </Sheet.Root>,
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog.getAttribute('aria-modal')).toBe('true')
    })
  })

  describe('keyboard navigation', () => {
    it('closes on Escape key', () => {
      const onOpenChange = jest.fn()
      render(
        <Sheet.Root open onOpenChange={onOpenChange}>
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle />
            Content
          </Sheet.Frame>
        </Sheet.Root>,
      )
      expect(screen.getByRole('dialog')).toBeTruthy()
      fireEvent.keyDown(document, { key: 'Escape' })
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })
  })
})
