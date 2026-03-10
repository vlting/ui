import React, { createContext, useContext, useState, useCallback } from "react"
import {
  View,
  Text as RNText,
  Pressable,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native"
import type { ViewStyle } from "react-native"
import { styled } from "../../stl-native/src/config/styled"

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const AccordionFrame = styled(
  View,
  {
    borderWidth: 1,
    borderColor: "$borderColor",
    borderRadius: "$3",
    overflow: "hidden",
  },
  "Accordion",
)

const AccordionItemFrame = styled(
  View,
  {
    borderBottomWidth: 1,
    borderColor: "$borderColor",
  },
  "AccordionItem",
)

const AccordionTriggerFrame = styled(
  Pressable,
  {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "$background",
    pressed: { opacity: 0.85 },
  },
  "AccordionTrigger",
)

const AccordionTriggerTextFrame = styled(
  RNText,
  {
    fontSize: 14,
    fontWeight: "500",
    color: "$defaultBody",
    flex: 1,
  },
  "AccordionTriggerText",
)

const AccordionContentFrame = styled(
  View,
  {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "$color1",
  },
  "AccordionContent",
)

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface AccordionContextValue {
  type: "single" | "multiple"
  expandedValues: Set<string>
  toggle: (value: string) => void
}

const AccordionContext = createContext<AccordionContextValue>({
  type: "single",
  expandedValues: new Set(),
  toggle: () => {},
})

interface AccordionItemContextValue {
  value: string
  isExpanded: boolean
}

const AccordionItemContext = createContext<AccordionItemContextValue>({
  value: "",
  isExpanded: false,
})

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export interface AccordionRootProps {
  children: React.ReactNode
  type?: "single" | "multiple"
  defaultValue?: string[]
  style?: ViewStyle
}

function AccordionRoot({
  children,
  type = "single",
  defaultValue = [],
  style,
}: AccordionRootProps) {
  const [expandedValues, setExpandedValues] = useState<Set<string>>(
    () => new Set(defaultValue),
  )

  const toggle = useCallback(
    (value: string) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setExpandedValues((prev) => {
        const next = new Set(prev)
        if (next.has(value)) {
          next.delete(value)
        } else {
          if (type === "single") next.clear()
          next.add(value)
        }
        return next
      })
    },
    [type],
  )

  return (
    <AccordionContext.Provider value={{ type, expandedValues, toggle }}>
      <AccordionFrame style={style}>{children}</AccordionFrame>
    </AccordionContext.Provider>
  )
}

function AccordionItem({
  children,
  value,
  style,
}: {
  children?: React.ReactNode
  value: string
  style?: ViewStyle
}) {
  const { expandedValues } = useContext(AccordionContext)
  const isExpanded = expandedValues.has(value)
  return (
    <AccordionItemContext.Provider value={{ value, isExpanded }}>
      <AccordionItemFrame style={style}>{children}</AccordionItemFrame>
    </AccordionItemContext.Provider>
  )
}

function AccordionTrigger({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  const { toggle } = useContext(AccordionContext)
  const { value, isExpanded } = useContext(AccordionItemContext)
  return (
    <AccordionTriggerFrame
      onPress={() => toggle(value)}
      style={style}
      accessibilityRole="button"
      accessibilityState={{ expanded: isExpanded }}
    >
      {typeof children === "string" ? (
        <AccordionTriggerTextFrame>{children}</AccordionTriggerTextFrame>
      ) : (
        children
      )}
      <RNText style={{ fontSize: 12, color: "$color3" }}>
        {isExpanded ? "▲" : "▼"}
      </RNText>
    </AccordionTriggerFrame>
  )
}

function AccordionContent({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  const { isExpanded } = useContext(AccordionItemContext)
  if (!isExpanded) return null
  return <AccordionContentFrame style={style}>{children}</AccordionContentFrame>
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
})
