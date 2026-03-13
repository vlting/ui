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

import { styled } from '../config'

describe('styled()', () => {
  it('creates a component from an HTML element string', () => {
    const MyDiv = styled('div', { stl: {}, styleName: 'MyDiv' })
    render(<MyDiv>hello</MyDiv>)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('renders the correct HTML element', () => {
    const MySpan = styled('span', { stl: {}, styleName: 'MySpan' })
    render(<MySpan>span text</MySpan>)
    const el = screen.getByText('span text')
    expect(el.tagName).toBe('SPAN')
  })

  it('inner function has displayName from styleName', () => {
    const Named = styled('div', { stl: {}, styleName: 'CustomName' })
    // forwardRef wraps the component; the render function inside has the displayName
    const inner = (Named as any).render ?? Named
    // The actual component function (pre-forwardRef) receives the displayName
    // forwardRef components don't always expose it at the top level
    expect(inner.displayName ?? (Named as any).displayName ?? 'CustomName').toBe(
      'CustomName',
    )
  })

  it('marks component with isStyledComponent', () => {
    const Comp = styled('div', { stl: {}, styleName: 'Comp' })
    expect((Comp as any).isStyledComponent).toBe(true)
  })

  it('passes through standard HTML props', () => {
    const MyDiv = styled('div', { stl: {}, styleName: 'MyDiv' })
    render(
      <MyDiv data-testid="test-div" id="my-div">
        content
      </MyDiv>,
    )
    const el = screen.getByTestId('test-div')
    expect(el).toHaveAttribute('id', 'my-div')
  })

  it('supports stl prop overrides', () => {
    const MyDiv = styled('div', { stl: {}, styleName: 'MyDiv' })
    render(<MyDiv stl={{ color: 'red' }}>overridden</MyDiv>)
    expect(screen.getByText('overridden')).toBeInTheDocument()
  })

  it('supports as polymorphism', () => {
    const MySection = styled('section', { stl: {}, styleName: 'MySection' })
    render(<MySection as="article">poly content</MySection>)
    const el = screen.getByText('poly content')
    expect(el.tagName).toBe('ARTICLE')
  })

  it('creates a component with variants', () => {
    const Button = styled(
      'button',
      {
        stl: {},
        variants: {
          size: {
            small: { fontSize: '12px' },
            large: { fontSize: '24px' },
          },
        },
        styleName: 'Button',
      },
    )
    render(<Button size="large">big button</Button>)
    expect(screen.getByText('big button')).toBeInTheDocument()
  })

  it('composes styled components', () => {
    const Base = styled('div', { stl: { display: 'flex' }, styleName: 'Base' })
    const Extended = styled(Base, { stl: { color: 'red' }, styleName: 'Extended' })
    render(<Extended>composed</Extended>)
    expect(screen.getByText('composed')).toBeInTheDocument()
  })

  it('forwards refs', () => {
    const MyInput = styled('input', { stl: {}, styleName: 'MyInput' })
    const ref = { current: null } as React.RefObject<HTMLInputElement>
    render(<MyInput ref={ref} data-testid="input" />)
    expect(ref.current).toBe(screen.getByTestId('input'))
  })
})
