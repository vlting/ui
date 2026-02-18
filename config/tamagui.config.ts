import { createTamagui } from 'tamagui'
import { createBrandConfig } from '../src/brands/createBrandConfig'
import { defaultBrand } from '../src/brands/defaultBrand'

const config = createTamagui(createBrandConfig(defaultBrand))

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
