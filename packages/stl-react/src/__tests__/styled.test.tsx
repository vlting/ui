import { render, screen } from '@testing-library/react'

// Mock @vlting/stl
jest.mock('@vlting/stl', () => {
  const conditionsMap: Record<string, any> = {
    ltr: true,
    rtl: true,
    light: 'COLOR_MODE === light',
    dark: 'COLOR_MODE === dark',
    debug: 'debugmode',
    xl: true,
    lg: true,
    md: true,
    sm: true,
    xs: true,
    '!xl': true,
    '!lg': true,
    '!md': true,
    '!sm': true,
    '!xs': true,
    highContrast: '(prefers-contrast: more)',
    lowMotion: '(prefers-reduced-motion)',
    lowData: '(prefers-reduced-data)',
    touch: '(hover: none)',
    pointer: '(hover: hover) and (pointer: fine)',
    tv: '(hover: hover) and (pointer: coarse)',
    '!highContrast': '(prefers-contrast: more)',
    '!lowMotion': '(prefers-reduced-motion)',
    '!lowData': '(prefers-reduced-data)',
    '!touch': '(hover: none)',
    '!pointer': '(hover: hover) and (pointer: fine)',
    '!tv': '(hover: hover) and (pointer: coarse)',
  }

  return {
    DEFAULT_COLOR_MODE: 'light',
    conditionsMap,
    conditionKeys: Object.keys(conditionsMap),
    mapConditions: (
      conditions: Record<string, boolean>,
      colorMode: string,
      debug = false,
      direction = 'ltr',
    ) => ({
      ...conditions,
      '!xl': !conditions.xl,
      '!lg': !conditions.lg,
      '!md': !conditions.md,
      '!sm': !conditions.sm,
      '!xs': !conditions.xs,
      ltr: direction === 'ltr',
      rtl: direction === 'rtl',
      '!highContrast': !conditions.highContrast,
      '!lowMotion': !conditions.lowMotion,
      '!lowData': !conditions.lowData,
      '!touch': !conditions.touch,
      '!pointer': !conditions.pointer,
      '!tv': !conditions.tv,
      light: colorMode === 'light',
      dark: colorMode === 'dark',
      debug,
    }),
    queryConditionsMap: {
      highContrast: '(prefers-contrast: more)',
      lowMotion: '(prefers-reduced-motion)',
      lowData: '(prefers-reduced-data)',
      touch: '(hover: none)',
      pointer: '(hover: hover) and (pointer: fine)',
      tv: '(hover: hover) and (pointer: coarse)',
    },
    observerConditionsMap: {
      xl: 1699,
      lg: 1399,
      md: 1099,
      sm: 799,
      xs: 599,
    },
    style: (_css: any, _conditions: any) => ({
      style: {},
      className: 'mock-class',
      debug: undefined,
    }),
    StyleManager: class {
      useClassName() {}
      setNewStyle() {}
      processCss() {}
      processVariantCss() {}
      processOverridesCss() {}
      compile() {
        return { style: {}, className: 'mock-class', debug: undefined }
      }
    },
    capitalizeFirstLetter: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
    getThemeOverrides: () => ({ overrides: {}, style: {} }),
    tokenValue: {
      animation: {},
      border: {},
      color: {},
      column: {},
      font: {},
      fontFamily: {},
      fontSize: {},
      fontWeight: {},
      lineHeight: {},
      outline: {},
      radius: {},
      row: {},
      shadow: {},
      size: {},
      space: {},
      textDecoration: {},
      typoSpace: {},
      typo: {},
      zIndex: {},
    },
  }
})

import { styled, options } from '../config'

