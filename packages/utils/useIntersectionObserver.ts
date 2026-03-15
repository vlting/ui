import { type RefObject, useEffect, useState } from 'react'

export interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
}

/**
 * Observe whether an element is visible in the viewport.
 *
 * @param ref - A React ref attached to the target element
 * @param options - IntersectionObserver options
 * @returns The latest IntersectionObserverEntry, or `null` before first observation
 */
export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  options: UseIntersectionObserverOptions = {},
): IntersectionObserverEntry | null {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(([e]) => setEntry(e), {
      threshold: options.threshold,
      root: options.root,
      rootMargin: options.rootMargin,
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, options.threshold, options.root, options.rootMargin])

  return entry
}
