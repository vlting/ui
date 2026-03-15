import { render } from '@testing-library/react'
import type React from 'react'
import { Icon } from './Icon'

const MockIcon: React.FC<{ size?: number; color?: string }> = ({ size, color }) => (
  <svg data-testid="mock-icon" width={size} height={size} fill={color} />
)

describe('Icon', () => {
  it('renders the provided icon component', () => {
    const { getByTestId } = render(<Icon icon={MockIcon} />)
    expect(getByTestId('mock-icon')).toBeTruthy()
  })

  it('passes default size of 20 to the icon', () => {
    const { getByTestId } = render(<Icon icon={MockIcon} />)
    expect(getByTestId('mock-icon').getAttribute('width')).toBe('20')
  })

  it('passes custom size to the icon', () => {
    const { getByTestId } = render(<Icon icon={MockIcon} size={32} />)
    expect(getByTestId('mock-icon').getAttribute('width')).toBe('32')
  })

  it('passes color to the icon', () => {
    const { getByTestId } = render(<Icon icon={MockIcon} color="red" />)
    expect(getByTestId('mock-icon').getAttribute('fill')).toBe('red')
  })
})
