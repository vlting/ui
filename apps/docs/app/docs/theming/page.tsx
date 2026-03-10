import { CodeBlock } from '../../../components/code-block'
import { PalettePicker } from '../../../components/palette-picker'

export const metadata = {
  title: 'Theming — @vlting/ui',
  description:
    'Learn how to customize the look and feel of @vlting/ui with the brand system, tokens, fonts, and themes.',
}

export default function ThemingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Theming</h1>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 16, lineHeight: 1.6 }}>
          Customize the entire design system through a single brand configuration. Colors, tokens,
          fonts, shadows, and animations — all controlled declaratively.
        </p>
      </div>

      {/* Overview */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>How It Works</h2>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14, lineHeight: 1.7 }}>
          The brand system uses plain data objects: you define a <code>Brand</code> object,
          call <code>injectBrandCSS()</code> to set CSS variables, then wrap your app in
          <code>StlProvider</code>. Every component automatically picks up your brand&apos;s colors,
          spacing, fonts, and more.
        </p>
        <CodeBlock
          code={`Brand → injectBrandCSS() → StlProvider`}
          language="text"
        />
      </section>

      {/* Quick Start */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Quick Start</h2>
        <CodeBlock
          code={`import { StlProvider } from '@vlting/stl-react'
import { defaultBrand, injectBrandCSS } from '@vlting/ui'

// Inject brand CSS variables
injectBrandCSS(defaultBrand)

export function App({ children }) {
  return (
    <StlProvider defaultColorMode="light">
      {children}
    </StlProvider>
  )
}`}
          language="tsx"
        />
      </section>

      {/* Pre-built Brands */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Pre-built Brands</h2>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14, lineHeight: 1.7 }}>
          Four brands ship out of the box. Use the brand switcher at the top of this site to preview
          them live.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 12,
          }}
        >
          {[
            {
              name: 'defaultBrand',
              label: 'Default',
              desc: 'Clean, trustworthy, minimalist. Cool-tinted blue neutrals with YInMn Blue accent.',
            },
            {
              name: 'shadcnBrand',
              label: 'shadcn',
              desc: 'Pixel-perfect shadcn/ui match. Pure neutral grays, 10px radius, 1px borders.',
            },
            {
              name: 'funBrand',
              label: 'Fun',
              desc: 'Playful and vibrant. Rounded corners, saturated colors, bouncy animations.',
            },
            {
              name: 'poshBrand',
              label: 'Posh',
              desc: 'Premium and refined. Serif headings, subtle shadows, elegant spacing.',
            },
          ].map((brand) => (
            <div
              key={brand.name}
              style={{
                padding: 16,
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <strong style={{ fontSize: 14 }}>{brand.label}</strong>
              <code style={{ fontSize: 12, color: 'var(--color-muted-foreground)' }}>
                {brand.name}
              </code>
              <p
                style={{
                  fontSize: 13,
                  color: 'var(--color-muted-foreground)',
                  lineHeight: 1.5,
                  marginTop: 4,
                }}
              >
                {brand.desc}
              </p>
            </div>
          ))}
        </div>
        <CodeBlock
          code={`import { defaultBrand, shadcnBrand, funBrand, poshBrand } from '@vlting/ui'
import { injectBrandCSS } from '@vlting/ui'

// Switch brands by injecting different CSS variables
injectBrandCSS(shadcnBrand)`}
          language="tsx"
        />
      </section>

      {/* Brand Definition */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Brand Definition</h2>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14, lineHeight: 1.7 }}>
          A brand is a plain data object conforming to the <code>Brand</code> interface. Every
          field except <code>name</code> and <code>palettes</code> is optional — sensible defaults
          are applied for anything you omit.
        </p>
        <CodeBlock
          code={`interface Brand {
  name: string
  palettes: { light: string[]; dark: string[] }       // 12-step color scales
  accentPalettes?: Record<string, {                    // Named accent palettes
    light: string[]; dark: string[]
  }>
  tokens?: {                                           // Override spacing, sizing, etc.
    size?: Record<string | number, number>
    space?: Record<string | number, number>
    radius?: Record<string | number, number>
    zIndex?: Record<string | number, number>
    borderWidth?: { none?: number; thin?: number; medium?: number; thick?: number }
  }
  borders?: { widths?: { none?: number; thin?: number; medium?: number; thick?: number } }
  outline?: { width?: number; offset?: number }
  shadows?: { light?: ShadowScale; dark?: ShadowScale }
  overlay?: { light?: string; dark?: string }
  fonts?: FontOverrides                                // Low-level font overrides
  fontConfig?: BrandFontConfig                         // High-level font configuration
  typography?: TypographyConfig                        // Text transform, style overrides
  animations?: AnimationConfig                         // Duration and easing settings
  media?: Record<string, { maxWidth?: number; minWidth?: number }>  // Custom breakpoints
}`}
          language="tsx"
        />
      </section>

      {/* Palette System */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Palette System</h2>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14, lineHeight: 1.7 }}>
          Each brand defines a <strong>12-step color palette</strong> for light and dark modes.
          The palette indices map to semantic roles:
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Index</th>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['0', 'Background'],
                ['1', 'Subtle background (muted)'],
                ['2', 'UI element background'],
                ['3', 'Hovered UI element'],
                ['4', 'Active / selected UI element'],
                ['5', 'Subtle borders and separators'],
                ['6', 'Default borders'],
                ['7', 'Strong borders, focus rings'],
                ['8', 'Solid backgrounds, high-contrast text'],
                ['9', 'Hovered solid backgrounds'],
                ['10', 'Low-contrast text'],
                ['11', 'High-contrast text (foreground)'],
              ].map(([index, role]) => (
                <tr key={index} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '6px 12px' }}>
                    <code>{index}</code>
                  </td>
                  <td style={{ padding: '6px 12px', color: 'var(--color-muted-foreground)' }}>
                    {role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14, lineHeight: 1.7 }}>
          Accent palettes follow the same 12-step pattern and are used for semantic colors like
          destructive (red), success (green), or brand accent (blue).
        </p>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 16 }}>Try It</h3>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 13, lineHeight: 1.6, marginBottom: 8 }}>
          Adjust the hue and saturation sliders to preview a 12-step palette in real time.
          Copy the generated code into your brand definition.
        </p>
        <PalettePicker />
        <CodeBlock
          code={`const myBrand: Brand = {
  name: 'my-brand',
  palettes: {
    light: [
      '#ffffff',  // 0 — background
      '#f8f8f8',  // 1 — subtle background
      '#f0f0f0',  // 2 — UI element bg
      '#e8e8e8',  // 3 — hovered
      '#e0e0e0',  // 4 — active
      '#d0d0d0',  // 5 — subtle border
      '#b0b0b0',  // 6 — border
      '#808080',  // 7 — strong border
      '#404040',  // 8 — solid bg
      '#303030',  // 9 — solid bg hover
      '#606060',  // 10 — low-contrast text
      '#1a1a1a',  // 11 — foreground
    ],
    dark: [
      '#0a0a0a',  // 0 — background
      '#141414',  // 1 — subtle background
      // ... 12 steps for dark mode
    ],
  },
}`}
          language="tsx"
        />
      </section>

      {/* Token Reference */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Token Reference</h2>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14, lineHeight: 1.7 }}>
          Tokens are the atomic design values used across all components. Use them via the
          <code>$</code> prefix in styled() CSS or the css prop.
        </p>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>Size Tokens</h3>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 13, lineHeight: 1.6 }}>
          Numeric scale 0–16 plus semantic tokens for layout landmarks.
        </p>
        <CodeBlock
          code={`// Numeric scale: $0 (0px) through $16 (310px)
<View width="$4" height="$4" />      {/* 44px × 44px */}
<View padding="$2" />                 {/* 16px padding */}

// Semantic tokens
<View width="$sidebar" />             {/* 256px */}
<View width="$sidebarCollapsed" />    {/* 48px */}
<Dialog width="$dialogMd" />          {/* 500px */}`}
          language="tsx"
        />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>Space Tokens</h3>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 13, lineHeight: 1.6 }}>
          Spacing scale 0–16 for margins and padding. Negative values are also available.
        </p>
        <CodeBlock
          code={`<View gap="$2" />                     {/* 16px gap */}
<View marginTop="$4" />               {/* 28px margin */}
<View margin="$-1" />                 {/* -10px (negative space) */}`}
          language="tsx"
        />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>Radius Tokens</h3>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 13, lineHeight: 1.6 }}>
          Border radius scale 0–12 plus <code>$full</code> for pill shapes.
        </p>
        <CodeBlock
          code={`<View borderRadius="$2" />             {/* small rounding */}
<View borderRadius="$4" />             {/* medium rounding */}
<View borderRadius="$full" />          {/* 9999px — pill shape */}`}
          language="tsx"
        />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>Color Tokens</h3>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 13, lineHeight: 1.6 }}>
          Semantic color tokens adapt to light/dark mode automatically.
        </p>
        <CodeBlock
          code={`<Text color="$color" />                {/* foreground text */}
<View backgroundColor="$background" /> {/* page background */}
<View borderColor="$borderColor" />    {/* themed border */}
<Button backgroundColor="$blue10" />   {/* specific color step */}`}
          language="tsx"
        />
      </section>

      {/* CSS Custom Properties */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>CSS Custom Properties</h2>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14, lineHeight: 1.7 }}>
          The brand system injects CSS custom properties on <code>:root</code>. Use them directly in
          CSS or inline styles for interoperability with Tailwind and plain CSS.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Property</th>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['--vlt-color-1 … --vlt-color-12', 'Neutral palette steps (1-indexed)'],
                ['--vlt-{accent}-1 … --vlt-{accent}-12', 'Accent palette steps (e.g. --vlt-blue-6)'],
                ['--vlt-size-{n}', 'Size token overrides'],
                ['--vlt-space-{n}', 'Space token overrides'],
                ['--vlt-radius-{n}', 'Border radius overrides'],
                ['--vlt-shadow-{sm|md|lg|xl|2xl}', 'Shadow values'],
                ['--vlt-font-heading', 'Heading font family'],
                ['--vlt-font-body', 'Body font family'],
                ['--vlt-font-mono', 'Monospace font family'],
              ].map(([prop, desc]) => (
                <tr key={prop} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '6px 12px' }}><code>{prop}</code></td>
                  <td style={{ padding: '6px 12px', color: 'var(--color-muted-foreground)' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock
          code={`/* Use in plain CSS */
.my-card {
  background: var(--vlt-color-1);
  border: 1px solid var(--vlt-color-6);
  color: var(--vlt-color-12);
  font-family: var(--vlt-font-body);
  box-shadow: var(--vlt-shadow-md);
}`}
          language="css"
        />
      </section>

      {/* Font Configuration */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Font Configuration</h2>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14, lineHeight: 1.7 }}>
          Four font roles are available: <code>heading</code>, <code>body</code>, <code>mono</code>,
          and <code>quote</code>. The heading font uses a weight alternation pattern where odd heading
          levels (h1, h3, h5) use the heavy weight and even levels (h2, h4, h6) use the light weight.
        </p>
        <CodeBlock
          code={`const myBrand: Brand = {
  // ...palettes
  fontConfig: {
    heading: {
      family: 'Playfair Display',
      fallback: 'Georgia, serif',
      weights: { heavy: 700, light: 400 },  // alternating per heading level
    },
    body: {
      family: 'Inter',
      fallback: 'system-ui, sans-serif',
      weight: 400,
    },
    mono: {
      family: 'JetBrains Mono',
      fallback: 'monospace',
      weight: 400,
    },
    quote: {
      family: 'Georgia',
      fallback: 'serif',
      weight: 300,
      style: 'italic',
    },
  },
  typography: {
    heading: { transform: 'uppercase' },  // optional text-transform
  },
}`}
          language="tsx"
        />
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14, lineHeight: 1.7 }}>
          Use font tokens in components via the <code>fontFamily</code> prop:
        </p>
        <CodeBlock
          code={`<Text fontFamily="$heading" fontSize="$8">Title</Text>
<Text fontFamily="$body" fontSize="$4">Body text</Text>
<Text fontFamily="$mono" fontSize="$3">const x = 42</Text>`}
          language="tsx"
        />
      </section>

      {/* Animations */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Animations</h2>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14, lineHeight: 1.7 }}>
          Control animation durations and easing curves per brand. Defaults use CSS transitions with
          standard durations.
        </p>
        <CodeBlock
          code={`const myBrand: Brand = {
  // ...other config
  animations: {
    driver: 'css',  // 'css' (web) or 'reanimated' (native)
    durations: {
      instant: 100,   // ms — micro-interactions
      fast: 150,       // ms — hover, focus
      medium: 250,     // ms — transitions, reveals
      slow: 400,       // ms — page transitions
    },
    easings: {
      standard: 'ease-in-out',
      enter: 'ease-out',
      exit: 'ease-in',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
}`}
          language="tsx"
        />
      </section>

      {/* Media Queries */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Media Queries</h2>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14, lineHeight: 1.7 }}>
          Default breakpoints are provided. Override them via the <code>media</code> field in your
          brand definition.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Token</th>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Value</th>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Usage</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['$sm', 'max-width: 640px', 'Mobile'],
                ['$md', 'max-width: 768px', 'Tablet portrait'],
                ['$lg', 'max-width: 1024px', 'Tablet landscape'],
                ['$xl', 'max-width: 1280px', 'Small desktop'],
                ['$xxl', 'max-width: 1536px', 'Large desktop'],
                ['$gtSm', 'min-width: 641px', 'Above mobile'],
                ['$gtMd', 'min-width: 769px', 'Above tablet'],
                ['$gtLg', 'min-width: 1025px', 'Above tablet landscape'],
                ['$pointerFine', 'pointer: fine', 'Mouse/trackpad (not touch)'],
              ].map(([token, value, usage]) => (
                <tr key={token} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '6px 12px' }}>
                    <code>{token}</code>
                  </td>
                  <td style={{ padding: '6px 12px', color: 'var(--color-muted-foreground)' }}>
                    {value}
                  </td>
                  <td style={{ padding: '6px 12px', color: 'var(--color-muted-foreground)' }}>
                    {usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock
          code={`// Responsive props with media queries
<View
  padding="$4"
  $sm={{ padding: '$2' }}
  $gtLg={{ padding: '$6' }}
/>

// Conditional rendering
<Text $sm={{ display: 'none' }}>Desktop only</Text>`}
          language="tsx"
        />
      </section>

      {/* Creating a Custom Brand */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Creating a Custom Brand</h2>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14, lineHeight: 1.7 }}>
          Start from an existing brand and override what you need, or build from scratch.
        </p>
        <CodeBlock
          code={`import { injectBrandCSS, defaultBrand, type Brand } from '@vlting/ui'

const myBrand: Brand = {
  ...defaultBrand,
  name: 'my-company',
  palettes: {
    light: [
      '#ffffff', '#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe',
      '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8',
      '#581c87', '#3b0764',
    ],
    dark: [
      '#0c0015', '#1a0030', '#2d004d', '#3b0064', '#4c007a',
      '#6b21a8', '#7e22ce', '#9333ea', '#a855f7', '#c084fc',
      '#d8b4fe', '#f3e8ff',
    ],
  },
  tokens: {
    radius: { ...defaultBrand.tokens?.radius, 4: 16 },
  },
  fontConfig: {
    heading: {
      family: 'Cal Sans',
      weights: { heavy: 600, light: 400 },
    },
    body: { family: 'Inter', weight: 400 },
    mono: { family: 'Fira Code', weight: 400 },
    quote: { family: 'Lora', weight: 400, style: 'italic' },
  },
}

injectBrandCSS(myBrand)`}
          language="tsx"
        />
      </section>

      {/* Dark Mode */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Dark Mode</h2>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14, lineHeight: 1.7 }}>
          The theme system generates both light and dark themes from your brand palettes. Set the
          active theme via the Provider&apos;s <code>defaultTheme</code> prop. For Next.js apps,
          use <code>next-themes</code> to handle system preference detection and persistence.
        </p>
        <CodeBlock
          code={`import { StlProvider } from '@vlting/stl-react'
import { injectBrandCSS, defaultBrand } from '@vlting/ui'
import { ThemeProvider, useTheme } from 'next-themes'

injectBrandCSS(defaultBrand)

function Inner({ children }) {
  const { resolvedTheme } = useTheme()
  return (
    <StlProvider defaultColorMode={resolvedTheme === 'dark' ? 'dark' : 'light'}>
      {children}
    </StlProvider>
  )
}

export function App({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Inner>{children}</Inner>
    </ThemeProvider>
  )
}`}
          language="tsx"
        />
      </section>
    </div>
  )
}
