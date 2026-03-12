import { type CSS, type StyleManager, type VariantCSS, style } from '@vlting/stl'
import {
  type ComponentPropsWithRef,
  type ForwardedRef,
  type FunctionComponent,
  type HTMLAttributes,
  type JSXElementConstructor,
  forwardRef,
  useMemo,
} from 'react'
import { useConditions } from '../hooks'
import type { ComponentType } from '../shared/models'

/** Used to style any React component of basic HTML element */
export function styled<C extends ComponentType, V extends Variants | undefined>(
  component: C,
  css: CSS,
  variants?: string | V,
  styleName?: string,
  defaultVariants?: V extends Variants ? DefaultVariants<V> : undefined,
) {
  styleName = typeof variants === 'string' ? variants : styleName
  const hasVariants = !!variants && typeof variants !== 'string'
  const variantsDefinition = hasVariants ? variants : undefined
  const variantKeys: string[] = hasVariants ? Object.keys(variants) : []
  const hasVariantKeys = variantKeys.length > 0

  function styledComponent<T extends ComponentType, R>(
    props: HTMLAttributes<C> &
      StylelessComponentProps<C> &
      StylelessComponentProps<T> & { as?: T } & BaseStyledProps<V>,
    ref?: ForwardedRef<R>,
  ): JSX.Element | null
  function styledComponent<R>(
    props: HTMLAttributes<C> &
      StylelessComponentProps<C> & { as?: ComponentType } & BaseStyledProps<V>,
    ref?: ForwardedRef<R>,
  ): JSX.Element | null
  function styledComponent<R>(
    props: HTMLAttributes<C> &
      StylelessComponentProps<C> & { as?: ComponentType } & BaseStyledProps<V>,
    ref?: ForwardedRef<R>,
  ) {
    const conditions = useConditions()
    const {
      as: polyAs,
      css: propsCss,
      styleManager,
      isSemantic,
      className,
      index,
      length,
      ...mainProps
    } = props

    // Get any variants that are valid, based on our incoming mainProps
    const variantCss = useVariants(
      mainProps,
      hasVariants,
      variantKeys,
      variantsDefinition,
      defaultVariants,
    )

    const isStyledComponent = !!(component as any).isStyledComponent
    const Element = !isStyledComponent
      ? ((polyAs as FunctionComponent<any>) ?? component)
      : (component as FunctionComponent<any>)

    const { debug, ...styleProps } = style({
      css,
      conditions,
      variantCss,
      overrides: propsCss,
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

    if (hasVariants && hasVariantKeys) {
      variantKeys.forEach((key) => {
        delete mainProps[key as keyof typeof mainProps]
      })
    }

    // Merge user's style prop into stl style output (user styles win)
    const { style: userStyle, ...restProps } = mainProps
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
        />
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
  variantKeys: string[],
  variantsDefinition?: NonNullable<V>,
  defaults?: Record<string, any>,
): VariantCSS {
  // Collect resolved variant values for the dependency array
  // variantKeys is static per styled() call, so this array length is constant
  const resolvedValues = variantKeys.map((k) => {
    const propVal = props[k]
    return propVal !== undefined ? propVal : defaults?.[k]
  })

  return useMemo(() => {
    if (!hasVariants || !variantsDefinition) return []
    const result: VariantCSS = []
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
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasVariants, variantsDefinition, ...resolvedValues])
}

// TYPES //////////////////////////////////////////////////////////////////////////////////////////

type BooleanString = 'true' | 'false'

type Variants = {
  [name: string]: { [value: string]: CSS }
}
type VariantKey = keyof Variants

type VariantProps<V extends Variants> = {
  [prop in keyof V]?: keyof V[prop] extends BooleanString ? boolean : keyof V[prop]
}

type StylelessComponentProps<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
> = Omit<ComponentPropsWithRef<T>, 'css' | 'styleManager'>

type DefaultVariants<V extends Variants> = {
  [prop in keyof V]?: keyof V[prop] extends BooleanString ? boolean : keyof V[prop]
}

type BaseStyledProps<V extends Variants | undefined> = V extends Variants
  ? { css?: CSS; styleManager?: StyleManager } & VariantProps<V>
  : { css?: CSS; styleManager?: StyleManager }
