/**
 * NOTES:
 * Use `InlineStart` as left, and `InlineEnd` as right, instead of RTL "magic"
 * Use `border-start-start-radius` (etc) for radii
 *
 * Create a global style for `[dir]` that sets the `direction: ___;` css property
 *
 * Convert padding, margin, and other shorthand props (border, etc) to their
 * 4 directional counterparts, in the resolver, to reduce number of classes we generate.
 *
 * Make sure `initial` and (for inherited props) `inherit` values are available to
 * any props that can use them; they could be used to emulate inverted breakpoints.
 */

/** PREFIX LEGEND *********************************************************************************
 * $  -> Theme object OR theme token OR compound theme value.
 * :  -> CSS pseudo-classes for interaction state OR for structural targeting.
 * !  -> Inverted breakpoint (mobile-first) OR inverted media query.
 *       E.g. `!lowMotion` matches when the user agent does NOT request reduced motion.
 *************************************************************************************************/

import { globalKeyframes, globalStyle } from '@vanilla-extract/css'
import { COLOR_MODE_ATTR, CoreColorName, STYLE_UNIT } from '../shared/models/'
import { getTextColor } from '../shared/utils/'
import {
  type StlPropKey,
  type CssRule,
  type FilterKeys,
  type NthChildKeys,
  type PseudoClassesWithAliases,
  generateCustomVarPropsCss,
  generatePseudoClassCss,
  generateScaledPropsCss,
  generateStaticPropsCss,
} from './props'
import {
  type BaseVars,
  type CssAliasMap,
  type PrefixedKey,
  SCALED_ALIAS,
  type ThemeProps,
  type animationCombos,
  type borderCombos,
  type fontCombos,
  getAnimation,
  getBorder,
  getColor,
  getColumn,
  getFont,
  getFontFamily,
  getGradient,
  getFontSize,
  getFontWeight,
  getLineHeight,
  getOutline,
  getRadius,
  getRow,
  getShadow,
  getSize,
  getSpace,
  getTextDecoration,
  getTypo,
  getTypoSpace,
  getZIndex,
  type outlineCombos,
  type textDecorationCombos,
  type typoCombos,
} from './scales'
import {
  BASE,
  type ConditionKey,
  type StlFromCustomVars,
  type StlFromMap,
  type InlineConditionStl,
  type MergedCssProps,
} from './styles.models'
import {
  addPrefix,
  classHash,
  getSelector,
  keyframeHash,
  removePrefix,
  varHash,
} from './utils'

/*************************************************************************************************
 * STYLING SYSTEM GENERATION
 *************************************************************************************************/
// GENERATE THEME SCALES //////////////////////////////////////////////////////////////////////////
const size = getSize(varHash)
const space = getSpace(varHash, size.vars)
const color = getColor(varHash)
const fontSize = getFontSize(varHash)
const fontWeight = getFontWeight(varHash)
const fontFamily = getFontFamily(varHash)
const font = getFont()
const border = getBorder(varHash, color.vars)
const outline = getOutline(varHash, color.vars)
const radius = getRadius(varHash)
const zIndex = getZIndex(varHash)
const column = getColumn(varHash, size.vars)
const row = getRow(varHash, column.vars)
const lineHeight = getLineHeight(varHash, size.vars)
const typoSpace = getTypoSpace(varHash)
const typo = getTypo()
const textDecoration = getTextDecoration(varHash, color.vars)
const shadow = getShadow(varHash, color.vars)
const animation = getAnimation(varHash, keyframeHash)
const gradient = getGradient(varHash)

const scales = {
  animation,
  border,
  color,
  column,
  font,
  fontFamily,
  fontSize,
  fontWeight,
  gradient,
  lineHeight,
  outline,
  radius,
  row,
  shadow,
  size,
  space,
  textDecoration,
  typoSpace,
  typo,
  zIndex,
} as const

