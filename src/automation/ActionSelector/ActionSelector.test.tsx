import { render, screen } from '../../__test-utils__/render'
import { ActionSelector } from './ActionSelector'

describe('ActionSelector', () => {
  it('renders without crashing', () => {
    render(<ActionSelector testID="actionselector" />)
    expect(screen.getByTestId('actionselector')).toBeTruthy()
  })
})
