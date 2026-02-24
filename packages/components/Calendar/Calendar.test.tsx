import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Calendar } from './Calendar'

describe('Calendar', () => {
  it('renders without errors', () => {
    render(<Calendar.Root />)
    // Should render month name and day abbreviations
    const today = new Date()
    const monthName = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    expect(screen.getByText(monthName)).toBeTruthy()
  })

  it('renders day-of-week headers', () => {
    render(<Calendar.Root />)
    expect(screen.getByText('Su')).toBeTruthy()
    expect(screen.getByText('Mo')).toBeTruthy()
  })

  it('calls onSelect when a day is clicked', () => {
    const onSelect = jest.fn()
    render(<Calendar.Root onSelect={onSelect} />)
    // Click on day "15"
    const day15 = screen.getByText('15')
    day15.click()
    expect(onSelect).toHaveBeenCalled()
  })

  it('renders with a selected date', () => {
    const date = new Date(2025, 5, 15) // June 15, 2025
    render(<Calendar.Root selected={date} month={date} />)
    expect(screen.getByText('15')).toBeTruthy()
  })

  it.skip('disables dates before minDate', () => {
    // TODO: requires verifying aria-disabled attribute in JSDOM
    const minDate = new Date(2025, 5, 10)
    const month = new Date(2025, 5, 1)
    render(<Calendar.Root minDate={minDate} month={month} />)
    const day5 = screen.getByText('5')
    expect(day5.closest('[aria-disabled="true"]')).toBeTruthy()
  })
})
