import { render } from '../../../src/__test-utils__/render'
import { Toast } from './Toast'

describe('Toast', () => {
  it('renders provider without crashing', () => {
    expect(() =>
      render(
        <Toast.Provider>
          <Toast.Viewport />
        </Toast.Provider>,
      ),
    ).not.toThrow()
  })

  it('renders with all sub-components', () => {
    expect(() =>
      render(
        <Toast.Provider>
          <Toast.Root>
            <Toast.Title>Success</Toast.Title>
            <Toast.Description>File saved</Toast.Description>
            <Toast.Action altText="Undo">Undo</Toast.Action>
            <Toast.Close>×</Toast.Close>
          </Toast.Root>
          <Toast.Viewport />
        </Toast.Provider>,
      ),
    ).not.toThrow()
  })

  it('renders variant styles', () => {
    const variants = ['default', 'success', 'error', 'warning'] as const
    for (const variant of variants) {
      const { unmount } = render(
        <Toast.Provider>
          <Toast.Root variant={variant}>
            <Toast.Title>Toast</Toast.Title>
          </Toast.Root>
          <Toast.Viewport />
        </Toast.Provider>,
      )
      unmount()
    }
  })

  it('renders with swipe direction', () => {
    const directions = ['up', 'down', 'left', 'right'] as const
    for (const dir of directions) {
      const { unmount } = render(
        <Toast.Provider swipeDirection={dir}>
          <Toast.Viewport />
        </Toast.Provider>,
      )
      unmount()
    }
  })
})
