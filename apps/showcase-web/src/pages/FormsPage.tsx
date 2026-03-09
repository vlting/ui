import { useState } from 'react'
import { Section, DemoCard, DemoRow } from '../components/Section'
import { Input } from '@vlting/ui/components'
import { Textarea } from '@vlting/ui/components'
import { Checkbox } from '@vlting/ui/components'
import { Switch } from '@vlting/ui/components'
import { RadioGroup } from '@vlting/ui/components'
import { Select } from '@vlting/ui/components'
import { Slider } from '@vlting/ui/components'
import { Toggle } from '@vlting/ui/components'
import { Field } from '@vlting/ui/components'
import { InputGroup } from '@vlting/ui/components'
import { InputOTP } from '@vlting/ui/components'
import { NativeSelect } from '@vlting/ui/components'
import { Label } from '@vlting/ui/primitives'

export function FormsPage() {
  const [checked, setChecked] = useState(false)
  const [switched, setSwitched] = useState(false)
  const [sliderVal, setSliderVal] = useState(50)
  const [toggled, setToggled] = useState(false)

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Forms</h1>

      <Section title="Input">
        <DemoCard label="Input variants">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
            <Input placeholder="Default input" />
            <Input placeholder="Disabled input" disabled />
            <Input type="password" placeholder="Password" />
            <Input type="email" placeholder="Email" />
          </div>
        </DemoCard>
      </Section>

      <Section title="Textarea">
        <DemoCard label="Multi-line input">
          <div style={{ maxWidth: 400 }}>
            <Textarea placeholder="Type your message here..." rows={4} />
          </div>
        </DemoCard>
      </Section>

      <Section title="Field">
        <DemoCard label="Form field with label and description">
          <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field>
              <Field.Label>Username</Field.Label>
              <Input placeholder="Enter username" />
              <Field.Description>Your unique display name.</Field.Description>
            </Field>
            <Field>
              <Field.Label>Email</Field.Label>
              <Input type="email" placeholder="name@example.com" />
              <Field.Error>Please enter a valid email address.</Field.Error>
            </Field>
          </div>
        </DemoCard>
      </Section>

      <Section title="InputGroup">
        <DemoCard label="Input with addons">
          <div style={{ maxWidth: 400 }}>
            <InputGroup>
              <InputGroup.Addon>https://</InputGroup.Addon>
              <Input placeholder="example.com" />
            </InputGroup>
          </div>
        </DemoCard>
      </Section>

      <Section title="Checkbox">
        <DemoCard label="Checkbox states">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Checkbox checked={checked} onCheckedChange={setChecked}>
              Accept terms and conditions
            </Checkbox>
            <Checkbox disabled>Disabled checkbox</Checkbox>
            <Checkbox checked disabled>Checked disabled</Checkbox>
          </div>
        </DemoCard>
      </Section>

      <Section title="Switch">
        <DemoCard label="Toggle switch">
          <DemoRow>
            <Switch checked={switched} onCheckedChange={setSwitched} />
            <span>{switched ? 'On' : 'Off'}</span>
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="RadioGroup">
        <DemoCard label="Radio options">
          <RadioGroup defaultValue="option1">
            <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
            <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
            <RadioGroup.Item value="option3">Option 3</RadioGroup.Item>
          </RadioGroup>
        </DemoCard>
      </Section>

      <Section title="Select">
        <DemoCard label="Dropdown select">
          <div style={{ maxWidth: 300 }}>
            <Select>
              <Select.Trigger>
                <Select.Value placeholder="Choose a fruit" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="apple">Apple</Select.Item>
                <Select.Item value="banana">Banana</Select.Item>
                <Select.Item value="cherry">Cherry</Select.Item>
                <Select.Item value="grape">Grape</Select.Item>
              </Select.Content>
            </Select>
          </div>
        </DemoCard>
      </Section>

      <Section title="NativeSelect">
        <DemoCard label="Native HTML select">
          <div style={{ maxWidth: 300 }}>
            <NativeSelect>
              <option value="">Select...</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </NativeSelect>
          </div>
        </DemoCard>
      </Section>

      <Section title="Slider">
        <DemoCard label="Range slider">
          <div style={{ maxWidth: 400 }}>
            <Slider value={sliderVal} onValueChange={setSliderVal} min={0} max={100} />
            <div style={{ fontSize: 14, marginTop: 8 }}>Value: {sliderVal}</div>
          </div>
        </DemoCard>
      </Section>

      <Section title="Toggle">
        <DemoCard label="Toggle button">
          <DemoRow>
            <Toggle pressed={toggled} onPressedChange={setToggled}>
              {toggled ? 'Pressed' : 'Not Pressed'}
            </Toggle>
            <Toggle variant="outline">Outline</Toggle>
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="InputOTP">
        <DemoCard label="One-time password input">
          <InputOTP length={6} />
        </DemoCard>
      </Section>
    </div>
  )
}
