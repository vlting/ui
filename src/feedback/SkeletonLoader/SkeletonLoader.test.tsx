import { render, screen } from '../../__test-utils__/render'
import { SkeletonLoader } from './SkeletonLoader'

describe('SkeletonLoader', () => {
  it('renders without crashing', () => {
    render(<SkeletonLoader testID="skeletonloader" />)
    expect(screen.getByTestId('skeletonloader')).toBeTruthy()
  })
})
