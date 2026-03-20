# @vlting/ui

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@vlting/ui.svg)](https://www.npmjs.com/package/@vlting/ui)

Cross-platform design system built on @vlting/stl — layered, domain-free architecture.

## Features

- 50+ components (Accordion, Button, Dialog, Select, Tabs, Toast, and more)
- 30+ primitives (Box, Text, Stack, Heading, Icon, Separator, and more)
- 14 blocks (Dashboard, Auth, Chat, Settings, and more)
- Charts support
- 8 hooks, 9 utilities
- Icons system
- Theming via brand palettes (light/dark)
- WCAG A accessible
- Cross-platform (web + React Native via Expo)

## Quick Start

```bash
npm install @vlting/ui
```

```tsx
import { Button } from '@vlting/ui/components'
import { StlProvider } from '@vlting/ui'

function App() {
  return (
    <StlProvider>
      <Button>Click me</Button>
    </StlProvider>
  )
}
```

## Custom Themes

Generate a custom theme for your app in two steps:

### 1. Scaffold a theme config

```bash
npx @vlting/stl init-theme
```

This creates `stl.theme.ts` with sensible defaults. Edit the source colors, radius, fonts, and more:

```ts
export const themes: Record<string, CreateThemeOptions> = {
  brand: {
    primary:    { hue: 290, saturation: 65 },
    secondary:  { hue: 340, saturation: 80 },
    neutral:    { hue: 290 },
    background: { hue: 290, saturation: 5 },
    radius: { base: 12 },
    fonts: { heading: 'playfairDisplay', body: 'raleway', code: 'firaCode' },
  },
}
```

### 2. Generate themed CSS

```bash
npx @vlting/stl build-theme
```

Reads your `stl.theme.ts`, copies the base `stl.css` from `node_modules`, appends your theme's CSS variables, and writes to `public/stl.css` (configurable via `config.outDir` in the theme file or `--out-dir` flag).

Import the generated file instead of `@vlting/stl/styles`:

```ts
import './stl.css'  // your themed copy
```

Activate the theme in your app:

```tsx
<StlProvider themeName="brand">
  {/* your app */}
</StlProvider>
```

Re-run `build-theme` anytime you change `stl.theme.ts`. The output is idempotent — always generated fresh from the base CSS.

## Documentation

Full documentation, component API references, and guides are available at [docs.vlt.ing](https://docs.vlt.ing).

## License

[MIT](LICENSE)
