import { describe, it, expect, beforeAll } from 'vitest'
import { resolveToken, isShadowProp, resolveShadowToken } from '../config/tokenResolver'
import { configureTheme, getTheme, type NativeTokenMaps } from '../config/theme'

let lightTokens: NativeTokenMaps
let darkTokens: NativeTokenMaps

beforeAll(() => {
  configureTheme()
  const theme = getTheme()
  lightTokens = theme.light
  darkTokens = theme.dark
})

describe('resolveToken', () => {
  it('passes through numeric values', () => {
    expect(resolveToken('paddingTop', 16, lightTokens)).toBe(16)
    expect(resolveToken('width', 0, lightTokens)).toBe(0)
  })

  it('passes through non-token strings', () => {
    expect(resolveToken('flexDirection', 'row', lightTokens)).toBe('row')
    expect(resolveToken('position', 'absolute', lightTokens)).toBe('absolute')
  })

  it('passes through empty string', () => {
    expect(resolveToken('color', '', lightTokens)).toBe('')
  })

  it('resolves space tokens', () => {
    const resolved = resolveToken('paddingTop', '$4', lightTokens)
    expect(resolved).toBe(lightTokens.space.$4)
    expect(typeof resolved).toBe('number')
  })

  it('resolves color tokens', () => {
    const resolved = resolveToken('backgroundColor', '$primary9', lightTokens)
    expect(resolved).toBe(lightTokens.color.$primary9)
    expect(typeof resolved).toBe('string')
  })

  it('resolves fontSize tokens', () => {
    const resolved = resolveToken('fontSize', '$p', lightTokens)
    expect(resolved).toBe(lightTokens.fontSize.$p)
  })

  it('resolves fontWeight tokens', () => {
    const resolved = resolveToken('fontWeight', '$bold', lightTokens)
    expect(resolved).toBe('700')
  })

  it('resolves radius tokens', () => {
    const resolved = resolveToken('borderRadius', '$round', lightTokens)
    expect(resolved).toBe(9999)
  })

  it('resolves zIndex tokens', () => {
    const resolved = resolveToken('zIndex', '$max', lightTokens)
    expect(resolved).toBe(9999)
  })

  it('resolves lineHeight tokens', () => {
    const resolved = resolveToken('lineHeight', '$body', lightTokens)
    expect(resolved).toBe(lightTokens.lineHeight.$body)
  })

  it('resolves letterSpacing (typoSpace) tokens', () => {
    const resolved = resolveToken('letterSpacing', '$tight', lightTokens)
    expect(resolved).toBe(lightTokens.typoSpace.$tight)
  })

  it('returns token string if prop has no scale mapping', () => {
    expect(resolveToken('unknownProp', '$4', lightTokens)).toBe('$4')
  })

  it('returns token string if token key not found in scale', () => {
    expect(resolveToken('paddingTop', '$nonexistent', lightTokens)).toBe('$nonexistent')
  })

  it('resolves differently for light and dark tokens on color props', () => {
    const light = resolveToken('color', '$primary6', lightTokens)
    const dark = resolveToken('color', '$primary6', darkTokens)
    expect(light).not.toBe(dark)
  })
})

describe('isShadowProp', () => {
  it('returns true for shadow and boxShadow', () => {
    expect(isShadowProp('shadow')).toBe(true)
    expect(isShadowProp('boxShadow')).toBe(true)
  })

  it('returns false for non-shadow props', () => {
    expect(isShadowProp('shadowColor')).toBe(false)
    expect(isShadowProp('padding')).toBe(false)
  })
})

describe('resolveShadowToken', () => {
  it('resolves $sm shadow token', () => {
    const result = resolveShadowToken('$sm')
    expect(result).not.toBeNull()
    expect(result).toHaveProperty('shadowColor')
    expect(result).toHaveProperty('shadowOffset')
    expect(result).toHaveProperty('shadowOpacity')
    expect(result).toHaveProperty('shadowRadius')
    expect(result).toHaveProperty('elevation')
    expect(result!.elevation).toBe(1)
  })

  it('resolves $md, $lg, $xl with increasing elevation', () => {
    const md = resolveShadowToken('$md')!
    const lg = resolveShadowToken('$lg')!
    const xl = resolveShadowToken('$xl')!
    expect(md.elevation).toBe(3)
    expect(lg.elevation).toBe(6)
    expect(xl.elevation).toBe(12)
  })

  it('returns null for non-token values', () => {
    expect(resolveShadowToken('none')).toBeNull()
    expect(resolveShadowToken(0)).toBeNull()
    expect(resolveShadowToken('$unknown')).toBeNull()
  })
})
