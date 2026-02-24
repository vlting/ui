import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { useFocusTrap } from './useFocusTrap'

function FocusTrapFixture({ active = true }: { active?: boolean }) {
  const ref = useFocusTrap<HTMLDivElement>(active)
  return (
    <div ref={ref} data-testid="trap">
      <button data-testid="first">First</button>
      <input data-testid="middle" />
      <button data-testid="last">Last</button>
    </div>
  )
}

describe('useFocusTrap', () => {
  it('auto-focuses the first focusable element when active', () => {
    const { getByTestId } = render(<FocusTrapFixture />)
    expect(getByTestId('first')).toHaveFocus()
  })

  it('wraps focus from last to first on Tab', () => {
    const { getByTestId } = render(<FocusTrapFixture />)
    const last = getByTestId('last')
    last.focus()

    fireEvent.keyDown(getByTestId('trap'), {
      key: 'Tab',
      shiftKey: false,
    })

    expect(getByTestId('first')).toHaveFocus()
  })

  it('wraps focus from first to last on Shift+Tab', () => {
    const { getByTestId } = render(<FocusTrapFixture />)
    const first = getByTestId('first')
    first.focus()

    fireEvent.keyDown(getByTestId('trap'), {
      key: 'Tab',
      shiftKey: true,
    })

    expect(getByTestId('last')).toHaveFocus()
  })

  it('does not trap focus when inactive', () => {
    const { getByTestId } = render(<FocusTrapFixture active={false} />)
    // Should not auto-focus
    expect(getByTestId('first')).not.toHaveFocus()
  })

  it('returns a ref object', () => {
    let capturedRef: any
    function Capture() {
      capturedRef = useFocusTrap()
      return <div ref={capturedRef} />
    }
    render(<Capture />)
    expect(capturedRef).toHaveProperty('current')
  })
})
