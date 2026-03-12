import { CodeBlock } from '../../../components/code-block'
import { PalettePicker } from '../../../components/palette-picker'

export const metadata = {
  title: 'Theming — @vlting/ui',
  description:
    'Learn how to customize the look and feel of @vlting/ui with generateTheme(), presets, tokens, fonts, and themes.',
}

export default function ThemingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Theming</h1>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 16,
            lineHeight: 1.6,
          }}
        >
          Customize the entire design system with a single function call. Colors,
          tokens, fonts, shadows — all generated from minimal input.
        </p>
      </div>

      {/* Overview */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>How It Works</h2>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          Call <code>generateTheme()</code> with a primary hue to produce a complete
          theme. Use <code>themeToVars()</code> to convert it to CSS variables, then
          wrap your app in <code>StlProvider</code>.
        </p>
        <CodeBlock code={`generateTheme({ primary: { hue: 220 } }) → themeToVars() → StlProvider`} language="text" />
      </section>

      {/* Quick Start */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Quick Start</h2>
        <CodeBlock
          code={`import { StlProvider } from '@vlting/stl-react'
import { generateTheme, themeToVars } from '@vlting/ui'

const theme = generateTheme({ primary: { hue: 220 } })
const vars = themeToVars(theme, 'light')

// Inject vars into a <style> tag or apply to :root
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

      {/* Pre-built Presets */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Pre-built Presets</h2>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          Four presets ship out of the box. Use the theme switcher at the top of this site
          to preview them live.
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
              name: 'THEME_PRESET_DEFAULT',
              label: 'Default',
              desc: 'Clean, trustworthy, minimalist. Achromatic neutrals with cyan-blue accent.',
            },
            {
              name: 'THEME_PRESET_SHADCN',
              label: 'shadcn',
              desc: 'Pixel-perfect shadcn/ui match. Pure neutral grays, 10px radius, 1px borders.',
            },
            {
              name: 'THEME_PRESET_FUN',
              label: 'Fun',
              desc: 'Playful and vibrant. Rounded corners, no borders, flat shadows.',
            },
            {
              name: 'THEME_PRESET_POSH',
              label: 'Posh',
              desc: 'Premium and refined. Square corners, thin borders, diffused shadows.',
            },
          ].map((preset) => (
            <div
              key={preset.name}
              style={{
                padding: 16,
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <strong style={{ fontSize: 14 }}>{preset.label}</strong>
              <code style={{ fontSize: 12, color: 'var(--color-muted-foreground)' }}>
                {preset.name}
              </code>
              <p
                style={{
                  fontSize: 13,
                  color: 'var(--color-muted-foreground)',
                  lineHeight: 1.5,
                  marginTop: 4,
                }}
              >
                {preset.desc}
              </p>
            </div>
          ))}
        </div>
        <CodeBlock
          code={`import { generateTheme, themeToVars, THEME_PRESET_SHADCN } from '@vlting/ui'

const theme = generateTheme(THEME_PRESET_SHADCN)
const vars = themeToVars(theme, 'light')
// Apply vars to DOM...`}
          language="tsx"
        />
      </section>

      {/* generateTheme API */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>generateTheme() API</h2>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          The minimal call only requires a primary hue. Everything else is derived
          automatically or uses sensible defaults.
        </p>
        <CodeBlock
          code={`interface GenerateThemeOptions {
  primary: ColorInput              // { hue: 0-360, saturation?: 0-100 }
  secondary?: SecondaryColorInput  // auto-derived if omitted (complementary)
  tertiary?: SecondaryColorInput   // auto-derived if omitted (analogous)
  tokens?: Theme['tokens']         // override size, space, radius, etc.
  shadows?: Theme['shadows']       // override shadow scales
  fonts?: Theme['fonts']           // override font families
  overrides?: {
    palettes?: Partial<Theme['palettes']>  // deep merge
    accentPalettes?: Theme['accentPalettes'] // full replace
  }
}

// Minimal — just a hue
const theme = generateTheme({ primary: { hue: 220 } })

// With customization
const theme = generateTheme({
  primary: { hue: 260, saturation: 90 },
  secondary: { hue: 30, saturation: 70 },
  tokens: { radius: { true: 16 } },
  fonts: { heading: "'Playfair Display', serif" },
})`}
          language="tsx"
        />
      </section>

      {/* Palette System */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Palette System</h2>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          Each theme has a <strong>12-step color palette</strong> for light and dark
          modes. The palette indices map to semantic roles:
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
                  <td
                    style={{
                      padding: '6px 12px',
                      color: 'var(--color-muted-foreground)',
                    }}
                  >
                    {role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 16 }}>Try It</h3>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 13,
            lineHeight: 1.6,
            marginBottom: 8,
          }}
        >
          Adjust the hue and saturation sliders to preview a 12-step palette in real time.
        </p>
        <PalettePicker />
      </section>

      {/* Token Reference */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Token Reference</h2>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          Tokens are the atomic design values used across all components. Use them via the
          <code>$</code> prefix in styled() CSS or the css prop.
        </p>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>Size Tokens</h3>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          Numeric scale 0-16 plus semantic tokens for layout landmarks.
        </p>
        <CodeBlock
          code={`// Numeric scale: $0 (0px) through $16 (310px)
<View width="$4" height="$4" />      {/* 44px x 44px */}
<View padding="$2" />                 {/* 16px padding */}

// Semantic tokens
<View width="$sidebar" />             {/* 256px */}
<Dialog width="$dialogMd" />          {/* 500px */}`}
          language="tsx"
        />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>Space Tokens</h3>
        <CodeBlock
          code={`<View gap="$2" />                     {/* 16px gap */}
<View marginTop="$4" />               {/* 28px margin */}
<View margin="$-1" />                 {/* -10px (negative space) */}`}
          language="tsx"
        />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>Radius Tokens</h3>
        <CodeBlock
          code={`<View borderRadius="$2" />             {/* small rounding */}
<View borderRadius="$4" />             {/* medium rounding */}
<View borderRadius="$full" />          {/* 9999px - pill shape */}`}
          language="tsx"
        />
      </section>

      {/* CSS Custom Properties */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>CSS Custom Properties</h2>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          <code>themeToVars()</code> produces CSS custom properties. Inject them on{' '}
          <code>:root</code> via a <code>&lt;style&gt;</code> tag.
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
                ['--vlt-color-1 ... --vlt-color-12', 'Neutral palette steps (1-indexed)'],
                [
                  '--vlt-{accent}-1 ... --vlt-{accent}-12',
                  'Accent palette steps (e.g. --vlt-primary-6)',
                ],
                ['--vlt-size-{n}', 'Size token overrides'],
                ['--vlt-space-{n}', 'Space token overrides'],
                ['--vlt-radius-{n}', 'Border radius overrides'],
                ['--vlt-shadow-{sm|md|lg|xl|2xl}', 'Shadow values'],
                ['--vlt-font-heading', 'Heading font family'],
                ['--vlt-font-body', 'Body font family'],
                ['--vlt-font-mono', 'Monospace font family'],
              ].map(([prop, desc]) => (
                <tr key={prop} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '6px 12px' }}>
                    <code>{prop}</code>
                  </td>
                  <td
                    style={{
                      padding: '6px 12px',
                      color: 'var(--color-muted-foreground)',
                    }}
                  >
                    {desc}
                  </td>
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

      {/* Creating a Custom Theme */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Creating a Custom Theme</h2>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          Start from a preset and override what you need, or build from a single hue.
        </p>
        <CodeBlock
          code={`import { generateTheme, themeToVars } from '@vlting/ui'

const theme = generateTheme({
  primary: { hue: 260, saturation: 90 },
  secondary: { hue: 30, saturation: 70 },
  tokens: {
    radius: { true: 16, 4: 16 },
  },
  fonts: {
    heading: "'Cal Sans', system-ui, sans-serif",
    body: 'Inter, system-ui, sans-serif',
  },
})

// Get CSS variables for the current color mode
const lightVars = themeToVars(theme, 'light')
const darkVars = themeToVars(theme, 'dark')`}
          language="tsx"
        />
      </section>

      {/* Dark Mode */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Dark Mode</h2>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          <code>generateTheme()</code> produces both light and dark palettes. Use{' '}
          <code>themeToVars(theme, &apos;dark&apos;)</code> to get dark mode variables.
          For SSR, use <code>getColorModeScript()</code> in your{' '}
          <code>&lt;head&gt;</code> to prevent FOUC.
        </p>
        <CodeBlock
          code={`import { StlProvider, getColorModeScript } from '@vlting/stl-react'
import { generateTheme, themeToVars } from '@vlting/ui'

const theme = generateTheme({ primary: { hue: 220 } })

// In your HTML <head> (SSR):
// dangerouslySetInnerHTML={{ __html: getColorModeScript() }}

// In your component:
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

      {/* Media Queries */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Media Queries</h2>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          Default breakpoints are provided via the <code>media</code> export.
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
                  <td
                    style={{
                      padding: '6px 12px',
                      color: 'var(--color-muted-foreground)',
                    }}
                  >
                    {value}
                  </td>
                  <td
                    style={{
                      padding: '6px 12px',
                      color: 'var(--color-muted-foreground)',
                    }}
                  >
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
    </div>
  )
}
