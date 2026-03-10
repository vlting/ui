import { Button, ButtonGroup, Heading, HStack, Pagination, Text, Toggle, ToggleGroup, VStack } from '@vlting/ui'
import { useState } from 'react'
import { DemoCard, Section } from '../components/Section'

export function ButtonsPage() {
  const [togglePressed, setTogglePressed] = useState(false)
  const [toggleGroupValue, setToggleGroupValue] = useState<string | string[]>('center')
  const [paginationPage, setPaginationPage] = useState(1)
  const [paginationPage2, setPaginationPage2] = useState(5)

  return (
    <VStack style={{ padding: 24, gap: 8, maxWidth: 900, marginInline: 'auto', width: '100%' }}>
      <Heading level={1}>Buttons & Actions</Heading>
      <Text tone="muted" style={{ marginBottom: 16 }}>
        Button, ButtonGroup, Pagination, and Toggle components.
      </Text>

      <Section title="Button">
        <DemoCard label="Variants">
          <HStack style={{ gap: 12, flexWrap: 'wrap' }}>
            <Button variant="default"><Button.Text>Default</Button.Text></Button>
            <Button variant="secondary"><Button.Text>Secondary</Button.Text></Button>
            <Button variant="destructive"><Button.Text>Destructive</Button.Text></Button>
            <Button variant="outline"><Button.Text>Outline</Button.Text></Button>
            <Button variant="ghost"><Button.Text>Ghost</Button.Text></Button>
            <Button variant="link"><Button.Text>Link</Button.Text></Button>
          </HStack>
        </DemoCard>
        <DemoCard label="Tones">
          <HStack style={{ gap: 12, flexWrap: 'wrap' }}>
            <Button tone="neutral"><Button.Text>Neutral</Button.Text></Button>
            <Button tone="primary"><Button.Text>Primary</Button.Text></Button>
            <Button tone="success"><Button.Text>Success</Button.Text></Button>
            <Button tone="warning"><Button.Text>Warning</Button.Text></Button>
            <Button tone="danger"><Button.Text>Danger</Button.Text></Button>
          </HStack>
        </DemoCard>
        <DemoCard label="Sizes">
          <HStack style={{ gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button size="xs"><Button.Text>Extra Small</Button.Text></Button>
            <Button size="sm"><Button.Text>Small</Button.Text></Button>
            <Button size="md"><Button.Text>Medium</Button.Text></Button>
            <Button size="lg"><Button.Text>Large</Button.Text></Button>
            <Button size="icon"><Button.Text>⚙</Button.Text></Button>
          </HStack>
        </DemoCard>
        <DemoCard label="States">
          <HStack style={{ gap: 12, flexWrap: 'wrap' }}>
            <Button disabled><Button.Text>Disabled</Button.Text></Button>
            <Button loading><Button.Text>Loading</Button.Text></Button>
          </HStack>
        </DemoCard>
      </Section>

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

      <Section title="Pagination">
        <DemoCard label="Basic (10 pages)">
          <Pagination.Root currentPage={paginationPage} totalPages={10} onPageChange={setPaginationPage} />
          <Text size="xs" tone="muted" style={{ marginTop: 8 }}>Page {paginationPage} of 10</Text>
        </DemoCard>
        <DemoCard label="Many pages (ellipsis)">
          <Pagination.Root currentPage={paginationPage2} totalPages={50} onPageChange={setPaginationPage2} />
          <Text size="xs" tone="muted" style={{ marginTop: 8 }}>Page {paginationPage2} of 50</Text>
        </DemoCard>
        <DemoCard label="Sizes">
          <VStack style={{ gap: 12 }}>
            <Pagination.Root currentPage={3} totalPages={5} onPageChange={() => {}} size="sm" />
            <Pagination.Root currentPage={3} totalPages={5} onPageChange={() => {}} size="md" />
            <Pagination.Root currentPage={3} totalPages={5} onPageChange={() => {}} size="lg" />
          </VStack>
        </DemoCard>
      </Section>

      <Section title="Toggle">
        <HStack style={{ gap: 12, flexWrap: 'wrap' }}>
          <DemoCard label="Single toggle">
            <Toggle pressed={togglePressed} onPressedChange={setTogglePressed}>
              <Text size="sm">{togglePressed ? 'Pressed' : 'Not pressed'}</Text>
            </Toggle>
          </DemoCard>
          <DemoCard label="Toggle Group (single)">
            <ToggleGroup type="single" value={toggleGroupValue} onValueChange={setToggleGroupValue}>
              <ToggleGroup.Item value="left"><Text size="sm">Left</Text></ToggleGroup.Item>
              <ToggleGroup.Item value="center"><Text size="sm">Center</Text></ToggleGroup.Item>
              <ToggleGroup.Item value="right"><Text size="sm">Right</Text></ToggleGroup.Item>
            </ToggleGroup>
          </DemoCard>
          <DemoCard label="Disabled">
            <Toggle disabled><Text size="sm">Disabled</Text></Toggle>
          </DemoCard>
        </HStack>
      </Section>
    </VStack>
  )
}
