import { type CSS, type StyleManager, type VariantCSS, style } from '@vlting/stl'
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

// ─── Options API ──────────────────────────────────────────────────────────────

export interface StyledOptions<
  V extends Variants | undefined = undefined,
  P = {},
> {
  css: CSS
  variants?: V
  defaultVariants?: V extends Variants ? DefaultVariants<V> : undefined
  template?: (props: P & { children?: ReactNode }) => ReactNode
  templateProps?: (keyof P & string)[]
  styleName?: string
}

// ─── Public overloads ─────────────────────────────────────────────────────────

/** Options API with template support */
export function styled<
  P = {},
  C extends ComponentType = ComponentType,
  V extends Variants | undefined = undefined,
>(component: C, options: StyledOptions<V, P>): StyledComponent<C, V, P>

/** Legacy positional API (backward-compatible) */
export function styled<C extends ComponentType, V extends Variants | undefined>(
  component: C,
  css: CSS,
  variants?: string | V,
  styleName?: string,
  defaultVariants?: V extends Variants ? DefaultVariants<V> : undefined,
): StyledComponent<C, V>

// ─── Implementation ───────────────────────────────────────────────────────────

export function styled(
  component: ComponentType,
  optionsOrCss: StyledOptions<any, any> | CSS,
  variantsOrNothing?: string | Variants,
  styleNameLegacy?: string,
  defaultVariantsLegacy?: Record<string, any>,
) {
  // Detect API: options object has a `css` key
  const isOptionsAPI = optionsOrCss && 'css' in optionsOrCss && !isCSSObject(optionsOrCss)

  let css: CSS
  let variantsArg: Variants | undefined
  let styleName: string | undefined
  let defaultVariants: Record<string, any> | undefined
  let template: ((props: any) => ReactNode) | undefined
  let templatePropKeys: string[] = []

  if (isOptionsAPI) {
    const opts = optionsOrCss as StyledOptions<any, any>
    css = opts.css
    variantsArg = opts.variants
    styleName = opts.styleName
    defaultVariants = opts.defaultVariants
    template = opts.template
    templatePropKeys = opts.templateProps ?? []
  } else {
    css = optionsOrCss as CSS
    styleName =
      typeof variantsOrNothing === 'string' ? variantsOrNothing : styleNameLegacy
    variantsArg =
      variantsOrNothing && typeof variantsOrNothing !== 'string'
        ? variantsOrNothing
        : undefined
    defaultVariants = defaultVariantsLegacy
  }

  const hasVariants = !!variantsArg
  const variantsDefinition = hasVariants ? variantsArg : undefined
  const variantKeys: string[] = hasVariants ? Object.keys(variantsArg!) : []
  const hasVariantKeys = variantKeys.length > 0
  const hasTemplate = !!template
  const hasTemplatePropKeys = templatePropKeys.length > 0

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

/** Distinguish StyledOptions from a CSS object */
function isCSSObject(obj: any): boolean {
  // A CSS object has style properties (bg, color, display, etc.)
  // A StyledOptions object has a `css` property that IS a CSS object
  // If it has `css` AND (`variants` or `styleName` or `template` or `defaultVariants`), it's options
  if ('variants' in obj || 'styleName' in obj || 'template' in obj || 'defaultVariants' in obj) {
    return false
  }
  return true
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
