import type { RefObject } from "react"
import { useMemo, useEffect } from "react"
import { getRefElement, isSSR } from "../shared/utils"

const DEFAULT_OPTIONS = {
  attributes: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true,
}

export const useMutationObserver = (
  target: RefObject<Element> | Element | Node | null,
  callback: MutationCallback,
  options: MutationObserverInit = DEFAULT_OPTIONS
): void => {
  const observer = useMemo(() => (!isSSR ? new MutationObserver(callback) : null), [callback])

  useEffect(() => {
    const element = getRefElement(target)
    if (observer && element) {
      observer.observe(element, options)
      return () => observer.disconnect()
    }
    return undefined
  }, [target, observer, options])
}
