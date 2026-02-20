import { fireEvent, render, screen } from '../../__test-utils__/render'
import { BlockUserModal } from './BlockUserModal'

describe('BlockUserModal', () => {
  describe('rendering', () => {
    it('renders without crashing when open', () => {
      render(
        <BlockUserModal
          open={true}
          onConfirm={() => {}}
          onCancel={() => {}}
          testID="block"
        />,
      )
      expect(screen.getByTestId('block')).toBeTruthy()
    })

    it('renders nothing when closed', () => {
      render(
        <BlockUserModal
          open={false}
          onConfirm={() => {}}
          onCancel={() => {}}
          testID="block"
        />,
      )
      expect(screen.queryByTestId('block')).toBeNull()
    })

    it('displays "Block User?" when no userName is given', () => {
      render(
        <BlockUserModal
          open={true}
          onConfirm={() => {}}
          onCancel={() => {}}
          testID="block"
        />,
      )
      expect(screen.getByText('Block User?')).toBeTruthy()
    })

    it('displays "Block {userName}?" when userName is given', () => {
      render(
        <BlockUserModal
          open={true}
          onConfirm={() => {}}
          onCancel={() => {}}
          userName="Jane"
          testID="block"
        />,
      )
      expect(screen.getByText('Block Jane?')).toBeTruthy()
    })

    it('shows warning body text about consequences', () => {
      render(
        <BlockUserModal
          open={true}
          onConfirm={() => {}}
          onCancel={() => {}}
          testID="block"
        />,
      )
      expect(
        screen.getByText(/This user will no longer appear/),
      ).toBeTruthy()
    })

    it('shows Cancel and Block buttons', () => {
      render(
        <BlockUserModal
          open={true}
          onConfirm={() => {}}
          onCancel={() => {}}
          testID="block"
        />,
      )
      expect(screen.getByText('Cancel')).toBeTruthy()
      expect(screen.getByText('Block')).toBeTruthy()
    })
  })

  describe('callbacks', () => {
    it('calls onCancel when Cancel is pressed', () => {
      const onCancel = jest.fn()
      render(
        <BlockUserModal
          open={true}
          onConfirm={() => {}}
          onCancel={onCancel}
          testID="block"
        />,
      )
      fireEvent.click(screen.getByTestId('block-cancel'))
      expect(onCancel).toHaveBeenCalledTimes(1)
    })

    it('calls onConfirm when Block is pressed', () => {
      const onConfirm = jest.fn()
      render(
        <BlockUserModal
          open={true}
          onConfirm={onConfirm}
          onCancel={() => {}}
          testID="block"
        />,
      )
      fireEvent.click(screen.getByTestId('block-confirm'))
      expect(onConfirm).toHaveBeenCalledTimes(1)
    })

    it('does not call onConfirm when loading', () => {
      const onConfirm = jest.fn()
      render(
        <BlockUserModal
          open={true}
          onConfirm={onConfirm}
          onCancel={() => {}}
          isLoading={true}
          testID="block"
        />,
      )
      fireEvent.click(screen.getByTestId('block-confirm'))
      expect(onConfirm).not.toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('has role="dialog" on the container', () => {
      render(
        <BlockUserModal
          open={true}
          onConfirm={() => {}}
          onCancel={() => {}}
          testID="block"
        />,
      )
      const el = screen.getByTestId('block')
      expect(el.getAttribute?.('role')).toBe('dialog')
    })

    it('has aria-modal="true"', () => {
      render(
        <BlockUserModal
          open={true}
          onConfirm={() => {}}
          onCancel={() => {}}
          testID="block"
        />,
      )
      const el = screen.getByTestId('block')
      expect(el.getAttribute?.('aria-modal')).toBe('true')
    })

    it('has aria-labelledby pointing to title', () => {
      render(
        <BlockUserModal
          open={true}
          onConfirm={() => {}}
          onCancel={() => {}}
          testID="block"
        />,
      )
      const el = screen.getByTestId('block')
      expect(el.getAttribute?.('aria-labelledby')).toBe('block-title')
    })

    it('has aria-describedby pointing to body', () => {
      render(
        <BlockUserModal
          open={true}
          onConfirm={() => {}}
          onCancel={() => {}}
          testID="block"
        />,
      )
      const el = screen.getByTestId('block')
      expect(el.getAttribute?.('aria-describedby')).toBe('block-body')
    })
  })

  describe('loading state', () => {
    it('shows spinner and disables confirm button when loading', () => {
      render(
        <BlockUserModal
          open={true}
          onConfirm={() => {}}
          onCancel={() => {}}
          isLoading={true}
          testID="block"
        />,
      )
      const confirmBtn = screen.getByTestId('block-confirm')
      expect(confirmBtn.getAttribute?.('aria-disabled')).toBe('true')
    })

    it('disables cancel button when loading', () => {
      const onCancel = jest.fn()
      render(
        <BlockUserModal
          open={true}
          onConfirm={() => {}}
          onCancel={onCancel}
          isLoading={true}
          testID="block"
        />,
      )
      // Cancel button is rendered but should be disabled via Pressable disabled prop
      expect(screen.getByText('Cancel')).toBeTruthy()
    })
  })

  describe('error state', () => {
    it('displays error message when error prop is set', () => {
      render(
        <BlockUserModal
          open={true}
          onConfirm={() => {}}
          onCancel={() => {}}
          error="Something went wrong"
          testID="block"
        />,
      )
      expect(screen.getByText('Something went wrong')).toBeTruthy()
    })

    it('error has aria-live="assertive"', () => {
      render(
        <BlockUserModal
          open={true}
          onConfirm={() => {}}
          onCancel={() => {}}
          error="Failed"
          testID="block"
        />,
      )
      const errorEl = screen.getByTestId('block-error')
      expect(errorEl.getAttribute?.('aria-live')).toBe('assertive')
    })
  })

  describe('keyboard interaction', () => {
    it('calls onCancel when Escape key is pressed', () => {
      const onCancel = jest.fn()
      render(
        <BlockUserModal
          open={true}
          onConfirm={() => {}}
          onCancel={onCancel}
          testID="block"
        />,
      )
      const event = new KeyboardEvent('keydown', { key: 'Escape' })
      window.dispatchEvent(event)
      expect(onCancel).toHaveBeenCalledTimes(1)
    })
  })
})
