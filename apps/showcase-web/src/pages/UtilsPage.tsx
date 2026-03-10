import { DemoCard, Section } from '../components/Section'

export function UtilsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Utilities</h1>
      <p style={{ color: '#666', marginBottom: 24, fontSize: 14 }}>
        Helper functions exported from <code>@vlting/ui/utils</code> for common patterns.
      </p>

      <Section title="cn()">
        <DemoCard label="Class name merging (clsx + tailwind-merge)">
          <pre
            style={{
              fontSize: 12,
              padding: 12,
              background: '#f5f5f5',
              borderRadius: 6,
              overflow: 'auto',
            }}
          >
            {`import { cn } from '@vlting/ui/utils'

// Merge class names — handles conflicts and falsy values
cn('px-4 py-2', 'px-6')           // → 'py-2 px-6'
cn('text-red', false && 'hidden') // → 'text-red'
cn('rounded', undefined, 'flex')  // → 'rounded flex'

// Typical usage in components:
function MyComponent({ className, active }: Props) {
  return (
    <div className={cn('base-styles', active && 'active-styles', className)}>
      ...
    </div>
  )
}`}
          </pre>
        </DemoCard>
      </Section>

      <Section title="mergeRefs()">
        <DemoCard label="Combine multiple refs into one">
          <pre
            style={{
              fontSize: 12,
              padding: 12,
              background: '#f5f5f5',
              borderRadius: 6,
              overflow: 'auto',
            }}
          >
            {`import { mergeRefs } from '@vlting/ui/utils'

// Merge callback refs and RefObjects into a single ref callback
const Component = forwardRef<HTMLDivElement, Props>((props, forwardedRef) => {
  const internalRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={mergeRefs(internalRef, forwardedRef)}>
      {props.children}
    </div>
  )
})

// Works with any combination of:
// - React.RefObject
// - React.MutableRefObject
// - Callback refs (value) => void
// - null / undefined (safely ignored)`}
          </pre>
        </DemoCard>
      </Section>

      <Section title="composeEventHandlers()">
        <DemoCard label="Chain event handlers with cancellation support">
          <pre
            style={{
              fontSize: 12,
              padding: 12,
              background: '#f5f5f5',
              borderRadius: 6,
              overflow: 'auto',
            }}
          >
            {`import { composeEventHandlers } from '@vlting/ui/utils'

// Compose two event handlers — the internal handler only runs
// if the external handler doesn't call event.preventDefault()
<button
  onClick={composeEventHandlers(
    props.onClick,       // external (user-provided)
    internalOnClick      // internal (component logic)
  )}
>
  Click
</button>

// This lets consumers override default behavior:
<MyButton onClick={(e) => {
  e.preventDefault() // prevents internal handler from running
  doSomethingElse()
}} />`}
          </pre>
        </DemoCard>
      </Section>

      <Section title="FontLoader">
        <DemoCard label="Google Fonts loading utilities">
          <pre
            style={{
              fontSize: 12,
              padding: 12,
              background: '#f5f5f5',
              borderRadius: 6,
              overflow: 'auto',
            }}
          >
            {`import {
  FontLoader,
  getGoogleFontsUrl,
  useFontLoader,
  isSystemFont,
  extractFamiliesFromConfig,
} from '@vlting/ui/utils'

// Component — loads fonts and renders children when ready
<FontLoader
  families={['Inter', 'JetBrains Mono']}
  weights={[400, 500, 600, 700]}
  onLoaded={() => console.log('Fonts ready')}
>
  <App />
</FontLoader>

// Hook — track font loading state
const { state } = useFontLoader(['Inter'])
// state: 'idle' | 'loading' | 'loaded' | 'error'

// Helpers
getGoogleFontsUrl(['Inter:wght@400;700'])
isSystemFont('system-ui')              // → true
isSystemFont('Inter')                  // → false
extractFamiliesFromConfig(brandConfig) // → ['Inter', ...]`}
          </pre>
        </DemoCard>
      </Section>
    </div>
  )
}
