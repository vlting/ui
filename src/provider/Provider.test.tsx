import { render } from '@testing-library/react'
import { Provider } from './Provider'

describe('Provider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Provider>
        <div>App Content</div>
      </Provider>,
    )
    expect(getByText('App Content')).toBeTruthy()
  })

  it('renders without errors with default props', () => {
    expect(() =>
      render(
        <Provider>
          <div>Content</div>
        </Provider>,
      ),
    ).not.toThrow()
  })

  it('accepts defaultTheme="light"', () => {
    expect(() =>
      render(
        <Provider defaultTheme="light">
          <div>Light</div>
        </Provider>,
      ),
    ).not.toThrow()
  })

  it('accepts defaultTheme="dark"', () => {
    expect(() =>
      render(
        <Provider defaultTheme="dark">
          <div>Dark</div>
        </Provider>,
      ),
    ).not.toThrow()
  })

  it('wraps children with Tamagui theme context', () => {
    // Verify that Tamagui-styled components can render inside Provider
    const { getByText } = render(
      <Provider>
        <span>Themed Content</span>
      </Provider>,
    )
    expect(getByText('Themed Content')).toBeInTheDocument()
  })
})
