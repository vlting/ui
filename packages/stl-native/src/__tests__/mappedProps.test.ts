import { nativeMappedProps } from '../config/mappedProps'
import { normalizeToRN } from '../config/propMap'

describe('nativeMappedProps', () => {
  describe('padding shorthands', () => {
    it('p expands to all four padding props', () => {
      const result = nativeMappedProps.p(10)
      expect(result).toEqual({
        paddingTop: 10,
        paddingBottom: 10,
        paddingStart: 10,
        paddingEnd: 10,
      })
    })

    it('px expands to horizontal padding', () => {
      const result = nativeMappedProps.px(8)
      expect(result).toEqual({ paddingStart: 8, paddingEnd: 8 })
    })

    it('py expands to vertical padding', () => {
      const result = nativeMappedProps.py(8)
      expect(result).toEqual({ paddingTop: 8, paddingBottom: 8 })
    })

    it('pt/pr/pb/pl expand to individual padding props', () => {
      expect(nativeMappedProps.pt(1)).toEqual({ paddingTop: 1 })
      expect(nativeMappedProps.pr(2)).toEqual({ paddingEnd: 2 })
      expect(nativeMappedProps.pb(3)).toEqual({ paddingBottom: 3 })
      expect(nativeMappedProps.pl(4)).toEqual({ paddingStart: 4 })
    })
  })

  describe('margin shorthands', () => {
    it('m expands to all four margin props', () => {
      const result = nativeMappedProps.m(10)
      expect(result).toEqual({
        marginTop: 10,
        marginBottom: 10,
        marginStart: 10,
        marginEnd: 10,
      })
    })

    it('mx expands to horizontal margin', () => {
      const result = nativeMappedProps.mx(8)
      expect(result).toEqual({ marginStart: 8, marginEnd: 8 })
    })

    it('my expands to vertical margin', () => {
      const result = nativeMappedProps.my(8)
      expect(result).toEqual({ marginTop: 8, marginBottom: 8 })
    })
  })

  describe('background shorthands', () => {
    it('bg maps to backgroundColor', () => {
      expect(nativeMappedProps.bg('red')).toEqual({ backgroundColor: 'red' })
    })

    it('background maps to backgroundColor', () => {
      expect(nativeMappedProps.background('blue')).toEqual({ backgroundColor: 'blue' })
    })
  })

  describe('radius shorthands', () => {
    it('radius expands to all four corner radii', () => {
      const result = nativeMappedProps.radius(8)
      expect(result).toEqual({
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
        borderBottomStartRadius: 8,
        borderBottomEndRadius: 8,
      })
    })

    it('radiusTop expands to top corners', () => {
      const result = nativeMappedProps.radiusTop(8)
      expect(result).toEqual({
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
      })
    })

    it('radiusBottom expands to bottom corners', () => {
      const result = nativeMappedProps.radiusBottom(8)
      expect(result).toEqual({
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
      })
    })
  })

  describe('size shorthands', () => {
    it('size sets both width and height', () => {
      expect(nativeMappedProps.size(100)).toEqual({ height: 100, width: 100 })
    })

    it('w maps to width', () => {
      expect(nativeMappedProps.w(50)).toEqual({ width: 50 })
    })

    it('h maps to height', () => {
      expect(nativeMappedProps.h(50)).toEqual({ height: 50 })
    })

    it('z maps to zIndex', () => {
      expect(nativeMappedProps.z(10)).toEqual({ zIndex: 10 })
    })
  })

  describe('position shorthands', () => {
    it('inset expands to all four directions', () => {
      expect(nativeMappedProps.inset(0)).toEqual({
        top: 0,
        bottom: 0,
        start: 0,
        end: 0,
      })
    })

    it('left maps to start (RTL-aware)', () => {
      expect(nativeMappedProps.left(10)).toEqual({ start: 10 })
    })

    it('right maps to end (RTL-aware)', () => {
      expect(nativeMappedProps.right(10)).toEqual({ end: 10 })
    })
  })

  describe('gap shorthand', () => {
    it('gap expands to rowGap and columnGap', () => {
      expect(nativeMappedProps.gap(12)).toEqual({ rowGap: 12, columnGap: 12 })
    })
  })

  describe('physical → logical margin/padding', () => {
    it('marginLeft maps to marginStart', () => {
      expect(nativeMappedProps.marginLeft(5)).toEqual({ marginStart: 5 })
    })

    it('paddingRight maps to paddingEnd', () => {
      expect(nativeMappedProps.paddingRight(5)).toEqual({ paddingEnd: 5 })
    })
  })

  describe('border shorthands', () => {
    it('borderColor expands to all four sides', () => {
      const result = nativeMappedProps.borderColor('red')
      expect(result).toEqual({
        borderTopColor: 'red',
        borderBottomColor: 'red',
        borderStartColor: 'red',
        borderEndColor: 'red',
      })
    })

    it('borderWidth expands to all four sides', () => {
      const result = nativeMappedProps.borderWidth(1)
      expect(result).toEqual({
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderStartWidth: 1,
        borderEndWidth: 1,
      })
    })
  })
})

describe('normalizeToRN (propMap)', () => {
  it('maps CSS logical props to RN equivalents', () => {
    expect(normalizeToRN('paddingInlineStart')).toBe('paddingStart')
    expect(normalizeToRN('paddingInlineEnd')).toBe('paddingEnd')
    expect(normalizeToRN('marginBlockStart')).toBe('marginTop')
    expect(normalizeToRN('marginBlockEnd')).toBe('marginBottom')
    expect(normalizeToRN('inlineSize')).toBe('width')
    expect(normalizeToRN('blockSize')).toBe('height')
    expect(normalizeToRN('insetBlockStart')).toBe('top')
    expect(normalizeToRN('insetInlineStart')).toBe('start')
  })

  it('maps border logical props', () => {
    expect(normalizeToRN('borderStartStartRadius')).toBe('borderTopStartRadius')
    expect(normalizeToRN('borderEndEndRadius')).toBe('borderBottomEndRadius')
    expect(normalizeToRN('borderBlockStartWidth')).toBe('borderTopWidth')
    expect(normalizeToRN('borderInlineEndColor')).toBe('borderEndColor')
  })

  it('passes through 1:1 mapped props', () => {
    expect(normalizeToRN('backgroundColor')).toBe('backgroundColor')
    expect(normalizeToRN('flexDirection')).toBe('flexDirection')
    expect(normalizeToRN('zIndex')).toBe('zIndex')
  })

  it('passes through unknown props unchanged', () => {
    expect(normalizeToRN('customProp')).toBe('customProp')
    expect(normalizeToRN('transform')).toBe('transform')
  })
})
