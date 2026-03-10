'use client'

import { ComponentPreview } from './component-preview'
import { getLiveExample } from './live-examples'
import type { ComponentExample } from '@/lib/registry'

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
      {examples.map((example) => {
        const livePreview = getLiveExample(componentSlug, example.name)
        return (
          <div key={example.name}>
            {example.description && (
              <p className="text-sm text-foreground-secondary mb-2">
                {example.description}
              </p>
            )}
            <ComponentPreview code={example.code} title={example.name}>
              {livePreview ?? (
                <p className="text-sm text-muted-foreground italic">
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