export const managerScales = {
  animation: {
    aliasMap: animation.aliasMap,
    cssAliasMap: animation.cssAliasMap,
    themeProps: animation.themeProps,
  },
  border: {
    aliasMap: border.aliasMap,
    cssAliasMap: border.cssAliasMap,
    themeProps: border.themeProps,
  },
  color: {
    aliasMap: color.aliasMap,
    cssAliasMap: color.cssAliasMap,
    themeProps: color.themeProps,
  },
  column: {
    aliasMap: column.aliasMap,
    cssAliasMap: column.cssAliasMap,
    themeProps: column.themeProps,
  },
  font: {
    aliasMap: font.aliasMap,
    cssAliasMap: font.cssAliasMap,
    themeProps: font.themeProps,
  },
  fontFamily: {
    aliasMap: fontFamily.aliasMap,
    cssAliasMap: fontFamily.cssAliasMap,
    themeProps: fontFamily.themeProps,
  },
  fontSize: {
    aliasMap: fontSize.aliasMap,
    cssAliasMap: fontSize.cssAliasMap,
    themeProps: fontSize.themeProps,
  },
  fontWeight: {
    aliasMap: fontWeight.aliasMap,
    cssAliasMap: fontWeight.cssAliasMap,
    themeProps: fontWeight.themeProps,
  },
  gradient: {
    aliasMap: gradient.aliasMap,
    cssAliasMap: gradient.cssAliasMap,
    themeProps: gradient.themeProps,
  },
  lineHeight: {
    aliasMap: lineHeight.aliasMap,
    cssAliasMap: lineHeight.cssAliasMap,
    themeProps: lineHeight.themeProps,
  },
  outline: {
    aliasMap: outline.aliasMap,
    cssAliasMap: outline.cssAliasMap,
    themeProps: outline.themeProps,
  },
  radius: {
    aliasMap: radius.aliasMap,
    cssAliasMap: radius.cssAliasMap,
    themeProps: radius.themeProps,
  },
  row: {
    aliasMap: row.aliasMap,
    cssAliasMap: row.cssAliasMap,
    themeProps: row.themeProps,
  },
  shadow: {
    aliasMap: shadow.aliasMap,
    cssAliasMap: shadow.cssAliasMap,
    themeProps: shadow.themeProps,
  },
  size: {
    aliasMap: size.aliasMap,
    cssAliasMap: size.cssAliasMap,
    themeProps: size.themeProps,
  },
  space: {
    aliasMap: space.aliasMap,
    cssAliasMap: space.cssAliasMap,
    themeProps: space.themeProps,
  },
  textDecoration: {
    aliasMap: textDecoration.aliasMap,
    cssAliasMap: textDecoration.cssAliasMap,
    themeProps: textDecoration.themeProps,
  },
  typoSpace: {
    aliasMap: typoSpace.aliasMap,
    cssAliasMap: typoSpace.cssAliasMap,
    themeProps: typoSpace.themeProps,
  },
  typo: {
    aliasMap: typo.aliasMap,
    cssAliasMap: typo.cssAliasMap,
    themeProps: typo.themeProps,
  },
  zIndex: {
    aliasMap: zIndex.aliasMap,
    cssAliasMap: zIndex.cssAliasMap,
    themeProps: zIndex.themeProps,
  },
} as const

