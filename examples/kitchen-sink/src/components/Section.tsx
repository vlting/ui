import { Heading, Separator, Text, VStack } from '@vlting/ui'
import type React from 'react'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function Section({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <VStack style={{ gap: 12, paddingBlock: 16 }}>
      <Heading level={2} id={slugify(title)}>
        {title}
      </Heading>
      <Separator />
      <VStack style={{ gap: 12, paddingTop: 8 }}>
        {children}
      </VStack>
    </VStack>
  )
}

export function DemoCard({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <VStack
      style={{
        backgroundColor: 'var(--vlt-color-1)',
        borderRadius: 8,
        border: '1px solid var(--vlt-color-5)',
        padding: 16,
        gap: 12,
      }}
    >
      <Text size="xs" tone="muted" weight="medium">
        {label}
      </Text>
      {children}
    </VStack>
  )
}
