import type { BrandFontConfig } from './googleFontsUrl'

// ---------------------------------------------------------------------------
// nativeFontFace (web)
//
// On web, font weights resolve via CSS — no `face` map needed.
// Returns undefined so it's a no-op when spread into createFont().
// ---------------------------------------------------------------------------

export type FaceMap = Record<string, Record<string, string>>

export function buildFaceMapsFromConfig(
  _config: BrandFontConfig,
): Record<string, FaceMap | undefined> {
  return {
    heading: undefined,
    body: undefined,
    mono: undefined,
    quote: undefined,
  }
}
