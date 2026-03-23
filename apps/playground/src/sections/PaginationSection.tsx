import { useState } from 'react'
import { Card, Pagination } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { SectionTitle, StackY, type SectionProps } from './shared'

const StatusLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StatusLabel' })

/**
 * Compute a fixed-width sliding window of page numbers.
 * Always returns exactly `windowSize` slots (numbers or null for ellipsis).
 */
function getPageWindow(page: number, total: number, windowSize = 5): (number | '...')[] {
  if (total <= windowSize) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const half = Math.floor(windowSize / 2)
  let start = Math.max(1, page - half)
  const end = Math.min(total, start + windowSize - 1)
  if (end - start + 1 < windowSize) {
    start = end - windowSize + 1
  }

  const items: (number | '...')[] = []
  for (let i = start; i <= end; i++) {
    items.push(i)
  }
  // Show first page + ellipsis if window doesn't start at 1
  if (start > 2) {
    items[0] = 1
    items[1] = '...'
  } else if (start === 2) {
    items.unshift(1)
    items.pop() // keep length equal when we can show 1 directly
  }
  // Show last page + ellipsis if window doesn't reach end
  if (end < total - 1) {
    items[items.length - 2] = '...'
    items[items.length - 1] = total
  } else if (end === total - 1) {
    items.push(total)
    items.shift() // keep length equal when we can show last directly
  }
  return items
}

export function PaginationSection({ sectionRef }: SectionProps) {
  const [page, setPage] = useState(3)
  const totalPages = 10
  const window = getPageWindow(page, totalPages, 7)

  return (
    <Card ref={sectionRef} data-section="Pagination">
      <Card.Header>
        <Card.Title>Pagination</Card.Title>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>Interactive</SectionTitle>
          <Pagination.Root page={page} totalPages={totalPages} onPageChange={setPage}>
            <Pagination.Content>
              <Pagination.Previous />
              {window.map((item, i) =>
                item === '...'
                  ? <Pagination.Ellipsis key={`e-${i}`} />
                  : <Pagination.Item key={item} value={item} />,
              )}
              <Pagination.Next />
            </Pagination.Content>
          </Pagination.Root>
          <StatusLabel>page: {page} / {totalPages}</StatusLabel>

          <SectionTitle stl={{ mt: '$24' }}>Simple</SectionTitle>
          <Pagination.Root defaultPage={1} totalPages={5}>
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
