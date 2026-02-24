import { createRef } from 'react'
import { mergeRefs } from './mergeRefs'

describe('mergeRefs', () => {
  it('assigns value to callback refs', () => {
    const cb = jest.fn()
    const merged = mergeRefs(cb)
    const node = document.createElement('div')

    merged(node)

    expect(cb).toHaveBeenCalledWith(node)
  })

  it('assigns value to ref objects', () => {
    const ref = createRef<HTMLDivElement>()
    const merged = mergeRefs(ref)
    const node = document.createElement('div')

    merged(node)

    expect(ref.current).toBe(node)
  })

  it('assigns value to multiple refs', () => {
    const cb = jest.fn()
    const refObj = createRef<HTMLDivElement>()
    const merged = mergeRefs(cb, refObj)
    const node = document.createElement('div')

    merged(node)

    expect(cb).toHaveBeenCalledWith(node)
    expect(refObj.current).toBe(node)
  })

  it('skips undefined refs', () => {
    const cb = jest.fn()
    const merged = mergeRefs(undefined, cb, undefined)
    const node = document.createElement('div')

    merged(node)

    expect(cb).toHaveBeenCalledWith(node)
  })

  it('skips null refs', () => {
    const cb = jest.fn()
    const merged = mergeRefs(null, cb)
    const node = document.createElement('div')

    merged(node)

    expect(cb).toHaveBeenCalledWith(node)
  })

  it('assigns refs in order', () => {
    const order: number[] = []
    const cb1 = () => order.push(1)
    const cb2 = () => order.push(2)
    const cb3 = () => order.push(3)

    const merged = mergeRefs(cb1, cb2, cb3)
    merged(document.createElement('div'))

    expect(order).toEqual([1, 2, 3])
  })

  it('handles cleanup with null value', () => {
    const cb = jest.fn()
    const refObj = createRef<HTMLDivElement>()
    const merged = mergeRefs(cb, refObj)
    const node = document.createElement('div')

    merged(node)
    merged(null)

    expect(cb).toHaveBeenCalledWith(null)
    expect(refObj.current).toBeNull()
  })

  it('returns a new function each time', () => {
    const cb = jest.fn()
    const merged1 = mergeRefs(cb)
    const merged2 = mergeRefs(cb)

    expect(merged1).not.toBe(merged2)
  })

  it('works with no refs', () => {
    const merged = mergeRefs()
    expect(() => merged(document.createElement('div'))).not.toThrow()
  })
})
