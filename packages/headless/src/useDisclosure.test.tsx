import { fireEvent, render, screen } from '@testing-library/react'
import { useDisclosure, type UseDisclosureProps } from './useDisclosure'

function DisclosureFixture(props: UseDisclosureProps) {
  const { isOpen, onOpen, onClose, onToggle, getToggleProps, getContentProps } =
    useDisclosure(props)
  return (
    <div>
      <button {...getToggleProps()} data-testid="toggle">
        Toggle
      </button>
      <div {...getContentProps()} data-testid="content">
        Content
      </div>
      <button data-testid="open" onClick={onOpen}>
        Open
      </button>
      <button data-testid="close" onClick={onClose}>
        Close
      </button>
      <button data-testid="toggle-action" onClick={onToggle}>
        Toggle Action
      </button>
    </div>
  )
}

describe('useDisclosure', () => {
  describe('uncontrolled mode', () => {
    it('defaults to closed', () => {
      render(<DisclosureFixture />)
      expect(screen.getByTestId('toggle')).toHaveAttribute('aria-expanded', 'false')
      expect(screen.getByTestId('content')).toHaveAttribute('hidden')
    })

    it('defaults to open when defaultOpen is true', () => {
      render(<DisclosureFixture defaultOpen />)
      expect(screen.getByTestId('toggle')).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByTestId('content')).not.toHaveAttribute('hidden')
    })

    it('opens on click', () => {
      render(<DisclosureFixture />)
      fireEvent.click(screen.getByTestId('toggle'))
      expect(screen.getByTestId('toggle')).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByTestId('content')).not.toHaveAttribute('hidden')
    })

    it('closes on second click', () => {
      render(<DisclosureFixture />)
      fireEvent.click(screen.getByTestId('toggle'))
      fireEvent.click(screen.getByTestId('toggle'))
      expect(screen.getByTestId('toggle')).toHaveAttribute('aria-expanded', 'false')
      expect(screen.getByTestId('content')).toHaveAttribute('hidden')
    })

    it('calls onOpenChange', () => {
      const onOpenChange = jest.fn()
      render(<DisclosureFixture onOpenChange={onOpenChange} />)
      fireEvent.click(screen.getByTestId('toggle'))
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  describe('controlled mode', () => {
    it('follows open prop', () => {
      const { rerender } = render(<DisclosureFixture open={false} />)
      expect(screen.getByTestId('toggle')).toHaveAttribute('aria-expanded', 'false')
      rerender(<DisclosureFixture open={true} />)
      expect(screen.getByTestId('toggle')).toHaveAttribute('aria-expanded', 'true')
    })

    it('calls onOpenChange but does not change internal state', () => {
      const onOpenChange = jest.fn()
      render(<DisclosureFixture open={false} onOpenChange={onOpenChange} />)
      fireEvent.click(screen.getByTestId('toggle'))
      expect(onOpenChange).toHaveBeenCalledWith(true)
      // Still closed because parent didn't update open prop
      expect(screen.getByTestId('toggle')).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('actions', () => {
    it('onOpen opens the disclosure', () => {
      render(<DisclosureFixture />)
      fireEvent.click(screen.getByTestId('open'))
      expect(screen.getByTestId('toggle')).toHaveAttribute('aria-expanded', 'true')
    })

    it('onClose closes the disclosure', () => {
      render(<DisclosureFixture defaultOpen />)
      fireEvent.click(screen.getByTestId('close'))
      expect(screen.getByTestId('toggle')).toHaveAttribute('aria-expanded', 'false')
    })

    it('onToggle toggles the disclosure', () => {
      render(<DisclosureFixture />)
      fireEvent.click(screen.getByTestId('toggle-action'))
      expect(screen.getByTestId('toggle')).toHaveAttribute('aria-expanded', 'true')
      fireEvent.click(screen.getByTestId('toggle-action'))
      expect(screen.getByTestId('toggle')).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('accessibility', () => {
    it('aria-expanded reflects open state', () => {
      render(<DisclosureFixture />)
      expect(screen.getByTestId('toggle')).toHaveAttribute('aria-expanded', 'false')
      fireEvent.click(screen.getByTestId('toggle'))
      expect(screen.getByTestId('toggle')).toHaveAttribute('aria-expanded', 'true')
    })

    it('aria-controls links to content id', () => {
      render(<DisclosureFixture />)
      const toggle = screen.getByTestId('toggle')
      const content = screen.getByTestId('content')
      expect(toggle).toHaveAttribute('aria-controls')
      expect(content).toHaveAttribute('id')
      expect(toggle.getAttribute('aria-controls')).toBe(content.getAttribute('id'))
    })

    it('content has hidden attribute when closed', () => {
      render(<DisclosureFixture />)
      expect(screen.getByTestId('content')).toHaveAttribute('hidden')
      fireEvent.click(screen.getByTestId('toggle'))
      expect(screen.getByTestId('content')).not.toHaveAttribute('hidden')
    })

    it('ID is consistent across renders', () => {
      const { rerender } = render(<DisclosureFixture />)
      const id1 = screen.getByTestId('content').getAttribute('id')
      rerender(<DisclosureFixture />)
      const id2 = screen.getByTestId('content').getAttribute('id')
      expect(id1).toBe(id2)
    })
  })

  describe('prop-getters', () => {
    it('getToggleProps returns correct shape', () => {
      render(<DisclosureFixture />)
      const toggle = screen.getByTestId('toggle')
      expect(toggle).toHaveAttribute('aria-expanded')
      expect(toggle).toHaveAttribute('aria-controls')
    })

    it('getContentProps returns correct shape', () => {
      render(<DisclosureFixture />)
      const content = screen.getByTestId('content')
      expect(content).toHaveAttribute('id')
      expect(content).toHaveAttribute('hidden')
    })
  })
})
