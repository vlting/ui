import { createStub } from '../_stub'

export type AccordionRootProps = Record<string, any>
export type AccordionItemProps = Record<string, any>
export type AccordionTriggerProps = Record<string, any>
export type AccordionContentProps = Record<string, any>

export const Accordion = {
  Root: createStub('Accordion.Root', 'div'),
  Item: createStub('Accordion.Item', 'div'),
  Trigger: createStub('Accordion.Trigger', 'button'),
  Content: createStub('Accordion.Content', 'div'),
}
