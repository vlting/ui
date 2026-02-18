import { render, screen } from '../../__test-utils__/render'
import { VariantSelector } from './VariantSelector'

describe('VariantSelector', () => {
  it('renders without crashing', () => {
    render(<VariantSelector testID="variantselector" />)
    expect(screen.getByTestId('variantselector')).toBeTruthy()
  })
})
