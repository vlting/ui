import { type ReactNode, forwardRef } from 'react'

type AnyProps = { children?: ReactNode; [key: string]: any }

const warned = new Set<string>()

export function createNativeStub(name: string) {
  const Stub = forwardRef<any, AnyProps>((_props, _ref) => {
    if (typeof __DEV__ !== 'undefined' && __DEV__ && !warned.has(name)) {
      warned.add(name)
      console.warn(`[vlt-ui] <${name}> is not yet available on React Native.`)
    }
    return null
  })
  Stub.displayName = name
  return Stub as any
}

export function createNativeCompoundStub(name: string, subs: string[]) {
  const root = createNativeStub(name)
  for (const sub of subs) {
    ;(root as any)[sub] = createNativeStub(`${name}.${sub}`)
  }
  return root
}

export { noopHook, noopFn } from './_stub'