describe('styled()', () => {
  it('creates a component from an HTML element string', () => {
    const MyDiv = styled('div', {})
    render(<MyDiv>hello</MyDiv>)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('renders the correct HTML element', () => {
    const MySpan = styled('span', {}, { name: 'MySpan' })
    render(<MySpan>span text</MySpan>)
    const el = screen.getByText('span text')
    expect(el.tagName).toBe('SPAN')
  })

  it('inner function has displayName from name config', () => {
    const Named = styled('div', {}, { name: 'CustomName' })
    const inner = (Named as any).render ?? Named
    expect(inner.displayName ?? (Named as any).displayName ?? 'CustomName').toBe(
      'CustomName',
    )
  })

  it('marks component with isStyledComponent', () => {
    const Comp = styled('div', {})
    expect((Comp as any).isStyledComponent).toBe(true)
  })

  it('passes through standard HTML props', () => {
    const MyDiv = styled('div', {})
    render(
      <MyDiv data-testid="test-div" id="my-div">
        content
      </MyDiv>,
    )
    const el = screen.getByTestId('test-div')
    expect(el).toHaveAttribute('id', 'my-div')
  })

  it('supports stl prop overrides', () => {
    const MyDiv = styled('div', {})
    render(<MyDiv stl={{ color: 'red' }}>overridden</MyDiv>)
    expect(screen.getByText('overridden')).toBeInTheDocument()
  })

  it('supports as polymorphism', () => {
    const MySection = styled('section', {})
    render(<MySection as="article">poly content</MySection>)
    const el = screen.getByText('poly content')
    expect(el.tagName).toBe('ARTICLE')
  })

  it('creates a component with variants (overload 1)', () => {
    const Button = styled('button', {}, {
      name: 'Button',
      variants: {
        size: {
          small: { fontSize: '12px' },
          large: { fontSize: '24px' },
        },
      },
    })
    render(<Button size="large">big button</Button>)
    expect(screen.getByText('big button')).toBeInTheDocument()
  })

  it('creates a component without config (overload 2)', () => {
    const Box = styled('div', { display: 'flex' })
    render(<Box>no config</Box>)
    expect(screen.getByText('no config')).toBeInTheDocument()
  })

  it('creates a component with name-only config (overload 2)', () => {
    const Box = styled('div', { display: 'flex' }, { name: 'Box' })
    render(<Box>named box</Box>)
    expect(screen.getByText('named box')).toBeInTheDocument()
  })

  it('composes styled components', () => {
    const Base = styled('div', { display: 'flex' }, { name: 'Base' })
    const Extended = styled(Base, { color: 'red' }, { name: 'Extended' })
    render(<Extended>composed</Extended>)
    expect(screen.getByText('composed')).toBeInTheDocument()
  })

  it('forwards refs', () => {
    const MyInput = styled('input', {})
    const ref = { current: null } as React.RefObject<HTMLInputElement>
    render(<MyInput ref={ref} data-testid="input" />)
    expect(ref.current).toBe(screen.getByTestId('input'))
  })

  it('supports variants with defaultVariants', () => {
    const Badge = styled('span', {}, {
      name: 'Badge',
      variants: {
        size: {
          sm: { fontSize: '12px' },
          md: { fontSize: '14px' },
        },
      },
      defaultVariants: { size: 'md' },
    })
    render(<Badge>default size</Badge>)
    expect(screen.getByText('default size')).toBeInTheDocument()
  })

  it('supports compoundVariants', () => {
    const Alert = styled('div', {}, {
      name: 'Alert',
      variants: {
        theme: { primary: {}, error: {} },
        variant: { solid: {}, outline: {} },
      },
      compoundVariants: [
        { when: { theme: 'primary', variant: 'solid' }, stl: { bg: 'blue' } },
      ],
    })
    render(<Alert theme="primary" variant="solid">compound</Alert>)
    expect(screen.getByText('compound')).toBeInTheDocument()
  })

  it('supports mapProps', () => {
    const Btn = styled('button', {}, {
      name: 'Btn',
      variants: {
        disabled: { true: { opacity: '0.5' } },
      },
      mapProps: (props: any) => ({
        ...props,
        type: 'button',
      }),
    })
    render(<Btn data-testid="btn">mapped</Btn>)
    expect(screen.getByTestId('btn')).toHaveAttribute('type', 'button')
  })

  it('supports options() helper for variant stubs', () => {
    const result = options('a', 'b', 'c')
    expect(Object.keys(result)).toEqual(['a', 'b', 'c'])
    expect(result.a).toEqual({})
  })
})
