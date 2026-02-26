import { render, screen } from '../../../src/__test-utils__/render'
import { Dialog } from './Dialog'

describe('Dialog', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Title</Dialog.Title>
          </Dialog.Content>
        </Dialog.Root>,
      ),
    ).not.toThrow()
  })

  it.skip('shows content when open', () => {
    // TODO: Tamagui Dialog portal rendering may not work in JSDOM
    render(
      <Dialog.Root open>
        <Dialog.Trigger>Open</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Description</Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>,
    )
    expect(screen.getByText('Dialog Title')).toBeTruthy()
  })

  it('renders size variants without errors', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content size={size}>
            <Dialog.Title>Title</Dialog.Title>
          </Dialog.Content>
        </Dialog.Root>,
      )
      unmount()
    }
  })
})
