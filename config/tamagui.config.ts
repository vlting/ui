import { createTamagui } from 'tamagui'
import { createBrandConfig, defaultBrand } from '../packages/design-tokens/src/brands'

const config = createTamagui(createBrandConfig(defaultBrand))

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
