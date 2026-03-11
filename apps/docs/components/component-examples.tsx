'use client'

import type { ComponentExample } from '@/lib/registry'
import { ComponentPreview } from './component-preview'
import { getLiveExample } from './live-examples'

interface HighlightedExample extends ComponentExample {
  codeHtml?: { light: string; dark: string }
}

interface ComponentExamplesProps {
  componentSlug: string
  examples: HighlightedExample[]
}

export function ComponentExamples({ componentSlug, examples }: ComponentExamplesProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {examples.map((example) => {
        const livePreview = getLiveExample(componentSlug, example.name)
        return (
          <div key={example.name}>
            {example.description && (
              <p style={{ fontSize: 14, color: 'var(--stl-colorSubtitle)', marginBottom: 8 }}>
                {example.description}
              </p>
            )}
            <ComponentPreview
              code={example.code}
              codeHtml={example.codeHtml}
              title={example.name}
            >
              {livePreview ?? (
                <p style={{ fontSize: 14, color: 'var(--stl-placeholderColor)', fontStyle: 'italic' }}>
                  Live preview coming soon.
                </p>
              )}
            </ComponentPreview>
          </div>
        )
      })}
    </div>
  )
}
