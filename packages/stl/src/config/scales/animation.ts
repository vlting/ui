import { addStaticValuePrefix, CharHash } from "../utils"
import { ThemeScale, Keyframes } from "./scales.models"
import { getAliasMap, getCssMapFromVars, getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `animation` theme scale */
export function getAnimation(hash: CharHash, keyframeHash: CharHash) {
  const spin = keyframeHash.name
  const spinAndPause = keyframeHash.name
  const flashSize = keyframeHash.name
  const bounceUp = keyframeHash.name
  const bounceRight = keyframeHash.name
  const bounceDown = keyframeHash.name
  const bounceLeft = keyframeHash.name
  const keyframes: Keyframes = {
    [spin]: {
      "0%, 5.1%": { transform: "rotate(0deg)" },
      "20%, 80%": { transform: "rotate(180deg)" },
      "50%, to": { transform: "rotate(360deg)" },
    },
    [spinAndPause]: {
      "0%, 25.1%": { transform: "rotate(0deg)" },
      "10%, 40%": { transform: "rotate(180deg)" },
      "25%, 50%, to": { transform: "rotate(360deg)" },
    },
    [flashSize]: {
      "0%, to": { transform: "scale3d(1, 1, 1)" },
      "50%": { transform: "scale3d(1.12, 1.12, 1)" },
    },
    [bounceUp]: {
      "0%, 10%, 26.5%, 50%, to": {
        animationTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
        transform: "translate3d(0, 0, 0)",
      },
      "20%, 21.5%": {
        animationTimingFunction: "cubic-bezier(.755, .05, .855, .06)",
        transform: "translate3d(0, -30px, 0) scaleY(1.1)",
      },
      "35%": {
        animationTimingFunction: "cubic-bezier(.755, .05, .855, .06)",
        transform: "translate3d(0, -15px, 0) scaleY(1.05)",
      },
      "40%": {
        transitionTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
        transform: "translate3d(0, 0, 0) scaleY(.95)",
      },
      "45%": {
        transform: "translate3d(0, -4px, 0) scaleY(1.02)",
      },
    },
    [bounceRight]: {
      "0%, 10%, 26.5%, 50%, to": {
        animationTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
        transform: "translate3d(0, 0, 0)",
      },
      "20%, 21.5%": {
        animationTimingFunction: "cubic-bezier(.755, .05, .855, .06)",
        transform: "translate3d(30px, 0, 0) scaleX(1.1)",
      },
      "35%": {
        animationTimingFunction: "cubic-bezier(.755, .05, .855, .06)",
        transform: "translate3d(15px, 0, 0) scaleX(1.05)",
      },
      "40%": {
        transitionTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
        transform: "translate3d(0, 0, 0) scaleX(.95)",
      },
      "45%": {
        transform: "translate3d(4px, 0, 0) scaleX(1.02)",
      },
    },
    [bounceDown]: {
      "0%, 10%, 26.5%, 50%, to": {
        animationTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
        transform: "translate3d(0, 0, 0)",
      },
      "20%, 21.5%": {
        animationTimingFunction: "cubic-bezier(.755, .05, .855, .06)",
        transform: "translate3d(0, 30px, 0) scaleY(1.1)",
      },
      "35%": {
        animationTimingFunction: "cubic-bezier(.755, .05, .855, .06)",
        transform: "translate3d(0, 15px, 0) scaleY(1.05)",
      },
      "40%": {
        transitionTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
        transform: "translate3d(0, 0, 0) scaleY(.95)",
      },
      "45%": {
        transform: "translate3d(0, 4px, 0) scaleY(1.02)",
      },
    },
    [bounceLeft]: {
      "0%, 10%, 26.5%, 50%, to": {
        animationTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
        transform: "translate3d(0, 0, 0)",
      },
      "20%, 21.5%": {
        animationTimingFunction: "cubic-bezier(.755, .05, .855, .06)",
        transform: "translate3d(-30px, 0, 0) scaleX(1.1)",
      },
      "35%": {
        animationTimingFunction: "cubic-bezier(.755, .05, .855, .06)",
        transform: "translate3d(-15px, 0, 0) scaleX(1.05)",
      },
      "40%": {
        transitionTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
        transform: "translate3d(0, 0, 0) scaleX(.95)",
      },
      "45%": {
        transform: "translate3d(-4px, 0, 0) scaleX(1.02)",
      },
    },
  }

  const fastDuration = { ...hash.var, value: ".25s" }
  const vars = {
    fastDuration,
    slowDuration: { ...hash.var, value: ".75s" },
    defaultDuration: { ...hash.var, value: fastDuration.ref },
    spinDuration: { ...hash.var, value: "1.25s" },
    spinAndPauseDuration: { ...hash.var, value: "1.75s" },
    flashSizeDuration: { ...hash.var, value: ".5s" },
    bounceDuration: { ...hash.var, value: "2.5s" },
  } as const

  const transition = {
    transitionProperty: addStaticValuePrefix("opacity, transform"),
    transitionDuration: "defaultDuration",
  } as const
  const hidden = {
    opacity: addStaticValuePrefix("0"),
    pointerEvents: addStaticValuePrefix("none"),
  } as const

  const cssValueMap = {
    ...getCssMapFromVars(vars),
    spinName: spin,
    spinAndPauseName: spinAndPause,
    flashSizeName: flashSize,
    bounceUpName: bounceUp,
    bounceRightName: bounceRight,
    bounceDownName: bounceDown,
    bounceLeftName: bounceLeft,
    // Combo aliases
    spin: "spin",
    spinAndPause: "spinAndPause",
    flashSize: "flashSize",
    bounceUp: "bounceUp",
    bounceRight: "bounceRight",
    bounceDown: "bounceDown",
    bounceLeft: "bounceLeft",
    slideInTop: "slideInTop",
    slideOutTop: "slideOutTop",
    slideInRight: "slideInRight",
    slideOutRight: "slideOutRight",
    slideInBottom: "slideInBottom",
    slideOutBottom: "slideOutBottom",
    slideInLeft: "slideInLeft",
    slideOutLeft: "slideOutLeft",
    fadeIn: "fadeIn",
    fadeOut: "fadeOut",
    zoomIn: "zoomIn",
    zoomOut: "zoomOut",
  } as const

  const { aliasMap, cssAliases } = getAliasMap({
    // Animations
    spin: {
      animationName: "spinName",
      animationDuration: "spinDuration",
      animationIterationCount: addStaticValuePrefix("infinite"),
      animationTimingFunction: addStaticValuePrefix("ease-in-out"),
      animationFillMode: addStaticValuePrefix("both"),
    },
    spinAndPause: {
      animationName: "spinAndPauseName",
      animationDuration: "spinAndPauseDuration",
      animationIterationCount: addStaticValuePrefix("infinite"),
      animationTimingFunction: addStaticValuePrefix("ease-in-out"),
      animationFillMode: addStaticValuePrefix("both"),
    },
    flashSize: {
      animationName: "flashSizeName",
      animationDuration: "flashSizeDuration",
      animationIterationCount: addStaticValuePrefix("2"),
      animationTimingFunction: addStaticValuePrefix("ease-in-out"),
      animationFillMode: addStaticValuePrefix("both"),
    },
    bounceUp: {
      animationName: "bounceUpName",
      animationDuration: "bounceDuration",
      animationIterationCount: addStaticValuePrefix("infinite"),
      animationTimingFunction: addStaticValuePrefix("ease-in-out"),
      animationFillMode: addStaticValuePrefix("both"),
      transformOrigin: addStaticValuePrefix("center bottom"),
    },
    bounceRight: {
      animationName: "bounceRightName",
      animationDuration: "bounceDuration",
      animationIterationCount: addStaticValuePrefix("infinite"),
      animationTimingFunction: addStaticValuePrefix("ease-in-out"),
      animationFillMode: addStaticValuePrefix("both"),
      transformOrigin: addStaticValuePrefix("left center"),
    },
    bounceDown: {
      animationName: "bounceDownName",
      animationDuration: "bounceDuration",
      animationIterationCount: addStaticValuePrefix("infinite"),
      animationTimingFunction: addStaticValuePrefix("ease-in-out"),
      animationFillMode: addStaticValuePrefix("both"),
      transformOrigin: addStaticValuePrefix("center top"),
    },
    bounceLeft: {
      animationName: "bounceLeftName",
      animationDuration: "bounceDuration",
      animationIterationCount: addStaticValuePrefix("infinite"),
      animationTimingFunction: addStaticValuePrefix("ease-in-out"),
      animationFillMode: addStaticValuePrefix("both"),
      transformOrigin: addStaticValuePrefix("right center"),
    },
    // Animated Transitions
    slideInTop: transition,
    slideOutTop: {
      ...hidden,
      ...transition,
      transform: addStaticValuePrefix("translate3d(0,-100%,0)"),
    },
    slideInRight: transition,
    slideOutRight: {
      ...hidden,
      ...transition,
      transform: addStaticValuePrefix("translate3d(-100%,0,0)"),
    },
    slideInBottom: transition,
    slideOutBottom: {
      ...hidden,
      ...transition,
      transform: addStaticValuePrefix("translate3d(0,100%,0)"),
    },
    slideInLeft: transition,
    slideOutLeft: {
      ...hidden,
      ...transition,
      transform: addStaticValuePrefix("translate3d(100%,0,0)"),
    },
    fadeIn: transition,
    fadeOut: {
      ...hidden,
      ...transition,
    },
    zoomIn: transition,
    zoomOut: {
      ...hidden,
      ...transition,
      transform: addStaticValuePrefix("scale3d(.5,.5,1)"),
    },
  })

  const cssAliasMap = { ...cssAliases } as const

  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
    cssValueMapProps: getPropsFromCssMap(cssValueMap),
    cssAliasMap,
    aliasMap,
    keyframes,
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap, typeof cssAliasMap, typeof keyframes>
}

// FILTER KEYS ////////////////////////////////////////////////////////////////
// Used for generating types that map to only parts of this scale

export const animationCombos = {
  spin: true,
  spinAndPause: true,
  flashSize: true,
  bounceUp: true,
  bounceRight: true,
  bounceDown: true,
  bounceLeft: true,
  slideInTop: true,
  slideOutTop: true,
  slideInRight: true,
  slideOutRight: true,
  slideInBottom: true,
  slideOutBottom: true,
  slideInLeft: true,
  slideOutLeft: true,
  fadeIn: true,
  fadeOut: true,
  zoomIn: true,
  zoomOut: true,
} as const

export const animationDurations = {
  fastDuration: true,
  slowDuration: true,
  defaultDuration: true,
  spinDuration: true,
  spinAndPauseDuration: true,
  flashSizeDuration: true,
  bounceDuration: true,
} as const
export const hiddenAnimationDurations = { ...animationCombos } as const

export const animationNames = {
  spinName: true,
  spinAndPauseName: true,
  flashSizeName: true,
  bounceUpName: true,
  bounceRightName: true,
  bounceDownName: true,
  bounceLeftName: true,
} as const
export const hiddenAnimationNames = { ...animationCombos } as const

export const animationIterationCounts = {} as const
export const hiddenAnimationIterationCounts = { ...animationCombos } as const

export const animationTimingFunctions = {} as const
export const hiddenAnimationTimingFunctions = { ...animationCombos } as const

export const animationFillModes = {} as const
export const hiddenAnimationFillModes = { ...animationCombos } as const

export const transforms = {} as const
export const hiddenTransforms = { ...animationCombos } as const

export const transformOrigins = {} as const
export const hiddenTransformOrigins = { ...animationCombos } as const

export const transitionProperties = {} as const
export const hiddenTransitionProperties = { ...animationCombos } as const

export const transitionDurations = { defaultDuration: true } as const
export const hiddenTransitionDurations = { ...animationCombos } as const

export const opacities = {} as const
export const hiddenOpacities = { ...animationCombos } as const

export const pointerEvents = {} as const
export const hiddenPointerEvents = { ...animationCombos } as const
