import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Accordion } from './Accordion'

describe('Accordion', () => {
  it('renders multiple items with triggers and content', () => {
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

  describe('single mode', () => {
    it('opening one closes others', () => {
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

    it('collapses last item when collapsible (default)', () => {
      render(
        <Accordion.Root type="single" defaultValue={['a']}>
          <Accordion.Item value="a">
            <Accordion.Trigger>A</Accordion.Trigger>
            <Accordion.Content>Content A</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const trigger = screen.getByText('A').closest('button')!
      fireEvent.click(trigger)
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('cannot close last item when collapsible=false', () => {
      render(
        <Accordion.Root type="single" collapsible={false} defaultValue={['a']}>
          <Accordion.Item value="a">
            <Accordion.Trigger>A</Accordion.Trigger>
            <Accordion.Content>Content A</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const trigger = screen.getByText('A').closest('button')!
      fireEvent.click(trigger)
      expect(trigger.getAttribute('aria-expanded')).toBe('true')
    })
  })

  describe('multiple mode', () => {
    it('items toggle independently', () => {
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

  describe('ARIA attributes', () => {
    it('trigger has aria-expanded', () => {
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

    it('trigger has aria-controls pointing to content', () => {
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

    it('content region has role="region" and aria-labelledby', () => {
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

  describe('data-state', () => {
    it('reflects open/closed on item and trigger', () => {
      render(
        <Accordion.Root type="single">
          <Accordion.Item value="a">
            <Accordion.Trigger>Toggle</Accordion.Trigger>
            <Accordion.Content>Content</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const trigger = screen.getByText('Toggle').closest('button')!
      const item = trigger.closest('[data-state]')!

      expect(item.getAttribute('data-state')).toBe('closed')
      expect(trigger.getAttribute('data-state')).toBe('closed')

      fireEvent.click(trigger)

      expect(item.getAttribute('data-state')).toBe('open')
      expect(trigger.getAttribute('data-state')).toBe('open')
    })
  })

  describe('disabled', () => {
    it('prevents toggle when root disabled', () => {
      render(
        <Accordion.Root type="single" disabled>
          <Accordion.Item value="a">
            <Accordion.Trigger>Section</Accordion.Trigger>
            <Accordion.Content>Content</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const trigger = screen.getByText('Section').closest('button')!
      fireEvent.click(trigger)
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })
  })

  describe('keyboard', () => {
    it('trigger is a button element', () => {
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

    it('click toggles item', () => {
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
      fireEvent.click(trigger)
      expect(trigger.getAttribute('aria-expanded')).toBe('true')
      fireEvent.click(trigger)
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })
  })
})