// GLOBAL STYLES //////////////////////////////////////////////////////////////////////////////////
// Function that generates the styles
globalStyle('html, body', {
  margin: 0,
  padding: 0,
  vars: { '--stl-loaded': '1' },
})
globalStyle('html', { fontSize: '6.25%' })
globalStyle('body', {
  background: color.vars.background2.ref,
  color: color.vars.defaultBody.ref,
  fontSize: '16em',
  fontWeight: fontWeight.vars.p.ref,
  lineHeight: lineHeight.vars.body.ref,
})
// Fix for Safari to properly set `rem` units
globalStyle('html', {
  '@media': {
    'not all and (min-resolution:.001dpcm)': {
      '@supports': {
        '(-webkit-appearance:none)': {
          fontSize: '1px',
        },
      },
    },
  },
})
// Fix for Safari 16+ to properly set `rem` units
globalStyle('html', {
  '@supports': {
    '(hanging-punctuation: first) and (font: -apple-system-body) and (-webkit-appearance: none)':
      {
        fontSize: '1px',
      },
  },
})
globalStyle('*', {
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  boxSizing: 'border-box',
})
globalStyle('*::placeholder', {
  color: color.vars.neutral8.ref,
})
globalStyle('body, a, p, li, strong, em, b, i, button', {
  fontFamily: fontFamily.vars.body.ref,
})
globalStyle('button', {
  fontFamily: fontFamily.vars.button.ref,
})
globalStyle('button:focus', {
  outline: 'none',
})
globalStyle('pre, code', {
  fontFamily: fontFamily.vars.code.ref,
})
globalStyle('code', {
  background: color.vars.maxAlpha2.ref,
  color: color.vars.max.ref,
  fontWeight: fontWeight.vars.code.ref,
})
globalStyle('blockquote', {
  fontFamily: fontFamily.vars.quote.ref,
  fontSize: fontSize.vars.quote.ref,
  lineHeight: lineHeight.vars.spaced.ref,
  fontStyle: 'italic',
})
globalStyle('ul', {
  listStyleType: 'circle',
})
globalStyle('a, p, li, pre, code, strong, em, b, i, blockquote', {
  fontSize: fontSize.vars.p.ref,
})
globalStyle('p', {
  marginBlockStart: space.vars[0].ref,
  marginBlockEnd: space.vars[16].ref,
})
globalStyle('p:last-child', {
  marginBlockEnd: space.vars[0].ref,
})
globalStyle('a', {
  color: color.vars.primary9.ref,
  textDecoration: 'none',
})
globalStyle('blockquote, pre', {
  background: color.vars.background3.ref,
  color: color.vars[getTextColor(CoreColorName.background, 3)].ref,
  marginInline: 0,
  paddingInline: space.vars[32].ref,
  paddingBlock: space.vars[20].ref,
  borderRadius: radius.vars.rounded.ref,
})
globalStyle('h1, h2', {
  marginBlockStart: space.vars[24].ref,
  marginBlockEnd: space.vars[8].ref,
})
globalStyle('h3, h4, h5, h6', {
  marginBlockStart: space.vars[16].ref,
  marginBlockEnd: space.vars[8].ref,
})
const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const titleSelectors = [
  mapSelectorsToTemplate('&:first-child', ...headings),
  mapSelectorsToTemplate('h1 + &', ...['h2', 'h3', 'h4', 'h5', 'h6']),
  mapSelectorsToTemplate('h2 + &', ...['h3', 'h4', 'h5', 'h6']),
  mapSelectorsToTemplate('h3 + &', ...['h4', 'h5', 'h6']),
  mapSelectorsToTemplate('h4 + &', ...['h5', 'h6']),
  mapSelectorsToTemplate('h5 + &', 'h6'),
]
globalStyle(titleSelectors.join(', '), {
  marginBlockStart: space.vars[0].ref,
})
globalStyle(mapSelectorsToTemplate('&, & > a, & > span', 'h1', 'h2'), {
  fontFamily: fontFamily.vars.heading.ref,
})
globalStyle(mapSelectorsToTemplate('&, & > a, & > span', 'h3', 'h4', 'h5', 'h6'), {
  fontFamily: fontFamily.vars.subheading.ref,
})
globalStyle('h1, h1 > a, h1 > span', {
  fontSize: fontSize.vars.h1.ref,
  fontWeight: fontWeight.vars.h1.ref,
})
globalStyle('h2, h2 > a, h2 > span', {
  fontSize: fontSize.vars.h2.ref,
  fontWeight: fontWeight.vars.h2.ref,
})
globalStyle('h3, h3 > a, h3 > span', {
  fontSize: fontSize.vars.h3.ref,
  fontWeight: fontWeight.vars.h3.ref,
})
globalStyle('h4, h4 > a, h4 > span', {
  fontSize: fontSize.vars.h4.ref,
  fontWeight: fontWeight.vars.h4.ref,
})
globalStyle('h5, h5 > a, h5 > span', {
  fontSize: fontSize.vars.h5.ref,
  fontWeight: fontWeight.vars.h5.ref,
})
globalStyle('h6, h6 > a, h6 > span', {
  fontSize: fontSize.vars.h6.ref,
  fontWeight: fontWeight.vars.h6.ref,
})
globalStyle('em', {
  fontStyle: 'normal',
})
globalStyle('strong', {
  fontWeight: fontWeight.vars.p.ref,
})
globalStyle('::selection', {
  background: color.vars.primary9.ref,
  color: color.vars[getTextColor(CoreColorName.primary, 9)].ref,
})

