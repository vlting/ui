import { useEffect, useState } from 'react'
import type { BrandFontConfig } from './googleFontsUrl'
import { extractFamiliesFromConfig, getGoogleFontsUrl } from './googleFontsUrl'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FontLoadState {
  loaded: boolean
  error: Error | null
}

// ---------------------------------------------------------------------------
// @font-face CSS parser
// ---------------------------------------------------------------------------

interface FontFaceEntry {
  family: string
  weight: string
  style: string
  url: string
}

const FONT_FACE_REGEX = /@font-face\s*\{([^}]+)\}/g
const FAMILY_REGEX = /font-family:\s*'([^']+)'/
const WEIGHT_REGEX = /font-weight:\s*(\d+)/
const STYLE_REGEX = /font-style:\s*(\w+)/
const URL_REGEX = /url\(([^)]+)\)/

export function parseFontFacesFromCSS(css: string): FontFaceEntry[] {
  const entries: FontFaceEntry[] = []
  let match: RegExpExecArray | null

  while ((match = FONT_FACE_REGEX.exec(css)) !== null) {
    const block = match[1]
    const family = FAMILY_REGEX.exec(block)?.[1]
    const weight = WEIGHT_REGEX.exec(block)?.[1] ?? '400'
    const style = STYLE_REGEX.exec(block)?.[1] ?? 'normal'
    const url = URL_REGEX.exec(block)?.[1]

    if (family && url) {
      entries.push({ family, weight, style, url })
    }
  }

  return entries
}

// ---------------------------------------------------------------------------
// Build font name key matching Tamagui face map convention
// ---------------------------------------------------------------------------

export function buildFontKey(family: string, weight: string, style: string): string {
  return `${family.replace(/\s+/g, '_')}_${weight}_${style}`
}

// ---------------------------------------------------------------------------
// Resolve expo-font at runtime (optional peer dependency)
// ---------------------------------------------------------------------------

type ExpoFont = {
  loadAsync: (map: Record<string, { uri: string }>) => Promise<void>
}

function tryRequireExpoFont(): ExpoFont | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('expo-font') as ExpoFont
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Mobile User-Agent for Google Fonts (returns TTF instead of woff2)
// ---------------------------------------------------------------------------

const MOBILE_UA =
  'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'

// ---------------------------------------------------------------------------
// useFontLoader (React Native)
//
// 1. Fetches Google Fonts CSS with a mobile UA (gets TTF URLs)
// 2. Parses @font-face blocks
// 3. Loads fonts via expo-font loadAsync
// 4. Returns { loaded: true } when done or on any error (graceful degradation)
// ---------------------------------------------------------------------------

const LOAD_TIMEOUT_MS = 5000

export function useFontLoader(fontConfig?: BrandFontConfig): FontLoadState {
  const [state, setState] = useState<FontLoadState>(() => {
    // If no config or all system fonts, loaded immediately
    if (!fontConfig || extractFamiliesFromConfig(fontConfig).length === 0) {
      return { loaded: true, error: null }
    }
    return { loaded: false, error: null }
  })

  useEffect(() => {
    if (!fontConfig || extractFamiliesFromConfig(fontConfig).length === 0) {
      return
    }

    const Font = tryRequireExpoFont()
    if (!Font) {
      console.warn(
        '[@vlting/ui] expo-font is not installed. ' +
          'Fonts will fall back to system defaults on React Native. ' +
          'Install expo-font for custom Google Fonts support.',
      )
      setState({ loaded: true, error: null })
      return
    }

    const controller = new AbortController()
    let timedOut = false

    const timeout = setTimeout(() => {
      timedOut = true
      controller.abort()
    }, LOAD_TIMEOUT_MS)

    async function loadFonts() {
      try {
        const url = getGoogleFontsUrl(fontConfig!)
        if (!url) {
          setState({ loaded: true, error: null })
          return
        }

        const response = await fetch(url, {
          headers: { 'User-Agent': MOBILE_UA },
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Google Fonts returned ${response.status}`)
        }

        const css = await response.text()
        const faces = parseFontFacesFromCSS(css)

        if (faces.length === 0) {
          setState({ loaded: true, error: null })
          return
        }

        const fontMap: Record<string, { uri: string }> = {}
        for (const face of faces) {
          const key = buildFontKey(face.family, face.weight, face.style)
          fontMap[key] = { uri: face.url }
        }

        await Font!.loadAsync(fontMap)
        setState({ loaded: true, error: null })
      } catch (err) {
        if (timedOut) {
          console.warn(
            '[@vlting/ui] Font loading timed out after 5s. Using system fonts.',
          )
        } else if (!(err instanceof DOMException && err.name === 'AbortError')) {
          console.warn(
            '[@vlting/ui] Font loading failed, using system fonts:',
            err,
          )
        }
        // Graceful degradation: always render with system fonts
        setState({
          loaded: true,
          error: err instanceof Error ? err : new Error(String(err)),
        })
      } finally {
        clearTimeout(timeout)
      }
    }

    loadFonts()

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [fontConfig])

  return state
}
