import { useState } from 'react'
import { Card, Sidebar } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { SectionTitle, StackY, type SectionProps } from './shared'

const SidebarPreview = styled('div', {
  border: '$neutralMin',
  radius: '$4',
  overflow: 'hidden',
  height: '400px',
  display: 'flex',
}, { name: 'SidebarPreview' })

const SidebarMain = styled('div', {
  flex: '1',
  p: '$16',
  bg: '$surface3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$neutral7',
  fontSize: '$small',
}, { name: 'SidebarMain' })

export function SidebarSection({ sectionRef }: SectionProps) {
  const [activeItem, setActiveItem] = useState('dashboard')

  return (
    <Card ref={sectionRef} data-section="Sidebar">
      <Card.Header>
        <Card.Title>Sidebar</Card.Title>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>With groups</SectionTitle>
          <SidebarPreview>
            <Sidebar.Root>
              <Sidebar.Header>
                <strong>My App</strong>
              </Sidebar.Header>
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Main</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem active={activeItem === 'dashboard'} onClick={() => setActiveItem('dashboard')}>Dashboard</Sidebar.MenuItem>
                      <Sidebar.MenuItem active={activeItem === 'analytics'} onClick={() => setActiveItem('analytics')}>Analytics</Sidebar.MenuItem>
                      <Sidebar.MenuItem active={activeItem === 'projects'} onClick={() => setActiveItem('projects')}>Projects</Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Separator />
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem active={activeItem === 'general'} onClick={() => setActiveItem('general')}>General</Sidebar.MenuItem>
                      <Sidebar.MenuItem active={activeItem === 'team'} onClick={() => setActiveItem('team')}>Team</Sidebar.MenuItem>
                      <Sidebar.MenuItem active={activeItem === 'billing'} onClick={() => setActiveItem('billing')}>Billing</Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
              </Sidebar.Content>
              <Sidebar.Footer>
                <Sidebar.Trigger />
              </Sidebar.Footer>
            </Sidebar.Root>
            <SidebarMain>{activeItem}</SidebarMain>
          </SidebarPreview>
        </StackY>
      </Card.Content>
    </Card>
  )
}
