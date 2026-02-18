import { render, screen } from '../../__test-utils__/render'
import { AudienceSelector } from './AudienceSelector'

describe('AudienceSelector', () => {
  it('renders without crashing', () => {
    render(<AudienceSelector testID="audienceselector" />)
    expect(screen.getByTestId('audienceselector')).toBeTruthy()
  })
})