/** Get a series of selectors from a template (replaces instances of `&`) */
function mapSelectorsToTemplate(template: string, ...targets: string[]) {
  let output = ''
  targets.forEach((target, index) => {
    const prefix = index === 0 ? '' : ','
    output += `${prefix}${template.replaceAll('&', target)}`
  })
  return output
}

// Add keyframes to CSS
if (animation.keyframes) {
  Object.entries(animation.keyframes).forEach(([name, rule]) => {
    globalKeyframes(name, rule)
  })
}

// Reduced motion: disable animations and transitions for users who prefer it
globalStyle('*', {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animationDuration: '0.01s !important',
      animationIterationCount: '1 !important',
      transitionDuration: '0.01s !important',
    },
  },
})

// CUSTOM VAR PROPS ///////////////////////////////////////////////////////////////////////////////
/** Generate vars and classes for custom props */
const customVarProps = generateCustomVarPropsCss(
  (prop: StlPropKey, template?: (value: string) => string) => {
    const cssVar = varHash.var
    const className = classHash.name
    template = template ?? ((v: string) => v)
    globalStyle(getSelector(className), {
      [prop]: template(cssVar.ref),
    })
    return { varName: cssVar.name, className }
  },
)

/** Generate CSS props that are _pseudo class based_, for custom var props */
const pseudoClassCustomVarPropGenerator = (pseudoClass: string, keys: FilterKeys) =>
  generateCustomVarPropsCss((prop: StlPropKey, template?: (value: string) => string) => {
    const cssVar = varHash.var
    const className = classHash.name
    template = template ?? ((v: string) => v)
    globalStyle(getSelector(className, pseudoClass), {
      [prop]: template(cssVar.ref),
    })
    return { varName: cssVar.name, className }
  }, keys)

const customVarPropsPC = generatePseudoClassCss<typeof customVarProps>(
  pseudoClassCustomVarPropGenerator,
)

// SCALED PROPS ///////////////////////////////////////////////////////////////////////////////////
/** Generate CSS props that are based on scales */
const scaledProps = generateScaledPropsCss(scales, (value: CssRule) => {
  const className = classHash.name
  globalStyle(getSelector(className), value)
  return className
})

/** Generate CSS props that are _pseudo class based_, and based on scales */
const scaledPropsPC = generatePseudoClassCss<typeof scaledProps>(
  (pseudoClass: string, keys: FilterKeys) =>
    generateScaledPropsCss(
      scales,
      (value: CssRule) => {
        const className = classHash.name
        globalStyle(getSelector(className, pseudoClass), value)
        return className
      },
      keys,
    ),
)

// STATIC PROPS ///////////////////////////////////////////////////////////////////////////////////
/** Generate CSS props that are based on scales */
const staticProps = generateStaticPropsCss((value: CssRule) => {
  const className = classHash.name
  globalStyle(getSelector(className), value)
  return className
})

/** Generate CSS props that are _pseudo class based_, and based on scales */
const staticPropsPC = generatePseudoClassCss<typeof staticProps>(
  (pseudoClass: string, keys: FilterKeys) =>
    generateStaticPropsCss((value: CssRule) => {
      const className = classHash.name
      globalStyle(getSelector(className, pseudoClass), value)
      return className
    }, keys),
)

// PROP MAPS //////////////////////////////////////////////////////////////////////////////////////
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const scaledPropMap: Record<string, any> = {
  ...scaledPropsPC,
  [BASE]: scaledProps,
}
export const customVarPropMap = {
  ...customVarPropsPC,
  [BASE]: customVarProps,
}
export const staticPropMap = {
  ...staticPropsPC,
  [BASE]: staticProps,
}

