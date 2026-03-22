import { useState } from 'react'
import { Alert as RNAlert } from 'react-native'
import { Button } from '../../../../packages/components/Button/Button.native'
import { Checkbox } from '../../../../packages/components/Checkbox/Checkbox.native'
import { Field } from '../../../../packages/components/Field/Field.native'
import { Input } from '../../../../packages/components/Input/Input.native'
import { Slider } from '../../../../packages/components/Slider/Slider.native'
import { Switch } from '../../../../packages/components/Switch/Switch.native'
import { Textarea } from '../../../../packages/components/Textarea/Textarea.native'
import { Toggle } from '../../../../packages/components/Toggle/Toggle.native'
import { Box, Heading, Row, ScrollView, Spacer, Text } from '../../../../packages/stl-native/src/primitives'

export function FormScreen() {
  const [inputValue, setInputValue] = useState('')
  const [checked, setChecked] = useState(false)
  const [switchOn, setSwitchOn] = useState(false)
  const [sliderVal, setSliderVal] = useState(50)

  return (
    <ScrollView stl={{ flex: 1, p: 20 }}>
      <Heading stl={{ fontSize: 24, fontWeight: '$700', mb: 4 }}>
        Form Components
      </Heading>
      <Text stl={{ fontSize: 14, color: '$neutral6', mb: 24 }}>
        Button, Input, Textarea, Checkbox, Switch, Toggle, Slider, Field
      </Text>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Button</Text>
        <Row stl={{ gap: 8, flexWrap: 'wrap' }}>
          <Button onPress={() => RNAlert.alert('Pressed!')}>
            <Button.Text>Default</Button.Text>
          </Button>
          <Button variant="outline">
            <Button.Text>Outline</Button.Text>
          </Button>
          <Button variant="ghost">
            <Button.Text>Ghost</Button.Text>
          </Button>
        </Row>
        <Spacer size="sm" />
        <Row stl={{ gap: 8 }}>
          <Button size="md">
            <Button.Text>Medium</Button.Text>
          </Button>
          <Button size="lg">
            <Button.Text>Large</Button.Text>
          </Button>
        </Row>
        <Spacer size="sm" />
        <Button loading>
          <Button.Text>Loading</Button.Text>
        </Button>
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Input</Text>
        <Input
          placeholder="Type something..."
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Spacer size="sm" />
        <Input placeholder="Disabled" disabled />
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Textarea</Text>
        <Textarea placeholder="Write your message..." />
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Checkbox</Text>
        <Checkbox.Root
          checked={checked}
          onCheckedChange={(v: boolean | 'indeterminate') => setChecked(v === true)}
        >
          <Text>Accept terms and conditions</Text>
        </Checkbox.Root>
        <Text stl={{ fontSize: 12, color: '$neutral6', mt: 4 }}>Checked: {String(checked)}</Text>
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Switch</Text>
        <Row stl={{ gap: 12, alignItems: 'center' }}>
          <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
          <Text>Notifications {switchOn ? 'on' : 'off'}</Text>
        </Row>
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Toggle</Text>
        <Toggle>
          <Text>Bold</Text>
        </Toggle>
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Slider</Text>
        <Slider
          value={sliderVal}
          onValueChange={(v: number | [number, number]) => setSliderVal(typeof v === 'number' ? v : v[0])}
          min={0}
          max={100}
        />
        <Text stl={{ fontSize: 12, color: '$neutral6', mt: 4 }}>Value: {sliderVal}</Text>
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Field</Text>
        <Field>
          <Field.Label>Email</Field.Label>
          <Input placeholder="email@example.com" />
          <Field.Description>We will never share your email.</Field.Description>
        </Field>
      </Box>

      <Spacer size="xl" />
    </ScrollView>
  )
}
