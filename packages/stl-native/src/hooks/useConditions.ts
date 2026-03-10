import { useConditionMask } from './useConditionMask'
import { CondBit } from '../config/conditions'

export function useConditions(): Record<string, boolean> {
  const mask = useConditionMask()
  return {
    xs: !!(mask & CondBit.xs),
    sm: !!(mask & CondBit.sm),
    md: !!(mask & CondBit.md),
    lg: !!(mask & CondBit.lg),
    xl: !!(mask & CondBit.xl),
    dark: !!(mask & CondBit.dark),
    light: !!(mask & CondBit.light),
    rtl: !!(mask & CondBit.rtl),
    ltr: !!(mask & CondBit.ltr),
    touch: !!(mask & CondBit.touch),
    pointer: !!(mask & CondBit.pointer),
    highContrast: !!(mask & CondBit.hightContrast),
    lowMotion: !!(mask & CondBit.lowMotion),
    lowData: !!(mask & CondBit.lowData),
    tv: !!(mask & CondBit.tv),
    debug: !!(mask & CondBit.debug),
  }
}