/*************************************************************************************************
 * TYPE GENERATION
 *************************************************************************************************/
/** Scaled props that override mapped props */
export type OverrideScaledProp = {
  font: PrefixedKey<typeof fontCombos> | keyof typeof staticProps.font
  typo: PrefixedKey<typeof typoCombos> | keyof typeof staticProps.typo
  animation: PrefixedKey<typeof animationCombos> | keyof typeof staticProps.animation
  textDecoration:
    | PrefixedKey<typeof textDecorationCombos>
    | keyof typeof staticProps.textDecoration
  outline: PrefixedKey<typeof outlineCombos> | keyof typeof staticProps.outline
  border: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.border
  borderBlock: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.border
  borderInline: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.border
  borderTop: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.border
  borderBottom: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.border
  borderLeft: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.border
  borderRight: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.border
  borderBlockStart:
    | PrefixedKey<typeof borderCombos>
    | keyof typeof staticProps.borderBlockStart
  borderBlockEnd:
    | PrefixedKey<typeof borderCombos>
    | keyof typeof staticProps.borderBlockEnd
  borderInlineStart:
    | PrefixedKey<typeof borderCombos>
    | keyof typeof staticProps.borderInlineStart
  borderInlineEnd:
    | PrefixedKey<typeof borderCombos>
    | keyof typeof staticProps.borderInlineEnd
}

// Pseudo-class types
type A = typeof scaledPropsPC
type B = typeof customVarPropsPC
type C = typeof staticPropsPC

// Inline-conditional, pseudo-class types
type ICFocusVisible = {
  ':focus-visible'?: InlineConditionStl<
    MergedCssProps<
      StlFromMap<A[':focus-visible']>,
      StlFromCustomVars<B[':focus-visible']>,
      StlFromMap<C[':focus-visible']>
    >
  >
}
type ICHover = {
  ':hover'?: InlineConditionStl<
    MergedCssProps<
      StlFromMap<A[':hover']>,
      StlFromCustomVars<B[':hover']>,
      StlFromMap<C[':hover']>
    >
  >
}
type ICActive = {
  ':active'?: InlineConditionStl<
    MergedCssProps<
      StlFromMap<A[':active']>,
      StlFromCustomVars<B[':active']>,
      StlFromMap<C[':active']>
    >
  >
}
type ICMergePCCssProps = ICFocusVisible & ICHover & ICActive

// CSS types
type ScaledProps = StlFromMap<typeof scaledProps>
type CustomVarProps = StlFromCustomVars<typeof customVarProps>
type StaticProps = StlFromMap<typeof staticProps>

type CssProps = MergedCssProps<ScaledProps, CustomVarProps, StaticProps>
type NthChildClasses = { [key in NthChildKeys]?: InlineConditionStl<CssProps> }

/** Style object, including pseudo-classes and INLINE conditions, but excluding root-level conditions */
export type BaseSTL = InlineConditionStl<CssProps> &
  PseudoClassesWithAliases<ICMergePCCssProps> &
  NthChildClasses

/** Style object for root-level conditions, including pseudo-classes */
export type ConditionalSTL = { [k in ConditionKey]?: BaseSTL & ConditionalSTL }

/** Full type of STL style objects, including pseudo-classes and conditions */
export type STL = BaseSTL & ConditionalSTL

/*************************************************************************************************
 * THEME GENERATION
 *************************************************************************************************/
export const varMap = {} as Record<string, string | number>
/** @deprecated Dark mode vars are now delivered via build-time CSS. This export will be removed in the next major. */
export const darkVarMap = {} as Record<string, string | number>

function getTokensFromVars<V extends BaseVars>(vars: V, map = varMap) {
  return Object.entries(vars).reduce(
    (output, [key, { name, value }]) => {
      output[addPrefix(key) as PrefixedKey<V>] = `var(${name})`
      if (typeof value === 'string') {
        map[name] = value
      }
      return output
    },
    {} as { [k in PrefixedKey<V>]: string },
  )
}

