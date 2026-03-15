// Mock for @vanilla-extract/css — build-time CSS-in-JS tool that can't run in Jest
module.exports = {
  globalStyle: () => {},
  globalKeyframes: () => '',
  style: () => '',
  createGlobalTheme: () => {},
  createTheme: () => ['', {}],
  createVar: () => '',
  fallbackVar: (...args) => args[0],
  assignVars: () => ({}),
}
