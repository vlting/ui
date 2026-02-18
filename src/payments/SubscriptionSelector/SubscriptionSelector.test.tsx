import { render, screen } from '../../__test-utils__/render'
import { SubscriptionSelector } from './SubscriptionSelector'

describe('SubscriptionSelector', () => {
  it('renders without crashing', () => {
    render(<SubscriptionSelector testID="subscriptionselector" />)
    expect(screen.getByTestId('subscriptionselector')).toBeTruthy()
  })
})
