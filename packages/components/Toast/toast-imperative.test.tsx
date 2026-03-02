import { act } from '@testing-library/react'
import { render, screen, waitFor } from '../../../src/__test-utils__/render'
import { toast, useImperativeToasts, __resetStore } from './toast-imperative'

beforeEach(() => {
  __resetStore()
})

describe('toast store', () => {
  it('toast() adds a toast to the store', () => {
    const id = toast('Hello')
    expect(id).toBe('toast-1')
  })

  it('toast.success() creates a toast with success variant', () => {
    toast.success('Saved')
    // Verify via hook
    let toasts: ReturnType<typeof useImperativeToasts> = []
    function Spy() {
      toasts = useImperativeToasts()
      return null
    }
    render(<Spy />)
    expect(toasts).toHaveLength(1)
    expect(toasts[0].variant).toBe('success')
    expect(toasts[0].title).toBe('Saved')
  })

  it('toast.error() creates a toast with error variant', () => {
    toast.error('Failed')
    let toasts: ReturnType<typeof useImperativeToasts> = []
    function Spy() {
      toasts = useImperativeToasts()
      return null
    }
    render(<Spy />)
    expect(toasts).toHaveLength(1)
    expect(toasts[0].variant).toBe('error')
  })

  it('toast.warning() creates a toast with warning variant', () => {
    toast.warning('Caution')
    let toasts: ReturnType<typeof useImperativeToasts> = []
    function Spy() {
      toasts = useImperativeToasts()
      return null
    }
    render(<Spy />)
    expect(toasts).toHaveLength(1)
    expect(toasts[0].variant).toBe('warning')
  })

  it('toast.dismiss() removes a toast by ID', () => {
    const id = toast('Temp')
    toast.dismiss(id)
    let toasts: ReturnType<typeof useImperativeToasts> = []
    function Spy() {
      toasts = useImperativeToasts()
      return null
    }
    render(<Spy />)
    expect(toasts).toHaveLength(0)
  })

  it('multiple toasts can be active simultaneously', () => {
    toast('One')
    toast.success('Two')
    toast.error('Three')
    let toasts: ReturnType<typeof useImperativeToasts> = []
    function Spy() {
      toasts = useImperativeToasts()
      return null
    }
    render(<Spy />)
    expect(toasts).toHaveLength(3)
  })

  it('toast.promise() creates a loading toast then replaces with success on resolve', async () => {
    const promise = Promise.resolve('data')
    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Done!',
      error: 'Oops',
    })

    let toasts: ReturnType<typeof useImperativeToasts> = []
    function Spy() {
      toasts = useImperativeToasts()
      return null
    }
    render(<Spy />)
    expect(toasts).toHaveLength(1)
    expect(toasts[0].title).toBe('Loading...')

    await act(async () => {
      await promise
    })

    // After resolve: loading dismissed, success created
    expect(toasts.some((t) => t.title === 'Done!' && t.variant === 'success')).toBe(true)
    expect(toasts.some((t) => t.title === 'Loading...')).toBe(false)
  })

  it('toast.promise() creates a loading toast then replaces with error on reject', async () => {
    const promise = Promise.reject(new Error('fail'))

    toast.promise(promise, {
      loading: 'Saving...',
      success: 'Saved',
      error: 'Save failed',
    })

    let toasts: ReturnType<typeof useImperativeToasts> = []
    function Spy() {
      toasts = useImperativeToasts()
      return null
    }
    render(<Spy />)
    expect(toasts).toHaveLength(1)
    expect(toasts[0].title).toBe('Saving...')

    await act(async () => {
      try {
        await promise
      } catch {
        // expected
      }
    })

    expect(toasts.some((t) => t.title === 'Save failed' && t.variant === 'error')).toBe(true)
    expect(toasts.some((t) => t.title === 'Saving...')).toBe(false)
  })
})
