import { CodeBlock } from '../../../components/code-block'
import { IconBrowser } from '../../../components/icon-browser'

export const metadata = {
  title: 'Icons — @vlting/ui',
  description: 'Browse and search 3,229 Remix Icons included with @vlting/ui.',
}

export default function IconsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Icon Browser</h1>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 16,
            lineHeight: 1.6,
          }}
        >
          Browse and search 3,229 Remix Icons. Click any icon to copy its import
          statement.
        </p>
      </div>

      {/* Import examples */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Usage</h2>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          Import icons directly by name. Each icon has <code>Line</code> and{' '}
          <code>Fill</code> variants.
        </p>
        <CodeBlock
          code={`import { RiSearchLine, RiHomeFill } from '@vlting/ui'

// Use in JSX — accepts size and color props
<RiSearchLine size={24} color="$color" />
<RiHomeFill size={20} color="$aqua10" />`}
          language="tsx"
        />
      </div>

      {/* Dynamic Icon */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Dynamic Icon</h2>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          Use <code>DynamicIcon</code> for lazy-loaded icons by name string. Useful when
          the icon name comes from data.
        </p>
        <CodeBlock
          code={`import { DynamicIcon } from '@vlting/ui'

<DynamicIcon name="arrow-down" variant="line" size={24} />
<DynamicIcon name="heart" variant="fill" size={20} color="red" />`}
          language="tsx"
        />
      </div>

      {/* Category imports */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Category Imports</h2>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          For smaller bundles, import from specific categories.
        </p>
        <CodeBlock
          code={`import { RiSearchLine } from '@vlting/ui/icons/system'
import { RiHomeLine } from '@vlting/ui/icons/buildings'`}
          language="tsx"
        />
      </div>

      {/* Browser */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Browse All Icons</h2>
        <IconBrowser />
      </div>
    </div>
  )
}
