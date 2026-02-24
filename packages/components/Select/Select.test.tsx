import React from 'react'
import { render } from '../../../src/__test-utils__/render'
import { Select } from './Select'

describe('Select', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <Select placeholder="Choose">
          <Select.Item value="a">Option A</Select.Item>
          <Select.Item value="b">Option B</Select.Item>
        </Select>
      )
    ).not.toThrow()
  })

  it('renders with defaultValue', () => {
    expect(() =>
      render(
        <Select defaultValue="a">
          <Select.Item value="a">A</Select.Item>
          <Select.Item value="b">B</Select.Item>
        </Select>
      )
    ).not.toThrow()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(
        <Select size={size}>
          <Select.Item value="a">A</Select.Item>
        </Select>
      )
      unmount()
    }
  })

  it('renders disabled state', () => {
    expect(() =>
      render(
        <Select disabled>
          <Select.Item value="a">A</Select.Item>
        </Select>
      )
    ).not.toThrow()
  })

  it('renders with groups and labels', () => {
    expect(() =>
      render(
        <Select placeholder="Pick fruit">
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            <Select.Item value="apple">Apple</Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Vegetables</Select.Label>
            <Select.Item value="carrot">Carrot</Select.Item>
          </Select.Group>
        </Select>
      )
    ).not.toThrow()
  })
})
