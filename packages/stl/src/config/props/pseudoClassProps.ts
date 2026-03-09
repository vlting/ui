import { FilterKeys, PickKeys } from "./props.models"

// Only these props should have interact state classes/vars generated for them
// 20
export const pseudoClassProps = {
  animation: true,

  boxShadow: true,

  outline: true,
  outlineColor: true,
  outlineWidth: true,
  outlineStyle: true,
  outlineOffset: true,

  borderBlockStart: true,
  borderBlockEnd: true,
  borderInlineStart: true,
  borderInlineEnd: true,

  borderBlockStartColor: true,
  borderBlockEndColor: true,
  borderInlineStartColor: true,
  borderInlineEndColor: true,

  background: true,
  backgroundColor: true,
  backgroundBlendMode: true,
  backgroundImage: true,
  backgroundPosition: true,

  linearGradient: true,
  radialGradient: true,
  conicGradient: true,

  filter: true,
  mask: true,
  borderImage: true,
  borderSpacing: true,

  color: true,

  textDecoration: true,

  transform: true,

  transition: true,
  transitionProperty: true,
  transitionDuration: true,
  transitionDelay: true,
  transitionTimingFunction: true,

  opacity: true,

  // Disabled to optimize bundle size
  // fill: true,
  // stroke: true,
  // caretColor: true,
  // columnRuleColor: true,
  // textShadow: true,
  // transformOrigin: true,
  // listStyle: true,
  // listStyleImage: true,
  // filter: true,
} as const

export const pointerClassProps = {
  ...pseudoClassProps,
  cursor: true,
} as const

export function generatePseudoClassCss<O extends Record<string, unknown>>(
  generateClass: <K extends FilterKeys>(pseudoClass: string, keys: K) => O
) {
  const focusVisibleProps = generateClass(":focus-visible", pseudoClassProps)
  const hoverProps = generateClass(":hover", pointerClassProps)
  const activeProps = generateClass(":active", pseudoClassProps)
  type FilteredProps = PickKeys<O, typeof pseudoClassProps>
  type FilteredPointerProps = PickKeys<O, typeof pointerClassProps>
  return {
    // NOTE: We don't include :disabled, because logic for that exists in JS anyway
    // ":focus": pseudoClassProps, // REMOVED because :focus-visible is just better
    ":focus-visible": focusVisibleProps as FilteredProps,
    ":hover": hoverProps as FilteredPointerProps,
    ":active": activeProps as FilteredProps,
  } as const
}

// PSEUDO CLASS OBJECTS ///////////////////////////////////////////////////////////////////////////
// NOTE: IF YOU ADD A PROP HERE, YOU MUST ALSO ADD IT IN `classDict` IN `StyleManager.ts`
export const pseudoClasses = {
  // NOTE: We don't include :disabled, because logic for that exists in JS anyway
  ":focus-visible": pseudoClassProps,
  ":hover": pointerClassProps,
  ":active": pseudoClassProps,
} as const

// ALIASES ////////////////////////////////////////////////////////////////////////////////////////
export const pseudoClassAliases = {
  ":focus": [":focus-visible"],
  ":hover, :focus": [":hover", ":focus-visible"],
  ":hover, :focus-visible": [":hover", ":focus-visible"],
  ":interact": [":hover", ":focus-visible"],
  hovered: [":hover"],
  pressed: [":active"],
  focused: [":focus-visible"],
} as const

export const combinedPseudoClasses = {
  ...pseudoClasses,
  ...pseudoClassAliases,
} as const

// TYPES //////////////////////////////////////////////////////////////////////////////////////////
export type PseudoClassKeys = keyof ReturnType<typeof generatePseudoClassCss>

export type PseudoClassAliasKeys = keyof typeof pseudoClassAliases
export type PseudoClassKeysWithAliases = PseudoClassKeys | PseudoClassAliasKeys

type PseudoClassObject = { readonly [k in PseudoClassKeys]?: Record<string, unknown> }

type InnerPseudoFocus<T extends PseudoClassObject> = { ":focus"?: T[":focus-visible"] }
type InnerPseudoHoverFocus<T extends PseudoClassObject> = { ":hover, :focus"?: T[":hover"] & T[":focus-visible"] }
type InnerPseudoHoverFocusVisible<T extends PseudoClassObject> = {
  ":hover, :focus-visible"?: T[":hover"] & T[":focus-visible"]
}
type InnerPseudoInteract<T extends PseudoClassObject> = { ":interact"?: T[":hover"] & T[":focus-visible"] }
type InnerPseudoHovered<T extends PseudoClassObject> = { hovered?: T[":hover"] }
type InnerPseudoPressed<T extends PseudoClassObject> = { pressed?: T[":active"] }
type InnerPseudoFocused<T extends PseudoClassObject> = { focused?: T[":focus-visible"] }

export type PseudoClassesWithAliases<T extends PseudoClassObject> = T &
  InnerPseudoFocus<T> &
  InnerPseudoHoverFocus<T> &
  InnerPseudoHoverFocusVisible<T> &
  InnerPseudoInteract<T> &
  InnerPseudoHovered<T> &
  InnerPseudoPressed<T> &
  InnerPseudoFocused<T>
