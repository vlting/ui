import { type STL, type StyleManager, style, type VariantSTL } from '@vlting/stl'
export type { STL }
import {
  type ComponentPropsWithRef,
  type ElementType,
  type ForwardedRef,
  type FunctionComponent,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  useMemo,
} from 'react'
import { useConditions } from '../hooks'
import type { ComponentType } from '../shared/models'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Variant stub helper — produces { primary: {}, secondary: {}, ... } */
export function options<T extends string>(
  ...values: T[]
): Record<T, Record<string, never>> {
  return Object.fromEntries(values.map((v) => [v, {}])) as Record<
    T,
    Record<string, never>
  >
}

// ─── Config types ─────────────────────────────────────────────────────────────

export type CompoundVariant<V extends Variants> = {
  when: { [K in keyof V]?: keyof V[K] }
  stl: STL
}

type AllProps<
  C extends ComponentType,
  V extends Variants | undefined,
> = HTMLAttributes<any> &
  StylelessComponentProps<C> &
  BaseStyledProps<V> & { children?: ReactNode }

interface StyledConfigWithVariants<C extends ComponentType, V extends Variants> {
  name?: string
  variants: V
  compoundVariants?: CompoundVariant<V>[]
  defaultVariants?: DefaultVariants<V>
  mapProps?: (props: AllProps<C, V>) => Record<string, any>
}

interface StyledConfigBase<C extends ComponentType> {
  name?: string
  mapProps?: (props: AllProps<C, undefined>) => Record<string, any>
}

// ─── Overloaded signatures ────────────────────────────────────────────────────

export function styled<C extends ComponentType, V extends Variants>(
  component: C,
  stl: STL,
  config: StyledConfigWithVariants<C, V>,
): StyledComponent<C, V>

export function styled<C extends ComponentType>(
  component: C,
  stl: STL,
  config?: StyledConfigBase<C>,
): StyledComponent<C, undefined>

// ─── Implementation ───────────────────────────────────────────────────────────

export function styled(
  component: ComponentType,
  baseStl: STL,
  config?: {
    name?: string
    variants?: Variants
    compoundVariants?: CompoundVariant<any>[]
    defaultVariants?: Record<string, any>
    mapProps?: (props: any) => Record<string, any>
  },
): any {
  const variantsArg: Variants | undefined = config?.variants
  const name: string | undefined = config?.name
  const defaultVariants: Record<string, any> | undefined = config?.defaultVariants
  const compoundVariantsArg: CompoundVariant<any>[] | undefined = config?.compoundVariants
  const mapPropsTransform = config?.mapProps

  const hasVariants = !!variantsArg
  const variantsDefinition = hasVariants ? variantsArg : undefined
  const variantKeys: string[] = hasVariants ? Object.keys(variantsArg!) : []
  const hasVariantKeys = variantKeys.length > 0
  const hasCompoundVariants = !!compoundVariantsArg && compoundVariantsArg.length > 0
  const hasMapProps = !!mapPropsTransform

  function styledComponent<T extends ComponentType, R>(
    props: HTMLAttributes<any> &
      StylelessComponentProps<any> &
      StylelessComponentProps<T> & { as?: T } & BaseStyledProps<any>,
    ref?: ForwardedRef<R>,
  ): ReactNode
  function styledComponent<R>(
    props: HTMLAttributes<any> &
      StylelessComponentProps<any> & { as?: ComponentType } & BaseStyledProps<any>,
    ref?: ForwardedRef<R>,
  ): ReactNode
  function styledComponent<R>(
    rawProps: HTMLAttributes<any> &
      StylelessComponentProps<any> & { as?: ComponentType } & BaseStyledProps<any>,
    ref?: ForwardedRef<R>,
  ) {
    const props = hasMapProps ? mapPropsTransform!(rawProps) : rawProps
    const conditions = useConditions()
    const {
      as: polyAs,
      stl: propsStl,
      styleManager,
      isSemantic,
      className,
      index,
      length,
      ...mainProps
    } = props

    // Get any variants that are valid, based on our incoming mainProps
    const variantStl = useVariants(
      mainProps,
      hasVariants,
      hasCompoundVariants,
      variantKeys,
      variantsDefinition,
      defaultVariants,
      compoundVariantsArg,
    )

    const isStyledComponent = !!(component as any).isStyledComponent
    const Element = !isStyledComponent
      ? ((polyAs as FunctionComponent<any>) ?? component)
      : (component as FunctionComponent<any>)

    const { debug, ...styleProps } = style({
      stl: baseStl,
      conditions,
      variantStl,
      overrides: propsStl,
      styleName: name,
      manager: styleManager,
      props: {
        className,
        index,
        length,
        isStyledComponent,
      },
      useClassName: true,
    })

    // Strip variant keys from DOM forwarding, but preserve HTML-native
    // attributes (disabled, hidden) that may have been set by mapProps
    if (hasVariants && hasVariantKeys) {
      variantKeys.forEach((key) => {
        if (key !== 'disabled' && key !== 'hidden') {
          delete mainProps[key as keyof typeof mainProps]
        }
      })
    }

    // Merge user's style prop into stl style output (user styles win)
    const { style: userStyle, children, ...restProps } = mainProps
    const mergedStyle = userStyle
      ? { ...styleProps.style, ...userStyle }
      : styleProps.style

    return (
      <>
        {conditions.debug && <Debug styles={debug} />}
        <Element
          as={!isStyledComponent ? undefined : polyAs}
          ref={ref}
          {...restProps}
          {...styleProps}
          style={mergedStyle}
        >
          {children}
        </Element>
      </>
    )
  }
  styledComponent.displayName = name
  const outputComponent = forwardRef(styledComponent)
  ;(outputComponent as any).isStyledComponent = true
  return outputComponent as unknown as StyledComponent<any, any>
}

