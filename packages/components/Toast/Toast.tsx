import { createStub, noopHook, noopFn } from '../_stub'

export type ToastRootProps = Record<string, any>
export type ToastViewportProps = Record<string, any>
export type ToastProviderProps = Record<string, any>

export const Toast = {
  Root: createStub('Toast.Root', 'div'),
  Title: createStub('Toast.Title', 'div'),
  Description: createStub('Toast.Description', 'p'),
  Action: createStub('Toast.Action', 'button'),
  Close: createStub('Toast.Close', 'button'),
  Viewport: createStub('Toast.Viewport', 'div'),
  Provider: createStub('Toast.Provider', 'div'),
  ImperativeViewport: createStub('Toast.ImperativeViewport', 'div'),
}

export const useToastController = noopHook
export const useToastState = noopHook
