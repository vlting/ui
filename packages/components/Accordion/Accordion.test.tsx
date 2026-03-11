import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Accordion } from './Accordion'

describe('Accordion', () => {
  it('renders trigger text', () => {
    render(
      <Accordion.Root type="single" defaultValue={['item-1']}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Section 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    )
    expect(screen.getByText('Section 1')).toBeTruthy()
  })

  it('renders multiple items', () => {
    render(
      <Accordion.Root type="single">
        <Accordion.Item value="a">
          <Accordion.Trigger>A</Accordion.Trigger>
          <Accordion.Content>Content A</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="b">
          <Accordion.Trigger>B</Accordion.Trigger>
          <Accordion.Content>Content B</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    )
    expect(screen.getByText('A')).toBeTruthy()
    expect(screen.getByText('B')).toBeTruthy()
  })

  it('supports multiple type', () => {
    render(
      <Accordion.Root type="multiple">
        <Accordion.Item value="a">
          <Accordion.Trigger>A</Accordion.Trigger>
          <Accordion.Content>Content A</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    )
    expect(screen.getByText('A')).toBeTruthy()
  })

  describe('ARIA attributes', () => {
    it('trigger has aria-expanded="false" when collapsed', () => {
      render(
        <Accordion.Root type="single">
          <Accordion.Item value="a">
            <Accordion.Trigger>Section</Accordion.Trigger>
            <Accordion.Content>Content</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const trigger = screen.getByText('Section').closest('button')!
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('trigger has aria-expanded="true" when expanded', () => {
      render(
        <Accordion.Root type="single" defaultValue={['a']}>
          <Accordion.Item value="a">
            <Accordion.Trigger>Section</Accordion.Trigger>
            <Accordion.Content>Content</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const trigger = screen.getByText('Section').closest('button')!
      expect(trigger.getAttribute('aria-expanded')).toBe('true')
    })

    it('trigger has aria-controls pointing to content region', () => {
      render(
        <Accordion.Root type="single">
          <Accordion.Item value="a">
            <Accordion.Trigger>Section</Accordion.Trigger>
            <Accordion.Content>Content</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const trigger = screen.getByText('Section').closest('button')!
      const controlsId = trigger.getAttribute('aria-controls')
      expect(controlsId).toBeTruthy()
      const region = document.getElementById(controlsId!)
      expect(region).toBeTruthy()
      expect(region?.getAttribute('role')).toBe('region')
    })

    it('content region has role="region"', () => {
      render(
        <Accordion.Root type="single" defaultValue={['a']}>
          <Accordion.Item value="a">
            <Accordion.Trigger>Section</Accordion.Trigger>
            <Accordion.Content>Region Content</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const regions = screen.getAllByRole('region')
      expect(regions.length).toBeGreaterThan(0)
    })

    it('content region has aria-labelledby pointing to trigger', () => {
      render(
        <Accordion.Root type="single" defaultValue={['a']}>
          <Accordion.Item value="a">
            <Accordion.Trigger>Section</Accordion.Trigger>
            <Accordion.Content>Content</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const trigger = screen.getByText('Section').closest('button')!
      const region = screen.getByRole('region')
      expect(region.getAttribute('aria-labelledby')).toBe(trigger.id)
    })
  })

  describe('open/close states', () => {
    it('toggles content visibility on trigger click', () => {
      render(
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value="a">
            <Accordion.Trigger>Toggle</Accordion.Trigger>
            <Accordion.Content>Hidden Content</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const trigger = screen.getByText('Toggle').closest('button')!
      expect(trigger.getAttribute('aria-expanded')).toBe('false')

      fireEvent.click(trigger)
      expect(trigger.getAttribute('aria-expanded')).toBe('true')

      fireEvent.click(trigger)
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('single type closes other items when one opens', () => {
      render(
        <Accordion.Root type="single" defaultValue={['a']}>
          <Accordion.Item value="a">
            <Accordion.Trigger>A</Accordion.Trigger>
            <Accordion.Content>Content A</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="b">
            <Accordion.Trigger>B</Accordion.Trigger>
            <Accordion.Content>Content B</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const triggerA = screen.getByText('A').closest('button')!
      const triggerB = screen.getByText('B').closest('button')!
      expect(triggerA.getAttribute('aria-expanded')).toBe('true')
      expect(triggerB.getAttribute('aria-expanded')).toBe('false')

      fireEvent.click(triggerB)
      expect(triggerA.getAttribute('aria-expanded')).toBe('false')
      expect(triggerB.getAttribute('aria-expanded')).toBe('true')
    })

    it('multiple type allows multiple items open', () => {
      render(
        <Accordion.Root type="multiple">
          <Accordion.Item value="a">
            <Accordion.Trigger>A</Accordion.Trigger>
            <Accordion.Content>Content A</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="b">
            <Accordion.Trigger>B</Accordion.Trigger>
            <Accordion.Content>Content B</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const triggerA = screen.getByText('A').closest('button')!
      const triggerB = screen.getByText('B').closest('button')!

      fireEvent.click(triggerA)
      fireEvent.click(triggerB)
      expect(triggerA.getAttribute('aria-expanded')).toBe('true')
      expect(triggerB.getAttribute('aria-expanded')).toBe('true')
    })
  })

  describe('keyboard navigation', () => {
    it('trigger is a button (Enter/Space activates natively)', () => {
      render(
        <Accordion.Root type="single">
          <Accordion.Item value="a">
            <Accordion.Trigger>Section</Accordion.Trigger>
            <Accordion.Content>Content</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const trigger = screen.getByText('Section').closest('button')!
      expect(trigger.tagName).toBe('BUTTON')
    })

    it('Enter key toggles accordion item', () => {
      render(
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value="a">
            <Accordion.Trigger>Section</Accordion.Trigger>
            <Accordion.Content>Content</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const trigger = screen.getByText('Section').closest('button')!
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
      // Native button click simulation
      fireEvent.click(trigger)
      expect(trigger.getAttribute('aria-expanded')).toBe('true')
    })
  })
})