function getTokenToVarsMap<V extends BaseVars, A extends CssAliasMap>(
  vars: V,
  aliases?: A,
) {
  const output = {} as { [k in PrefixedKey<V>]: string }
  Object.entries(vars).forEach(([key, entry]) => {
    if (!entry || typeof entry !== 'object' || !('name' in entry)) return
    const token = addPrefix(key)
    output[token as keyof typeof output] = entry.name
    return output
  })
  if (aliases) {
    Object.entries(aliases).forEach(([token, alias]) => {
      const keyFromAlias = removePrefix(alias)
      const varEntry = vars[keyFromAlias]
      output[token as keyof typeof output] =
        keyFromAlias === SCALED_ALIAS ? SCALED_ALIAS : (varEntry?.name ?? '')
      return output
    })
  }
  return output
}

function getThemeProps<T extends ThemeProps>(props: T) {
  return Object.entries(props).reduce(
    (output, [key, value]) => {
      output[key as keyof typeof output] = value
      return output
    },
    {} as { [k in keyof T]: string },
  )
}

function deepFreeze<T extends object>(obj: T): T {
  Object.freeze(obj)
  for (const val of Object.values(obj)) {
    if (val && typeof val === 'object' && !Object.isFrozen(val)) {
      deepFreeze(val)
    }
  }
  return obj
}

/** Maps theme tokens to CSS variables that hold these token values */
export const token = deepFreeze({
  animation: getTokensFromVars(animation.vars),
  border: getTokensFromVars(border.vars),
  color: getTokensFromVars(color.vars),
  column: getTokensFromVars(column.vars),
  font: getTokensFromVars(font.vars),
  fontFamily: getTokensFromVars(fontFamily.vars),
  fontSize: getTokensFromVars(fontSize.vars),
  fontWeight: getTokensFromVars(fontWeight.vars),
  gradient: getTokensFromVars(gradient.vars),
  lineHeight: getTokensFromVars(lineHeight.vars),
  outline: getTokensFromVars(outline.vars),
  radius: getTokensFromVars(radius.vars),
  row: getTokensFromVars(row.vars),
  shadow: getTokensFromVars(shadow.vars),
  size: getTokensFromVars(size.vars),
  space: getTokensFromVars(space.vars),
  textDecoration: getTokensFromVars(textDecoration.vars),
  typoSpace: getTokensFromVars(typoSpace.vars),
  typo: getTokensFromVars(typo.vars),
  zIndex: getTokensFromVars(zIndex.vars),
})

/** Alternative way to use theme tokens, instead of string values */
export const theme = deepFreeze({
  animation: getThemeProps(animation.themeProps),
  border: getThemeProps(border.themeProps),
  color: getThemeProps(color.themeProps),
  column: getThemeProps(column.themeProps),
  font: getThemeProps(font.themeProps),
  fontFamily: getThemeProps(fontFamily.themeProps),
  fontSize: getThemeProps(fontSize.themeProps),
  fontWeight: getThemeProps(fontWeight.themeProps),
  gradient: getThemeProps(gradient.themeProps),
  lineHeight: getThemeProps(lineHeight.themeProps),
  outline: getThemeProps(outline.themeProps),
  radius: getThemeProps(radius.themeProps),
  row: getThemeProps(row.themeProps),
  shadow: getThemeProps(shadow.themeProps),
  size: getThemeProps(size.themeProps),
  space: getThemeProps(space.themeProps),
  textDecoration: getThemeProps(textDecoration.themeProps),
  typoSpace: getThemeProps(typoSpace.themeProps),
  typo: getThemeProps(typo.themeProps),
  zIndex: getThemeProps(zIndex.themeProps),
})

/**
 * Can be used to convert a theme token value (e.g., `$primary9` color), to a CSS var.
 *
 * For instance, when generating styles for color, the generator could check `scaledProps.color` to
 * see if a key exists there; if it doesn't, it could use this map to convert the value into a var
 * instead, which will leverage our custom var system instead of a pre-generated CSS class.
 */
