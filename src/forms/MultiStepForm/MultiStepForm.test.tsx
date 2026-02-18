import { render, screen } from '../../__test-utils__/render'
import { MultiStepForm } from './MultiStepForm'

describe('MultiStepForm', () => {
  it('renders without crashing', () => {
    render(<MultiStepForm testID="multistepform" />)
    expect(screen.getByTestId('multistepform')).toBeTruthy()
  })
})
