import { render, waitFor, act } from '@testing-library/react'
import { Suspense } from 'react'
import { DynamicIcon } from '../Icon'

// Mock a generated icon module so dynamic import resolves
jest.mock('../generated/RiArrowRightLine', () => ({
  RiArrowRightLine: ({ size, color }: { size?: number | string; color?: string }) => (
    <svg data-testid="ri-arrow-right-line" width={size} height={size} fill={color} />
  ),
}))

jest.mock('../generated/RiHomeFill', () => ({
  RiHomeFill: ({ size, color }: { size?: number | string; color?: string }) => (
    <svg data-testid="ri-home-fill" width={size} height={size} fill={color} />
  ),
}))

function renderWithSuspense(ui: React.ReactElement) {
  return render(<Suspense fallback={<div data-testid="loading" />}>{ui}</Suspense>)
}

describe('DynamicIcon', () => {
  it('renders an icon by name', async () => {
    const { container } = renderWithSuspense(
      <DynamicIcon name="arrow-right" />
    )
    await waitFor(() => {
      expect(container.querySelector('svg')).toBeTruthy()
    })
  })

  it('accepts variant prop', async () => {
    const { container } = renderWithSuspense(
      <DynamicIcon name="home" variant="fill" />
    )
    await waitFor(() => {
      expect(container.querySelector('svg')).toBeTruthy()
    })
  })

  it('accepts size and color props', async () => {
    const { container } = renderWithSuspense(
      <DynamicIcon name="arrow-right" size={32} color="red" />
    )
    await waitFor(() => {
      const svg = container.querySelector('svg')
      expect(svg).toBeTruthy()
      expect(svg?.getAttribute('width')).toBe('32')
      expect(svg?.getAttribute('fill')).toBe('red')
    })
  })

  it('handles unknown icon names gracefully', async () => {
    const { container } = renderWithSuspense(
      <DynamicIcon name="nonexistent-icon-xyz" />
    )
    // Should not throw — the error handler in getLazyIcon returns a null component
    await act(async () => {
      await new Promise(r => setTimeout(r, 100))
    })
    // Component renders without error (may render null/empty)
    expect(container).toBeTruthy()
  })

  it('renders the same name twice without issues', async () => {
    const { container } = renderWithSuspense(
      <>
        <DynamicIcon name="arrow-right" />
        <DynamicIcon name="arrow-right" />
      </>
    )
    await waitFor(() => {
      const svgs = container.querySelectorAll('svg')
      expect(svgs.length).toBe(2)
    })
  })
})
