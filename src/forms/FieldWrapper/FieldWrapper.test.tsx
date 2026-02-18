import { render, screen } from '../../__test-utils__/render'
import { FieldWrapper } from './FieldWrapper'

describe('FieldWrapper', () => {
  it('renders without crashing', () => {
    render(<FieldWrapper testID="fieldwrapper" />)
    expect(screen.getByTestId('fieldwrapper')).toBeTruthy()
  })
})
