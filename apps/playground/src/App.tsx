import { StlProvider } from '@vlting/ui'
import { Button } from '@vlting/ui'
import '@vlting/stl/styles'

export function App() {
  return (
    <StlProvider defaultColorMode="light">
      <div style={{ padding: 32 }}>
        <header style={{ marginBottom: 32 }}>
          <h1>@vlting/ui Playground</h1>
        </header>
        <main>
          <Button>Hello from Playground</Button>
        </main>
      </div>
    </StlProvider>
  )
}
