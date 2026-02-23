import React, { useState } from 'react'
import { YStack, XStack, Text, Heading, Separator, View } from 'tamagui'
import { HeadlessDialog, HeadlessTabs, HeadlessCheckbox } from '@vlting/ui'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <YStack gap="$3" paddingVertical="$4">
      <Heading fontFamily="$heading" fontSize="$6" fontWeight="$4">
        {title}
      </Heading>
      <Separator />
      <YStack gap="$3" paddingTop="$2">
        {children}
      </YStack>
    </YStack>
  )
}

function DemoCard({ label, children }: { label: string; children: React.ReactNode }) {
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

function HeadlessDialogDemo() {
  const [open, setOpen] = useState(false)

  return (
    <DemoCard label="Custom-styled dialog from headless primitive">
      <HeadlessDialog.Root open={open} onOpenChange={setOpen}>
        <HeadlessDialog.Trigger>
          <button
            type="button"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <View
              backgroundColor="$color10"
              paddingHorizontal="$4"
              paddingVertical="$2"
              borderRadius="$3"
            >
              <Text fontFamily="$body" color="$color1" fontSize="$3">Open Headless Dialog</Text>
            </View>
          </button>
        </HeadlessDialog.Trigger>
        <HeadlessDialog.Overlay>
          <View
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            backgroundColor="rgba(0,0,0,0.5)"
          />
        </HeadlessDialog.Overlay>
        <HeadlessDialog.Content>
          <YStack
            backgroundColor="$background"
            borderRadius="$4"
            padding="$5"
            gap="$3"
            maxWidth={400}
            marginHorizontal="auto"
            marginTop={120}
          >
            <HeadlessDialog.Title>
              <Text fontFamily="$heading" fontSize="$6" fontWeight="$4">Headless Dialog</Text>
            </HeadlessDialog.Title>
            <HeadlessDialog.Description>
              <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
                This dialog is built entirely from the headless primitive — no pre-styled wrappers. You have complete control over the visual appearance.
              </Text>
            </HeadlessDialog.Description>
            <HeadlessDialog.Close>
              <button
                type="button"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                <View
                  backgroundColor="$color4"
                  paddingHorizontal="$4"
                  paddingVertical="$2"
                  borderRadius="$3"
                  alignSelf="flex-start"
                >
                  <Text fontFamily="$body" fontSize="$3">Close</Text>
                </View>
              </button>
            </HeadlessDialog.Close>
          </YStack>
        </HeadlessDialog.Content>
      </HeadlessDialog.Root>
    </DemoCard>
  )
}

function HeadlessTabsDemo() {
  const [value, setValue] = useState('alpha')

  return (
    <DemoCard label="Custom-styled tabs from headless primitive">
      <HeadlessTabs.Root value={value} onValueChange={setValue}>
        <HeadlessTabs.List>
          <XStack gap="$1" backgroundColor="$color2" borderRadius="$3" padding="$0.5">
            {['alpha', 'beta', 'gamma'].map((tab) => (
              <HeadlessTabs.Trigger key={tab} value={tab}>
                <View
                  paddingHorizontal="$3"
                  paddingVertical="$1.5"
                  borderRadius="$2"
                  cursor="pointer"
                  backgroundColor={value === tab ? '$background' : 'transparent'}
                >
                  <Text
                    fontFamily="$body"
                    fontSize="$3"
                    fontWeight={value === tab ? '$3' : '$2'}
                    textTransform="capitalize"
                  >
                    {tab}
                  </Text>
                </View>
              </HeadlessTabs.Trigger>
            ))}
          </XStack>
        </HeadlessTabs.List>
        {['alpha', 'beta', 'gamma'].map((tab) => (
          <HeadlessTabs.Content key={tab} value={tab}>
            <YStack paddingVertical="$3">
              <Text fontFamily="$body" fontSize="$3">
                Content for the <Text fontWeight="$3">{tab}</Text> tab. These tabs use a pill-style
                indicator built from scratch using the headless primitive.
              </Text>
            </YStack>
          </HeadlessTabs.Content>
        ))}
      </HeadlessTabs.Root>
    </DemoCard>
  )
}

function HeadlessCheckboxDemo() {
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState<boolean | 'indeterminate'>('indeterminate')

  return (
    <DemoCard label="Custom-styled checkboxes from headless primitive">
      <YStack gap="$3">
        <XStack gap="$3" alignItems="center">
          <HeadlessCheckbox.Root checked={checked} onCheckedChange={setChecked}>
            <View
              width={20}
              height={20}
              borderRadius="$1"
              borderWidth={2}
              borderColor={checked ? '$color10' : '$borderColor'}
              backgroundColor={checked ? '$color10' : 'transparent'}
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <HeadlessCheckbox.Indicator>
                <Text color="$color1" fontSize={12} fontWeight="$4">✓</Text>
              </HeadlessCheckbox.Indicator>
            </View>
          </HeadlessCheckbox.Root>
          <Text fontFamily="$body" fontSize="$3">
            {checked ? 'Checked' : 'Unchecked'}
          </Text>
        </XStack>

        <XStack gap="$3" alignItems="center">
          <HeadlessCheckbox.Root checked={indeterminate} onCheckedChange={setIndeterminate}>
            <View
              width={20}
              height={20}
              borderRadius="$1"
              borderWidth={2}
              borderColor={indeterminate !== false ? '$color10' : '$borderColor'}
              backgroundColor={indeterminate !== false ? '$color10' : 'transparent'}
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <HeadlessCheckbox.Indicator>
                <Text color="$color1" fontSize={12} fontWeight="$4">
                  {indeterminate === 'indeterminate' ? '—' : '✓'}
                </Text>
              </HeadlessCheckbox.Indicator>
            </View>
          </HeadlessCheckbox.Root>
          <Text fontFamily="$body" fontSize="$3">
            {indeterminate === 'indeterminate' ? 'Indeterminate' : indeterminate ? 'Checked' : 'Unchecked'}
          </Text>
        </XStack>
      </YStack>
    </DemoCard>
  )
}

export function HeadlessPage() {
  return (
    <YStack padding="$6" gap="$2" maxWidth={900} marginHorizontal="auto" width="100%">
      <Heading fontFamily="$heading" fontSize="$8" fontWeight="$5">
        Headless
      </Heading>
      <Text fontFamily="$body" fontSize="$4" color="$colorSubtitle" marginBottom="$4">
        Layer 2 — unstyled behavioral primitives. Style them however you want.
      </Text>

      <Section title="HeadlessDialog">
        <HeadlessDialogDemo />
      </Section>

      <Section title="HeadlessTabs">
        <HeadlessTabsDemo />
      </Section>

      <Section title="HeadlessCheckbox">
        <HeadlessCheckboxDemo />
      </Section>
    </YStack>
  )
}
