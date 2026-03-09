import { BASE } from "../styles.models"

const nthPrefix = ":nth-child("
const nthPrefixEnd = nthPrefix.length
const nthSuffix = ")"
const nthSuffixLength = nthSuffix.length

function nth(value: string) {
  return `${nthPrefix}${value}${nthSuffix}`
}

function first(index: number) {
  return index === 0
}
function last(index: number, nthChildKey: NthChildKeys, length?: number) {
  if (length === undefined) {
    console.error(getLengthErrorMessage(nthChildKey))
    return false
  }
  return index === length - 1
}
function even(index: number) {
  return index % 2 !== 0 // Indices are zero-based, so this is inverted (odd indices)
}
function odd(index: number) {
  return index % 2 === 0 // Indices are zero-based, so this is inverted (even indices)
}

export const nthChildCheckers = {
  ":first": first,
  ":first-child": first,
  [nth("1")]: first,
  [nth("0n+1")]: first,
  ":last": last,
  ":last-child": last,
  [nth("2")]: (index: number) => {
    return index === 1
  },
  [nth("3")]: (index: number) => {
    return index === 2
  },
  [nth("4")]: (index: number) => {
    return index === 3
  },
  [nth("5")]: (index: number) => {
    return index === 4
  },
  [nth("6")]: (index: number) => {
    return index === 5
  },
  [nth("7")]: (index: number) => {
    return index === 6
  },
  [nth("8")]: (index: number) => {
    return index === 7
  },
  [nth("-n+2")]: (index: number) => {
    return index < 2
  },
  [nth("-n+3")]: (index: number) => {
    return index < 3
  },
  [nth("-n+4")]: (index: number) => {
    return index < 4
  },
  [nth("-n+5")]: (index: number) => {
    return index < 5
  },
  [nth("-n+6")]: (index: number) => {
    return index < 6
  },
  [nth("-n+7")]: (index: number) => {
    return index < 7
  },
  [nth("-n+8")]: (index: number) => {
    return index < 8
  },
  [nth("3n")]: (index: number) => {
    return (index + 1) % 3 === 0 // Indices are zero-based
  },
  [nth("3n+1")]: (index: number) => {
    return index % 3 === 0 // Indices are zero-based
  },
  [nth("4n")]: (index: number) => {
    return (index + 1) % 4 === 0 // Indices are zero-based
  },
  [nth("4n+1")]: (index: number) => {
    return index % 4 === 0 // Indices are zero-based
  },
  ":even": even,
  [nth("even")]: even,
  [nth("2n")]: even,
  ":odd": odd,
  [nth("odd")]: odd,
  [nth("2n+1")]: odd,

  // Checks any possible value of nth-child
  [BASE]: (index: number, nthChildKey: NthChildKeys) => {
    if (!nthChildKey) return false
    const nthValue = nthChildKey.slice(nthPrefixEnd, -1 * nthSuffixLength)
    const parts = nthValue.split("n")

    if (parts.length === 1) {
      return index === parseInt(nthValue) - 1
    }
    if (parts[0] === "0") {
      return index === parseInt(parts[1]) - 1
    }

    let nMultiplier = 1
    if (parts[0] === "-") {
      nMultiplier = -1
    } else if (parts[0]) {
      nMultiplier = parseInt(parts[0])
    }

    if (!parts[1]) {
      return (index + 1) % nMultiplier === 0
    }

    const nModifier = parseInt(parts[1])
    const base = index + 1 - nModifier

    return base > -1 && base % nMultiplier === 0
  },
} as const

export function isCustomNthChild(nthChildKey: NthChildKeys) {
  const start = nthChildKey.substring(0, nthPrefixEnd)
  return start === nthPrefix
}

export function getIndexErrorMessage(nthChildKey: NthChildKeys) {
  return `The \`index\` prop is required for selector: \`${nthChildKey}\``
}
export function getLengthErrorMessage(nthChildKey: NthChildKeys) {
  return `The \`length\` prop is required for selector: \`${nthChildKey}\``
}

// TYPES //////////////////////////////////////////////////////////////////////////////////////////
// This is a hacky way to get a union-friendly string that doesn't wipe out static string values from a union
type CustomNthChild = `:nth-child(${string | number})`
export type NthChildKeys =
  | ":first"
  | ":first-child"
  | ":last"
  | ":last-child"
  | ":even"
  | ":odd"
  | ":nth-child(<nth>) "
  | CustomNthChild
