import { useState } from 'react'
import { Card, Combobox } from '@vlting/ui'

import { SectionTitle, StackY, type SectionProps } from './shared'

const FRAMEWORKS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
  { value: 'preact', label: 'Preact' },
]

export function ComboboxSection({ sectionRef }: SectionProps) {
  const [value, setValue] = useState<string | undefined>(undefined)

  return (
    <Card ref={sectionRef} data-section="Combobox">
      <Card.Header>
        <Card.Title>Combobox</Card.Title>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>Default</SectionTitle>
          <div style={{ maxWidth: 280 }}>
            <Combobox.Root>
              <Combobox.Input placeholder="Search frameworks..." />
              <Combobox.Content>
                {FRAMEWORKS.map((fw) => (
                  <Combobox.Item key={fw.value} value={fw.value}>
                    {fw.label}
                  </Combobox.Item>
                ))}
                <Combobox.Empty>No frameworks found</Combobox.Empty>
              </Combobox.Content>
            </Combobox.Root>
          </div>

          <SectionTitle stl={{ mt: '$24' }}>With groups</SectionTitle>
          <div style={{ maxWidth: 280 }}>
            <Combobox.Root>
              <Combobox.Input placeholder="Search languages..." />
              <Combobox.Content>
                <Combobox.Group>
                  <Combobox.Label>Frontend</Combobox.Label>
                  <Combobox.Item value="ts">TypeScript</Combobox.Item>
                  <Combobox.Item value="js">JavaScript</Combobox.Item>
                </Combobox.Group>
                <Combobox.Group>
                  <Combobox.Label>Backend</Combobox.Label>
                  <Combobox.Item value="go">Go</Combobox.Item>
                  <Combobox.Item value="rust">Rust</Combobox.Item>
                  <Combobox.Item value="python">Python</Combobox.Item>
                </Combobox.Group>
                <Combobox.Empty>No languages found</Combobox.Empty>
              </Combobox.Content>
            </Combobox.Root>
          </div>

          <SectionTitle stl={{ mt: '$24' }}>Options API</SectionTitle>
          <div style={{ maxWidth: 280 }}>
            <Combobox.Root
              options={FRAMEWORKS}
              value={value}
              onValueChange={setValue}
              placeholder="Pick a framework..."
            />
          </div>
        </StackY>
      </Card.Content>
    </Card>
  )
}
