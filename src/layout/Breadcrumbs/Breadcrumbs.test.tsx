import { render, screen } from '../../__test-utils__/render'
import { Breadcrumbs } from './Breadcrumbs'

describe('Breadcrumbs', () => {
  it('renders without crashing', () => {
    render(<Breadcrumbs testID="breadcrumbs" />)
    expect(screen.getByTestId('breadcrumbs')).toBeTruthy()
  })
})