export const tokenToVarMap = {
  animation: getTokenToVarsMap(animation.vars, animation.cssAliasMap),
  border: getTokenToVarsMap(border.vars, border.cssAliasMap),
  color: getTokenToVarsMap(color.vars, color.cssAliasMap),
  column: getTokenToVarsMap(column.vars, column.cssAliasMap),
  font: getTokenToVarsMap(font.vars, font.cssAliasMap),
  fontFamily: getTokenToVarsMap(fontFamily.vars, fontFamily.cssAliasMap),
  fontSize: getTokenToVarsMap(fontSize.vars, fontSize.cssAliasMap),
  fontWeight: getTokenToVarsMap(fontWeight.vars, fontWeight.cssAliasMap),
  gradient: getTokenToVarsMap(gradient.vars, gradient.cssAliasMap),
  lineHeight: getTokenToVarsMap(lineHeight.vars, lineHeight.cssAliasMap),
  outline: getTokenToVarsMap(outline.vars, outline.cssAliasMap),
  radius: getTokenToVarsMap(radius.vars, radius.cssAliasMap),
  row: getTokenToVarsMap(row.vars, row.cssAliasMap),
  shadow: getTokenToVarsMap(shadow.vars, shadow.cssAliasMap),
  size: getTokenToVarsMap(size.vars, size.cssAliasMap),
  space: getTokenToVarsMap(space.vars, space.cssAliasMap),
  textDecoration: getTokenToVarsMap(textDecoration.vars, textDecoration.cssAliasMap),
  typoSpace: getTokenToVarsMap(typoSpace.vars, typoSpace.cssAliasMap),
  typo: getTokenToVarsMap(typo.vars, typo.cssAliasMap),
  zIndex: getTokenToVarsMap(zIndex.vars, zIndex.cssAliasMap),
} as const

function getTokenToValuesMap<
  G extends keyof typeof tokenToVarMap,
  M extends (typeof tokenToVarMap)[G],
>(_group: G, tokenMap: M) {
  return Object.entries(tokenMap).reduce(
    (acc, [token, varName]) => {
      acc[token as keyof typeof acc] = String(varMap[varName])
      return acc
    },
    {} as { [k in keyof M]: string },
  )
}

export const tokenValue = deepFreeze({
  animation: getTokenToValuesMap('animation', tokenToVarMap.animation),
  border: getTokenToValuesMap('border', tokenToVarMap.border),
  color: getTokenToValuesMap('color', tokenToVarMap.color),
  column: getTokenToValuesMap('column', tokenToVarMap.column),
  font: getTokenToValuesMap('font', tokenToVarMap.font),
  fontFamily: getTokenToValuesMap('fontFamily', tokenToVarMap.fontFamily),
  fontSize: getTokenToValuesMap('fontSize', tokenToVarMap.fontSize),
  fontWeight: getTokenToValuesMap('fontWeight', tokenToVarMap.fontWeight),
  lineHeight: getTokenToValuesMap('lineHeight', tokenToVarMap.lineHeight),
  outline: getTokenToValuesMap('outline', tokenToVarMap.outline),
  radius: getTokenToValuesMap('radius', tokenToVarMap.radius),
  row: getTokenToValuesMap('row', tokenToVarMap.row),
  shadow: getTokenToValuesMap('shadow', tokenToVarMap.shadow),
  size: getTokenToValuesMap('size', tokenToVarMap.size),
  space: getTokenToValuesMap('space', tokenToVarMap.space),
  textDecoration: getTokenToValuesMap('textDecoration', tokenToVarMap.textDecoration),
  typoSpace: getTokenToValuesMap('typoSpace', tokenToVarMap.typoSpace),
  typo: getTokenToValuesMap('typo', tokenToVarMap.typo),
  zIndex: getTokenToValuesMap('zIndex', tokenToVarMap.zIndex),
})

getTokensFromVars(color.darkVars!, darkVarMap)
getTokensFromVars(shadow.darkVars!, darkVarMap)

globalStyle(':root', varMap)

// IMPORTANT: This rule MUST appear after the :root rule above.
// Both selectors have specificity (0,1,0) — source order is the tiebreaker.
// Moving this above :root will silently break dark mode.
globalStyle(`[${COLOR_MODE_ATTR}="dark"]`, darkVarMap)
