import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
} from 'react'
import { Text, XStack, YStack, styled, withStaticProperties } from 'tamagui'

// ─── Context ──────────────────────────────────────────────────────────────────

type AccordionContextValue = {
  type: 'single' | 'multiple'
  openItems: string[]
  toggleItem: (itemValue: string) => void
  keepMounted: boolean
  registerHeader: (value: string, el: HTMLElement | null) => void
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

function useAccordionContext() {
  const ctx = useContext(AccordionContext)
  if (!ctx) throw new Error('Accordion sub-components must be used within Accordion')
  return ctx
}

// ─── Item context ─────────────────────────────────────────────────────────────

type AccordionItemContextValue = {
  itemValue: string
  isOpen: boolean
  disabled: boolean
  headerId: string
  contentId: string
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null)

function useAccordionItemContext() {
  const ctx = useContext(AccordionItemContext)
  if (!ctx) throw new Error('AccordionHeader/Content must be used within Accordion.Item')
  return ctx
}

// ─── Item ─────────────────────────────────────────────────────────────────────

const ItemFrame = styled(YStack, {
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  } as const,
})

function AccordionItem({
  value: itemValue,
  disabled = false,
  children,
  testID,
}: {
  value: string
  disabled?: boolean
  children?: React.ReactNode
  testID?: string
}) {
  const { openItems } = useAccordionContext()
  const isOpen = openItems.includes(itemValue)
  const id = useId()
  const headerId = `${id}-header`
  const contentId = `${id}-content`

  return (
    <AccordionItemContext.Provider value={{ itemValue, isOpen, disabled, headerId, contentId }}>
      <ItemFrame disabled={disabled} testID={testID}>
        {children}
      </ItemFrame>
    </AccordionItemContext.Provider>
  )
}

// ─── Header (trigger) ─────────────────────────────────────────────────────────

const HeaderFrame = styled(XStack, {
  paddingHorizontal: '$4',
  paddingVertical: '$3',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  cursor: 'pointer',
  backgroundColor: '$background',

  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },

  focusStyle: {
    outlineColor: '$outlineColor',
    outlineWidth: 2,
    outlineStyle: 'solid',
  },
})

function AccordionHeader({
  children,
  testID,
}: {
  children?: React.ReactNode
  testID?: string
}) {
  const { toggleItem, registerHeader } = useAccordionContext()
  const { itemValue, isOpen, disabled, headerId, contentId } = useAccordionItemContext()

  const handlePress = useCallback(() => {
    if (!disabled) toggleItem(itemValue)
  }, [disabled, toggleItem, itemValue])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handlePress()
      }
    },
    [handlePress],
  )

  return (
    <HeaderFrame
      accessible
      role="button"
      id={headerId}
      aria-expanded={isOpen}
      aria-controls={contentId}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onPress={handlePress}
      onKeyDown={handleKeyDown}
      testID={testID}
    >
      <Text fontSize="$3" fontWeight="500" color="$color" flex={1}>
        {children}
      </Text>
      <Text
        aria-hidden="true"
        fontSize="$3"
        color="$colorSubtitle"
        style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
      >
        ▾
      </Text>
    </HeaderFrame>
  )
}

// ─── Content ─────────────────────────────────────────────────────────────────

const ContentFrame = styled(YStack, {
  paddingHorizontal: '$4',
  paddingVertical: '$3',
  backgroundColor: '$background',
})

function AccordionContent({
  children,
  testID,
}: {
  children?: React.ReactNode
  testID?: string
}) {
  const { keepMounted } = useAccordionContext()
  const { isOpen, headerId, contentId } = useAccordionItemContext()

  if (!isOpen && !keepMounted) return null

  return (
    <ContentFrame
      accessible
      role="region"
      id={contentId}
      aria-labelledby={headerId}
      display={isOpen ? 'flex' : 'none'}
      testID={testID}
    >
      {children}
    </ContentFrame>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

export type AccordionProps = {
  /** Single or multiple open panels */
  type?: 'single' | 'multiple'
  /** Controlled open items */
  value?: string[]
  /** Default open items for uncontrolled */
  defaultValue?: string[]
  /** Callback when open items change */
  onValueChange?: (value: string[]) => void
  /** Whether to keep unmounted panels in the DOM */
  keepMounted?: boolean
  children?: React.ReactNode
  testID?: string
}

// ─── Root ─────────────────────────────────────────────────────────────────────

const AccordionRoot = memo(function AccordionRoot({
  type = 'single',
  value: valueProp,
  defaultValue = [],
  onValueChange,
  keepMounted = false,
  children,
  testID,
}: AccordionProps) {
  const isControlled = valueProp !== undefined
  const [internalOpen, setInternalOpen] = useState<string[]>(defaultValue)
  const openItems = isControlled ? (valueProp ?? []) : internalOpen
  const headerRefs = useRef<Record<string, HTMLElement | null>>({})

  const toggleItem = useCallback(
    (itemValue: string) => {
      let next: string[]
      if (type === 'single') {
        next = openItems.includes(itemValue) ? [] : [itemValue]
      } else {
        next = openItems.includes(itemValue)
          ? openItems.filter((v) => v !== itemValue)
          : [...openItems, itemValue]
      }
      if (!isControlled) setInternalOpen(next)
      onValueChange?.(next)
    },
    [type, openItems, isControlled, onValueChange],
  )

  const registerHeader = useCallback(
    (value: string, el: HTMLElement | null) => {
      headerRefs.current[value] = el
    },
    [],
  )

  return (
    <AccordionContext.Provider value={{ type, openItems, toggleItem, keepMounted, registerHeader }}>
      <YStack
        testID={testID}
        borderTopWidth={1}
        borderTopColor="$borderColor"
        borderRadius="$2"
        overflow="hidden"
      >
        {children}
      </YStack>
    </AccordionContext.Provider>
  )
})

// ─── Export ──────────────────────────────────────────────────────────────────

export const Accordion = withStaticProperties(AccordionRoot, {
  Item: AccordionItem,
  Header: AccordionHeader,
  Content: AccordionContent,
})
