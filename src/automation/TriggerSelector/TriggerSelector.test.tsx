import { render, screen } from '../../__test-utils__/render'
import { TriggerSelector } from './TriggerSelector'

describe('TriggerSelector', () => {
  it('renders without crashing', () => {
    render(<TriggerSelector testID="triggerselector" />)
    expect(screen.getByTestId('triggerselector')).toBeTruthy()
  })
})
