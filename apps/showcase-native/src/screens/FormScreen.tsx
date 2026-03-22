import { useState } from 'react'
import { Alert as RNAlert, ScrollView, StyleSheet, Text as RNText, View } from 'react-native'
import { Button } from '../../../../packages/components/Button/Button.native'
import { Checkbox } from '../../../../packages/components/Checkbox/Checkbox.native'
import { Field } from '../../../../packages/components/Field/Field.native'
import { Input } from '../../../../packages/components/Input/Input.native'
import { Slider } from '../../../../packages/components/Slider/Slider.native'
import { Switch } from '../../../../packages/components/Switch/Switch.native'
import { Textarea } from '../../../../packages/components/Textarea/Textarea.native'
import { Toggle } from '../../../../packages/components/Toggle/Toggle.native'
import { Text, Row, Spacer } from '../../../../packages/stl-native/src/primitives'

export function FormScreen() {
  const [inputValue, setInputValue] = useState('')
  const [checked, setChecked] = useState(false)
  const [switchOn, setSwitchOn] = useState(false)
  const [sliderVal, setSliderVal] = useState(50)

  return (
    <ScrollView style={styles.container}>
      <RNText style={styles.title}>Form Components</RNText>
      <RNText style={styles.subtitle}>
        Button, Input, Textarea, Checkbox, Switch, Toggle, Slider, Field
      </RNText>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Button</RNText>
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
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Input</RNText>
        <Input
          placeholder="Type something..."
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Spacer size="sm" />
        <Input placeholder="Disabled" disabled />
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Textarea</RNText>
        <Textarea placeholder="Write your message..." />
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Checkbox</RNText>
        <Checkbox.Root
          checked={checked}
          onCheckedChange={(v: boolean | 'indeterminate') => setChecked(v === true)}
        >
          <Text>Accept terms and conditions</Text>
        </Checkbox.Root>
        <RNText style={styles.label}>Checked: {String(checked)}</RNText>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Switch</RNText>
        <Row stl={{ gap: 12, alignItems: 'center' }}>
          <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
          <Text>Notifications {switchOn ? 'on' : 'off'}</Text>
        </Row>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Toggle</RNText>
        <Toggle>
          <Text>Bold</Text>
        </Toggle>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Slider</RNText>
        <Slider
          value={sliderVal}
          onValueChange={(v: number | [number, number]) => setSliderVal(typeof v === 'number' ? v : v[0])}
          min={0}
          max={100}
        />
        <RNText style={styles.label}>Value: {sliderVal}</RNText>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Field</RNText>
        <Field>
          <Field.Label>Email</Field.Label>
          <Input placeholder="email@example.com" />
          <Field.Description>We will never share your email.</Field.Description>
        </Field>
      </View>

      <Spacer size="xl" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  label: { fontSize: 12, color: '#888', marginTop: 4 },
})
