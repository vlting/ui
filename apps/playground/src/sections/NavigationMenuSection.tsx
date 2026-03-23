import { useState } from 'react'
import { Button, Card, NavigationMenu, Toggle, ToggleGroup } from '@vlting/ui'

import { ControlRow, SectionTitle, StackY, type SectionProps } from './shared'

type NavSize = 'sm' | 'md' | 'lg'

export function NavigationMenuSection({ sectionRef }: SectionProps) {
  const [size, setSize] = useState<NavSize>('md')
  const [showDescriptions, setShowDescriptions] = useState(true)

  return (
    <Card ref={sectionRef} data-section="NavigationMenu">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>NavigationMenu</Card.Title>
        <ControlRow>
          <ToggleGroup
            type="exclusive"
            value={[size]}
            onValueChange={v => v[0] && setSize(v[0] as NavSize)}
            aria-label="Size"
          >
            {(['sm', 'md', 'lg'] as NavSize[]).map(s => (
              <Button key={s} value={s} size="md" variant="outline" theme="neutral">{s}</Button>
            ))}
          </ToggleGroup>
          <Toggle
            size="md"
            variant="outline"
            theme="neutral"
            pressed={showDescriptions}
            onPressedChange={setShowDescriptions}
          >
            descriptions
          </Toggle>
        </ControlRow>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>With structured links</SectionTitle>
          <NavigationMenu.Root size={size}>
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <NavigationMenu.Trigger>Getting started</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  <NavigationMenu.Link href="#">
                    <NavigationMenu.LinkTitle>Introduction</NavigationMenu.LinkTitle>
                    {showDescriptions && (
                      <NavigationMenu.LinkDescription>
                        Overview of the design system and its principles.
                      </NavigationMenu.LinkDescription>
                    )}
                  </NavigationMenu.Link>
                  <NavigationMenu.Link href="#">
                    <NavigationMenu.LinkTitle>Installation</NavigationMenu.LinkTitle>
                    {showDescriptions && (
                      <NavigationMenu.LinkDescription>
                        Step-by-step guide to add the package to your project.
                      </NavigationMenu.LinkDescription>
                    )}
                  </NavigationMenu.Link>
                  <NavigationMenu.Link href="#">
                    <NavigationMenu.LinkTitle>Quick start</NavigationMenu.LinkTitle>
                    {showDescriptions && (
                      <NavigationMenu.LinkDescription>
                        Build your first component in under 5 minutes.
                      </NavigationMenu.LinkDescription>
                    )}
                  </NavigationMenu.Link>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  <NavigationMenu.Link href="#">
                    <NavigationMenu.LinkTitle>Buttons</NavigationMenu.LinkTitle>
                    {showDescriptions && (
                      <NavigationMenu.LinkDescription>
                        Primary, secondary, and ghost button variants.
                      </NavigationMenu.LinkDescription>
                    )}
                  </NavigationMenu.Link>
                  <NavigationMenu.Link href="#">
                    <NavigationMenu.LinkTitle>Inputs</NavigationMenu.LinkTitle>
                    {showDescriptions && (
                      <NavigationMenu.LinkDescription>
                        Text fields, selects, checkboxes, and radio groups.
                      </NavigationMenu.LinkDescription>
                    )}
                  </NavigationMenu.Link>
                  <NavigationMenu.Link href="#">
                    <NavigationMenu.LinkTitle>Cards</NavigationMenu.LinkTitle>
                    {showDescriptions && (
                      <NavigationMenu.LinkDescription>
                        Content containers with header, body, and footer.
                      </NavigationMenu.LinkDescription>
                    )}
                  </NavigationMenu.Link>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="#">Docs</NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="#">Blog</NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </StackY>
      </Card.Content>
    </Card>
  )
}
