'use client'

import { styled } from '../../../packages/stl-react/src'
import { getPlaygroundConfig, Playground } from './playground'

const Section = styled('section', { stl: {
  mb: '$6',
}})

const SectionTitle = styled('h2', { stl: {
  fontSize: '$h4',
  fontWeight: '$600',
  mb: '$20',
}})

interface PlaygroundSectionProps {
  slug: string
}

export function PlaygroundSection({ slug }: PlaygroundSectionProps) {
  const config = getPlaygroundConfig(slug)
  if (!config) return null

  return (
    <Section>
      <SectionTitle>Playground</SectionTitle>
      <Playground slug={slug} />
    </Section>
  )
}
