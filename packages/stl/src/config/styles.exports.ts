/**
 * Bridge file: re-exports from styles.css.ts for type declaration generation.
 *
 * vite-plugin-dts cannot generate .d.ts for vanilla-extract .css.ts files.
 * This file provides a non-.css.ts import path so dts generation works.
 */
export type { BaseCSS, ConditionalCSS, CSS, OverrideScaledProp } from './styles.css'
export { token, tokenValue, theme } from './styles.css'
export {
  scaledPropMap,
  customVarPropMap,
  staticPropMap,
  managerScales,
} from './styles.css'
export { varMap, darkVarMap, tokenToVarMap } from './styles.css'
