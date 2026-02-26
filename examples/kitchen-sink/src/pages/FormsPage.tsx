import {
  Button,
  Calendar,
  Checkbox,
  Combobox,
  DatePicker,
  DateRangePicker,
  Form,
  Heading,
  Input,
  InputOTP,
  NativeSelect,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Textarea,
} from '@vlting/ui'
import type React from 'react'
import { useState } from 'react'
import { Text, XStack, YStack } from 'tamagui'
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
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | undefined>(
    undefined,
  )
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(undefined)
  const [formError, setFormError] = useState(false)

  return (
    <YStack padding="$6" gap="$2" maxWidth={900} marginHorizontal="auto" width="100%">
      <Heading level={1}>Forms & Inputs</Heading>
      <Text fontFamily="$body" fontSize="$4" color="$colorSubtitle" marginBottom="$4">
        Calendar, Checkbox, Combobox, DatePicker, Form, Input, RadioGroup, Select, Slider,
        Switch, Textarea, and more.
      </Text>

      {/* Calendar */}
      <Section title="Calendar">
        <DemoCard label="Date selection">
          <Calendar.Root value={calendarDate} onValueChange={setCalendarDate} />
          <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">
            Selected: {calendarDate ? calendarDate.toLocaleDateString() : '(none)'}
          </Text>
        </DemoCard>
      </Section>

      {/* Checkbox */}
      <Section title="Checkbox">
        <DemoCard label="Checked / Unchecked">
          <YStack gap="$3">
            <Checkbox.Root
              checked={checkboxChecked}
              onCheckedChange={setCheckboxChecked}
              size="md"
            >
              <Text fontFamily="$body" fontSize="$3">
                {checkboxChecked ? 'Checked' : 'Unchecked'}
              </Text>
            </Checkbox.Root>
            <Checkbox.Root checked onCheckedChange={() => {}} size="md">
              <Text fontFamily="$body" fontSize="$3">
                Always checked
              </Text>
            </Checkbox.Root>
          </YStack>
        </DemoCard>
        <DemoCard label="Sizes">
          <YStack gap="$3">
            <Checkbox.Root checked defaultChecked size="sm">
              <Text fontFamily="$body" fontSize="$3">
                Small
              </Text>
            </Checkbox.Root>
            <Checkbox.Root checked defaultChecked size="md">
              <Text fontFamily="$body" fontSize="$3">
                Medium
              </Text>
            </Checkbox.Root>
            <Checkbox.Root checked defaultChecked size="lg">
              <Text fontFamily="$body" fontSize="$3">
                Large
              </Text>
            </Checkbox.Root>
          </YStack>
        </DemoCard>
        <DemoCard label="Disabled">
          <XStack gap="$4" alignItems="center">
            <Checkbox.Root checked={false} disabled size="md">
              <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
                Disabled unchecked
              </Text>
            </Checkbox.Root>
            <Checkbox.Root checked disabled size="md">
              <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
                Disabled checked
              </Text>
            </Checkbox.Root>
          </XStack>
        </DemoCard>
      </Section>

      {/* Combobox */}
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

      {/* DatePicker */}
      <Section title="DatePicker">
        <DemoCard label="Default">
          <DatePicker
            placeholder="Pick a date..."
            value={dateValue}
            onValueChange={setDateValue}
          />
        </DemoCard>
        <DemoCard label="With label and helper">
          <DatePicker
            label="Start date"
            placeholder="Choose start date"
            helperText="When should the project begin?"
          />
        </DemoCard>
        <DemoCard label="Error state">
          <DatePicker
            label="Due date"
            placeholder="Select due date"
            error
            errorMessage="A due date is required"
          />
        </DemoCard>
        <DemoCard label="Disabled">
          <DatePicker placeholder="Cannot select" disabled />
        </DemoCard>
      </Section>

      {/* DateRangePicker */}
      <Section title="DateRangePicker">
        <DemoCard label="Default">
          <DateRangePicker
            placeholder="Select date range..."
            value={dateRange}
            onValueChange={setDateRange}
          />
        </DemoCard>
        <DemoCard label="With label">
          <DateRangePicker
            label="Trip dates"
            placeholder="When are you traveling?"
            helperText="Select check-in and check-out dates"
          />
        </DemoCard>
      </Section>

      {/* Form */}
      <Section title="Form">
        <DemoCard label="Form with validation">
          <Form.Root
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault()
              setFormError(true)
            }}
          >
            <YStack gap="$3">
              <Form.Field error={formError}>
                <Form.Label htmlFor="demo-name">Name</Form.Label>
                <Input id="demo-name" placeholder="Enter your name" />
                <Form.Description>
                  Your full name as it appears on your ID.
                </Form.Description>
                <Form.ErrorMessage>Name is required.</Form.ErrorMessage>
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="demo-email">Email</Form.Label>
                <Input id="demo-email" placeholder="you@example.com" />
                <Form.Description>We will never share your email.</Form.Description>
              </Form.Field>
              <XStack gap="$2">
                <Button onPress={() => setFormError(true)}>
                  <Button.Text>Submit (trigger error)</Button.Text>
                </Button>
                <Button variant="outline" onPress={() => setFormError(false)}>
                  <Button.Text>Reset</Button.Text>
                </Button>
              </XStack>
            </YStack>
          </Form.Root>
        </DemoCard>
      </Section>

      {/* Input */}
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

      {/* InputOTP */}
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

      {/* NativeSelect */}
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

      {/* RadioGroup */}
      <Section title="RadioGroup">
        <DemoCard label="Vertical">
          <RadioGroup.Root
            value={radioValue}
            onValueChange={setRadioValue}
            size="md"
            orientation="vertical"
          >
            <RadioGroup.Item value="option1">
              <Text fontFamily="$body" fontSize="$3">
                Option 1
              </Text>
            </RadioGroup.Item>
            <RadioGroup.Item value="option2">
              <Text fontFamily="$body" fontSize="$3">
                Option 2
              </Text>
            </RadioGroup.Item>
            <RadioGroup.Item value="option3">
              <Text fontFamily="$body" fontSize="$3">
                Option 3
              </Text>
            </RadioGroup.Item>
          </RadioGroup.Root>
          <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle" marginTop="$2">
            Selected: {radioValue}
          </Text>
        </DemoCard>
        <DemoCard label="Horizontal">
          <RadioGroup.Root
            value={radioValue}
            onValueChange={setRadioValue}
            size="md"
            orientation="horizontal"
          >
            <RadioGroup.Item value="option1">
              <Text fontFamily="$body" fontSize="$3">
                Option 1
              </Text>
            </RadioGroup.Item>
            <RadioGroup.Item value="option2">
              <Text fontFamily="$body" fontSize="$3">
                Option 2
              </Text>
            </RadioGroup.Item>
            <RadioGroup.Item value="option3">
              <Text fontFamily="$body" fontSize="$3">
                Option 3
              </Text>
            </RadioGroup.Item>
          </RadioGroup.Root>
        </DemoCard>
        <DemoCard label="Disabled">
          <RadioGroup.Root defaultValue="option1" disabled size="md">
            <RadioGroup.Item value="option1">
              <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
                Selected but disabled
              </Text>
            </RadioGroup.Item>
            <RadioGroup.Item value="option2">
              <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
                Also disabled
              </Text>
            </RadioGroup.Item>
          </RadioGroup.Root>
        </DemoCard>
      </Section>

      {/* Select */}
      <Section title="Select">
        <DemoCard label="Default">
          <Select
            value={selectValue}
            onValueChange={setSelectValue}
            placeholder="Choose a fruit..."
          >
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

      {/* Slider */}
      <Section title="Slider">
        <DemoCard label="Default">
          <YStack gap="$2">
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              aria-label="Volume"
            />
            <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">
              Value: {sliderValue}
            </Text>
          </YStack>
        </DemoCard>
        <DemoCard label="Sizes">
          <YStack gap="$4">
            <Slider size="sm" defaultValue={30} aria-label="Small slider" />
            <Slider size="md" defaultValue={50} aria-label="Medium slider" />
            <Slider size="lg" defaultValue={70} aria-label="Large slider" />
          </YStack>
        </DemoCard>
        <DemoCard label="Disabled">
          <Slider disabled defaultValue={40} aria-label="Disabled slider" />
        </DemoCard>
      </Section>

      {/* Switch */}
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
              <Text fontFamily="$body" fontSize="$3">
                Small
              </Text>
            </XStack>
            <XStack gap="$3" alignItems="center">
              <Switch size="md" />
              <Text fontFamily="$body" fontSize="$3">
                Medium
              </Text>
            </XStack>
            <XStack gap="$3" alignItems="center">
              <Switch size="lg" defaultChecked />
              <Text fontFamily="$body" fontSize="$3">
                Large
              </Text>
            </XStack>
          </YStack>
        </DemoCard>
        <DemoCard label="Disabled">
          <XStack gap="$3" alignItems="center">
            <Switch disabled defaultChecked />
            <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
              Disabled
            </Text>
          </XStack>
        </DemoCard>
      </Section>

      {/* Textarea */}
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
    </YStack>
  )
}
