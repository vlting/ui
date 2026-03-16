import { fireEvent, render, screen } from '@testing-library/react'
import { type UseTabsProps, useTabs } from './useTabs'

function TabsFixture(props: UseTabsProps & { tabs?: string[] }) {
  const { tabs = ['one', 'two', 'three'], ...tabProps } = props
  const { activeValue, getTabListProps, getTabProps, getTabPanelProps } =
    useTabs({
      defaultValue: tabs[0],
      ...tabProps,
    })
  return (
    <div>
      <div {...getTabListProps()} data-testid="tablist">
        {tabs.map((tab) => {
          const { onPress, ...rest } = getTabProps(tab)
          return (
            <button key={tab} {...rest} onClick={onPress} data-testid={`tab-${tab}`}>
              {tab}
            </button>
          )
        })}
      </div>
      {tabs.map((tab) => (
        <div key={tab} {...getTabPanelProps(tab)} data-testid={`panel-${tab}`}>
          Panel {tab}
        </div>
      ))}
      <span data-testid="active">{activeValue}</span>
    </div>
  )
}

describe('useTabs', () => {
  describe('uncontrolled mode', () => {
    it('first tab active by default', () => {
      render(<TabsFixture />)
      expect(screen.getByTestId('active').textContent).toBe('one')
    })

    it('clicking tab changes active', () => {
      render(<TabsFixture />)
      fireEvent.click(screen.getByTestId('tab-two'))
      expect(screen.getByTestId('active').textContent).toBe('two')
    })

    it('defaultValue sets initial tab', () => {
      render(<TabsFixture defaultValue="three" />)
      expect(screen.getByTestId('active').textContent).toBe('three')
    })
  })

  describe('controlled mode', () => {
    it('follows value prop', () => {
      render(<TabsFixture value="two" />)
      expect(screen.getByTestId('active').textContent).toBe('two')
    })

    it('onValueChange called on click', () => {
      const onValueChange = jest.fn()
      render(<TabsFixture value="one" onValueChange={onValueChange} />)
      fireEvent.click(screen.getByTestId('tab-three'))
      expect(onValueChange).toHaveBeenCalledWith('three')
    })

    it('value change does not affect internal state', () => {
      const { rerender } = render(<TabsFixture value="one" />)
      fireEvent.click(screen.getByTestId('tab-two'))
      // Still shows 'one' because controlled
      expect(screen.getByTestId('active').textContent).toBe('one')
      rerender(<TabsFixture value="two" />)
      expect(screen.getByTestId('active').textContent).toBe('two')
    })
  })

  describe('keyboard navigation (horizontal)', () => {
    it('ArrowRight moves to next tab', () => {
      render(<TabsFixture />)
      fireEvent.keyDown(screen.getByTestId('tab-one'), { key: 'ArrowRight' })
      expect(screen.getByTestId('active').textContent).toBe('two')
    })

    it('ArrowLeft moves to prev tab', () => {
      render(<TabsFixture defaultValue="two" />)
      fireEvent.keyDown(screen.getByTestId('tab-two'), { key: 'ArrowLeft' })
      expect(screen.getByTestId('active').textContent).toBe('one')
    })

    it('wraps from last to first', () => {
      render(<TabsFixture defaultValue="three" />)
      fireEvent.keyDown(screen.getByTestId('tab-three'), {
        key: 'ArrowRight',
      })
      expect(screen.getByTestId('active').textContent).toBe('one')
    })

    it('wraps from first to last', () => {
      render(<TabsFixture />)
      fireEvent.keyDown(screen.getByTestId('tab-one'), { key: 'ArrowLeft' })
      expect(screen.getByTestId('active').textContent).toBe('three')
    })

    it('Home goes to first', () => {
      render(<TabsFixture defaultValue="three" />)
      fireEvent.keyDown(screen.getByTestId('tab-three'), { key: 'Home' })
      expect(screen.getByTestId('active').textContent).toBe('one')
    })

    it('End goes to last', () => {
      render(<TabsFixture />)
      fireEvent.keyDown(screen.getByTestId('tab-one'), { key: 'End' })
      expect(screen.getByTestId('active').textContent).toBe('three')
    })
  })

  describe('keyboard navigation (vertical)', () => {
    it('ArrowDown moves to next tab', () => {
      render(<TabsFixture orientation="vertical" />)
      fireEvent.keyDown(screen.getByTestId('tab-one'), { key: 'ArrowDown' })
      expect(screen.getByTestId('active').textContent).toBe('two')
    })

    it('ArrowUp moves to prev tab', () => {
      render(<TabsFixture orientation="vertical" defaultValue="two" />)
      fireEvent.keyDown(screen.getByTestId('tab-two'), { key: 'ArrowUp' })
      expect(screen.getByTestId('active').textContent).toBe('one')
    })
  })

  describe('accessibility', () => {
    it('tablist has role="tablist" and aria-orientation', () => {
      render(<TabsFixture />)
      const tablist = screen.getByTestId('tablist')
      expect(tablist).toHaveAttribute('role', 'tablist')
      expect(tablist).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('tabs have role="tab"', () => {
      render(<TabsFixture />)
      expect(screen.getByTestId('tab-one')).toHaveAttribute('role', 'tab')
    })

    it('panels have role="tabpanel"', () => {
      render(<TabsFixture />)
      expect(screen.getByTestId('panel-one')).toHaveAttribute(
        'role',
        'tabpanel',
      )
    })

    it('active tab has aria-selected=true and tabIndex=0', () => {
      render(<TabsFixture />)
      const tab = screen.getByTestId('tab-one')
      expect(tab).toHaveAttribute('aria-selected', 'true')
      expect(tab).toHaveAttribute('tabindex', '0')
    })

    it('inactive tabs have aria-selected=false and tabIndex=-1', () => {
      render(<TabsFixture />)
      const tab = screen.getByTestId('tab-two')
      expect(tab).toHaveAttribute('aria-selected', 'false')
      expect(tab).toHaveAttribute('tabindex', '-1')
    })

    it('tab has id and aria-controls pointing to panel', () => {
      render(<TabsFixture />)
      const tab = screen.getByTestId('tab-one')
      const panel = screen.getByTestId('panel-one')
      expect(tab).toHaveAttribute('aria-controls', panel.id)
    })

    it('panel has id and aria-labelledby pointing to tab', () => {
      render(<TabsFixture />)
      const tab = screen.getByTestId('tab-one')
      const panel = screen.getByTestId('panel-one')
      expect(panel).toHaveAttribute('aria-labelledby', tab.id)
    })

    it('only active panel is visible', () => {
      render(<TabsFixture />)
      expect(screen.getByTestId('panel-one')).not.toHaveAttribute('hidden')
      expect(screen.getByTestId('panel-two')).toHaveAttribute('hidden')
      expect(screen.getByTestId('panel-three')).toHaveAttribute('hidden')
    })
  })

  describe('registration', () => {
    it('getTabProps registers tabs for keyboard navigation', () => {
      render(<TabsFixture />)
      // Verify keyboard nav works (proves registration happened)
      fireEvent.keyDown(screen.getByTestId('tab-one'), { key: 'ArrowRight' })
      expect(screen.getByTestId('active').textContent).toBe('two')
      fireEvent.keyDown(screen.getByTestId('tab-two'), { key: 'ArrowRight' })
      expect(screen.getByTestId('active').textContent).toBe('three')
    })
  })
})