function Debug({ styles: _styles }: { styles: Record<string, any> }) {
  return null
}

// HOOKS //////////////////////////////////////////////////////////////////////////////////////////
function useVariants<P extends Record<string, any>, V extends Variants>(
  props: P,
  hasVariants: boolean,
  hasCompoundVariants: boolean,
  variantKeys: string[],
  variantsDefinition?: NonNullable<V>,
  defaults?: Record<string, any>,
  compoundVariants?: CompoundVariant<any>[],
): VariantSTL {
  // Collect resolved variant values for the dependency array
  // variantKeys is static per styled() call, so this array length is constant
  const resolvedValues = variantKeys.map((k) => {
    const propVal = props[k]
    return propVal !== undefined ? propVal : defaults?.[k]
  })

  return useMemo(() => {
    if (!hasVariants || !variantsDefinition) return []
    const result: VariantSTL = []

    // Flat variant resolution
    for (let i = 0; i < variantKeys.length; i++) {
      const variant = variantsDefinition[variantKeys[i] as VariantKey]
      const resolved = resolvedValues[i]
      const variantValue = resolved ? String(resolved) : undefined
      if (variantValue && variant[variantValue]) {
        const keyValue = variantValue === 'true' ? '' : `-${variantValue}`
        const key = `${variantKeys[i]}${keyValue}`
        result.push({ key, stl: variant[variantValue] })
      }
    }

    // Compound variant resolution — matching entries appended after flat variants
    if (hasCompoundVariants && compoundVariants) {
      for (const cv of compoundVariants) {
        const matches = Object.entries(cv.when).every(([k, v]) => {
          const idx = variantKeys.indexOf(k)
          if (idx === -1) return false
          const resolved = resolvedValues[idx]
          return resolved !== undefined ? String(resolved) === String(v) : false
        })
        if (matches) {
          const whenKey = Object.entries(cv.when)
            .map(([k, v]) => `${k}-${String(v)}`)
            .join('_')
          result.push({ key: `compound-${whenKey}`, stl: cv.stl })
        }
      }
    }

    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasVariants, variantsDefinition, ...resolvedValues])
}

// TYPES //////////////////////////////////////////////////////////////////////////////////////////

type BooleanString = 'true' | 'false'

export type Variants = {
  [name: string]: { [value: string]: STL }
}
type VariantKey = keyof Variants

type VariantProps<V extends Variants> = {
  [prop in keyof V]?: keyof V[prop] extends BooleanString ? boolean : keyof V[prop]
}

type StylelessComponentProps<T extends ElementType> = Omit<
  ComponentPropsWithRef<T>,
  'stl' | 'styleManager'
>

type DefaultVariants<V extends Variants> = {
  [prop in keyof V]?: keyof V[prop] extends BooleanString ? boolean : keyof V[prop]
}

type BaseStyledProps<V extends Variants | undefined> = V extends Variants
  ? { stl?: STL; styleManager?: StyleManager } & VariantProps<V>
  : { stl?: STL; styleManager?: StyleManager }

export interface StyledComponent<
  C extends ComponentType,
  V extends Variants | undefined,
> {
  (props: StylelessComponentProps<C> & BaseStyledProps<V> & { ref?: any }): ReactNode
  <As extends ElementType>(
    props: Omit<ComponentPropsWithRef<As>, 'stl' | 'styleManager'> &
      BaseStyledProps<V> & { as: As; ref?: any },
  ): ReactNode
  isStyledComponent: true
  displayName?: string
}
