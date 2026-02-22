import React, { createContext, useContext, useState, useCallback } from 'react'
import { styled, Text, YStack, XStack } from 'tamagui'

interface AccordionContextValue {
  value: string[]
  toggle: (itemValue: string) => void
  type: 'single' | 'multiple'
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

function useAccordionContext() {
  const ctx = useContext(AccordionContext)
  if (!ctx) throw new Error('Accordion components must be used within Accordion.Root')
  return ctx
}

// @ts-expect-error Tamagui v2 RC
const AccordionFrame = styled(YStack, {
  width: '100%',
})

// @ts-expect-error Tamagui v2 RC
const ItemFrame = styled(YStack, {
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
})

// @ts-expect-error Tamagui v2 RC
const TriggerFrame = styled(XStack, {
  paddingVertical: '$3',
  paddingHorizontal: '$1',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'space-between',
  hoverStyle: { backgroundColor: '$backgroundHover' },
})

// @ts-expect-error Tamagui v2 RC
const TriggerText = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$3',
  fontSize: '$4',
  color: '$color',
  flex: 1,
})

// @ts-expect-error Tamagui v2 RC
const ContentFrame = styled(YStack, {
  paddingBottom: '$3',
  paddingHorizontal: '$1',
  overflow: 'hidden',
})

export interface AccordionRootProps {
  children: React.ReactNode
  type?: 'single' | 'multiple'
  defaultValue?: string[]
  collapsible?: boolean
}

function Root({ children, type = 'single', defaultValue = [], collapsible = true }: AccordionRootProps) {
  const [value, setValue] = useState<string[]>(defaultValue)

  const toggle = useCallback((itemValue: string) => {
    setValue(prev => {
      const isOpen = prev.includes(itemValue)
      if (isOpen) {
        return collapsible ? prev.filter(v => v !== itemValue) : prev
      }
      if (type === 'single') return [itemValue]
      return [...prev, itemValue]
    })
  }, [type, collapsible])

  return (
    <AccordionContext.Provider value={{ value, toggle, type }}>
      {/* @ts-expect-error Tamagui v2 RC */}
      <AccordionFrame>
        {children}
      </AccordionFrame>
    </AccordionContext.Provider>
  )
}

interface ItemContextValue {
  value: string
  isOpen: boolean
}

const ItemContext = createContext<ItemContextValue | null>(null)

function useItemContext() {
  const ctx = useContext(ItemContext)
  if (!ctx) throw new Error('Accordion.Trigger/Content must be used within Accordion.Item')
  return ctx
}

export interface AccordionItemProps {
  children: React.ReactNode
  value: string
}

function Item({ children, value: itemValue }: AccordionItemProps) {
  const { value } = useAccordionContext()
  const isOpen = value.includes(itemValue)

  return (
    <ItemContext.Provider value={{ value: itemValue, isOpen }}>
      {/* @ts-expect-error Tamagui v2 RC */}
      <ItemFrame>
        {children}
      </ItemFrame>
    </ItemContext.Provider>
  )
}

export interface AccordionTriggerProps {
  children: React.ReactNode
}

function Trigger({ children }: AccordionTriggerProps) {
  const { toggle } = useAccordionContext()
  const { value, isOpen } = useItemContext()

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={() => toggle(value)}
      style={{ all: 'unset', width: '100%', display: 'block' }}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <TriggerFrame>
        {/* @ts-expect-error Tamagui v2 RC */}
        <TriggerText>{children}</TriggerText>
        <Text color="$colorSubtitle" fontSize="$3">
          {isOpen ? '\u2212' : '+'}
        </Text>
      </TriggerFrame>
    </button>
  )
}

export interface AccordionContentProps {
  children: React.ReactNode
}

function Content({ children }: AccordionContentProps) {
  const { isOpen } = useItemContext()
  if (!isOpen) return null

  return (
    // @ts-expect-error Tamagui v2 RC
    <ContentFrame role="region">
      {children}
    </ContentFrame>
  )
}

export const Accordion = { Root, Item, Trigger, Content }
