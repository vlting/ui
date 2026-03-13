import { createStub } from '../_stub'

export type BreadcrumbProps = Record<string, any>

export const Breadcrumb = {
  Root: createStub('Breadcrumb.Root', 'nav'),
  Item: createStub('Breadcrumb.Item', 'li'),
  Link: createStub('Breadcrumb.Link', 'a'),
  Page: createStub('Breadcrumb.Page', 'span'),
  Separator: createStub('Breadcrumb.Separator', 'span'),
}
