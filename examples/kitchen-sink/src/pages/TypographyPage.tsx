import React from 'react'
import { YStack, Text, Heading, Separator } from 'tamagui'
import {
  H1, H2, H3, H4, P, Lead, Large, Small, Muted,
  Blockquote, InlineCode, List, ListItem,
  Kbd,
} from '@vlting/ui'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <YStack gap="$3" paddingVertical="$4">
      <Heading fontFamily="$heading" fontSize="$6" fontWeight="$4">{title}</Heading>
      <Separator />
      <YStack gap="$3" paddingTop="$2">{children}</YStack>
    </YStack>
  )
}

function DemoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <YStack backgroundColor="$background" borderRadius="$4" borderWidth={1} borderColor="$borderColor" padding="$4" gap="$3">
      <Text fontFamily="$body" fontSize="$2" fontWeight="$3" color="$colorSubtitle">{label}</Text>
      {children}
    </YStack>
  )
}

export function TypographyPage() {
  return (
    <YStack padding="$6" gap="$2" maxWidth={900} marginHorizontal="auto" width="100%">
      <Heading fontFamily="$heading" fontSize="$8" fontWeight="$5">Typography</Heading>
      <Text fontFamily="$body" fontSize="$4" color="$colorSubtitle" marginBottom="$4">
        Semantic typography components for headings, paragraphs, and inline styles.
      </Text>

      {/* Headings */}
      <Section title="Headings">
        <DemoCard label="H1 through H4">
          <YStack gap="$3">
            <H1>This is H1 — The largest heading</H1>
            <H2>This is H2 — Section heading</H2>
            <H3>This is H3 — Subsection heading</H3>
            <H4>This is H4 — Minor heading</H4>
          </YStack>
        </DemoCard>
      </Section>

      {/* Body text */}
      <Section title="Body Text">
        <DemoCard label="Paragraph and variants">
          <YStack gap="$3">
            <Lead>This is a lead paragraph. It's slightly larger and used for introductions or important summaries.</Lead>
            <P>This is a standard paragraph. The quick brown fox jumps over the lazy dog. Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed.</P>
            <Large>This is large text — bigger than a paragraph.</Large>
            <Small>This is small text — used for captions or fine print.</Small>
            <Muted>This is muted text — de-emphasized secondary content.</Muted>
          </YStack>
        </DemoCard>
      </Section>

      {/* Inline */}
      <Section title="Inline Elements">
        <DemoCard label="Code and quotes">
          <YStack gap="$3">
            <P>
              Use the <InlineCode>npm install @vlting/ui</InlineCode> command to get started.
            </P>
            <Blockquote>
              Design is not just what it looks like and feels like. Design is how it works. — Steve Jobs
            </Blockquote>
          </YStack>
        </DemoCard>
      </Section>

      {/* Lists */}
      <Section title="Lists">
        <DemoCard label="Unordered list">
          <List>
            <ListItem>First item in the list</ListItem>
            <ListItem>Second item with more detail</ListItem>
            <ListItem>Third item to complete the set</ListItem>
          </List>
        </DemoCard>
      </Section>

      {/* Kbd */}
      <Section title="Keyboard Shortcuts">
        <DemoCard label="Kbd component">
          <YStack gap="$3">
            <Text fontFamily="$body" fontSize="$3">
              Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command palette.
            </Text>
            <Text fontFamily="$body" fontSize="$3">
              Use <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd> on Windows.
            </Text>
            <Text fontFamily="$body" fontSize="$3">
              Navigate with <Kbd>↑</Kbd> <Kbd>↓</Kbd> arrow keys and <Kbd>Enter</Kbd> to select.
            </Text>
          </YStack>
        </DemoCard>
      </Section>
    </YStack>
  )
}
