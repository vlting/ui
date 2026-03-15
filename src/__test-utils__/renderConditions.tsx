import type { RenderOptions } from '@testing-library/react'
import type { ConditionKeys } from '@vlting/stl'
import type { ReactElement } from 'react'
import { CssConditionsContext } from '../../packages/stl-react/src/providers/StlProvider'
import { render } from './render'

type ConditionOverrides = Partial<Record<ConditionKeys, boolean>>

/**
 * Renders a component with STL condition overrides (lowMotion, highContrast, touch, etc.)
 */
export function renderWithConditions(
  ui: ReactElement,
  conditions: ConditionOverrides,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(
    <CssConditionsContext.Provider
      value={{ ...defaultConditions, ...conditions }}
    >
      {ui}
    </CssConditionsContext.Provider>,
    options,
  )
}

const defaultConditions: Record<ConditionKeys, boolean> = {
  ltr: true,
  rtl: false,
  light: true,
  dark: false,
  debug: false,
  xl: false,
  lg: false,
  md: false,
  sm: false,
  xs: false,
  '!xl': true,
  '!lg': true,
  '!md': true,
  '!sm': true,
  '!xs': true,
  highContrast: false,
  lowMotion: false,
  lowData: false,
  touch: false,
  pointer: true,
  tv: false,
  '!highContrast': true,
  '!lowMotion': true,
  '!lowData': true,
  '!touch': true,
  '!pointer': false,
  '!tv': true,
}
