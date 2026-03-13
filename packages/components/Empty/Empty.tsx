import { createStub } from '../_stub'

export type EmptyRootProps = Record<string, any>
export type EmptyTitleProps = Record<string, any>
export type EmptyDescriptionProps = Record<string, any>
export type EmptyMediaProps = Record<string, any>
export type EmptyActionProps = Record<string, any>

export const Empty = {
  Root: createStub('Empty.Root', 'div'),
  Media: createStub('Empty.Media', 'div'),
  Title: createStub('Empty.Title', 'h3'),
  Description: createStub('Empty.Description', 'p'),
  Action: createStub('Empty.Action', 'div'),
}
