import { NativeStyleResolver } from '../config/NativeStyleResolver'
import { CondBit, computeConditionMask } from '../config/conditions'
import { configureTheme, getTheme } from '../config/theme'

beforeAll(() => {
  configureTheme()
})

describe('NativeStyleResolver', () => {
  describe('basic property resolution', () => {
    it('resolves static numeric values', () => {
      const resolver = new NativeStyleResolver({ paddingTop: 16, paddingBottom: 8 })
      const style = resolver.resolve(0)
      expect(style.paddingTop).toBe(16)
      expect(style.paddingBottom).toBe(8)
    })

    it('resolves static string values', () => {
      const resolver = new NativeStyleResolver({
        flexDirection: 'row',
        alignItems: 'center',
      })
      const style = resolver.resolve(0)
      expect(style.flexDirection).toBe('row')
      expect(style.alignItems).toBe('center')
    })

    it('returns a frozen object', () => {
      const resolver = new NativeStyleResolver({ paddingTop: 16 })
      const style = resolver.resolve(0)
      expect(Object.isFrozen(style)).toBe(true)
    })
  })

  describe('token resolution', () => {
    it('resolves space tokens', () => {
      const resolver = new NativeStyleResolver({ paddingTop: '$4' })
      const style = resolver.resolve(0)
      expect(style.paddingTop).toBe(getTheme().light.space.$4)
    })

    it('resolves color tokens', () => {
      const resolver = new NativeStyleResolver({ backgroundColor: '$primary9' })
      const style = resolver.resolve(0)
      expect(style.backgroundColor).toBe(getTheme().light.color.$primary9)
    })

    it('resolves fontSize tokens', () => {
      const resolver = new NativeStyleResolver({ fontSize: '$p' })
      const style = resolver.resolve(0)
      expect(style.fontSize).toBe(getTheme().light.fontSize.$p)
    })
  })

  describe('condition-based styles', () => {
    it('applies dark mode styles when dark bit is set', () => {
      const resolver = new NativeStyleResolver({
        backgroundColor: '$primary9',
      })

      const lightStyle = resolver.resolve(CondBit.light)
      const darkStyle = resolver.resolve(CondBit.dark)

      // Both resolve to color tokens but from different palettes
      expect(lightStyle.backgroundColor).toBe(getTheme().light.color.$primary9)
      expect(darkStyle.backgroundColor).toBe(getTheme().dark.color.$primary9)
    })

    it('applies conditional branch styles via inline conditions', () => {
      const resolver = new NativeStyleResolver({
        paddingTop: { base: '$4', dark: '$8' },
      })

      const lightMask = computeConditionMask({ light: true })
      const darkMask = computeConditionMask({ dark: true })

      const lightStyle = resolver.resolve(lightMask)
      const darkStyle = resolver.resolve(darkMask)

      expect(lightStyle.paddingTop).toBe(getTheme().light.space.$4)
      expect(darkStyle.paddingTop).toBe(getTheme().dark.space.$8)
    })

    it('dark condition branch adds extra props without overriding base', () => {
      const resolver = new NativeStyleResolver({
        paddingTop: '$4',
        dark: {
          paddingBottom: '$8',
        },
      })

      const darkMask = computeConditionMask({ dark: true })
      const darkStyle = resolver.resolve(darkMask)

      // Base paddingTop still applies
      expect(darkStyle.paddingTop).toBe(getTheme().dark.space.$4)
      // Dark branch adds paddingBottom
      expect(darkStyle.paddingBottom).toBe(getTheme().dark.space.$8)
    })

    it('applies responsive conditions via inline conditions', () => {
      const resolver = new NativeStyleResolver({
        paddingTop: { base: '$4', sm: '$8' },
      })

      const baseMask = computeConditionMask({})
      const smMask = computeConditionMask({ sm: true })

      expect(resolver.resolve(baseMask).paddingTop).toBe(getTheme().light.space.$4)
      expect(resolver.resolve(smMask).paddingTop).toBe(getTheme().light.space.$8)
    })

    it('handles inline condition objects', () => {
      const resolver = new NativeStyleResolver({
        paddingTop: { base: '$4', md: '$8' },
      })

      const baseMask = computeConditionMask({})
      const mdMask = computeConditionMask({ md: true })

      expect(resolver.resolve(baseMask).paddingTop).toBe(getTheme().light.space.$4)
      expect(resolver.resolve(mdMask).paddingTop).toBe(getTheme().light.space.$8)
    })
  })

  describe('nth-child styles', () => {
    it('applies first-child styles to index 0 (exclusive props)', () => {
      const resolver = new NativeStyleResolver({
        first: { marginTop: '$0' },
      })

      const style0 = resolver.resolve(0, 0, 5)
      const style1 = resolver.resolve(0, 1, 5)

      expect(style0.marginTop).toBe(getTheme().light.space.$0)
      expect(style1.marginTop).toBeUndefined()
    })

    it('applies last-child styles to last index (exclusive props)', () => {
      const resolver = new NativeStyleResolver({
        last: { marginBottom: '$0' },
      })

      const styleLast = resolver.resolve(0, 4, 5)
      const styleMiddle = resolver.resolve(0, 2, 5)

      expect(styleLast.marginBottom).toBe(getTheme().light.space.$0)
      expect(styleMiddle.marginBottom).toBeUndefined()
    })

    it('applies even-child styles to even indices (exclusive props)', () => {
      const resolver = new NativeStyleResolver({
        even: { backgroundColor: '$primary2' },
      })

      const styleEven = resolver.resolve(0, 0, 4)
      const styleOdd = resolver.resolve(0, 1, 4)

      expect(styleEven.backgroundColor).toBe(getTheme().light.color.$primary2)
      expect(styleOdd.backgroundColor).toBeUndefined()
    })

    it('applies odd-child styles to odd indices (exclusive props)', () => {
      const resolver = new NativeStyleResolver({
        odd: { backgroundColor: '$primary3' },
      })

      const styleEven = resolver.resolve(0, 0, 4)
      const styleOdd = resolver.resolve(0, 1, 4)

      expect(styleEven.backgroundColor).toBeUndefined()
      expect(styleOdd.backgroundColor).toBe(getTheme().light.color.$primary3)
    })

    it('skips nth-child when index/length not provided', () => {
      const resolver = new NativeStyleResolver({
        paddingTop: '$4',
        first: { paddingTop: '$0' },
      })

      const style = resolver.resolve(0)
      expect(style.paddingTop).toBe(getTheme().light.space.$4)
    })
  })

  describe('interaction states', () => {
    it('applies hovered condition via inline conditions', () => {
      const resolver = new NativeStyleResolver({
        backgroundColor: { base: '$primary5', hovered: '$primary6' },
      })

      const normalMask = computeConditionMask({ light: true })
      const hoveredMask = normalMask | CondBit.hovered

      expect(resolver.resolve(normalMask).backgroundColor).toBe(
        getTheme().light.color.$primary5,
      )
      expect(resolver.resolve(hoveredMask).backgroundColor).toBe(
        getTheme().light.color.$primary6,
      )
    })

    it('applies pressed condition via inline conditions', () => {
      const resolver = new NativeStyleResolver({
        backgroundColor: { base: '$primary5', pressed: '$primary7' },
      })

      const pressedMask = CondBit.pressed
      expect(resolver.resolve(pressedMask).backgroundColor).toBe(
        getTheme().light.color.$primary7,
      )
    })

    it('hovered branch adds exclusive props when hovered', () => {
      const resolver = new NativeStyleResolver({
        hovered: { opacity: 0.8 },
      })

      const normalMask = computeConditionMask({ light: true })
      const hoveredMask = normalMask | CondBit.hovered

      expect(resolver.resolve(normalMask).opacity).toBeUndefined()
      expect(resolver.resolve(hoveredMask).opacity).toBe(0.8)
    })
  })

  describe('caching', () => {
    it('returns the same reference for the same mask', () => {
      const resolver = new NativeStyleResolver({ paddingTop: '$4' })
      const a = resolver.resolve(0)
      const b = resolver.resolve(0)
      expect(a).toBe(b)
    })

    it('caches different results for different masks', () => {
      const resolver = new NativeStyleResolver({
        paddingTop: '$4',
        dark: { paddingTop: '$8' },
      })

      const lightResult = resolver.resolve(CondBit.light)
      const darkResult = resolver.resolve(CondBit.dark)

      expect(lightResult).not.toBe(darkResult)
      expect(resolver.resolve(CondBit.light)).toBe(lightResult)
      expect(resolver.resolve(CondBit.dark)).toBe(darkResult)
    })

    it('uses index/length in cache key for nth-child styles', () => {
      const resolver = new NativeStyleResolver({
        paddingTop: '$4',
        first: { paddingTop: '$0' },
      })

      const a = resolver.resolve(0, 0, 5)
      const b = resolver.resolve(0, 1, 5)
      expect(a).not.toBe(b)
    })

    it('invalidate() clears the cache', () => {
      const resolver = new NativeStyleResolver({ paddingTop: '$4' })
      const before = resolver.resolve(0)

      resolver.invalidate()
      const after = resolver.resolve(0)

      // Same value but different frozen object reference after invalidation
      expect(before).not.toBe(after)
      expect(before.paddingTop).toBe(after.paddingTop)
    })
  })

  describe('lineHeight normalization', () => {
    it('converts small lineHeight multipliers to absolute values', () => {
      const resolver = new NativeStyleResolver({
        fontSize: '$p',
        lineHeight: 1.5,
      })
      const style = resolver.resolve(0)
      const expectedFontSize = getTheme().light.fontSize.$p
      expect(style.lineHeight).toBe(Math.round(expectedFontSize * 1.5))
    })

    it('preserves large lineHeight values as-is', () => {
      const resolver = new NativeStyleResolver({
        lineHeight: 24,
      })
      const style = resolver.resolve(0)
      expect(style.lineHeight).toBe(24)
    })
  })

  describe('mapped props (shorthands)', () => {
    it('expands p shorthand to padding props', () => {
      const resolver = new NativeStyleResolver({ p: '$4' })
      const style = resolver.resolve(0)
      const expected = getTheme().light.space.$4
      expect(style.paddingTop).toBe(expected)
      expect(style.paddingBottom).toBe(expected)
      expect(style.paddingStart).toBe(expected)
      expect(style.paddingEnd).toBe(expected)
    })

    it('expands m shorthand to margin props', () => {
      const resolver = new NativeStyleResolver({ m: '$8' })
      const style = resolver.resolve(0)
      const expected = getTheme().light.space.$8
      expect(style.marginTop).toBe(expected)
      expect(style.marginBottom).toBe(expected)
      expect(style.marginStart).toBe(expected)
      expect(style.marginEnd).toBe(expected)
    })

    it('expands bg shorthand to backgroundColor', () => {
      const resolver = new NativeStyleResolver({ bg: '$primary5' })
      const style = resolver.resolve(0)
      expect(style.backgroundColor).toBe(getTheme().light.color.$primary5)
    })
  })

  describe('CSS logical prop normalization', () => {
    it('maps paddingInlineStart to paddingStart', () => {
      const resolver = new NativeStyleResolver({ paddingInlineStart: '$4' })
      const style = resolver.resolve(0)
      expect(style.paddingStart).toBe(getTheme().light.space.$4)
    })

    it('maps inlineSize to width', () => {
      const resolver = new NativeStyleResolver({ inlineSize: '$40' })
      const style = resolver.resolve(0)
      expect(style.width).toBe(getTheme().light.size.$40)
    })
  })

  describe('shadow prop expansion', () => {
    it('expands shadow token to multiple RN shadow props', () => {
      const resolver = new NativeStyleResolver({ shadow: '$md' })
      const style = resolver.resolve(0)
      expect(style.shadowColor).toBe('#000')
      expect(style.shadowOpacity).toBe(0.22)
      expect(style.shadowRadius).toBe(3)
      expect(style.elevation).toBe(3)
    })
  })
})
