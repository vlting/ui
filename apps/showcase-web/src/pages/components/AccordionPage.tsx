import { Section, DemoCard } from '../../components/Section'
import { Accordion } from '@vlting/ui/components'

export function AccordionPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
        Accordion
      </h1>

      <Section title="Default">
        <DemoCard label="Accordion with 3 items" testId="accordion-default">
          <Accordion.Root type="single" collapsible>
            <Accordion.Item value="item-1">
              <Accordion.Trigger>What is vlt?</Accordion.Trigger>
              <Accordion.Content>
                vlt is a next-generation JavaScript package manager built for speed and security.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2">
              <Accordion.Trigger>How do I install it?</Accordion.Trigger>
              <Accordion.Content>
                You can install vlt globally using npm: npm install -g vlt.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-3">
              <Accordion.Trigger>Is it open source?</Accordion.Trigger>
              <Accordion.Content>
                Yes, vlt is fully open source and licensed under MIT.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </DemoCard>
      </Section>
    </div>
  )
}
