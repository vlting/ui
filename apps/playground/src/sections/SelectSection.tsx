import { useState } from 'react'
import { Card, Select } from '@vlting/ui'

import { SectionTitle, StackY, type SectionProps } from './shared'

export function SelectSection({ sectionRef }: SectionProps) {
  const [controlled, setControlled] = useState('banana')

  return (
    <Card ref={sectionRef} data-section="Select">
      <Card.Header>
        <Card.Title>Select</Card.Title>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>Default</SectionTitle>
          <div style={{ maxWidth: 280 }}>
            <Select placeholder="Choose a fruit">
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
              <Select.Item value="cherry">Cherry</Select.Item>
              <Select.Item value="grape">Grape</Select.Item>
            </Select>
          </div>

          <SectionTitle stl={{ mt: '$24' }}>With groups</SectionTitle>
          <div style={{ maxWidth: 280 }}>
            <Select placeholder="Pick a food">
              <Select.Group>
                <Select.Label>Fruits</Select.Label>
                <Select.Item value="apple">Apple</Select.Item>
                <Select.Item value="banana">Banana</Select.Item>
                <Select.Item value="cherry">Cherry</Select.Item>
              </Select.Group>
              <Select.Separator />
              <Select.Group>
                <Select.Label>Vegetables</Select.Label>
                <Select.Item value="carrot">Carrot</Select.Item>
                <Select.Item value="broccoli">Broccoli</Select.Item>
                <Select.Item value="spinach">Spinach</Select.Item>
              </Select.Group>
            </Select>
          </div>

          <SectionTitle stl={{ mt: '$24' }}>With disabled items</SectionTitle>
          <div style={{ maxWidth: 280 }}>
            <Select placeholder="Select option">
              <Select.Item value="available">Available</Select.Item>
              <Select.Item value="locked" disabled>Locked (disabled)</Select.Item>
              <Select.Item value="premium" disabled>Premium (disabled)</Select.Item>
              <Select.Item value="free">Free</Select.Item>
            </Select>
          </div>

          <SectionTitle stl={{ mt: '$24' }}>Controlled</SectionTitle>
          <div style={{ maxWidth: 280 }}>
            <Select value={controlled} onValueChange={setControlled}>
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
              <Select.Item value="cherry">Cherry</Select.Item>
            </Select>
          </div>

          <SectionTitle stl={{ mt: '$24' }}>Disabled</SectionTitle>
          <div style={{ maxWidth: 280 }}>
            <Select disabled defaultValue="apple">
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
            </Select>
          </div>
        </StackY>
      </Card.Content>
    </Card>
  )
}
