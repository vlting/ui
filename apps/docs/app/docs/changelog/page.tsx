export const metadata = {
  title: 'Changelog — @vlting/ui',
  description: 'Release notes and version history.',
}

export default function ChangelogPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Changelog</h1>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 16, lineHeight: 1.6 }}>
          Release notes and version history for @vlting/ui.
        </p>
      </div>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ borderLeft: '2px solid var(--color-accent)', paddingLeft: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>v0.2.0</h2>
          <p style={{ fontSize: 12, color: 'var(--color-muted-foreground)', marginBottom: 12 }}>March 2026</p>
          <ul style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--color-muted-foreground)', paddingLeft: 20 }}>
            <li>Migrated to @vlting/stl (zero-runtime CSS via Vanilla Extract)</li>
            <li>New styled() API with variant system</li>
            <li>Created stl-headless package with 8 behavioral hooks</li>
            <li>Added stl-ui meta-package for cross-platform resolution</li>
            <li>Created showcase-web and showcase-native kitchen-sink apps</li>
            <li>Rebuilt documentation site with shadcn/ui-style IA</li>
            <li>68+ components, 10 blocks, 3200+ icons</li>
          </ul>
        </div>

        <div style={{ borderLeft: '2px solid var(--color-border)', paddingLeft: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>v0.1.0</h2>
          <p style={{ fontSize: 12, color: 'var(--color-muted-foreground)', marginBottom: 12 }}>Initial release</p>
          <ul style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--color-muted-foreground)', paddingLeft: 20 }}>
            <li>Initial component library</li>
            <li>238 component stubs across 24 modules</li>
            <li>Brand system with 4 pre-built brands</li>
            <li>Icon generation from Remixicon</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
