import { render, screen } from '../../__test-utils__/render'
import { ABTestVariantCard } from './ABTestVariantCard'

describe('ABTestVariantCard', () => {
  it('renders without crashing', () => {
    render(<ABTestVariantCard testID="abtestvariantcard" />)
    expect(screen.getByTestId('abtestvariantcard')).toBeTruthy()
  })
})
