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

## Documentation

Full documentation, component API references, and guides are available at [docs.vlt.ing](https://docs.vlt.ing).

## License

[MIT](LICENSE)
