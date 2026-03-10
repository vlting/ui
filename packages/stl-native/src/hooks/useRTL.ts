import { I18nManager } from 'react-native'

export function useRTL<R = boolean, L = boolean>(rtlValue?: R, ltrValue?: L): R | L {
  const isRTL = I18nManager.isRTL
  return isRTL ? (rtlValue ?? (true as any)) : (ltrValue ?? (false as any))
}
