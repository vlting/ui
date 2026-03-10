export interface HookEntry {
  name: string
  slug: string
  description: string
  importPath: string
  signature: string
  parameters: { name: string; type: string; description: string }[]
  returns: string
  usage: string
}

const hooks: HookEntry[] = [
  {
    name: 'useClipboard',
    slug: 'use-clipboard',
    description: 'Copy text to the clipboard with a temporary success state.',
    importPath: "import { useClipboard } from '@vlting/ui'",
    signature: 'useClipboard(timeout?: number): { copy, copied }',
    parameters: [
      { name: 'timeout', type: 'number', description: 'How long `copied` stays true (default 2000ms)' },
    ],
    returns: '`{ copy: (text: string) => Promise<void>, copied: boolean }`',
    usage: `const { copy, copied } = useClipboard()

return (
  <button onClick={() => copy('Hello!')}>
    {copied ? 'Copied!' : 'Copy'}
  </button>
)`,
  },
  {
    name: 'useControllableState',
    slug: 'use-controllable-state',
    description: 'Manage state that can be either controlled (via prop) or uncontrolled (internal).',
    importPath: "import { useControllableState } from '@vlting/ui'",
    signature: 'useControllableState<T>({ prop?, defaultProp?, onChange? }): [value, setValue]',
    parameters: [
      { name: 'prop', type: 'T | undefined', description: 'Controlled value (makes the hook controlled)' },
      { name: 'defaultProp', type: 'T | undefined', description: 'Initial value for uncontrolled mode' },
      { name: 'onChange', type: '(value: T) => void', description: 'Callback when value changes' },
    ],
    returns: '`[T | undefined, (next: T | ((prev) => T)) => void]`',
    usage: `// Uncontrolled with default
const [value, setValue] = useControllableState({
  defaultProp: 'hello',
  onChange: (v) => console.log('Changed:', v),
})

// Controlled
const [value, setValue] = useControllableState({
  prop: controlledValue,
  onChange: setControlledValue,
})`,
  },
  {
    name: 'useDebounce',
    slug: 'use-debounce',
    description: 'Debounce a value by a given delay.',
    importPath: "import { useDebounce } from '@vlting/ui'",
    signature: 'useDebounce<T>(value: T, delay?: number): T',
    parameters: [
      { name: 'value', type: 'T', description: 'The value to debounce' },
      { name: 'delay', type: 'number', description: 'Delay in milliseconds (default 300)' },
    ],
    returns: 'The debounced value',
    usage: `const [search, setSearch] = useState('')
const debouncedSearch = useDebounce(search, 300)

useEffect(() => {
  fetchResults(debouncedSearch)
}, [debouncedSearch])`,
  },
  {
    name: 'useFocusTrap',
    slug: 'use-focus-trap',
    description: 'Trap focus within a container element. Tab and Shift+Tab cycle within the container when active.',
    importPath: "import { useFocusTrap } from '@vlting/ui'",
    signature: 'useFocusTrap<T extends HTMLElement>(active?: boolean): RefObject<T>',
    parameters: [
      { name: 'active', type: 'boolean', description: 'Whether the trap is currently active (default false)' },
    ],
    returns: 'A ref to attach to the container element',
    usage: `const [active, setActive] = useState(false)
const trapRef = useFocusTrap<HTMLDivElement>(active)

return (
  <div ref={trapRef}>
    <button>Focusable 1</button>
    <button>Focusable 2</button>
    <button onClick={() => setActive(false)}>Close</button>
  </div>
)`,
  },
  {
    name: 'useIntersectionObserver',
    slug: 'use-intersection-observer',
    description: 'Observe whether an element is visible in the viewport using IntersectionObserver.',
    importPath: "import { useIntersectionObserver } from '@vlting/ui'",
    signature: 'useIntersectionObserver(ref, options?): IntersectionObserverEntry | null',
    parameters: [
      { name: 'ref', type: 'RefObject<Element | null>', description: 'A React ref attached to the target element' },
      { name: 'options.threshold', type: 'number | number[]', description: 'Visibility threshold(s)' },
      { name: 'options.root', type: 'Element | null', description: 'Root element for the observer' },
      { name: 'options.rootMargin', type: 'string', description: 'Margin around the root' },
    ],
    returns: 'The latest `IntersectionObserverEntry` or `null`',
    usage: `const ref = useRef<HTMLDivElement>(null)
const entry = useIntersectionObserver(ref, { threshold: 0.5 })
const isVisible = entry?.isIntersecting ?? false

return (
  <div ref={ref}>
    {isVisible ? 'Visible!' : 'Scroll to see me'}
  </div>
)`,
  },
  {
    name: 'useKeyboardNavigation',
    slug: 'use-keyboard-navigation',
    description: 'Arrow key navigation handler for lists and grids. Supports vertical, horizontal, and both orientations with optional looping.',
    importPath: "import { useKeyboardNavigation } from '@vlting/ui'",
    signature: 'useKeyboardNavigation(items, activeIndex, setActiveIndex, options?): KeyboardEventHandler',
    parameters: [
      { name: 'items', type: 'number', description: 'Total number of navigable items' },
      { name: 'activeIndex', type: 'number', description: 'Currently active item index' },
      { name: 'setActiveIndex', type: '(index: number) => void', description: 'Callback to update active index' },
      { name: 'options.orientation', type: "'horizontal' | 'vertical' | 'both'", description: 'Navigation direction (default vertical)' },
      { name: 'options.loop', type: 'boolean', description: 'Whether to loop at boundaries (default false)' },
      { name: 'options.onSelect', type: '(index: number) => void', description: 'Callback when Enter is pressed' },
    ],
    returns: 'A `KeyboardEvent` handler to attach to the container',
    usage: `const [activeIndex, setActiveIndex] = useState(0)
const items = ['Apple', 'Banana', 'Cherry']

const handleKeyDown = useKeyboardNavigation(
  items.length,
  activeIndex,
  setActiveIndex,
  { orientation: 'vertical', loop: true, onSelect: (i) => alert(items[i]) },
)

return (
  <div role="listbox" onKeyDown={handleKeyDown}>
    {items.map((item, i) => (
      <div key={item} role="option" aria-selected={i === activeIndex}>
        {item}
      </div>
    ))}
  </div>
)`,
  },
  {
    name: 'useMediaQuery',
    slug: 'use-media-query',
    description: 'Subscribe to a CSS media query and re-render when it changes.',
    importPath: "import { useMediaQuery } from '@vlting/ui'",
    signature: 'useMediaQuery(query: string): boolean',
    parameters: [
      { name: 'query', type: 'string', description: 'CSS media query string' },
    ],
    returns: '`true` if the query matches, `false` otherwise',
    usage: `const isMobile = useMediaQuery('(max-width: 768px)')
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

return <p>{isMobile ? 'Mobile' : 'Desktop'} — {prefersDark ? 'Dark' : 'Light'}</p>`,
  },
  {
    name: 'useReducedMotion',
    slug: 'use-reduced-motion',
    description: 'Detect the `prefers-reduced-motion` system preference.',
    importPath: "import { useReducedMotion } from '@vlting/ui'",
    signature: 'useReducedMotion(): boolean',
    parameters: [],
    returns: '`true` if the user prefers reduced motion',
    usage: `const reducedMotion = useReducedMotion()

return (
  <div style={{
    transition: reducedMotion ? 'none' : 'transform 0.3s ease',
  }}>
    Animated content
  </div>
)`,
  },
]

export function getHook(slug: string): HookEntry | undefined {
  return hooks.find((h) => h.slug === slug)
}

export function getAllHooks(): HookEntry[] {
  return hooks
}
