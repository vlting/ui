'use client'

import { type ReactNode } from 'react'
import { ComponentPreview } from './component-preview'
import type { ComponentExample } from '@/lib/registry'

// Live component previews are disabled until the stl engine's Vanilla Extract
// integration is configured for the Next.js docs app. Component pages still
// show syntax-highlighted code examples via the fallback path below.

interface ComponentExamplesProps {
  componentSlug: string
  examples: ComponentExample[]
}

export function ComponentExamples({
  componentSlug,
  examples,
}: ComponentExamplesProps) {
  return (
    <div className="space-y-6">
      {examples.map((example) => (
        <div key={example.name}>
          {example.description && (
            <p className="text-sm text-foreground-secondary mb-2">
              {example.description}
            </p>
          )}
          <ComponentPreview code={example.code} title={example.name}>
            <p className="text-sm text-muted-foreground italic">
              Live preview coming soon.
            </p>
          </ComponentPreview>
        </div>
      ))}
    </div>
  )
}
