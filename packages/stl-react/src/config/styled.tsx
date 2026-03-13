import { type STL, type StyleManager, type VariantSTL, style } from '@vlting/stl'
import {
  type ComponentPropsWithRef,
  type ForwardedRef,
  type FunctionComponent,
  type HTMLAttributes,
  type JSXElementConstructor,
  type ReactNode,
  forwardRef,
  useMemo,
} from 'react'
import { useConditions } from '../hooks'
import type { ComponentType } from '../shared/models'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Variant stub helper — produces { primary: {}, secondary: {}, ... } */
export function options<T extends string>(...values: T[]): Record<T, Record<string, never>> {
  return Object.fromEntries(values.map(v => [v, {}])) as Record<T, Record<string, never>>
}

// ─── Options API ──────────────────────────────────────────────────────────────

export type CompoundVariant<V extends Variants> = {
  when: { [K in keyof V]?: keyof V[K] }
  stl: STL
}

export interface StyledOptions<
  V extends Variants | undefined = undefined,
  P = {},
> {
  stl: STL
  variants?: V
  compoundVariants?: V extends Variants ? CompoundVariant<V>[] : undefined
  defaultVariants?: V extends Variants ? DefaultVariants<V> : undefined
  template?: (props: P & { children?: ReactNode }) => ReactNode
  templateProps?: (keyof P & string)[]
  styleName?: string
}

// ─── Signature ────────────────────────────────────────────────────────────────

export function styled<
  P = {},
  C extends ComponentType = ComponentType,
  V extends Variants | undefined = undefined,
>(component: C, options: StyledOptions<V, P>): StyledComponent<C, V, P>

// ─── Implementation ───────────────────────────────────────────────────────────

export function styled(
  component: ComponentType,
  opts: StyledOptions<any, any>,
) {
  const css = opts.stl
  const variantsArg: Variants | undefined = opts.variants
  const styleName: string | undefined = opts.styleName
  const defaultVariants: Record<string, any> | undefined = opts.defaultVariants
  const template: ((props: any) => ReactNode) | undefined = opts.template
  const templatePropKeys: string[] = opts.templateProps ?? []
  const compoundVariantsArg: CompoundVariant<any>[] | undefined = opts.compoundVariants

  const hasVariants = !!variantsArg
  const variantsDefinition = hasVariants ? variantsArg : undefined
  const variantKeys: string[] = hasVariants ? Object.keys(variantsArg!) : []
  const hasVariantKeys = variantKeys.length > 0
  const hasTemplate = !!template
  const hasTemplatePropKeys = templatePropKeys.length > 0
  const hasCompoundVariants = !!compoundVariantsArg && compoundVariantsArg.length > 0

  function styledComponent<T extends ComponentType, R>(
    props: HTMLAttributes<any> &
      StylelessComponentProps<any> &
      StylelessComponentProps<T> & { as?: T } & BaseStyledProps<any>,
    ref?: ForwardedRef<R>,
  ): JSX.Element | null
  function styledComponent<R>(
    props: HTMLAttributes<any> &
      StylelessComponentProps<any> & { as?: ComponentType } & BaseStyledProps<any>,
    ref?: ForwardedRef<R>,
  ): JSX.Element | null
  function styledComponent<R>(
    props: HTMLAttributes<any> &
      StylelessComponentProps<any> & { as?: ComponentType } & BaseStyledProps<any>,
    ref?: ForwardedRef<R>,
  ) {
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
      css,
      conditions,
      variantCss: variantStl,
      overrides: propsStl,
      styleName,
      manager: styleManager,
      props: {
        className,
        index,
        length,
        isStyledComponent,
      },
      useClassName: true,
    })

    // Strip variant keys from DOM forwarding
    if (hasVariants && hasVariantKeys) {
      variantKeys.forEach((key) => {
        delete mainProps[key as keyof typeof mainProps]
      })
    }

    // Collect template-specific props and strip from DOM forwarding
    const extraProps: Record<string, any> = {}
    if (hasTemplatePropKeys) {
      for (const key of templatePropKeys) {
        extraProps[key] = mainProps[key as keyof typeof mainProps]
        delete mainProps[key as keyof typeof mainProps]
      }
    }

    // Merge user's style prop into stl style output (user styles win)
    const { style: userStyle, children, ...restProps } = mainProps
    const mergedStyle = userStyle
      ? { ...styleProps.style, ...userStyle }
      : styleProps.style

    // Render children: template replaces children if provided
    const renderedChildren = hasTemplate
      ? template!({ children, ...extraProps })
      : children

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
          {renderedChildren}
        </Element>
      </>
    )
  }
  styledComponent.displayName = styleName
  const outputComponent = forwardRef(styledComponent) as any as typeof styledComponent
  ;(outputComponent as any).isStyledComponent = true
  return outputComponent
}

// @ts-expect-error
function Debug({ styles }: { styles: Record<string, any> }) {
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
        result.push({ key, css: variant[variantValue] })
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
          result.push({ key: `compound-${whenKey}`, css: cv.stl })
        }
      }
    }

    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasVariants, variantsDefinition, ...resolvedValues])
}

// TYPES //////////////////////////////////////////////////////////////////////////////////////////

type BooleanString = 'true' | 'false'

type Variants = {
  [name: string]: { [value: string]: STL }
}
type VariantKey = keyof Variants

type VariantProps<V extends Variants> = {
  [prop in keyof V]?: keyof V[prop] extends BooleanString ? boolean : keyof V[prop]
}

type StylelessComponentProps<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
> = Omit<ComponentPropsWithRef<T>, 'stl' | 'styleManager'>

type DefaultVariants<V extends Variants> = {
  [prop in keyof V]?: keyof V[prop] extends BooleanString ? boolean : keyof V[prop]
}

type BaseStyledProps<V extends Variants | undefined> = V extends Variants
  ? { stl?: STL; styleManager?: StyleManager } & VariantProps<V>
  : { stl?: STL; styleManager?: StyleManager }

type StyledComponent<
  C extends ComponentType,
  V extends Variants | undefined,
  P = {},
> = V extends Variants
  ? ReturnType<
      typeof forwardRef<
        any,
        HTMLAttributes<C> &
          StylelessComponentProps<C> &
          BaseStyledProps<V> &
          P & { as?: ComponentType }
      >
    > & { isStyledComponent: true; displayName?: string }
  : ReturnType<
      typeof forwardRef<
        any,
        HTMLAttributes<C> &
          StylelessComponentProps<C> &
          BaseStyledProps<V> &
          P & { as?: ComponentType }
      >
    > & { isStyledComponent: true; displayName?: string }
