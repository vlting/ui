import { useColorMode } from './useColorMode'
import { getTheme } from '../config/theme'

export function useTokens() {
  const { colorMode } = useColorMode()
  const theme = getTheme()
  return { tokenValue: theme[colorMode] }
}
