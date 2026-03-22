import { useSyncExternalStore } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastVariant = 'neutral' | 'success' | 'error' | 'warning' | 'info'

export interface ToastData {
  id: string
  title: string
  description?: string
  variant: ToastVariant
  duration: number
  action?: { label: string; onClick: () => void }
}

export interface PromiseToastData {
  loading: string
  success: string
  error: string
}

type ToastInput = Omit<ToastData, 'id' | 'variant' | 'duration'> & {
  variant?: ToastVariant
  duration?: number
}

// ─── Store ───────────────────────────────────────────────────────────────────

let counter = 0
let toasts: ToastData[] = []
const listeners = new Set<() => void>()

function generateId(): string {
  return `toast-${++counter}`
}

function notify() {
  for (const listener of listeners) listener()
}

function addToast(input: ToastInput): string {
  const id = generateId()
  toasts = [
    ...toasts,
    { id, variant: 'neutral', duration: 5000, ...input, title: input.title },
  ]
  notify()
  return id
}

function dismissToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id)
  notify()
}

/** Reset store for tests */
export function __resetStore() {
  counter = 0
  toasts = []
  listeners.clear()
}

// ─── Public API ──────────────────────────────────────────────────────────────

export const toast = Object.assign(
  (titleOrInput: string | ToastInput): string => {
    const input = typeof titleOrInput === 'string' ? { title: titleOrInput } : titleOrInput
    return addToast(input)
  },
  {
    success: (titleOrInput: string | Omit<ToastInput, 'variant'>): string => {
      const input = typeof titleOrInput === 'string' ? { title: titleOrInput } : titleOrInput
      return addToast({ ...input, variant: 'success' })
    },
    error: (titleOrInput: string | Omit<ToastInput, 'variant'>): string => {
      const input = typeof titleOrInput === 'string' ? { title: titleOrInput } : titleOrInput
      return addToast({ ...input, variant: 'error' })
    },
    warning: (titleOrInput: string | Omit<ToastInput, 'variant'>): string => {
      const input = typeof titleOrInput === 'string' ? { title: titleOrInput } : titleOrInput
      return addToast({ ...input, variant: 'warning' })
    },
    info: (titleOrInput: string | Omit<ToastInput, 'variant'>): string => {
      const input = typeof titleOrInput === 'string' ? { title: titleOrInput } : titleOrInput
      return addToast({ ...input, variant: 'info' })
    },
    dismiss: dismissToast,
    promise: <T,>(
      promise: Promise<T>,
      msgs: PromiseToastData,
    ): Promise<T> => {
      const id = addToast({ title: msgs.loading, variant: 'neutral' })
      promise.then(
        () => {
          dismissToast(id)
          addToast({ title: msgs.success, variant: 'success' })
        },
        () => {
          dismissToast(id)
          addToast({ title: msgs.error, variant: 'error' })
        },
      )
      return promise
    },
  },
)

// ─── Hook ────────────────────────────────────────────────────────────────────

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return toasts
}

export function useImperativeToasts(): ToastData[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

// ─── Viewport (re-exported from Toast.tsx) ───────────────────────────────────

export { Toaster as ImperativeToastViewport } from './Toast'
