import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { RadioGroup } from './RadioGroup'

describe('RadioGroup', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <RadioGroup.Root>
          <RadioGroup.Item value="a">Option A</RadioGroup.Item>
          <RadioGroup.Item value="b">Option B</RadioGroup.Item>
        </RadioGroup.Root>
      )
    ).not.toThrow()
  })

  it('renders item labels', () => {
    render(
      <RadioGroup.Root>
        <RadioGroup.Item value="a">Option A</RadioGroup.Item>
        <RadioGroup.Item value="b">Option B</RadioGroup.Item>
      </RadioGroup.Root>
    )
    expect(screen.getByText('Option A')).toBeTruthy()
    expect(screen.getByText('Option B')).toBeTruthy()
  })

  it('renders with defaultValue', () => {
    expect(() =>
      render(
        <RadioGroup.Root defaultValue="a">
          <RadioGroup.Item value="a">A</RadioGroup.Item>
          <RadioGroup.Item value="b">B</RadioGroup.Item>
        </RadioGroup.Root>
      )
    ).not.toThrow()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(
        <RadioGroup.Root size={size}>
          <RadioGroup.Item value="a">A</RadioGroup.Item>
        </RadioGroup.Root>
      )
      unmount()
    }
  })

  it('renders horizontal orientation', () => {
    expect(() =>
      render(
        <RadioGroup.Root orientation="horizontal">
          <RadioGroup.Item value="a">A</RadioGroup.Item>
          <RadioGroup.Item value="b">B</RadioGroup.Item>
        </RadioGroup.Root>
      )
    ).not.toThrow()
  })

  it('renders disabled state', () => {
    expect(() =>
      render(
        <RadioGroup.Root disabled>
          <RadioGroup.Item value="a">A</RadioGroup.Item>
        </RadioGroup.Root>
      )
    ).not.toThrow()
  })

  it('accepts aria-label', () => {
    expect(() =>
      render(
        <RadioGroup.Root aria-label="Choose option">
          <RadioGroup.Item value="a">A</RadioGroup.Item>
        </RadioGroup.Root>
      )
    ).not.toThrow()
  })
})
