import React, { useState } from 'react'
import { YStack, XStack, Text, Heading, Separator } from 'tamagui'
import {
  InputOTP,
  NativeSelect,
  Combobox,
  Command,
  Input,
  Select,
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

const comboboxOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
]

export function InputsPage() {
  const [otpValue, setOtpValue] = useState('')
  const [comboValue, setComboValue] = useState('')
  const [commandOpen, setCommandOpen] = useState(false)

  return (
    <YStack padding="$6" gap="$2" maxWidth={900} marginHorizontal="auto" width="100%">
      <Heading fontFamily="$heading" fontSize="$8" fontWeight="$5">Input Components</Heading>
      <Text fontFamily="$body" fontSize="$4" color="$colorSubtitle" marginBottom="$4">
        InputOTP, NativeSelect, Combobox, and Command palette.
      </Text>

      {/* InputOTP */}
      <Section title="InputOTP">
        <DemoCard label="6-digit OTP">
          <InputOTP.Root value={otpValue} onValueChange={setOtpValue} length={6}>
            <XStack gap="$2">
              {[0, 1, 2].map((i) => (
                <InputOTP.Slot key={i} index={i} />
              ))}
              <Text fontFamily="$body" fontSize="$5" color="$colorSubtitle" paddingHorizontal="$1">-</Text>
              {[3, 4, 5].map((i) => (
                <InputOTP.Slot key={i} index={i} />
              ))}
            </XStack>
          </InputOTP.Root>
          <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">
            Value: {otpValue || '(empty)'}
          </Text>
        </DemoCard>
      </Section>

      {/* NativeSelect */}
      <Section title="NativeSelect">
        <DemoCard label="Native select element">
          <NativeSelect.Root defaultValue="">
            <NativeSelect.Option value="" disabled>Select a framework...</NativeSelect.Option>
            <NativeSelect.Option value="react">React</NativeSelect.Option>
            <NativeSelect.Option value="vue">Vue</NativeSelect.Option>
            <NativeSelect.Option value="angular">Angular</NativeSelect.Option>
            <NativeSelect.Option value="svelte">Svelte</NativeSelect.Option>
          </NativeSelect.Root>
        </DemoCard>
        <DemoCard label="Sizes">
          <YStack gap="$3">
            <NativeSelect.Root defaultValue="react" size="sm">
              <NativeSelect.Option value="react">Small</NativeSelect.Option>
            </NativeSelect.Root>
            <NativeSelect.Root defaultValue="react" size="md">
              <NativeSelect.Option value="react">Medium</NativeSelect.Option>
            </NativeSelect.Root>
            <NativeSelect.Root defaultValue="react" size="lg">
              <NativeSelect.Option value="react">Large</NativeSelect.Option>
            </NativeSelect.Root>
          </YStack>
        </DemoCard>
      </Section>

      {/* Combobox */}
      <Section title="Combobox">
        <DemoCard label="Searchable select">
          <Combobox.Root
            options={comboboxOptions}
            value={comboValue}
            onValueChange={setComboValue}
            placeholder="Search frameworks..."
          />
          <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">
            Selected: {comboValue || '(none)'}
          </Text>
        </DemoCard>
      </Section>

      {/* Command */}
      <Section title="Command">
        <DemoCard label="Command palette">
          <Command.Root>
            <Command.Input placeholder="Type a command..." />
            <Command.List>
              <Command.Group heading="Suggestions">
                <Command.Item value="calendar" onSelect={() => {}}>
                  <Text fontFamily="$body" fontSize="$3">Calendar</Text>
                </Command.Item>
                <Command.Item value="search" onSelect={() => {}}>
                  <Text fontFamily="$body" fontSize="$3">Search</Text>
                </Command.Item>
                <Command.Item value="settings" onSelect={() => {}}>
                  <Text fontFamily="$body" fontSize="$3">Settings</Text>
                </Command.Item>
              </Command.Group>
            </Command.List>
            <Command.Empty>
              <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">No results found.</Text>
            </Command.Empty>
          </Command.Root>
        </DemoCard>
      </Section>

      {/* Input type variants */}
      <Section title="Input Types">
        <DemoCard label="Various HTML input types">
          <YStack gap="$3">
            <Input type="email" label="Email" placeholder="you@example.com" />
            <Input type="password" label="Password" placeholder="Enter password" />
            <Input type="number" label="Number" placeholder="0" />
            <Input type="search" label="Search" placeholder="Search..." />
            <Input type="url" label="URL" placeholder="https://example.com" />
            <Input type="tel" label="Phone" placeholder="+1 (555) 000-0000" />
          </YStack>
        </DemoCard>
      </Section>
    </YStack>
  )
}
