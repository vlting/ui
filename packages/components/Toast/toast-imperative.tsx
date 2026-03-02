import { useEffect, useSyncExternalStore } from 'react'
import { Toast as ToastComponent } from './Toast'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning'

export interface ToastData {
  id: string
  title: string
  description?: string
  variant: ToastVariant
  duration?: number
  action?: {
    label: string
    altText: string
    onClick: () => void
  }
}

export type PromiseToastData<T> = {
  loading: string
  success: string | ((data: T) => string)
  error: string | ((err: unknown) => string)
}

// --- Global store (outside React) ---

let listeners: Array<() => void> = []
let toasts: ToastData[] = []
let counter = 0

function getSnapshot() {
  return toasts
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener]
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

function emit(t: ToastData) {
  toasts = [...toasts, t]
  for (const l of listeners) l()
}

function dismiss(id: string) {
  toasts = toasts.filter((t) => t.id !== id)
  for (const l of listeners) l()
}

// --- toast() function + variants ---

function createToast(
  title: string,
  opts?: {
    description?: string
    variant?: ToastVariant
    duration?: number
    action?: ToastData['action']
  },
): string {
  const id = `toast-${++counter}`
  emit({
    id,
    title,
    variant: opts?.variant ?? 'default',
    description: opts?.description,
    duration: opts?.duration,
    action: opts?.action,
  })
  return id
}

export function toast(
  title: string,
  opts?: { description?: string; duration?: number; action?: ToastData['action'] },
): string {
  return createToast(title, { ...opts, variant: 'default' })
}

toast.success = (
  title: string,
  opts?: Omit<Parameters<typeof createToast>[1], 'variant'>,
): string => createToast(title, { ...opts, variant: 'success' })

toast.error = (
  title: string,
  opts?: Omit<Parameters<typeof createToast>[1], 'variant'>,
): string => createToast(title, { ...opts, variant: 'error' })

toast.warning = (
  title: string,
  opts?: Omit<Parameters<typeof createToast>[1], 'variant'>,
): string => createToast(title, { ...opts, variant: 'warning' })

toast.promise = <T,>(promise: Promise<T>, data: PromiseToastData<T>): Promise<T> => {
  const id = createToast(data.loading, { variant: 'default' })
  promise
    .then((result) => {
      dismiss(id)
      const msg = typeof data.success === 'function' ? data.success(result) : data.success
      toast.success(msg)
      return result
    })
    .catch((err) => {
      dismiss(id)
      const msg = typeof data.error === 'function' ? data.error(err) : data.error
      toast.error(msg)
    })
  return promise
}

toast.dismiss = dismiss

// --- React bridge ---

function ImperativeToastItem({ data }: { data: ToastData }) {
  useEffect(() => {
    const duration = data.duration ?? 5000
    const timer = setTimeout(() => dismiss(data.id), duration)
    return () => clearTimeout(timer)
  }, [data.id, data.duration])

  return (
    <ToastComponent.Root variant={data.variant}>
      <ToastComponent.Title>{data.title}</ToastComponent.Title>
      {data.description && (
        <ToastComponent.Description>{data.description}</ToastComponent.Description>
      )}
      {data.action && (
        <ToastComponent.Action altText={data.action.altText}>
          <button
            type="button"
            onClick={() => {
              data.action!.onClick()
              dismiss(data.id)
            }}
          >
            {data.action.label}
          </button>
        </ToastComponent.Action>
      )}
    </ToastComponent.Root>
  )
}

export function ImperativeToastViewport() {
  const currentToasts = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return (
    <>
      {currentToasts.map((t) => (
        <ImperativeToastItem key={t.id} data={t} />
      ))}
    </>
  )
}

export function useImperativeToasts() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

/** Reset store state — for testing only */
export function __resetStore() {
  toasts = []
  counter = 0
  for (const l of listeners) l()
}
