import { useState } from 'react'
import { Card, Pagination } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { SectionTitle, StackY, type SectionProps } from './shared'

const StatusLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StatusLabel' })

export function PaginationSection({ sectionRef }: SectionProps) {
  const [page, setPage] = useState(3)
  const totalPages = 10

  return (
    <Card ref={sectionRef} data-section="Pagination">
      <Card.Header>
        <Card.Title>Pagination</Card.Title>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>Interactive</SectionTitle>
          <Pagination.Root page={page} onPageChange={setPage}>
            <Pagination.Content>
              <Pagination.Previous disabled={page <= 1} />
              {page > 2 && <Pagination.Item value={1} />}
              {page > 3 && <Pagination.Ellipsis />}
              {page > 1 && <Pagination.Item value={page - 1} />}
              <Pagination.Item value={page} />
              {page < totalPages && <Pagination.Item value={page + 1} />}
              {page < totalPages - 2 && <Pagination.Ellipsis />}
              {page < totalPages - 1 && <Pagination.Item value={totalPages} />}
              <Pagination.Next disabled={page >= totalPages} />
            </Pagination.Content>
          </Pagination.Root>
          <StatusLabel>page: {page} / {totalPages}</StatusLabel>

          <SectionTitle stl={{ mt: '$24' }}>Simple</SectionTitle>
          <Pagination.Root defaultPage={1}>
            <Pagination.Content>
              <Pagination.Previous />
              <Pagination.Item value={1} />
              <Pagination.Item value={2} />
              <Pagination.Item value={3} />
              <Pagination.Item value={4} />
              <Pagination.Item value={5} />
              <Pagination.Next />
            </Pagination.Content>
          </Pagination.Root>
        </StackY>
      </Card.Content>
    </Card>
  )
}
