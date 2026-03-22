import { Card, NavigationMenu } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { SectionTitle, StackY, type SectionProps } from './shared'

const DemoArea = styled('div', {
  minHeight: '200px',
}, { name: 'NavMenuDemoArea' })

export function NavigationMenuSection({ sectionRef }: SectionProps) {
  return (
    <Card ref={sectionRef} data-section="NavigationMenu">
      <Card.Header>
        <Card.Title>NavigationMenu</Card.Title>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>With dropdowns</SectionTitle>
          <DemoArea>
            <NavigationMenu.Root>
              <NavigationMenu.List>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger>Getting started</NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <NavigationMenu.Link href="#">Introduction</NavigationMenu.Link>
                    <NavigationMenu.Link href="#">Installation</NavigationMenu.Link>
                    <NavigationMenu.Link href="#">Quick start</NavigationMenu.Link>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <NavigationMenu.Link href="#">Buttons</NavigationMenu.Link>
                    <NavigationMenu.Link href="#">Inputs</NavigationMenu.Link>
                    <NavigationMenu.Link href="#">Cards</NavigationMenu.Link>
                    <NavigationMenu.Link href="#">Dialogs</NavigationMenu.Link>
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
          </DemoArea>
        </StackY>
      </Card.Content>
    </Card>
  )
}
