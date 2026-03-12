import { type ReactNode, createElement, forwardRef } from 'react'

type AnyProps = { children?: ReactNode; [key: string]: any }

export function createStub(name: string, element: string = 'div') {
  const Stub = forwardRef<any, AnyProps>((props, ref) => {
    return createElement(element, { ref, 'data-stub': name }, props.children)
  })
  Stub.displayName = name
  return Stub as any
}

export function createCompoundStub(
  name: string,
  subs: Record<string, string>,
  rootElement: string = 'div',
) {
  const root = createStub(name, rootElement)
  for (const [key, el] of Object.entries(subs)) {
    ;(root as any)[key] = createStub(`${name}.${key}`, el)
  }
  return root
}

export const noopHook = (() => ({})) as any
export const noopFn = (() => {}) as any
