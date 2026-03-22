import { Breadcrumb, Card } from '@vlting/ui'

import { SectionTitle, StackY, type SectionProps } from './shared'

export function BreadcrumbSection({ sectionRef }: SectionProps) {
  return (
    <Card ref={sectionRef} data-section="Breadcrumb">
      <Card.Header>
        <Card.Title>Breadcrumb</Card.Title>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>Basic</SectionTitle>
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Page>Getting Started</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>

          <SectionTitle stl={{ mt: '$24' }}>With ellipsis</SectionTitle>
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Ellipsis />
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>

          <SectionTitle stl={{ mt: '$24' }}>Custom separator</SectionTitle>
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="#">Products</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator>&gt;</Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="#">Category</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator>&gt;</Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.Page>Item</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </StackY>
      </Card.Content>
    </Card>
  )
}
