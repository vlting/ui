import type React from 'react'
import { createContext, useCallback, useContext, useId, useRef, useState } from 'react'
import { styled } from '../../stl-react/src/config'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const ItemFrame = styled("div", {
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "$borderColor",
}, "AccordionItem")

const TriggerButton = styled("button", {
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 0",
  cursor: "pointer",
  backgroundColor: "transparent",
  border: "none",
  fontFamily: "$body",
  fontWeight: "$500",
  fontSize: "$p",
  color: "$defaultBody",
  textAlign: "left",
  outline: "none",
}, "AccordionTrigger")

// --- Context ---

interface AccordionContextValue {
  type: 'single' | 'multiple'
  collapsible: boolean
  expandedValues: string[]
  toggle: (value: string) => void
}

const AccordionContext = createContext<AccordionContextValue>({
  type: 'single',
  collapsible: true,
  expandedValues: [],
  toggle: () => {},
})

interface AccordionItemContextValue {
  value: string
  isOpen: boolean
  contentId: string
  triggerId: string
}

const AccordionItemContext = createContext<AccordionItemContextValue>({
  value: '',
  isOpen: false,
  contentId: '',
  triggerId: '',
})

// --- Components ---

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
  const [expandedValues, setExpandedValues] = useState<string[]>(defaultValue)

  const toggle = useCallback((value: string) => {
    setExpandedValues((prev) => {
      const isExpanded = prev.includes(value)
      if (type === 'single') {
        if (isExpanded && collapsible) return []
        if (isExpanded) return prev
        return [value]
      }
      return isExpanded ? prev.filter((v) => v !== value) : [...prev, value]
    })
  }, [type, collapsible])

  return (
    <AccordionContext.Provider value={{ type, collapsible, expandedValues, toggle }}>
      <div style={{ width: '100%' }}>{children}</div>
    </AccordionContext.Provider>
  )
}

export interface AccordionItemProps {
  children: React.ReactNode
  value: string
}

function Item({ children, value }: AccordionItemProps) {
  const { expandedValues } = useContext(AccordionContext)
  const id = useId()
  const isOpen = expandedValues.includes(value)

  return (
    <AccordionItemContext.Provider value={{
      value,
      isOpen,
      contentId: `${id}-content`,
      triggerId: `${id}-trigger`,
    }}>
      <ItemFrame>{children}</ItemFrame>
    </AccordionItemContext.Provider>
  )
}

export interface AccordionTriggerProps {
  children: React.ReactNode
}

function Trigger({ children }: AccordionTriggerProps) {
  const { toggle } = useContext(AccordionContext)
  const { value, isOpen, contentId, triggerId } = useContext(AccordionItemContext)
  const reducedMotion = useReducedMotion()

  return (
    <TriggerButton
      id={triggerId}
      onClick={() => toggle(value)}
      aria-expanded={isOpen}
      aria-controls={contentId}
    >
      <span style={{ flex: 1 }}>{children}</span>
      <span
        style={{
          fontSize: '12px',
          opacity: 0.5,
          transition: reducedMotion ? 'none' : 'transform 150ms ease-in-out',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
        ▾
      </span>
    </TriggerButton>
  )
}

export interface AccordionContentProps {
  children: React.ReactNode
}

function Content({ children }: AccordionContentProps) {
  const { isOpen, contentId, triggerId } = useContext(AccordionItemContext)
  const reducedMotion = useReducedMotion()
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      ref={contentRef}
      style={{
        overflow: 'hidden',
        maxHeight: isOpen ? '9999px' : '0',
        transition: reducedMotion ? 'none' : 'max-height 200ms ease-in-out',
        paddingBottom: isOpen ? '12px' : '0',
      }}
    >
      {children}
    </div>
  )
}

export const Accordion = { Root, Item, Trigger, Content }
