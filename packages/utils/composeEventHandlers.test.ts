import { composeEventHandlers } from './composeEventHandlers'

describe('composeEventHandlers', () => {
  it('calls handlers in order', () => {
    const order: number[] = []
    const h1 = () => order.push(1)
    const h2 = () => order.push(2)
    const h3 = () => order.push(3)

    const composed = composeEventHandlers(h1, h2, h3)
    composed({ defaultPrevented: false } as any)

    expect(order).toEqual([1, 2, 3])
  })

  it('skips undefined handlers', () => {
    const order: number[] = []
    const h1 = () => order.push(1)
    const h3 = () => order.push(3)

    const composed = composeEventHandlers(h1, undefined, h3)
    composed({ defaultPrevented: false } as any)

    expect(order).toEqual([1, 3])
  })

  it('short-circuits when defaultPrevented becomes true', () => {
    const order: number[] = []
    const h1 = (event: any) => {
      order.push(1)
      event.defaultPrevented = true
    }
    const h2 = () => order.push(2)

    const composed = composeEventHandlers(h1, h2)
    const event = { defaultPrevented: false }
    composed(event as any)

    expect(order).toEqual([1])
  })

  it('does not short-circuit when defaultPrevented remains false', () => {
    const order: number[] = []
    const h1 = () => order.push(1)
    const h2 = () => order.push(2)

    const composed = composeEventHandlers(h1, h2)
    composed({ defaultPrevented: false } as any)

    expect(order).toEqual([1, 2])
  })

  it('propagates errors from handlers', () => {
    const error = new Error('test error')
    const h1 = () => {
      throw error
    }
    const h2 = jest.fn()

    const composed = composeEventHandlers(h1, h2)

    expect(() => composed({} as any)).toThrow(error)
    expect(h2).not.toHaveBeenCalled()
  })

  it('returns a new function each time', () => {
    const h1 = jest.fn()
    const composed1 = composeEventHandlers(h1)
    const composed2 = composeEventHandlers(h1)

    expect(composed1).not.toBe(composed2)
  })

  it('works with no handlers', () => {
    const composed = composeEventHandlers()
    expect(() => composed({} as any)).not.toThrow()
  })

  it('works with all undefined handlers', () => {
    const composed = composeEventHandlers(undefined, undefined)
    expect(() => composed({} as any)).not.toThrow()
  })

  it('does not modify the event object', () => {
    const event = { defaultPrevented: false, type: 'click' }
    const handler = jest.fn()

    const composed = composeEventHandlers(handler)
    composed(event as any)

    expect(event.type).toBe('click')
  })
})
