import { addStaticValuePrefix } from "../utils"
import { ThemeScale } from "./scales.models"
import { getAliasMap, getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `font` theme scale */
export function getFont() {
  const vars = {} as const

  const cssValueMap = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    body: "body",
    code: "code",
    quote: "quote",
    li: "li",
    small: "small",
    em: "em",
    strong: "strong",
  } as const

  const { aliasMap, cssAliases } = getAliasMap({
    h1: {
      fontFamily: "heading",
      fontSize: "h1",
      fontWeight: "h1",
    },
    h2: {
      fontFamily: "heading",
      fontSize: "h2",
      fontWeight: "h2",
    },
    h3: {
      fontFamily: "heading",
      fontSize: "h3",
      fontWeight: "h3",
    },
    h4: {
      fontFamily: "heading",
      fontSize: "h4",
      fontWeight: "h4",
    },
    h5: {
      fontFamily: "heading",
      fontSize: "h5",
      fontWeight: "h5",
    },
    h6: {
      fontFamily: "heading",
      fontSize: "h6",
      fontWeight: "h6",
    },
    body: {
      fontFamily: "body",
      fontSize: "p",
      fontWeight: "p",
    },
    code: {
      fontFamily: "code",
      fontSize: "code",
      fontWeight: "code",
    },
    quote: {
      fontFamily: "quote",
      fontSize: "quote",
      fontWeight: "quote",
    },
    li: {
      fontFamily: "body",
      fontSize: "p",
      fontWeight: "p",
    },
    small: {
      fontFamily: "body",
      fontSize: "14",
      fontWeight: "p",
    },
    em: {
      fontFamily: "body",
      fontSize: "p",
      fontWeight: "p",
      fontStyle: addStaticValuePrefix("italic"),
    },
    strong: {
      fontFamily: "body",
      fontSize: "p",
      fontWeight: "700",
    },
  })

  const cssAliasMap = { ...cssAliases } as const

  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
    cssValueMapProps: getPropsFromCssMap(cssValueMap),
    cssAliasMap,
    aliasMap,
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap, typeof cssAliasMap>
}

// FILTER KEYS ////////////////////////////////////////////////////////////////
// Used for generating types that map to only parts of this scale

export const fontCombos = {
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  body: true,
  code: true,
  quote: true,
  li: true,
  small: true,
  em: true,
  strong: true,
} as const
