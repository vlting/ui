import { Item } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { DemoCard, SectionHeading, SectionTitle, StackY, type SectionProps } from './shared'

// ─── Local styled components ────────────────────────────────────────────────

const ItemGroup = styled('div', {
  border: '1px solid $color4',
  borderRadius: '$card',
  overflow: 'hidden',
}, { name: 'ItemGroup' })

const ItemDivider = styled('div', {
  height: '1px',
  bg: '$color3',
}, { name: 'ItemDivider' })

const TrailingLabel = styled('span', {
  fontSize: '$small',
  color: '$neutralText4',
}, { name: 'TrailingLabel' })

// ─── ItemSection ────────────────────────────────────────────────────────────

export function ItemSection({ sectionRef }: SectionProps) {
  return (
    <DemoCard stl={{ mt: '$24' }} ref={sectionRef} data-section="Item">
      <SectionHeading>Item</SectionHeading>
      <StackY stl={{ maxWidth: '480px' }}>

        {/* Default */}
        <SectionTitle>Default</SectionTitle>
        <ItemGroup>
          <Item>
            <Item.Leading>🔒</Item.Leading>
            <Item.Content>
              <Item.Title>Two-factor authentication</Item.Title>
              <Item.Description>Add an extra layer of security</Item.Description>
            </Item.Content>
            <Item.Trailing>
              <TrailingLabel>→</TrailingLabel>
            </Item.Trailing>
          </Item>
          <ItemDivider />
          <Item>
            <Item.Leading>🔑</Item.Leading>
            <Item.Content>
              <Item.Title>Password</Item.Title>
              <Item.Description>Last changed 3 months ago</Item.Description>
            </Item.Content>
            <Item.Trailing>
              <TrailingLabel>→</TrailingLabel>
            </Item.Trailing>
          </Item>
          <ItemDivider />
          <Item>
            <Item.Leading>📱</Item.Leading>
            <Item.Content>
              <Item.Title>Sessions</Item.Title>
              <Item.Description>Manage active sessions</Item.Description>
            </Item.Content>
            <Item.Trailing>
              <TrailingLabel>→</TrailingLabel>
            </Item.Trailing>
          </Item>
        </ItemGroup>

        {/* Interactive */}
        <SectionTitle>Interactive</SectionTitle>
        <ItemGroup>
          <Item interactive>
            <Item.Leading>⚙️</Item.Leading>
            <Item.Content>
              <Item.Title>Account settings</Item.Title>
              <Item.Description>Manage your account preferences</Item.Description>
            </Item.Content>
            <Item.Trailing>
              <TrailingLabel>→</TrailingLabel>
            </Item.Trailing>
          </Item>
          <ItemDivider />
          <Item interactive>
            <Item.Leading>🔔</Item.Leading>
            <Item.Content>
              <Item.Title>Notifications</Item.Title>
              <Item.Description>Configure alerts and updates</Item.Description>
            </Item.Content>
            <Item.Trailing>
              <TrailingLabel>→</TrailingLabel>
            </Item.Trailing>
          </Item>
          <ItemDivider />
          <Item interactive>
            <Item.Leading>🛡️</Item.Leading>
            <Item.Content>
              <Item.Title>Privacy</Item.Title>
              <Item.Description>Control your data and visibility</Item.Description>
            </Item.Content>
            <Item.Trailing>
              <TrailingLabel>→</TrailingLabel>
            </Item.Trailing>
          </Item>
        </ItemGroup>

        {/* Sizes */}
        <SectionTitle>Sizes</SectionTitle>
        {(['sm', 'md', 'lg'] as const).map(size => (
          <ItemGroup key={size}>
            <Item size={size}>
              <Item.Content>
                <Item.Title>First item</Item.Title>
                <Item.Description>Using size {size}</Item.Description>
              </Item.Content>
              <Item.Trailing>
                <TrailingLabel>{size}</TrailingLabel>
              </Item.Trailing>
            </Item>
            <ItemDivider />
            <Item size={size}>
              <Item.Content>
                <Item.Title>Second item</Item.Title>
                <Item.Description>Also size {size}</Item.Description>
              </Item.Content>
              <Item.Trailing>
                <TrailingLabel>{size}</TrailingLabel>
              </Item.Trailing>
            </Item>
          </ItemGroup>
        ))}

        {/* Leading & Trailing */}
        <SectionTitle>Leading & Trailing</SectionTitle>
        <ItemGroup>
          <Item>
            <Item.Leading>📦</Item.Leading>
            <Item.Content>
              <Item.Title>Deployment</Item.Title>
              <Item.Description>Production — us-east-1</Item.Description>
            </Item.Content>
            <Item.Trailing>
              <TrailingLabel>Live</TrailingLabel>
            </Item.Trailing>
          </Item>
          <ItemDivider />
          <Item>
            <Item.Leading>📊</Item.Leading>
            <Item.Content>
              <Item.Title>Analytics</Item.Title>
              <Item.Description>Monthly usage report</Item.Description>
            </Item.Content>
            <Item.Trailing>
              <TrailingLabel>12.4k views</TrailingLabel>
            </Item.Trailing>
          </Item>
          <ItemDivider />
          <Item>
            <Item.Leading>🕐</Item.Leading>
            <Item.Content>
              <Item.Title>Last backup</Item.Title>
              <Item.Description>Automated daily snapshot</Item.Description>
            </Item.Content>
            <Item.Trailing>
              <TrailingLabel>2 hours ago</TrailingLabel>
            </Item.Trailing>
          </Item>
        </ItemGroup>

      </StackY>
    </DemoCard>
  )
}
