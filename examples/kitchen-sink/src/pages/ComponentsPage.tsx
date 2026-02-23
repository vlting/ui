import React, { useState } from 'react'
import { YStack, XStack, Text, Heading, Separator, View } from 'tamagui'
import {
  Button,
  Input,
  Card,
  Dialog,
  Tabs,
  Textarea,
  Alert,
  Select,
  Checkbox,
  RadioGroup,
  Switch,
  Slider,
  Progress,
  Avatar,
  Toggle,
  ToggleGroup,
  Tooltip,
  Pagination,
} from '@vlting/ui'

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

export function ComponentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [checkboxChecked, setCheckboxChecked] = useState<boolean | 'indeterminate'>(false)
  const [radioValue, setRadioValue] = useState('option1')
  const [switchChecked, setSwitchChecked] = useState(false)
  const [sliderValue, setSliderValue] = useState(50)
  const [progressValue] = useState(65)
  const [togglePressed, setTogglePressed] = useState(false)
  const [toggleGroupValue, setToggleGroupValue] = useState<string | string[]>('center')
  const [paginationPage, setPaginationPage] = useState(1)
  const [paginationPage2, setPaginationPage2] = useState(5)

  return (
    <YStack padding="$6" gap="$2" maxWidth={900} marginHorizontal="auto" width="100%">
      <Heading fontFamily="$heading" fontSize="$8" fontWeight="$5">
        Components
      </Heading>
      <Text fontFamily="$body" fontSize="$4" color="$colorSubtitle" marginBottom="$4">
        Layer 3 — styled, ready-to-use components.
      </Text>

      {/* ─── Button ─── */}
      <Section title="Button">
        <DemoCard label="Variants">
          <XStack gap="$3" flexWrap="wrap">
            <Button variant="solid"><Button.Text>Solid</Button.Text></Button>
            <Button variant="outline"><Button.Text>Outline</Button.Text></Button>
            <Button variant="ghost"><Button.Text>Ghost</Button.Text></Button>
          </XStack>
        </DemoCard>
        <DemoCard label="Tones — Solid">
          <XStack gap="$3" flexWrap="wrap">
            <Button tone="neutral" variant="solid"><Button.Text>Neutral</Button.Text></Button>
            <Button tone="primary" variant="solid"><Button.Text>Primary</Button.Text></Button>
            <Button tone="success" variant="solid"><Button.Text>Success</Button.Text></Button>
            <Button tone="warning" variant="solid"><Button.Text>Warning</Button.Text></Button>
            <Button tone="danger" variant="solid"><Button.Text>Danger</Button.Text></Button>
          </XStack>
        </DemoCard>
        <DemoCard label="Tones — Outline">
          <XStack gap="$3" flexWrap="wrap">
            <Button tone="neutral" variant="outline"><Button.Text>Neutral</Button.Text></Button>
            <Button tone="primary" variant="outline"><Button.Text>Primary</Button.Text></Button>
            <Button tone="success" variant="outline"><Button.Text>Success</Button.Text></Button>
            <Button tone="warning" variant="outline"><Button.Text>Warning</Button.Text></Button>
            <Button tone="danger" variant="outline"><Button.Text>Danger</Button.Text></Button>
          </XStack>
        </DemoCard>
        <DemoCard label="Tones — Ghost">
          <XStack gap="$3" flexWrap="wrap">
            <Button tone="neutral" variant="ghost"><Button.Text>Neutral</Button.Text></Button>
            <Button tone="primary" variant="ghost"><Button.Text>Primary</Button.Text></Button>
            <Button tone="success" variant="ghost"><Button.Text>Success</Button.Text></Button>
            <Button tone="warning" variant="ghost"><Button.Text>Warning</Button.Text></Button>
            <Button tone="danger" variant="ghost"><Button.Text>Danger</Button.Text></Button>
          </XStack>
        </DemoCard>
        <DemoCard label="Sizes">
          <XStack gap="$3" alignItems="center" flexWrap="wrap">
            <Button size="sm"><Button.Text>Small</Button.Text></Button>
            <Button size="md"><Button.Text>Medium</Button.Text></Button>
            <Button size="lg"><Button.Text>Large</Button.Text></Button>
          </XStack>
        </DemoCard>
        <DemoCard label="States">
          <XStack gap="$3" flexWrap="wrap">
            <Button disabled><Button.Text>Disabled</Button.Text></Button>
            <Button loading><Button.Text>Loading</Button.Text></Button>
          </XStack>
        </DemoCard>
      </Section>

      {/* ─── Input ─── */}
      <Section title="Input">
        <DemoCard label="Default">
          <Input
            placeholder="Type something..."
            value={inputValue}
            onChangeText={setInputValue}
          />
        </DemoCard>
        <DemoCard label="With label & helper">
          <Input
            label="Email"
            placeholder="you@example.com"
            helperText="We'll never share your email."
          />
        </DemoCard>
        <DemoCard label="Error state">
          <Input
            label="Username"
            placeholder="Choose a username"
            error
            errorMessage="Username is already taken"
          />
        </DemoCard>
        <DemoCard label="Sizes">
          <YStack gap="$3">
            <Input size="sm" placeholder="Small input" />
            <Input size="md" placeholder="Medium input" />
            <Input size="lg" placeholder="Large input" />
          </YStack>
        </DemoCard>
      </Section>

      {/* ─── Textarea ─── */}
      <Section title="Textarea">
        <DemoCard label="Default">
          <Textarea
            placeholder="Write something..."
            value={textareaValue}
            onChangeText={setTextareaValue}
          />
        </DemoCard>
        <DemoCard label="With label & helper">
          <Textarea
            label="Bio"
            placeholder="Tell us about yourself..."
            helperText="Max 200 characters"
            maxLength={200}
          />
        </DemoCard>
        <DemoCard label="Error state">
          <Textarea
            label="Description"
            placeholder="Enter description"
            error
            errorMessage="Description is required"
          />
        </DemoCard>
        <DemoCard label="Disabled">
          <Textarea
            placeholder="Cannot edit..."
            disabled
            defaultValue="This textarea is disabled."
          />
        </DemoCard>
      </Section>

      {/* ─── Select ─── */}
      <Section title="Select">
        <DemoCard label="Default">
          <Select value={selectValue} onValueChange={setSelectValue} placeholder="Choose a fruit...">
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="banana">Banana</Select.Item>
            <Select.Item value="cherry">Cherry</Select.Item>
            <Select.Item value="date">Date</Select.Item>
          </Select>
        </DemoCard>
        <DemoCard label="Sizes">
          <YStack gap="$3">
            <Select size="sm" placeholder="Small">
              <Select.Item value="a">Option A</Select.Item>
              <Select.Item value="b">Option B</Select.Item>
            </Select>
            <Select size="md" placeholder="Medium">
              <Select.Item value="a">Option A</Select.Item>
              <Select.Item value="b">Option B</Select.Item>
            </Select>
            <Select size="lg" placeholder="Large">
              <Select.Item value="a">Option A</Select.Item>
              <Select.Item value="b">Option B</Select.Item>
            </Select>
          </YStack>
        </DemoCard>
        <DemoCard label="Disabled">
          <Select disabled placeholder="Cannot select">
            <Select.Item value="a">Option A</Select.Item>
          </Select>
        </DemoCard>
      </Section>

      {/* ─── Checkbox ─── */}
      <Section title="Checkbox">
        <DemoCard label="Checked / Unchecked">
          <YStack gap="$3">
            <Checkbox.Root checked={checkboxChecked} onCheckedChange={setCheckboxChecked} size="md">
              <Text fontFamily="$body" fontSize="$3">
                {checkboxChecked ? 'Checked' : 'Unchecked'}
              </Text>
            </Checkbox.Root>
            <Checkbox.Root checked onCheckedChange={() => {}} size="md">
              <Text fontFamily="$body" fontSize="$3">Always checked</Text>
            </Checkbox.Root>
          </YStack>
        </DemoCard>
        <DemoCard label="Sizes">
          <YStack gap="$3">
            <Checkbox.Root checked defaultChecked size="sm">
              <Text fontFamily="$body" fontSize="$3">Small</Text>
            </Checkbox.Root>
            <Checkbox.Root checked defaultChecked size="md">
              <Text fontFamily="$body" fontSize="$3">Medium</Text>
            </Checkbox.Root>
            <Checkbox.Root checked defaultChecked size="lg">
              <Text fontFamily="$body" fontSize="$3">Large</Text>
            </Checkbox.Root>
          </YStack>
        </DemoCard>
        <DemoCard label="Disabled">
          <XStack gap="$4" alignItems="center">
            <Checkbox.Root checked={false} disabled size="md">
              <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">Disabled unchecked</Text>
            </Checkbox.Root>
            <Checkbox.Root checked disabled size="md">
              <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">Disabled checked</Text>
            </Checkbox.Root>
          </XStack>
        </DemoCard>
      </Section>

      {/* ─── RadioGroup ─── */}
      <Section title="RadioGroup">
        <DemoCard label="Vertical">
          <RadioGroup.Root value={radioValue} onValueChange={setRadioValue} size="md" orientation="vertical">
            <RadioGroup.Item value="option1">
              <Text fontFamily="$body" fontSize="$3">Option 1</Text>
            </RadioGroup.Item>
            <RadioGroup.Item value="option2">
              <Text fontFamily="$body" fontSize="$3">Option 2</Text>
            </RadioGroup.Item>
            <RadioGroup.Item value="option3">
              <Text fontFamily="$body" fontSize="$3">Option 3</Text>
            </RadioGroup.Item>
          </RadioGroup.Root>
          <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle" marginTop="$2">
            Selected: {radioValue}
          </Text>
        </DemoCard>
        <DemoCard label="Horizontal">
          <RadioGroup.Root value={radioValue} onValueChange={setRadioValue} size="md" orientation="horizontal">
            <RadioGroup.Item value="option1">
              <Text fontFamily="$body" fontSize="$3">Option 1</Text>
            </RadioGroup.Item>
            <RadioGroup.Item value="option2">
              <Text fontFamily="$body" fontSize="$3">Option 2</Text>
            </RadioGroup.Item>
            <RadioGroup.Item value="option3">
              <Text fontFamily="$body" fontSize="$3">Option 3</Text>
            </RadioGroup.Item>
          </RadioGroup.Root>
        </DemoCard>
        <DemoCard label="Disabled">
          <RadioGroup.Root defaultValue="option1" disabled size="md">
            <RadioGroup.Item value="option1">
              <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">Selected but disabled</Text>
            </RadioGroup.Item>
            <RadioGroup.Item value="option2">
              <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">Also disabled</Text>
            </RadioGroup.Item>
          </RadioGroup.Root>
        </DemoCard>
      </Section>

      {/* ─── Switch ─── */}
      <Section title="Switch">
        <DemoCard label="Default">
          <XStack gap="$3" alignItems="center">
            <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
            <Text fontFamily="$body" fontSize="$3">
              {switchChecked ? 'On' : 'Off'}
            </Text>
          </XStack>
        </DemoCard>
        <DemoCard label="Sizes">
          <YStack gap="$3">
            <XStack gap="$3" alignItems="center">
              <Switch size="sm" defaultChecked />
              <Text fontFamily="$body" fontSize="$3">Small</Text>
            </XStack>
            <XStack gap="$3" alignItems="center">
              <Switch size="md" />
              <Text fontFamily="$body" fontSize="$3">Medium</Text>
            </XStack>
            <XStack gap="$3" alignItems="center">
              <Switch size="lg" defaultChecked />
              <Text fontFamily="$body" fontSize="$3">Large</Text>
            </XStack>
          </YStack>
        </DemoCard>
        <DemoCard label="Disabled">
          <XStack gap="$3" alignItems="center">
            <Switch disabled defaultChecked />
            <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">Disabled</Text>
          </XStack>
        </DemoCard>
      </Section>

      {/* ─── Slider ─── */}
      <Section title="Slider">
        <DemoCard label="Default">
          <YStack gap="$2">
            <Slider value={sliderValue} onValueChange={setSliderValue} />
            <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">
              Value: {sliderValue}
            </Text>
          </YStack>
        </DemoCard>
        <DemoCard label="Sizes">
          <YStack gap="$4">
            <Slider size="sm" defaultValue={30} />
            <Slider size="md" defaultValue={50} />
            <Slider size="lg" defaultValue={70} />
          </YStack>
        </DemoCard>
        <DemoCard label="Custom range">
          <Slider min={0} max={10} step={1} defaultValue={5} />
        </DemoCard>
        <DemoCard label="Disabled">
          <Slider disabled defaultValue={40} />
        </DemoCard>
      </Section>

      {/* ─── Progress ─── */}
      <Section title="Progress">
        <DemoCard label="Default">
          <YStack gap="$2">
            <Progress value={progressValue} />
            <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">
              {progressValue}% complete
            </Text>
          </YStack>
        </DemoCard>
        <DemoCard label="Sizes">
          <YStack gap="$3">
            <Progress size="sm" value={25} />
            <Progress size="md" value={50} />
            <Progress size="lg" value={75} />
          </YStack>
        </DemoCard>
        <DemoCard label="States">
          <YStack gap="$3">
            <Progress value={0} />
            <Progress value={100} />
          </YStack>
        </DemoCard>
      </Section>

      {/* ─── Avatar ─── */}
      <Section title="Avatar">
        <XStack gap="$3" flexWrap="wrap">
          <DemoCard label="With fallback">
            <XStack gap="$3" alignItems="center">
              <Avatar size="sm" fallback="SM" />
              <Avatar size="md" fallback="MD" />
              <Avatar size="lg" fallback="LG" />
              <Avatar size="xl" fallback="XL" />
            </XStack>
          </DemoCard>
          <DemoCard label="Initials">
            <XStack gap="$3" alignItems="center">
              <Avatar fallback="JD" />
              <Avatar fallback="AB" />
              <Avatar fallback="ZK" />
            </XStack>
          </DemoCard>
        </XStack>
      </Section>

      {/* ─── Alert ─── */}
      <Section title="Alert">
        <DemoCard label="Default variant">
          <Alert.Root variant="default">
            <Alert.Title>Heads up!</Alert.Title>
            <Alert.Description>This is a default informational alert.</Alert.Description>
          </Alert.Root>
        </DemoCard>
        <DemoCard label="Destructive variant">
          <Alert.Root variant="destructive">
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>Something went wrong. Please try again.</Alert.Description>
          </Alert.Root>
        </DemoCard>
      </Section>

      {/* ─── Toggle ─── */}
      <Section title="Toggle">
        <XStack gap="$3" flexWrap="wrap">
          <DemoCard label="Single toggle">
            <XStack gap="$3" alignItems="center">
              <Toggle pressed={togglePressed} onPressedChange={setTogglePressed}>
                <Text fontFamily="$body" fontSize="$3">
                  {togglePressed ? 'Pressed' : 'Not pressed'}
                </Text>
              </Toggle>
            </XStack>
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

      {/* ─── Tooltip ─── */}
      <Section title="Tooltip">
        <XStack gap="$3" flexWrap="wrap">
          <DemoCard label="Hover to see">
            <XStack gap="$4">
              <Tooltip content="This is a tooltip on top" side="top">
                <View
                  backgroundColor="$color4"
                  paddingHorizontal="$4"
                  paddingVertical="$2"
                  borderRadius="$3"
                  cursor="pointer"
                >
                  <Text fontFamily="$body" fontSize="$3">Top</Text>
                </View>
              </Tooltip>
              <Tooltip content="This is a tooltip on bottom" side="bottom">
                <View
                  backgroundColor="$color4"
                  paddingHorizontal="$4"
                  paddingVertical="$2"
                  borderRadius="$3"
                  cursor="pointer"
                >
                  <Text fontFamily="$body" fontSize="$3">Bottom</Text>
                </View>
              </Tooltip>
            </XStack>
          </DemoCard>
        </XStack>
      </Section>

      {/* ─── Card ─── */}
      <Section title="Card">
        <XStack gap="$4" flexWrap="wrap">
          <Card flex={1} minWidth={260}>
            <Card.Header>
              <Card.Title>Basic Card</Card.Title>
              <Card.Description>A simple card with header and content.</Card.Description>
            </Card.Header>
            <Card.Content>
              <Text fontFamily="$body" fontSize="$3">
                Card content goes here. Cards support header, content, and footer sections.
              </Text>
            </Card.Content>
            <Card.Footer>
              <XStack gap="$2">
                <Button size="sm" variant="outline"><Button.Text>Cancel</Button.Text></Button>
                <Button size="sm"><Button.Text>Save</Button.Text></Button>
              </XStack>
            </Card.Footer>
          </Card>
          <Card flex={1} minWidth={260} elevated>
            <Card.Header>
              <Card.Title>Elevated Card</Card.Title>
              <Card.Description>This card has no border, relying on elevation.</Card.Description>
            </Card.Header>
            <Card.Content>
              <Text fontFamily="$body" fontSize="$3">
                Use the elevated variant for cards that float above the surface.
              </Text>
            </Card.Content>
          </Card>
          <Card flex={1} minWidth={260} interactive onPress={() => alert('Card pressed!')}>
            <Card.Header>
              <Card.Title>Interactive Card</Card.Title>
              <Card.Description>Click me — I have hover and press states.</Card.Description>
            </Card.Header>
          </Card>
        </XStack>
      </Section>

      {/* ─── Dialog ─── */}
      <Section title="Dialog">
        <DemoCard label="Open/Close">
          <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger>
              <Button onPress={() => setDialogOpen(true)}>
                <Button.Text>Open Dialog</Button.Text>
              </Button>
            </Dialog.Trigger>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title>Example Dialog</Dialog.Title>
              <Dialog.Description>
                This is a styled dialog built on the headless Dialog primitive.
              </Dialog.Description>
              <YStack paddingTop="$4">
                <Dialog.Close>
                  <Button variant="outline" onPress={() => setDialogOpen(false)}>
                    <Button.Text>Close</Button.Text>
                  </Button>
                </Dialog.Close>
              </YStack>
            </Dialog.Content>
          </Dialog.Root>
        </DemoCard>
      </Section>

      {/* ─── Pagination ─── */}
      <Section title="Pagination">
        <DemoCard label="Basic (10 pages)">
          <Pagination.Root
            currentPage={paginationPage}
            totalPages={10}
            onPageChange={setPaginationPage}
          />
          <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle" marginTop="$2">
            Page {paginationPage} of 10
          </Text>
        </DemoCard>
        <DemoCard label="Many pages (showing ellipsis)">
          <Pagination.Root
            currentPage={paginationPage2}
            totalPages={50}
            onPageChange={setPaginationPage2}
          />
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

      {/* ─── Tabs ─── */}
      <Section title="Tabs">
        <DemoCard label="Multi-tab">
          <Tabs.Root defaultValue="tab1">
            <Tabs.List>
              <Tabs.Trigger value="tab1">
                <Text fontFamily="$body" fontSize="$3">Tab 1</Text>
              </Tabs.Trigger>
              <Tabs.Trigger value="tab2">
                <Text fontFamily="$body" fontSize="$3">Tab 2</Text>
              </Tabs.Trigger>
              <Tabs.Trigger value="tab3">
                <Text fontFamily="$body" fontSize="$3">Tab 3</Text>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">
              <Text fontFamily="$body" fontSize="$3">
                Content for the first tab. Tabs support keyboard navigation with arrow keys.
              </Text>
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <Text fontFamily="$body" fontSize="$3">
                Content for the second tab. Each tab panel is conditionally rendered.
              </Text>
            </Tabs.Content>
            <Tabs.Content value="tab3">
              <Text fontFamily="$body" fontSize="$3">
                Content for the third tab.
              </Text>
            </Tabs.Content>
          </Tabs.Root>
        </DemoCard>
      </Section>
    </YStack>
  )
}
