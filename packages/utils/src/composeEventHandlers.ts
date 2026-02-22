/**
 * Compose multiple event handlers into one.
 * If any handler calls event.preventDefault(), subsequent handlers are skipped.
 */
export function composeEventHandlers<E>(
  ...handlers: (((event: E) => void) | undefined)[]
): (event: E) => void {
  return (event: E) => {
    for (const handler of handlers) {
      if (handler) {
        handler(event)
        if ((event as unknown as { defaultPrevented?: boolean }).defaultPrevented) {
          return
        }
      }
    }
  }
}
