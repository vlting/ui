import { render, screen } from '../../../src/__test-utils__/render'
import { AlertDialog } from './AlertDialog'

describe('AlertDialog', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <AlertDialog.Root>
          <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>Confirm</AlertDialog.Title>
            <AlertDialog.Description>Are you sure?</AlertDialog.Description>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>No</AlertDialog.Cancel>
              <AlertDialog.Action>Yes</AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Root>,
      ),
    ).not.toThrow()
  })

  it.skip('shows content when open', () => {
    // TODO: Tamagui AlertDialog portal rendering may not work in JSDOM
    render(
      <AlertDialog.Root open>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm</AlertDialog.Title>
        </AlertDialog.Content>
      </AlertDialog.Root>,
    )
    expect(screen.getByText('Confirm')).toBeTruthy()
  })
})
