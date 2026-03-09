/** Get the keys of an enum */
export function enumKeys<O extends Record<string, string>, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[]
}

/** Get the values of an enum */
export function enumValues<O extends Record<string, string>, K extends keyof O = keyof O>(obj: O): O[K][] {
  return Object.values(obj) as O[K][]
}

/** Capitalize the first letter of a string */
export function capitalizeFirstLetter(source: string): string {
  return source.charAt(0).toUpperCase() + source.slice(1)
}
