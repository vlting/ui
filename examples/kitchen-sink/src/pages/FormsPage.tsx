import {
  Button,
  Calendar,
  Checkbox,
  Combobox,
  DatePicker,
  DateRangePicker,
  Form,
  HStack,
  Heading,
  Input,
  InputOTP,
  NativeSelect,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Text,
  Textarea,
  VStack,
} from '@vlting/ui'
import type React from 'react'
import { useState } from 'react'
import { DemoCard, Section } from '../components/Section'

export function FormsPage() {
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [checkboxChecked, setCheckboxChecked] = useState<boolean | 'indeterminate'>(false)
  const [radioValue, setRadioValue] = useState('option1')
  const [switchChecked, setSwitchChecked] = useState(false)
  const [sliderValue, setSliderValue] = useState(50)
  const [dateValue, setDateValue] = useState<Date | undefined>(undefined)
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | undefined>(undefined)
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(undefined)
  const [formError, setFormError] = useState(false)

  return (
    <VStack style={{ padding: 24, gap: 8, maxWidth: 900, marginInline: 'auto', width: '100%' }}>
      <Heading level={1}>Forms & Inputs</Heading>
      <Text tone="muted" style={{ marginBottom: 16 }}>
        Calendar, Checkbox, Combobox, DatePicker, Form, Input, RadioGroup, Select, Slider,
        Switch, Textarea, and more.
      </Text>

      <Section title="Calendar">
        <DemoCard label="Date selection">
          <Calendar.Root value={calendarDate} onValueChange={setCalendarDate} />
          <Text size="xs" tone="muted">
            Selected: {calendarDate ? calendarDate.toLocaleDateString() : '(none)'}
          </Text>
        </DemoCard>
      </Section>

      <Section title="Checkbox">
        <DemoCard label="Checked / Unchecked">
          <VStack style={{ gap: 12 }}>
            <Checkbox.Root checked={checkboxChecked} onCheckedChange={setCheckboxChecked} size="md">
              <Text size="sm">{checkboxChecked ? 'Checked' : 'Unchecked'}</Text>
            </Checkbox.Root>
            <Checkbox.Root checked onCheckedChange={() => {}} size="md">
              <Text size="sm">Always checked</Text>
            </Checkbox.Root>
          </VStack>
        </DemoCard>
        <DemoCard label="Sizes">
          <VStack style={{ gap: 12 }}>
            <Checkbox.Root checked defaultChecked size="sm"><Text size="sm">Small</Text></Checkbox.Root>
            <Checkbox.Root checked defaultChecked size="md"><Text size="sm">Medium</Text></Checkbox.Root>
            <Checkbox.Root checked defaultChecked size="lg"><Text size="sm">Large</Text></Checkbox.Root>
          </VStack>
        </DemoCard>
        <DemoCard label="Disabled">
          <HStack style={{ gap: 16, alignItems: 'center' }}>
            <Checkbox.Root checked={false} disabled size="md">
              <Text size="sm" tone="muted">Disabled unchecked</Text>
            </Checkbox.Root>
            <Checkbox.Root checked disabled size="md">
              <Text size="sm" tone="muted">Disabled checked</Text>
            </Checkbox.Root>
          </HStack>
        </DemoCard>
      </Section>

      <Section title="Combobox">
        <DemoCard label="Searchable select">
          <Combobox.Root
            options={[
              { value: 'react', label: 'React' },
              { value: 'vue', label: 'Vue' },
              { value: 'angular', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'solid', label: 'Solid' },
            ]}
            placeholder="Select a framework..."
          />
        </DemoCard>
      </Section>

      <Section title="DatePicker">
        <DemoCard label="Default">
          <DatePicker placeholder="Pick a date..." value={dateValue} onValueChange={setDateValue} />
        </DemoCard>
        <DemoCard label="With label and helper">
          <DatePicker label="Start date" placeholder="Choose start date" helperText="When should the project begin?" />
        </DemoCard>
        <DemoCard label="Error state">
          <DatePicker label="Due date" placeholder="Select due date" error errorMessage="A due date is required" />
        </DemoCard>
        <DemoCard label="Disabled">
          <DatePicker placeholder="Cannot select" disabled />
        </DemoCard>
      </Section>

      <Section title="DateRangePicker">
        <DemoCard label="Default">
          <DateRangePicker placeholder="Select date range..." value={dateRange} onValueChange={setDateRange} />
        </DemoCard>
        <DemoCard label="With label">
          <DateRangePicker label="Trip dates" placeholder="When are you traveling?" helperText="Select check-in and check-out dates" />
        </DemoCard>
      </Section>

      <Section title="Form">
        <DemoCard label="Form with validation">
          <Form.Root onSubmit={(e: React.FormEvent) => { e.preventDefault(); setFormError(true) }}>
            <VStack style={{ gap: 12 }}>
              <Form.Field error={formError}>
                <Form.Label htmlFor="demo-name">Name</Form.Label>
                <Input id="demo-name" placeholder="Enter your name" />
                <Form.Description>Your full name as it appears on your ID.</Form.Description>
                <Form.ErrorMessage>Name is required.</Form.ErrorMessage>
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="demo-email">Email</Form.Label>
                <Input id="demo-email" placeholder="you@example.com" />
                <Form.Description>We will never share your email.</Form.Description>
              </Form.Field>
              <HStack style={{ gap: 8 }}>
                <Button onPress={() => setFormError(true)}><Button.Text>Submit (trigger error)</Button.Text></Button>
                <Button variant="outline" onPress={() => setFormError(false)}><Button.Text>Reset</Button.Text></Button>
              </HStack>
            </VStack>
          </Form.Root>
        </DemoCard>
      </Section>

      <Section title="Input">
        <DemoCard label="Default">
          <Input placeholder="Type something..." value={inputValue} onChangeText={setInputValue} />
        </DemoCard>
        <DemoCard label="With label & helper">
          <Input label="Email" placeholder="you@example.com" helperText="We'll never share your email." />
        </DemoCard>
        <DemoCard label="Error state">
          <Input label="Username" placeholder="Choose a username" error errorMessage="Username is already taken" />
        </DemoCard>
        <DemoCard label="Sizes">
          <VStack style={{ gap: 12 }}>
            <Input size="sm" placeholder="Small input" />
            <Input size="md" placeholder="Medium input" />
            <Input size="lg" placeholder="Large input" />
          </VStack>
        </DemoCard>
      </Section>

      <Section title="InputOTP">
        <DemoCard label="6-digit OTP">
          <InputOTP.Root maxLength={6}>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
            <InputOTP.Separator />
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP.Root>
        </DemoCard>
      </Section>

      <Section title="NativeSelect">
        <DemoCard label="Native select element">
          <NativeSelect.Root>
            <NativeSelect.Option value="">Choose...</NativeSelect.Option>
            <NativeSelect.Option value="react">React</NativeSelect.Option>
            <NativeSelect.Option value="vue">Vue</NativeSelect.Option>
            <NativeSelect.Option value="svelte">Svelte</NativeSelect.Option>
          </NativeSelect.Root>
        </DemoCard>
      </Section>

      <Section title="RadioGroup">
        <DemoCard label="Vertical">
          <RadioGroup.Root value={radioValue} onValueChange={setRadioValue} size="md" orientation="vertical">
            <RadioGroup.Item value="option1"><Text size="sm">Option 1</Text></RadioGroup.Item>
            <RadioGroup.Item value="option2"><Text size="sm">Option 2</Text></RadioGroup.Item>
            <RadioGroup.Item value="option3"><Text size="sm">Option 3</Text></RadioGroup.Item>
          </RadioGroup.Root>
          <Text size="xs" tone="muted" style={{ marginTop: 8 }}>Selected: {radioValue}</Text>
        </DemoCard>
        <DemoCard label="Horizontal">
          <RadioGroup.Root value={radioValue} onValueChange={setRadioValue} size="md" orientation="horizontal">
            <RadioGroup.Item value="option1"><Text size="sm">Option 1</Text></RadioGroup.Item>
            <RadioGroup.Item value="option2"><Text size="sm">Option 2</Text></RadioGroup.Item>
            <RadioGroup.Item value="option3"><Text size="sm">Option 3</Text></RadioGroup.Item>
          </RadioGroup.Root>
        </DemoCard>
        <DemoCard label="Disabled">
          <RadioGroup.Root defaultValue="option1" disabled size="md">
            <RadioGroup.Item value="option1"><Text size="sm" tone="muted">Selected but disabled</Text></RadioGroup.Item>
            <RadioGroup.Item value="option2"><Text size="sm" tone="muted">Also disabled</Text></RadioGroup.Item>
          </RadioGroup.Root>
        </DemoCard>
      </Section>

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
          <VStack style={{ gap: 12 }}>
            <Select size="sm" placeholder="Small"><Select.Item value="a">Option A</Select.Item><Select.Item value="b">Option B</Select.Item></Select>
            <Select size="md" placeholder="Medium"><Select.Item value="a">Option A</Select.Item><Select.Item value="b">Option B</Select.Item></Select>
            <Select size="lg" placeholder="Large"><Select.Item value="a">Option A</Select.Item><Select.Item value="b">Option B</Select.Item></Select>
          </VStack>
        </DemoCard>
        <DemoCard label="Disabled">
          <Select disabled placeholder="Cannot select"><Select.Item value="a">Option A</Select.Item></Select>
        </DemoCard>
      </Section>

      <Section title="Slider">
        <DemoCard label="Default">
          <VStack style={{ gap: 8 }}>
            <Slider value={sliderValue} onValueChange={setSliderValue} aria-label="Volume" />
            <Text size="xs" tone="muted">Value: {sliderValue}</Text>
          </VStack>
        </DemoCard>
        <DemoCard label="Sizes">
          <VStack style={{ gap: 16 }}>
            <Slider size="sm" defaultValue={30} aria-label="Small slider" />
            <Slider size="md" defaultValue={50} aria-label="Medium slider" />
            <Slider size="lg" defaultValue={70} aria-label="Large slider" />
          </VStack>
        </DemoCard>
        <DemoCard label="Disabled">
          <Slider disabled defaultValue={40} aria-label="Disabled slider" />
        </DemoCard>
      </Section>

      <Section title="Switch">
        <DemoCard label="Default">
          <HStack style={{ gap: 12, alignItems: 'center' }}>
            <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
            <Text size="sm">{switchChecked ? 'On' : 'Off'}</Text>
          </HStack>
        </DemoCard>
        <DemoCard label="Sizes">
          <VStack style={{ gap: 12 }}>
            <HStack style={{ gap: 12, alignItems: 'center' }}><Switch size="sm" defaultChecked /><Text size="sm">Small</Text></HStack>
            <HStack style={{ gap: 12, alignItems: 'center' }}><Switch size="md" /><Text size="sm">Medium</Text></HStack>
            <HStack style={{ gap: 12, alignItems: 'center' }}><Switch size="lg" defaultChecked /><Text size="sm">Large</Text></HStack>
          </VStack>
        </DemoCard>
        <DemoCard label="Disabled">
          <HStack style={{ gap: 12, alignItems: 'center' }}>
            <Switch disabled defaultChecked />
            <Text size="sm" tone="muted">Disabled</Text>
          </HStack>
        </DemoCard>
      </Section>

      <Section title="Textarea">
        <DemoCard label="Default">
          <Textarea placeholder="Write something..." value={textareaValue} onChangeText={setTextareaValue} />
        </DemoCard>
        <DemoCard label="With label & helper">
          <Textarea label="Bio" placeholder="Tell us about yourself..." helperText="Max 200 characters" maxLength={200} />
        </DemoCard>
        <DemoCard label="Error state">
          <Textarea label="Description" placeholder="Enter description" error errorMessage="Description is required" />
        </DemoCard>
        <DemoCard label="Disabled">
          <Textarea placeholder="Cannot edit..." disabled defaultValue="This textarea is disabled." />
        </DemoCard>
      </Section>
    </VStack>
  )
}
