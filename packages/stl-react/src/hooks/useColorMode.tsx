import { useContext } from "react"
import { StlContext, StlContextProps } from "../providers/StlProvider"

interface UseColorMode extends Pick<StlContextProps, "colorMode" | "setColorMode" | "toggleColorMode"> {
  isDark: boolean
}

export function useColorMode(): UseColorMode {
  const { colorMode, setColorMode, toggleColorMode, isDark } = useContext(StlContext)
  return {
    colorMode,
    isDark,
    setColorMode,
    toggleColorMode,
  }
}
