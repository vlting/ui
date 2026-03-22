import { useState } from 'react'
import { Button, Card, Drawer, Item, Separator, Text, ToggleGroup } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ControlRow, SectionTitle, StackY, ButtonRow, type SectionProps } from './shared'

type DrawerDirection = 'left' | 'right' | 'top' | 'bottom'

const ContentArea = styled('div', {
  display: 'flex', flexDirection: 'column', gap: '$8', p: '$16', flex: '1',
}, { name: 'ContentArea' })

export function DrawerSection({ sectionRef }: SectionProps) {
  const [direction, setDirection] = useState<DrawerDirection>('right')
  const [defaultOpen, setDefaultOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  return (
    <Card ref={sectionRef} data-section="Drawer">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Drawer</Card.Title>
        <ControlRow>
          <ToggleGroup
            type="exclusive"
            value={[direction]}
            onValueChange={v => v[0] && setDirection(v[0] as DrawerDirection)}
            aria-label="Drawer direction"
          >
            <Button value="left" size="md" variant="outline" theme="neutral">left</Button>
            <Button value="right" size="md" variant="outline" theme="neutral">right</Button>
            <Button value="top" size="md" variant="outline" theme="neutral">top</Button>
            <Button value="bottom" size="md" variant="outline" theme="neutral">bottom</Button>
          </ToggleGroup>
        </ControlRow>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>Default</SectionTitle>
          <ButtonRow>
            <Drawer.Root direction={direction} open={defaultOpen} onOpenChange={setDefaultOpen}>
              <Button theme="primary" variant="outline" onClick={() => setDefaultOpen(true)}>Open drawer</Button>
              <Drawer.Content>
                <Drawer.Close />
                <Drawer.Header>
                  <Drawer.Title>Account settings</Drawer.Title>
                  <Drawer.Description>Manage your account preferences.</Drawer.Description>
                </Drawer.Header>
                <ContentArea>
                  <Text>Update your personal information, manage security settings, and configure notification preferences from this panel.</Text>
                </ContentArea>
                <Drawer.Footer>
                  <Button theme="neutral" variant="outline" onClick={() => setDefaultOpen(false)}>Cancel</Button>
                  <Button theme="primary" variant="solid" onClick={() => setDefaultOpen(false)}>Save</Button>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
          </ButtonRow>

          <SectionTitle stl={{ mt: '$24' }}>Navigation</SectionTitle>
          <ButtonRow>
            <Drawer.Root direction="left" open={navOpen} onOpenChange={setNavOpen}>
              <Button theme="secondary" variant="outline" onClick={() => setNavOpen(true)}>Open nav</Button>
              <Drawer.Content>
                <Drawer.Close />
                <Drawer.Header>
                  <Drawer.Title>Navigation</Drawer.Title>
                </Drawer.Header>
                <ContentArea>
                  <Item theme="primary" variant="ghost">
                    <Item.Content>
                      <Item.Title>Dashboard</Item.Title>
                      <Item.Description>Overview and metrics</Item.Description>
                    </Item.Content>
                  </Item>
                  <Separator />
                  <Item theme="neutral" variant="ghost">
                    <Item.Content>
                      <Item.Title>Projects</Item.Title>
                      <Item.Description>Manage your projects</Item.Description>
                    </Item.Content>
                  </Item>
                  <Separator />
                  <Item theme="neutral" variant="ghost">
                    <Item.Content>
                      <Item.Title>Team</Item.Title>
                      <Item.Description>Members and roles</Item.Description>
                    </Item.Content>
                  </Item>
                  <Separator />
                  <Item theme="neutral" variant="ghost">
                    <Item.Content>
                      <Item.Title>Settings</Item.Title>
                      <Item.Description>Account preferences</Item.Description>
                    </Item.Content>
                  </Item>
                  <Separator />
                  <Item theme="neutral" variant="ghost">
                    <Item.Content>
                      <Item.Title>Billing</Item.Title>
                      <Item.Description>Plans and invoices</Item.Description>
                    </Item.Content>
                  </Item>
                </ContentArea>
              </Drawer.Content>
            </Drawer.Root>
          </ButtonRow>
        </StackY>
      </Card.Content>
    </Card>
  )
}
