import { getTheme } from '../config/theme'
import { useColorMode } from './useColorMode'

export function useTokens() {
  const { colorMode } = useColorMode()
  const theme = getTheme()
  return { tokenValue: theme[colorMode] }
}
