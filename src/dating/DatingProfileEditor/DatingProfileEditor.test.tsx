import { render, screen } from '../../__test-utils__/render'
import { DatingProfileEditor } from './DatingProfileEditor'

describe('DatingProfileEditor', () => {
  it('renders without crashing', () => {
    render(<DatingProfileEditor testID="datingprofileeditor" />)
    expect(screen.getByTestId('datingprofileeditor')).toBeTruthy()
  })
})
