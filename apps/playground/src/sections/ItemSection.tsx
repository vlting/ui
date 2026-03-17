import { Item } from '@vlting/ui'

import { DemoCard, SectionHeading, SectionTitle, StackY, type SectionProps } from './shared'

export function ItemSection({ sectionRef }: SectionProps) {
  return (
    <DemoCard stl={{ mt: '$24' }} ref={sectionRef} data-section="Item">
      <SectionHeading>Item</SectionHeading>
      <StackY>
        <Item>
          <Item.Leading>📄</Item.Leading>
          <Item.Content>
            <Item.Title>Item title</Item.Title>
            <Item.Description>Description text here</Item.Description>
          </Item.Content>
          <Item.Trailing>→</Item.Trailing>
        </Item>
        <SectionTitle>Interactive</SectionTitle>
        <Item interactive>
          <Item.Content>
            <Item.Title>Clickable item</Item.Title>
            <Item.Description>With hover and focus states</Item.Description>
          </Item.Content>
        </Item>
        <SectionTitle>Sizes</SectionTitle>
        {(['sm', 'md', 'lg'] as const).map(size => (
          <Item key={size} size={size}>
            <Item.Content><Item.Title>Size: {size}</Item.Title></Item.Content>
          </Item>
        ))}
      </StackY>
    </DemoCard>
  )
}
