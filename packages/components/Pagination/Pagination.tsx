import { createStub } from '../_stub'

export type PaginationProps = Record<string, any>

export const Pagination = {
  Root: createStub('Pagination.Root', 'nav'),
  Previous: createStub('Pagination.Previous', 'button'),
  Next: createStub('Pagination.Next', 'button'),
  Item: createStub('Pagination.Item', 'button'),
  Ellipsis: createStub('Pagination.Ellipsis', 'span'),
}
