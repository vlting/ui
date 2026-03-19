import { render, screen } from '../../../../src/__test-utils__/render'
import { Box } from '../primitives/Box/Box'
import { Row } from '../primitives/Row/Row'

describe('styled polymorphic as prop', () => {
  it('Row renders as nav when as="nav"', () => {
    const { container } = render(<Row as="nav">Navigation</Row>)
    expect(container.querySelector('nav')).toBeTruthy()
  })

  it('Box renders as button when as="button"', () => {
    const fn = jest.fn()
    render(
      <Box as="button" onClick={fn}>
        Click
      </Box>,
    )
    const btn = screen.getByText('Click')
    btn.click()
    expect(fn).toHaveBeenCalled()
  })

  it('Box centered variant works with as="section"', () => {
    const { container } = render(
      <Box centered as="section">
        Content
      </Box>,
    )
    expect(container.querySelector('section')).toBeTruthy()
  })
})
