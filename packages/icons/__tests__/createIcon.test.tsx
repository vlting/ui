import React from 'react'
import { render } from '@testing-library/react'
import { createIcon, type IconFC } from '../createIcon'
import { RiArrowRightLine } from '../generated/RiArrowRightLine'
import { RiHomeFill } from '../generated/RiHomeFill'

describe('createIcon factory', () => {
  const testPathData = 'M0 0h24v24H0z'
  const TestIcon = createIcon(testPathData, 'TestIcon')

  it('renders an SVG element', () => {
    const { container } = render(<TestIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders a path with correct d attribute', () => {
    const { container } = render(<TestIcon />)
    const path = container.querySelector('path')
    expect(path).toBeInTheDocument()
    expect(path).toHaveAttribute('d', testPathData)
  })

  it('forwards size prop', () => {
    const { container } = render(<TestIcon size={32} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '32')
    expect(svg).toHaveAttribute('height', '32')
  })

  it('forwards color prop', () => {
    const { container } = render(<TestIcon color="red" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('fill', 'red')
  })

  it('defaults to size 24', () => {
    const { container } = render(<TestIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
  })

  it('defaults to currentColor', () => {
    const { container } = render(<TestIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('fill', 'currentColor')
  })

  it('sets displayName', () => {
    const Icon = createIcon('M0 0', 'RiTestIcon')
    expect(Icon.displayName).toBe('RiTestIcon')
  })

  it('is memoized (wrapped in React.memo)', () => {
    // React.memo wraps the component — check for memo's $$typeof symbol
    expect(TestIcon).toHaveProperty('$$typeof', Symbol.for('react.memo'))
  })
})

describe('generated icons conform to IconFC', () => {
  it('RiArrowRightLine renders', () => {
    const { container } = render(<RiArrowRightLine />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('RiHomeFill renders', () => {
    const { container } = render(<RiHomeFill />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('type assertion — generated icons satisfy IconFC', () => {
    // Type-level test: if this compiles, the type is correct
    const _checkLine: IconFC = RiArrowRightLine
    const _checkFill: IconFC = RiHomeFill
    expect(_checkLine).toBeDefined()
    expect(_checkFill).toBeDefined()
  })

  it('accepts size and color', () => {
    const { container } = render(<RiArrowRightLine size={16} color="blue" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '16')
    expect(svg).toHaveAttribute('fill', 'blue')
  })
})
