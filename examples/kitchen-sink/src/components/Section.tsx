import React from 'react'
import { YStack, Text, Separator } from 'tamagui'
import { Heading } from '@vlting/ui'

/** Slugify a title string for use as an HTML id attribute */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <YStack gap="$3" paddingVertical="$4">
      <Heading level={2} id={slugify(title)}>
        {title}
      </Heading>
      <Separator />
      <YStack gap="$3" paddingTop="$2">
        {children}
      </YStack>
    </YStack>
  )
}

export function DemoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <YStack
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      padding="$4"
      gap="$3"
    >
      <Text fontFamily="$body" fontSize="$2" fontWeight="$3" color="$colorSubtitle">
        {label}
      </Text>
      {children}
    </YStack>
  )
}
