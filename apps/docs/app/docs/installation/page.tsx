import { CodeBlock } from '../../../components/code-block'

export const metadata = {
  title: 'Installation — @vlting/ui',
  description: 'Install and set up @vlting/ui in your project.',
}

export default function InstallationPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Installation</h1>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 16, lineHeight: 1.6 }}>
          Get started with @vlting/ui in your React or React Native project.
        </p>
      </div>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Package Manager</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <CodeBlock code="yarn add @vlting/ui" language="bash" title="yarn" />
          <CodeBlock code="npm install @vlting/ui" language="bash" title="npm" />
          <CodeBlock code="pnpm add @vlting/ui" language="bash" title="pnpm" />
          <CodeBlock code="bun add @vlting/ui" language="bash" title="bun" />
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Peer Dependencies</h2>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14, lineHeight: 1.7 }}>
          Ensure you have React 19+ installed. For React Native projects, also install
          the native dependencies.
        </p>
        <CodeBlock
          code={`# Web
yarn add react react-dom

# React Native
yarn add react react-native react-native-gesture-handler react-native-reanimated`}
          language="bash"
        />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Next.js Setup</h2>
        <CodeBlock
          code={`// next.config.mjs
const nextConfig = {
  transpilePackages: ['@vlting/ui', 'react-native-web'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    }
    return config
  },
}

export default nextConfig`}
          language="js"
          title="next.config.mjs"
        />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Vite Setup</h2>
        <CodeBlock
          code={`// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
})`}
          language="ts"
          title="vite.config.ts"
        />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Basic Usage</h2>
        <CodeBlock
          code={`import { StlProvider } from '@vlting/stl-react'
import { Button } from '@vlting/ui/components'
import { Text } from '@vlting/stl-react'

function App() {
  return (
    <StlProvider defaultColorMode="light">
      <Text>Hello World</Text>
      <Button>Click me</Button>
    </StlProvider>
  )
}`}
          language="tsx"
          title="App.tsx"
        />
      </section>
    </div>
  )
}
