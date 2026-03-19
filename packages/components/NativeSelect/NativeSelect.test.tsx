import { createRef } from 'react'
import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { NativeSelect } from './NativeSelect'

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
})

describe('NativeSelect', () => {
  it('renders a select element', () => {
    const { container } = render(
      <NativeSelect.Root>
        <NativeSelect.Option value="a">A</NativeSelect.Option>
      </NativeSelect.Root>,
    )
    expect(container.querySelector('select')).toBeTruthy()
  })

  it('renders option elements', () => {
    const { container } = render(
      <NativeSelect.Root>
        <NativeSelect.Option value="a">A</NativeSelect.Option>
        <NativeSelect.Option value="b">B</NativeSelect.Option>
      </NativeSelect.Root>,
    )
    expect(container.querySelectorAll('option').length).toBe(2)
  })

  it('renders placeholder as disabled first option', () => {
    const { container } = render(
      <NativeSelect.Root placeholder="Choose">
        <NativeSelect.Option value="a">A</NativeSelect.Option>
      </NativeSelect.Root>,
    )
    const options = container.querySelectorAll('option')
    expect(options[0].textContent).toBe('Choose')
    expect(options[0]).toBeDisabled()
    expect(options[0]).toHaveAttribute('hidden')
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { container, unmount } = render(
        <NativeSelect.Root size={size}>
          <NativeSelect.Option value="a">A</NativeSelect.Option>
        </NativeSelect.Root>,
      )
      expect(container.querySelector('select')).toBeTruthy()
      unmount()
    }
  })

  it('calls onValueChange when selection changes', () => {
    const onValueChange = jest.fn()
    const { container } = render(
      <NativeSelect.Root onValueChange={onValueChange}>
        <NativeSelect.Option value="a">A</NativeSelect.Option>
        <NativeSelect.Option value="b">B</NativeSelect.Option>
      </NativeSelect.Root>,
    )
    const select = container.querySelector('select')!
    fireEvent.change(select, { target: { value: 'b' } })
    expect(onValueChange).toHaveBeenCalledWith('b')
  })

  it('sets aria-invalid when error prop is true', () => {
    const { container } = render(
      <NativeSelect.Root error>
        <NativeSelect.Option value="a">A</NativeSelect.Option>
      </NativeSelect.Root>,
    )
    expect(container.querySelector('select')).toHaveAttribute('aria-invalid', 'true')
  })

  it('is disabled when disabled prop is true', () => {
    const { container } = render(
      <NativeSelect.Root disabled>
        <NativeSelect.Option value="a">A</NativeSelect.Option>
      </NativeSelect.Root>,
    )
    expect(container.querySelector('select')).toBeDisabled()
  })

  it('forwards ref on Root', () => {
    const ref = createRef<HTMLSelectElement>()
    render(
      <NativeSelect.Root ref={ref}>
        <NativeSelect.Option value="a">A</NativeSelect.Option>
      </NativeSelect.Root>,
    )
    expect(ref.current).toBeInstanceOf(HTMLSelectElement)
  })
})
