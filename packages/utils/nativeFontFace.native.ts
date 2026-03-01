import type { BrandFontConfig } from './googleFontsUrl'
import { isSystemFont } from './googleFontsUrl'
import { buildFontKey } from './useFontLoader.native'

// ---------------------------------------------------------------------------
// nativeFontFace (React Native)
//
// Builds Tamagui `face` maps so RN can resolve (fontWeight, fontStyle)
// to the loaded font name (e.g. "Inter_400_normal").
//
// Without `face`, Tamagui on Android cannot distinguish font weights —
// a known RN limitation where all weights render as regular.
// ---------------------------------------------------------------------------

export type FaceMap = Record<string, Record<string, string>>

function buildFaceForSlot(
  family: string,
  weights: number[],
  style: 'normal' | 'italic' = 'normal',
): FaceMap | undefined {
  if (isSystemFont(family)) return undefined

  const face: FaceMap = {}
  for (const w of weights) {
    const key = buildFontKey(family, String(w), style)
    face[String(w)] = { normal: key }
  }
  return face
}

export function buildFaceMapsFromConfig(
  config: BrandFontConfig,
): Record<string, FaceMap | undefined> {
  return {
    heading: buildFaceForSlot(config.heading.family, [
      config.heading.weights.heavy,
      config.heading.weights.light,
    ]),
    body: buildFaceForSlot(config.body.family, [config.body.weight]),
    mono: buildFaceForSlot(config.mono.family, [config.mono.weight]),
    quote: buildFaceForSlot(
      config.quote.family,
      [config.quote.weight],
      config.quote.style ?? 'italic',
    ),
  }
}
