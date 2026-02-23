import React from 'react'
import type { ComponentType } from 'react'
import { Text, styled } from 'tamagui'
import { Accordion as TamaguiAccordion } from '@tamagui/accordion'

// Cast for JSX usage — Tamagui v2 RC GetFinalProps bug
const TamaguiAccordionJsx = TamaguiAccordion as ComponentType<Record<string, unknown>>
const TamaguiAccordionItemJsx = TamaguiAccordion.Item as ComponentType<Record<string, unknown>>
const TamaguiAccordionHeaderJsx = TamaguiAccordion.Header as ComponentType<Record<string, unknown>>
const TamaguiAccordionTriggerJsx = TamaguiAccordion.Trigger as ComponentType<Record<string, unknown>>
const TamaguiAccordionContentJsx = TamaguiAccordion.Content as ComponentType<Record<string, unknown>>

// @ts-expect-error Tamagui v2 RC
const TriggerText = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$3',
  fontSize: '$4',
  color: '$color',
  flex: 1,
})

export interface AccordionRootProps {
  children: React.ReactNode
  type?: 'single' | 'multiple'
  defaultValue?: string[]
  collapsible?: boolean
}

function Root({
  children,
  type = 'single',
  defaultValue = [],
  collapsible = true,
}: AccordionRootProps) {
  if (type === 'multiple') {
    return (
      <TamaguiAccordionJsx
        type="multiple"
        defaultValue={defaultValue}
        width="100%"
      >
        {children}
      </TamaguiAccordionJsx>
    )
  }

  return (
    <TamaguiAccordionJsx
      type="single"
      defaultValue={defaultValue[0] || ''}
      collapsible={collapsible}
      width="100%"
    >
      {children}
    </TamaguiAccordionJsx>
  )
}

export interface AccordionItemProps {
  children: React.ReactNode
  value: string
}

function Item({ children, value }: AccordionItemProps) {
  return (
    <TamaguiAccordionItemJsx
      value={value}
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
    >
      {children}
    </TamaguiAccordionItemJsx>
  )
}

export interface AccordionTriggerProps {
  children: React.ReactNode
}

function Trigger({ children }: AccordionTriggerProps) {
  return (
    <TamaguiAccordionHeaderJsx unstyled>
      <TamaguiAccordionTriggerJsx
        unstyled
        width="100%"
        paddingVertical="$3"
        paddingHorizontal="$1"
        cursor="pointer"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        hoverStyle={{ backgroundColor: '$backgroundHover' }}
      >
        {({ open }: { open: boolean }) => (
          <>
            {/* @ts-expect-error Tamagui v2 RC */}
            <TriggerText>{children}</TriggerText>
            <Text color="$colorSubtitle" fontSize="$3">
              {open ? '\u2212' : '+'}
            </Text>
          </>
        )}
      </TamaguiAccordionTriggerJsx>
    </TamaguiAccordionHeaderJsx>
  )
}

export interface AccordionContentProps {
  children: React.ReactNode
}

function Content({ children }: AccordionContentProps) {
  return (
    <TamaguiAccordionContentJsx
      unstyled
      paddingBottom="$3"
      paddingHorizontal="$1"
    >
      {children}
    </TamaguiAccordionContentJsx>
  )
}

export const Accordion = { Root, Item, Trigger, Content }
