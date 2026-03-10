import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StlProvider } from '../providers/StlProvider'

/**
 * Minimal renderHook for testing hooks outside a React Native runtime.
 * Uses react-dom/server to execute hooks synchronously in a single render pass.
 */
export function renderHook<T>(hook: () => T): { result: T } {
  let result: T = undefined as any

  function TestComponent() {
    result = hook()
    return null
  }

  function Wrapper() {
    return createElement(StlProvider, null, createElement(TestComponent))
  }

  renderToStaticMarkup(createElement(Wrapper))

  return { result }
}
