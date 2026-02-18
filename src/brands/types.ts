import type { CreateTamaguiProps, GenericFont } from 'tamagui'

export interface TokenOverrides {
  size?: Record<string | number, number>
  space?: Record<string | number, number>
  radius?: Record<string | number, number>
  zIndex?: Record<string | number, number>
}

export interface FontOverrides {
  heading?: Partial<GenericFont>
  body?: Partial<GenericFont>
  mono?: Partial<GenericFont>
}

export interface BrandDefinition {
  name: string

  palettes: {
    light: string[]
    dark: string[]
  }

  accentPalettes?: Record<string, { light: string[]; dark: string[] }>

  tokens?: TokenOverrides

  fonts?: FontOverrides

  shadows?: {
    light?: Record<string, string>
    dark?: Record<string, string>
  }

  animations?: {
    driver?: 'css' | 'reanimated'
  }

  media?: CreateTamaguiProps['media']
}
