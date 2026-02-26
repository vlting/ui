import { render } from '../../../src/__test-utils__/render'
import { Drawer } from './Drawer'

describe('Drawer', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <Drawer.Root>
          <Drawer.Trigger>Open Drawer</Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Title</Drawer.Title>
          </Drawer.Content>
        </Drawer.Root>,
      ),
    ).not.toThrow()
  })

  it('renders all direction variants without errors', () => {
    const directions = ['bottom', 'top', 'left', 'right'] as const
    for (const direction of directions) {
      expect(() =>
        render(
          <Drawer.Root direction={direction}>
            <Drawer.Trigger>Open</Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Title>T</Drawer.Title>
            </Drawer.Content>
          </Drawer.Root>,
        ),
      ).not.toThrow()
    }
  })
})
