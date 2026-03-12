export interface UtilityEntry {
  name: string
  slug: string
  category: 'styling' | 'react-helpers' | 'font-loading'
  description: string
  importPath: string
  signature: string
  usage: string
  params: { name: string; type: string; description: string }[]
  returns: string
}

const registry: UtilityEntry[] = [
  {
    name: 'cn',
    slug: 'cn',
    category: 'styling',
    description:
      'Simple class name utility. Filters falsy values and joins with a space.',
    importPath: "import { cn } from '@vlting/ui'",
    signature: 'cn(...classes: (string | false | null | undefined)[]): string',
    usage: `const className = cn(
  'base-class',
  isActive && 'active',
  isDisabled && 'disabled',
  variant === 'primary' ? 'bg-primary' : 'bg-secondary',
)
// => "base-class active bg-primary"`,
    params: [
      {
        name: '...classes',
        type: '(string | false | null | undefined)[]',
        description: 'Class names or falsy values to filter out.',
      },
    ],
    returns: 'A single space-joined string of truthy class names.',
  },
  {
    name: 'mergeRefs',
    slug: 'merge-refs',
    category: 'react-helpers',
    description:
      'Merge multiple React refs into a single callback ref. Handles both callback refs and RefObject refs.',
    importPath: "import { mergeRefs } from '@vlting/ui'",
    signature: 'mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T>',
    usage: `const Component = forwardRef<HTMLDivElement>((props, ref) => {
  const localRef = useRef<HTMLDivElement>(null)

  return <div ref={mergeRefs(ref, localRef)} {...props} />
})`,
    params: [
      {
        name: '...refs',
        type: '(Ref<T> | undefined)[]',
        description: 'Refs to merge. Supports callback refs, RefObjects, and undefined.',
      },
    ],
    returns: 'A callback ref that forwards the value to all provided refs.',
  },
  {
    name: 'composeEventHandlers',
    slug: 'compose-event-handlers',
    category: 'react-helpers',
    description:
      'Compose multiple event handlers into one. If any handler calls event.preventDefault(), subsequent handlers are skipped.',
    importPath: "import { composeEventHandlers } from '@vlting/ui'",
    signature:
      'composeEventHandlers<E>(...handlers: (((event: E) => void) | undefined)[]): (event: E) => void',
    usage: `<button
  onClick={composeEventHandlers(
    props.onClick,
    (e) => console.log('clicked!'),
    (e) => track('button_click'),
  )}
>
  Click me
</button>`,
    params: [
      {
        name: '...handlers',
        type: '((event: E) => void | undefined)[]',
        description: 'Event handlers to compose. Undefined handlers are skipped.',
      },
    ],
    returns: 'A single event handler that calls each handler in order.',
  },
  {
    name: 'FontLoader',
    slug: 'font-loader',
    category: 'font-loading',
    description:
      'Side-effect component that loads Google Fonts. Prefer the useFontLoader hook in new code.',
    importPath: "import { FontLoader } from '@vlting/ui'",
    signature: 'FontLoader({ fontConfig }: FontLoaderProps): null',
    usage: `<FontLoader
  fontConfig={{
    heading: { family: 'Inter', weights: { heavy: 700, light: 400 } },
    body: { family: 'Inter', weight: 400 },
    mono: { family: 'JetBrains Mono', weight: 400 },
    quote: { family: 'Georgia', weight: 400, style: 'italic' },
  }}
/>`,
    params: [
      {
        name: 'fontConfig',
        type: 'ThemeFontConfig | undefined',
        description:
          'Font configuration object with heading, body, mono, and quote slots.',
      },
    ],
    returns: 'null (renders nothing, injects a <link> tag as a side effect).',
  },
  {
    name: 'getGoogleFontsUrl',
    slug: 'get-google-fonts-url',
    category: 'font-loading',
    description:
      'Generate a Google Fonts CSS URL from a ThemeFontConfig. Deduplicates families, handles italic variants, and skips system fonts.',
    importPath: "import { getGoogleFontsUrl } from '@vlting/ui'",
    signature: 'getGoogleFontsUrl(config: ThemeFontConfig): string',
    usage: `const url = getGoogleFontsUrl({
  heading: { family: 'Inter', weights: { heavy: 700, light: 400 } },
  body: { family: 'Inter', weight: 400 },
  mono: { family: 'JetBrains Mono', weight: 400 },
  quote: { family: 'Lora', weight: 400, style: 'italic' },
})
// => "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=JetBrains+Mono:wght@400&family=Lora:ital,wght@0,400;1,400&display=swap"`,
    params: [
      {
        name: 'config',
        type: 'ThemeFontConfig',
        description: 'Font configuration with heading, body, mono, and quote slots.',
      },
    ],
    returns:
      'A Google Fonts CSS URL string, or empty string if all fonts are system fonts.',
  },
  {
    name: 'useFontLoader',
    slug: 'use-font-loader',
    category: 'font-loading',
    description:
      'React hook that injects a Google Fonts stylesheet into the document head. Uses display=swap for seamless font loading.',
    importPath: "import { useFontLoader } from '@vlting/ui'",
    signature: 'useFontLoader(fontConfig?: ThemeFontConfig): FontLoadState',
    usage: `function App() {
  const { loaded, error } = useFontLoader(brandConfig.fontConfig)

  return <div>Fonts loaded: {String(loaded)}</div>
}`,
    params: [
      {
        name: 'fontConfig',
        type: 'ThemeFontConfig | undefined',
        description: 'Font configuration. If undefined, no fonts are loaded.',
      },
    ],
    returns:
      '{ loaded: boolean, error: Error | null } — On web, loaded is always true (display=swap).',
  },
  {
    name: 'isSystemFont',
    slug: 'is-system-font',
    category: 'font-loading',
    description:
      'Check if a font family is a known system font (e.g., system-ui, Arial, monospace).',
    importPath: "import { isSystemFont } from '@vlting/ui'",
    signature: 'isSystemFont(family: string): boolean',
    usage: `isSystemFont('Arial')       // true
isSystemFont('system-ui')   // true
isSystemFont('Inter')       // false`,
    params: [
      { name: 'family', type: 'string', description: 'The font family name to check.' },
    ],
    returns: 'true if the font is a known system font.',
  },
  {
    name: 'extractFamiliesFromConfig',
    slug: 'extract-families-from-config',
    category: 'font-loading',
    description: 'Extract unique non-system font families from a ThemeFontConfig.',
    importPath: "import { extractFamiliesFromConfig } from '@vlting/ui'",
    signature: 'extractFamiliesFromConfig(config: ThemeFontConfig): string[]',
    usage: `const families = extractFamiliesFromConfig({
  heading: { family: 'Inter', weights: { heavy: 700, light: 400 } },
  body: { family: 'Inter', weight: 400 },
  mono: { family: 'monospace', weight: 400 },
  quote: { family: 'Lora', weight: 400 },
})
// => ['Inter', 'Lora']  (monospace is a system font)`,
    params: [
      {
        name: 'config',
        type: 'ThemeFontConfig',
        description: 'Font configuration to extract families from.',
      },
    ],
    returns: 'Array of unique non-system font family names.',
  },
  {
    name: 'buildFaceMapsFromConfig',
    slug: 'build-face-maps-from-config',
    category: 'font-loading',
    description:
      'Build font face maps from a ThemeFontConfig. On web this is a no-op (returns undefined for each slot). On native, it builds platform-specific face maps.',
    importPath: "import { buildFaceMapsFromConfig } from '@vlting/ui'",
    signature:
      'buildFaceMapsFromConfig(config: ThemeFontConfig): Record<string, FaceMap | undefined>',
    usage: `const faceMaps = buildFaceMapsFromConfig(fontConfig)
// => { heading: undefined, body: undefined, mono: undefined, quote: undefined }
// On native, returns actual face maps for font weight resolution`,
    params: [
      {
        name: 'config',
        type: 'ThemeFontConfig',
        description: 'Font configuration to build face maps from.',
      },
    ],
    returns:
      'Record with heading, body, mono, quote keys. On web, all values are undefined.',
  },
]

export function getUtility(slug: string): UtilityEntry | undefined {
  return registry.find((u) => u.slug === slug)
}

export function getAllUtilities(): UtilityEntry[] {
  return registry
}

export function getUtilitiesByCategory(
  category: UtilityEntry['category'],
): UtilityEntry[] {
  return registry.filter((u) => u.category === category)
}

export const utilityCategories: { key: UtilityEntry['category']; label: string }[] = [
  { key: 'styling', label: 'Styling' },
  { key: 'react-helpers', label: 'React Helpers' },
  { key: 'font-loading', label: 'Font Loading' },
]
