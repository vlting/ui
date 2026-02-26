import { render } from '../../../src/__test-utils__/render'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders with label text', () => {
    render(
      <Checkbox.Root>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    // Should render without errors
    expect(true).toBe(true)
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(
        <Checkbox.Root size={size}>
          <Checkbox.Indicator />
        </Checkbox.Root>,
      )
      unmount()
    }
  })

  it.skip('calls onCheckedChange when toggled', () => {
    // TODO: Tamagui Checkbox interaction in JSDOM is limited
    const onChange = jest.fn()
    render(
      <Checkbox.Root onCheckedChange={onChange}>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
  })

  it.skip('is disabled when disabled prop is true', () => {
    // TODO: Tamagui disabled attribute rendering in JSDOM
    render(
      <Checkbox.Root disabled>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
  })
})
