const firstChars = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]

const allChars = firstChars.concat(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])

export interface VarData {
  name: string
  ref: string
}

const MAX_LENGTH = 3

/** Generates a 1 to 3 character hash, with 200K permutations */
export class CharHash {
  private _count = 0
  /** We only ever need 1-3 keys (i.e. chars), because that still creates 200K possible hashes */
  private key: [number] | [number, number] | [number, number, number] = [0]

  /** Determine the base list of chars to use */
  private getBaseCharSet(index: number) {
    return index === 0 ? firstChars : allChars
  }

  /** Determines if the current key index can be bumped; if not, we need to add another */
  private isBumpable(index: number) {
    const base = this.getBaseCharSet(index)
    return this.key[index] < base.length - 1
  }

  /** Bumps the hash key for the next hash */
  private bumpKey() {
    const length = this.key.length
    let addNewIndex = true
    // Loop through key indices and bump the first bumpable one
    for (let index = length - 1; index >= 0; index--) {
      if (this.isBumpable(index)) {
        this.key[index]++
        // If at least one index is bumpable, we don't need to add an new index
        addNewIndex = false
        break
      } else {
        this.key[index] = 0
      }
    }
    if (addNewIndex) {
      if (length === MAX_LENGTH) {
        throw new Error("Maximum number of possible hashes exceeded")
      } else {
        this.key.push(0)
      }
    }
  }

  /** Get a generated hash name */
  get name(): string {
    const val = this.key.reduce((out: string, k: number, index: number) => {
      const base = this.getBaseCharSet(index)
      out += base[k]
      return out
    }, "")
    this.bumpKey()
    this._count++
    return val
  }

  /** Get a generated, hashed CSS var name and reference string */
  get var(): VarData {
    const hash = this.name
    return {
      name: `--${hash}`,
      ref: `var(--${hash})`,
    }
  }

  /** Get the current number of hashes this instance has generated */
  get count() {
    return this._count
  }

  /** Returns an escaped (\u{...}) unicode character, for non-ASCII inputs */
  static escapeUnicodeChar(c: string) {
    return /^[\x00-\x7F]$/.test(c)
      ? c
      : c
          .split("")
          .map((a: string) => "\\u" + a.charCodeAt(0).toString(16).padStart(4, "0"))
          .join("")
  }
}

// Export our necessary CharHash instances
export const varHash = new CharHash()
export const keyframeHash = new CharHash()
export const classHash = new CharHash()
