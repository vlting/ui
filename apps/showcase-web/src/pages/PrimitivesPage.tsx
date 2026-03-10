import { styled } from '@vlting/stl-react'
import { Section, DemoCard, DemoRow } from '../components/Section'

// Import stl-react primitives
import { Box } from '@vlting/stl-react'
import { Row } from '@vlting/stl-react'
import { Column } from '@vlting/stl-react'
import { Text } from '@vlting/stl-react'
import { Heading } from '@vlting/stl-react'
import { SubHeading } from '@vlting/stl-react'
import { Grid } from '@vlting/stl-react'
import { Pressable } from '@vlting/stl-react'
import { Spacer } from '@vlting/stl-react'
import { Divider } from '@vlting/stl-react'
import { Separator } from '@vlting/stl-react'
import { AspectRatio } from '@vlting/stl-react'

// Import primitives package components
import { Badge as BadgeBase } from '@vlting/ui/primitives'
import { Spinner } from '@vlting/ui/primitives'
import { Skeleton } from '@vlting/ui/primitives'
import { Kbd } from '@vlting/ui/primitives'
import { Label } from '@vlting/ui/primitives'
import type { ComponentType, ReactNode } from 'react'

const Badge = BadgeBase as ComponentType<
  Parameters<typeof BadgeBase>[0] & { children?: ReactNode }
>

export function PrimitivesPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Primitives</h1>

      <Section title="Box">
        <DemoCard label="Basic Box with centered variant">
          <DemoRow>
            <Box css={{ width: '100px', height: '100px', backgroundColor: '$primary3', borderRadius: '$2' }} />
            <Box
              centered
              css={{ width: '100px', height: '100px', backgroundColor: '$primary4', borderRadius: '$2' }}
            >
              <Text>Centered</Text>
            </Box>
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="Row & Column">
        <DemoCard label="Flex layouts">
          <Row css={{ gap: '$2' }}>
            <Box css={{ width: '60px', height: '60px', backgroundColor: '$primary4', borderRadius: '$2' }} />
            <Box css={{ width: '60px', height: '60px', backgroundColor: '$primary5', borderRadius: '$2' }} />
            <Box css={{ width: '60px', height: '60px', backgroundColor: '$primary6', borderRadius: '$2' }} />
          </Row>
          <div style={{ height: 16 }} />
          <Column css={{ gap: '$2' }}>
            <Box css={{ width: '200px', height: '40px', backgroundColor: '$green4', borderRadius: '$2' }} />
            <Box css={{ width: '200px', height: '40px', backgroundColor: '$green5', borderRadius: '$2' }} />
            <Box css={{ width: '200px', height: '40px', backgroundColor: '$green6', borderRadius: '$2' }} />
          </Column>
        </DemoCard>
      </Section>

      <Section title="Grid">
        <DemoCard label="3-column grid">
          <Grid css={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '$3' }}>
            {Array.from({ length: 6 }, (_, i) => (
              <Box key={i} css={{ height: '60px', backgroundColor: '$blue4', borderRadius: '$2' }} />
            ))}
          </Grid>
        </DemoCard>
      </Section>

      <Section title="Text & Heading">
        <DemoCard label="Typography primitives">
          <Heading>Heading Component</Heading>
          <SubHeading>SubHeading Component</SubHeading>
          <Text>Regular Text component for body copy.</Text>
          <Text css={{ fontWeight: '$600', color: '$primary8' }}>Bold colored text</Text>
        </DemoCard>
      </Section>

      <Section title="Pressable">
        <DemoCard label="Interactive element">
          <Pressable
            onClick={() => alert('Pressed!')}
            css={{
              padding: '$3',
              backgroundColor: '$primary6',
              color: '$white',
              borderRadius: '$2',
              cursor: 'pointer',
              display: 'inline-flex',
            }}
          >
            <Text css={{ color: '$white' }}>Press Me</Text>
          </Pressable>
        </DemoCard>
      </Section>

      <Section title="Badge">
        <DemoCard label="Badge variants and sizes">
          <DemoRow>
            <Badge variant="default">Default</Badge>
            <Badge variant="solid">Solid</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="subtle">Subtle</Badge>
          </DemoRow>
          <div style={{ height: 8 }} />
          <DemoRow>
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="Spacer">
        <DemoCard label="Flex spacer">
          <Row css={{ border: '1px dashed $borderColor', padding: '$2' }}>
            <Text>Left</Text>
            <Spacer />
            <Text>Right</Text>
          </Row>
        </DemoCard>
      </Section>

      <Section title="Divider & Separator">
        <DemoCard label="Visual dividers">
          <Text>Content above</Text>
          <Divider />
          <Text>Content between</Text>
          <Separator />
          <Text>Content below</Text>
        </DemoCard>
      </Section>

      <Section title="AspectRatio">
        <DemoCard label="16:9 and 1:1 aspect ratios">
          <DemoRow>
            <div style={{ width: 200 }}>
              <AspectRatio ratio={16 / 9}>
                <Box css={{ width: '100%', height: '100%', backgroundColor: '$purple4', borderRadius: '$2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>16:9</Text>
                </Box>
              </AspectRatio>
            </div>
            <div style={{ width: 100 }}>
              <AspectRatio ratio={1}>
                <Box css={{ width: '100%', height: '100%', backgroundColor: '$orange4', borderRadius: '$2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>1:1</Text>
                </Box>
              </AspectRatio>
            </div>
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="Spinner">
        <DemoCard label="Loading spinners">
          <DemoRow>
            <Spinner />
            <Spinner size="lg" />
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="Skeleton">
        <DemoCard label="Loading skeletons">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 300 }}>
            <Skeleton style={{ width: '100%', height: 16 }} />
            <Skeleton style={{ width: '80%', height: 16 }} />
            <Skeleton style={{ width: '60%', height: 16 }} />
            <Skeleton circle style={{ width: 40, height: 40 }} />
          </div>
        </DemoCard>
      </Section>

      <Section title="Kbd">
        <DemoCard label="Keyboard shortcuts">
          <DemoRow>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
            <span style={{ fontSize: 14 }}>or</span>
            <Kbd>Ctrl</Kbd>
            <span style={{ fontSize: 14 }}>+</span>
            <Kbd>Shift</Kbd>
            <span style={{ fontSize: 14 }}>+</span>
            <Kbd>P</Kbd>
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="Label">
        <DemoCard label="Form labels">
          <Label htmlFor="demo-input">Email Address</Label>
          <input id="demo-input" type="email" placeholder="hello@example.com" style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ddd', marginTop: 4 }} />
        </DemoCard>
      </Section>
    </div>
  )
}
