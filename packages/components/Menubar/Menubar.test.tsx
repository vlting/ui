import { render, screen } from '../../../src/__test-utils__/render'
import { Menubar } from './Menubar'

describe('Menubar', () => {
  it('renders menu triggers', () => {
    render(
      <Menubar.Root>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>New</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar.Root>,
    )
    expect(screen.getByText('File')).toBeTruthy()
  })

  it('renders multiple menus', () => {
    render(
      <Menubar.Root>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>New</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger>Edit</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>Undo</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar.Root>,
    )
    expect(screen.getByText('File')).toBeTruthy()
    expect(screen.getByText('Edit')).toBeTruthy()
  })

  it.skip('has role="menubar" on root', () => {
    // TODO: Tamagui role rendering in JSDOM
    render(
      <Menubar.Root>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>New</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar.Root>,
    )
    expect(screen.getByRole('menubar')).toBeTruthy()
  })
})
