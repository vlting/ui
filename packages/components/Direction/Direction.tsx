import { createStub, noopHook } from '../_stub'

export type DirectionProviderProps = Record<string, any>

export const DirectionProvider = createStub('DirectionProvider', 'div')
export const useDirection = () => 'ltr' as const
export const Direction = { Provider: DirectionProvider }
