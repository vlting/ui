import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react'

export interface Toast {
  id: string
  message: string
  duration?: number
  [key: string]: unknown
}

export interface UseToastQueueReturn {
  toasts: Toast[]
  add: (toast: Omit<Toast, 'id'>) => string
  remove: (id: string) => void
  removeAll: () => void
}

let counter = 0
function generateId(): string {
  return `toast-${++counter}-${Date.now()}`
}

function createToastStore() {
  let toasts: Toast[] = []
  const listeners = new Set<() => void>()

  function notify() {
    for (const listener of listeners) listener()
  }

  return {
    getSnapshot: () => toasts,
    subscribe: (listener: () => void) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    add: (toast: Omit<Toast, 'id'>): string => {
      const id = generateId()
      toasts = [...toasts, { ...toast, id }]
      notify()
      return id
    },
    remove: (id: string) => {
      toasts = toasts.filter((t) => t.id !== id)
      notify()
    },
    removeAll: () => {
      toasts = []
      notify()
    },
  }
}

export function useToastQueue(): UseToastQueueReturn {
  const storeRef = useRef<ReturnType<typeof createToastStore>>(null)
  if (!storeRef.current) {
    storeRef.current = createToastStore()
  }
  const store = storeRef.current

  const toasts = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot,
  )

  // Auto-dismiss timers
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  useEffect(() => {
    const timers = timersRef.current
    for (const toast of toasts) {
      if (!timers.has(toast.id)) {
        const duration = toast.duration ?? 5000
        const timer = setTimeout(() => {
          store.remove(toast.id)
          timers.delete(toast.id)
        }, duration)
        timers.set(toast.id, timer)
      }
    }

    // Clean up timers for removed toasts
    for (const [id, timer] of timers) {
      if (!toasts.some((t) => t.id === id)) {
        clearTimeout(timer)
        timers.delete(id)
      }
    }
  }, [toasts, store])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const timers = timersRef.current
      for (const timer of timers.values()) clearTimeout(timer)
      timers.clear()
    }
  }, [])

  const add = useCallback((toast: Omit<Toast, 'id'>) => store.add(toast), [store])
  const remove = useCallback((id: string) => store.remove(id), [store])
  const removeAll = useCallback(() => store.removeAll(), [store])

  return { toasts, add, remove, removeAll }
}
