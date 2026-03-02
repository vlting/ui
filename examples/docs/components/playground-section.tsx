'use client'

import { Playground, getPlaygroundConfig } from './playground'

interface PlaygroundSectionProps {
  slug: string
}

export function PlaygroundSection({ slug }: PlaygroundSectionProps) {
  const config = getPlaygroundConfig(slug)
  if (!config) return null

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <Playground slug={slug} />
    </section>
  )
}
