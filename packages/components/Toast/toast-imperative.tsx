import { createStub, noopHook, noopFn } from '../_stub'

export type PromiseToastData = Record<string, any>
export type ToastData = Record<string, any>

export const ImperativeToastViewport = createStub('ImperativeToastViewport', 'div')
export const toast = noopFn
export const useImperativeToasts = noopHook
