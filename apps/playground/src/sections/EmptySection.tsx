import { Button, Card, Empty } from '@vlting/ui'

import { type SectionProps } from './shared'

export function EmptySection({ sectionRef }: SectionProps) {
  return (
    <Card ref={sectionRef} data-section="Empty" stl={{ mt: '$24' }}>
      <Card.Header>
        <Card.Title>Empty</Card.Title>
      </Card.Header>
      <Card.Content>
        <Empty.Root>
          <Empty.Media>
            <svg width={48} height={48} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" />
            </svg>
          </Empty.Media>
          <Empty.Title>No results found</Empty.Title>
          <Empty.Description>
            Try adjusting your search or filters to find what you are looking for.
          </Empty.Description>
          <Empty.Action>
            <Button theme="primary" variant="solid" size="sm">Reset filters</Button>
          </Empty.Action>
        </Empty.Root>
      </Card.Content>
    </Card>
  )
}
