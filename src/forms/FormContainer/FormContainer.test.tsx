import { render, screen } from '../../__test-utils__/render'
import { FormContainer } from './FormContainer'

describe('FormContainer', () => {
  it('renders without crashing', () => {
    render(<FormContainer testID="formcontainer" />)
    expect(screen.getByTestId('formcontainer')).toBeTruthy()
  })
})
