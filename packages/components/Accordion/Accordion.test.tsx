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

  describe('chevron indicator', () => {
    it('renders chevron SVG by default', () => {
      render(
        <Accordion.Root type="single">
          <Accordion.Item value="a">
            <Accordion.Trigger>Section</Accordion.Trigger>
            <Accordion.Content>Content</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const trigger = screen.getByText('Section').closest('button')!
      const svg = trigger.querySelector('svg')
      expect(svg).toBeTruthy()
      expect(svg?.getAttribute('aria-hidden')).toBe('true')
    })

    it('hides chevron when indicator={false}', () => {
      render(
        <Accordion.Root type="single">
          <Accordion.Item value="a">
            <Accordion.Trigger indicator={false}>Section</Accordion.Trigger>
            <Accordion.Content>Content</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const trigger = screen.getByText('Section').closest('button')!
      expect(trigger.querySelector('svg')).toBeNull()
    })

    it('chevron data-state toggles with item', () => {
      render(
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value="a">
            <Accordion.Trigger>Section</Accordion.Trigger>
            <Accordion.Content>Content</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const trigger = screen.getByText('Section').closest('button')!
      const chevron = trigger.querySelector('[data-state]')!
      expect(chevron.getAttribute('data-state')).toBe('closed')

      fireEvent.click(trigger)
      expect(chevron.getAttribute('data-state')).toBe('open')
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

    it('ArrowDown moves focus to next trigger', () => {
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
      const triggerA = screen.getByText('A').closest('button')!
      const triggerB = screen.getByText('B').closest('button')!

      triggerB.focus()
      fireEvent.keyDown(triggerB, { key: 'ArrowUp' })
      expect(document.activeElement).toBe(triggerA)
      fireEvent.keyDown(triggerA, { key: 'ArrowDown' })
      expect(document.activeElement).toBe(triggerB)
    })

    it('ArrowUp moves focus to previous trigger', () => {
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
      const triggerA = screen.getByText('A').closest('button')!
      const triggerB = screen.getByText('B').closest('button')!

      triggerB.focus()
      fireEvent.keyDown(triggerB, { key: 'ArrowUp' })
      expect(document.activeElement).toBe(triggerA)
    })

    it('ArrowDown wraps from last to first', () => {
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
      const triggerA = screen.getByText('A').closest('button')!
      const triggerB = screen.getByText('B').closest('button')!

      triggerB.focus()
      fireEvent.keyDown(triggerB, { key: 'ArrowDown' })
      expect(document.activeElement).toBe(triggerA)
    })

    it('Home moves focus to first trigger', () => {
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
          <Accordion.Item value="c">
            <Accordion.Trigger>C</Accordion.Trigger>
            <Accordion.Content>Content C</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const triggerA = screen.getByText('A').closest('button')!
      const triggerC = screen.getByText('C').closest('button')!

      triggerC.focus()
      fireEvent.keyDown(triggerC, { key: 'Home' })
      expect(document.activeElement).toBe(triggerA)
    })

    it('End moves focus to last trigger', () => {
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
          <Accordion.Item value="c">
            <Accordion.Trigger>C</Accordion.Trigger>
            <Accordion.Content>Content C</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      )
      const triggerA = screen.getByText('A').closest('button')!
      const triggerC = screen.getByText('C').closest('button')!

      triggerA.focus()
      fireEvent.keyDown(triggerA, { key: 'End' })
      expect(document.activeElement).toBe(triggerC)
    })
  })
})
