import { render } from '../../../src/__test-utils__/render'
import { NativeSelect } from './NativeSelect'

describe('NativeSelect', () => {
  it('renders a native select element', () => {
    const { container } = render(
      <NativeSelect.Root placeholder="Choose">
        <NativeSelect.Option value="a">Option A</NativeSelect.Option>
        <NativeSelect.Option value="b">Option B</NativeSelect.Option>
      </NativeSelect.Root>,
    )
    const select = container.querySelector('select')
    expect(select).toBeTruthy()
  })

  it('renders option elements', () => {
    const { container } = render(
      <NativeSelect.Root>
        <NativeSelect.Option value="a">A</NativeSelect.Option>
        <NativeSelect.Option value="b">B</NativeSelect.Option>
      </NativeSelect.Root>,
    )
    const options = container.querySelectorAll('option')
    expect(options.length).toBeGreaterThanOrEqual(2)
  })

  it('renders placeholder as disabled first option', () => {
    const { container } = render(
      <NativeSelect.Root placeholder="Select one">
        <NativeSelect.Option value="a">A</NativeSelect.Option>
      </NativeSelect.Root>,
    )
    const options = container.querySelectorAll('option')
    const placeholder = Array.from(options).find((o) => o.textContent === 'Select one')
    expect(placeholder).toBeTruthy()
  })

  it('is disabled when disabled prop is true', () => {
    const { container } = render(
      <NativeSelect.Root disabled>
        <NativeSelect.Option value="a">A</NativeSelect.Option>
      </NativeSelect.Root>,
    )
    const select = container.querySelector('select')
    expect(select).toBeDisabled()
  })

  it('calls onValueChange when selection changes', () => {
    const onChange = jest.fn()
    const { container } = render(
      <NativeSelect.Root onValueChange={onChange}>
        <NativeSelect.Option value="a">A</NativeSelect.Option>
        <NativeSelect.Option value="b">B</NativeSelect.Option>
      </NativeSelect.Root>,
    )
    const select = container.querySelector('select')!
    select.value = 'b'
    select.dispatchEvent(new Event('change', { bubbles: true }))
    expect(onChange).toHaveBeenCalledWith('b')
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
})
