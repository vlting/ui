import React, { useState } from 'react'
import { YStack, XStack, Text, Heading, Separator, View } from 'tamagui'
import {
  Button,
  ButtonGroup,
  Toggle,
  ToggleGroup,
  Pagination,
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

export function ButtonsPage() {
  const [togglePressed, setTogglePressed] = useState(false)
  const [toggleGroupValue, setToggleGroupValue] = useState<string | string[]>('center')
  const [paginationPage, setPaginationPage] = useState(1)
  const [paginationPage2, setPaginationPage2] = useState(5)

  return (
    <YStack padding="$6" gap="$2" maxWidth={900} marginHorizontal="auto" width="100%">
      <Heading fontFamily="$heading" fontSize="$8" fontWeight="$5">Buttons & Actions</Heading>
      <Text fontFamily="$body" fontSize="$4" color="$colorSubtitle" marginBottom="$4">
        Button, ButtonGroup, Pagination, and Toggle components.
      </Text>

      {/* Button */}
      <Section title="Button">
        <DemoCard label="Variants">
          <XStack gap="$3" flexWrap="wrap">
            <Button variant="default"><Button.Text>Default</Button.Text></Button>
            <Button variant="secondary"><Button.Text>Secondary</Button.Text></Button>
            <Button variant="destructive"><Button.Text>Destructive</Button.Text></Button>
            <Button variant="outline"><Button.Text>Outline</Button.Text></Button>
            <Button variant="ghost"><Button.Text>Ghost</Button.Text></Button>
            <Button variant="link"><Button.Text>Link</Button.Text></Button>
          </XStack>
        </DemoCard>
        <DemoCard label="Tones">
          <XStack gap="$3" flexWrap="wrap">
            <Button tone="neutral"><Button.Text>Neutral</Button.Text></Button>
            <Button tone="primary"><Button.Text>Primary</Button.Text></Button>
            <Button tone="success"><Button.Text>Success</Button.Text></Button>
            <Button tone="warning"><Button.Text>Warning</Button.Text></Button>
            <Button tone="danger"><Button.Text>Danger</Button.Text></Button>
          </XStack>
        </DemoCard>
        <DemoCard label="Sizes">
          <XStack gap="$3" alignItems="center" flexWrap="wrap">
            <Button size="xs"><Button.Text>Extra Small</Button.Text></Button>
            <Button size="sm"><Button.Text>Small</Button.Text></Button>
            <Button size="md"><Button.Text>Medium</Button.Text></Button>
            <Button size="lg"><Button.Text>Large</Button.Text></Button>
            <Button size="icon"><Button.Text>⚙</Button.Text></Button>
          </XStack>
        </DemoCard>
        <DemoCard label="States">
          <XStack gap="$3" flexWrap="wrap">
            <Button disabled><Button.Text>Disabled</Button.Text></Button>
            <Button loading><Button.Text>Loading</Button.Text></Button>
          </XStack>
        </DemoCard>
      </Section>

      {/* ButtonGroup */}
      <Section title="ButtonGroup">
        <DemoCard label="Horizontal group">
          <ButtonGroup.Root orientation="horizontal">
            <Button variant="outline"><Button.Text>Left</Button.Text></Button>
            <Button variant="outline"><Button.Text>Center</Button.Text></Button>
            <Button variant="outline"><Button.Text>Right</Button.Text></Button>
          </ButtonGroup.Root>
        </DemoCard>
        <DemoCard label="Vertical group">
          <ButtonGroup.Root orientation="vertical">
            <Button variant="outline"><Button.Text>Top</Button.Text></Button>
            <Button variant="outline"><Button.Text>Middle</Button.Text></Button>
            <Button variant="outline"><Button.Text>Bottom</Button.Text></Button>
          </ButtonGroup.Root>
        </DemoCard>
      </Section>

      {/* Pagination */}
      <Section title="Pagination">
        <DemoCard label="Basic (10 pages)">
          <Pagination.Root currentPage={paginationPage} totalPages={10} onPageChange={setPaginationPage} />
          <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle" marginTop="$2">
            Page {paginationPage} of 10
          </Text>
        </DemoCard>
        <DemoCard label="Many pages (ellipsis)">
          <Pagination.Root currentPage={paginationPage2} totalPages={50} onPageChange={setPaginationPage2} />
          <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle" marginTop="$2">
            Page {paginationPage2} of 50
          </Text>
        </DemoCard>
        <DemoCard label="Sizes">
          <YStack gap="$3">
            <Pagination.Root currentPage={3} totalPages={5} onPageChange={() => {}} size="sm" />
            <Pagination.Root currentPage={3} totalPages={5} onPageChange={() => {}} size="md" />
            <Pagination.Root currentPage={3} totalPages={5} onPageChange={() => {}} size="lg" />
          </YStack>
        </DemoCard>
      </Section>

      {/* Toggle */}
      <Section title="Toggle">
        <XStack gap="$3" flexWrap="wrap">
          <DemoCard label="Single toggle">
            <Toggle pressed={togglePressed} onPressedChange={setTogglePressed}>
              <Text fontFamily="$body" fontSize="$3">
                {togglePressed ? 'Pressed' : 'Not pressed'}
              </Text>
            </Toggle>
          </DemoCard>
          <DemoCard label="Toggle Group (single)">
            <ToggleGroup type="single" value={toggleGroupValue} onValueChange={setToggleGroupValue}>
              <ToggleGroup.Item value="left">
                <Text fontFamily="$body" fontSize="$3">Left</Text>
              </ToggleGroup.Item>
              <ToggleGroup.Item value="center">
                <Text fontFamily="$body" fontSize="$3">Center</Text>
              </ToggleGroup.Item>
              <ToggleGroup.Item value="right">
                <Text fontFamily="$body" fontSize="$3">Right</Text>
              </ToggleGroup.Item>
            </ToggleGroup>
          </DemoCard>
          <DemoCard label="Disabled">
            <Toggle disabled>
              <Text fontFamily="$body" fontSize="$3">Disabled</Text>
            </Toggle>
          </DemoCard>
        </XStack>
      </Section>
    </YStack>
  )
}
