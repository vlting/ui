import { createStub } from '../_stub'

export type HoverCardRootProps = Record<string, any>
export type HoverCardContentProps = Record<string, any>

export const HoverCard = {
  Root: createStub('HoverCard.Root', 'div'),
  Trigger: createStub('HoverCard.Trigger', 'div'),
  Content: createStub('HoverCard.Content', 'div'),
}
