import { cn } from './cn'

describe('cn', () => {
  it('joins multiple class names with a space', () => {
    expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz')
  })

  it('filters out false values', () => {
    expect(cn('foo', false, 'bar')).toBe('foo bar')
  })

  it('filters out null values', () => {
    expect(cn('foo', null, 'bar')).toBe('foo bar')
  })

  it('filters out undefined values', () => {
    expect(cn('foo', undefined, 'bar')).toBe('foo bar')
  })

  it('filters out mixed falsy values', () => {
    expect(cn(false, 'foo', null, undefined, 'bar', false)).toBe('foo bar')
  })

  it('returns empty string when called with no arguments', () => {
    expect(cn()).toBe('')
  })

  it('returns empty string when all values are falsy', () => {
    expect(cn(false, null, undefined)).toBe('')
  })

  it('does not deduplicate class names', () => {
    expect(cn('foo', 'foo')).toBe('foo foo')
  })

  it('does not trim whitespace in class names', () => {
    expect(cn(' foo ', 'bar')).toBe(' foo  bar')
  })

  it('preserves order of class names', () => {
    expect(cn('c', 'a', 'b')).toBe('c a b')
  })

  it('handles a single class name', () => {
    expect(cn('foo')).toBe('foo')
  })
})
