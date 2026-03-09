import { FilterKeys, PickKeys } from "./props.models"

export function omitKeys<P extends Record<string | number, unknown>, K extends FilterKeys>(props: P, keys: K) {
  const output: PickKeys<P, K> = { ...props }
  Object.keys(props).forEach(prop => {
    if (!keys[prop as keyof K]) {
      delete output[prop as keyof typeof output]
    }
  })
  return output
}
