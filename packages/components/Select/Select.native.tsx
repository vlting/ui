import React, { createContext, useContext, useState, useCallback } from "react"
import {
  View,
  Text as RNText,
  Pressable,
  Modal,
  FlatList,
} from "react-native"
import type { ViewStyle } from "react-native"
import { styled } from "../../stl-native/src/config/styled"

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const SelectTriggerFrame = styled(
  Pressable,
  {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "$borderColor",
    borderRadius: "$3",
    backgroundColor: "$background",
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 40,
    pressed: { opacity: 0.85 },
  },
  "SelectTrigger",
)

const SelectOverlayFrame = styled(
  View,
  {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  "SelectOverlay",
)

const SelectContentFrame = styled(
  View,
  {
    backgroundColor: "$background",
    borderRadius: "$3",
    width: "85%",
    maxHeight: "60%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    paddingVertical: 8,
  },
  "SelectContent",
)

const SelectItemFrame = styled(
  Pressable,
  {
    paddingHorizontal: 16,
    paddingVertical: 12,
    pressed: { opacity: 0.85 },
  },
  {
    selected: {
      true: { backgroundColor: "$color3" },
    },
  },
  "SelectItem",
)

const SelectLabelFrame = styled(
  RNText,
  {
    fontSize: 12,
    fontWeight: "600",
    color: "$color3",
    paddingHorizontal: 16,
    paddingVertical: 6,
    textTransform: "uppercase",
  },
  "SelectLabel",
)

const SelectSeparatorFrame = styled(
  View,
  {
    height: 1,
    backgroundColor: "$borderColor",
    marginVertical: 4,
    marginHorizontal: 16,
  },
  "SelectSeparator",
)

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface SelectContextValue {
  value: string | undefined
  onValueChange: (value: string) => void
  onClose: () => void
}

const SelectContext = createContext<SelectContextValue>({
  value: undefined,
  onValueChange: () => {},
  onClose: () => {},
})

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export interface SelectProps {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  style?: ViewStyle
}

function SelectRoot({
  children,
  value: controlledValue,
  defaultValue,
  onValueChange: onValueChangeProp,
  placeholder = "Select...",
  style,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [isOpen, setIsOpen] = useState(false)

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const onValueChange = useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v)
      onValueChangeProp?.(v)
      setIsOpen(false)
    },
    [isControlled, onValueChangeProp],
  )

  const onClose = useCallback(() => setIsOpen(false), [])

  // Separate trigger children from item children
  const triggerChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && (child as React.ReactElement<any>).type === SelectValue,
  )

  const menuChildren = React.Children.toArray(children).filter(
    (child) => !React.isValidElement(child) || (child as React.ReactElement<any>).type !== SelectValue,
  )

  return (
    <SelectContext.Provider value={{ value, onValueChange, onClose }}>
      <SelectTriggerFrame
        onPress={() => setIsOpen(true)}
        style={style}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        {triggerChild ?? (
          <RNText style={{ fontSize: 14, color: value ? undefined : "$color3" }}>
            {value ?? placeholder}
          </RNText>
        )}
        <RNText style={{ fontSize: 12, color: "$color3" }}>▾</RNText>
      </SelectTriggerFrame>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={onClose}
        statusBarTranslucent
      >
        <SelectOverlayFrame>
          <Pressable
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            onPress={onClose}
            accessibilityRole="none"
          />
          <SelectContentFrame>
            {menuChildren}
          </SelectContentFrame>
        </SelectOverlayFrame>
      </Modal>
    </SelectContext.Provider>
  )
}

function SelectValue({
  placeholder = "Select...",
  style,
}: {
  placeholder?: string
  style?: ViewStyle
}) {
  const { value } = useContext(SelectContext)
  return (
    <RNText style={[{ fontSize: 14, color: "$defaultBody" }, style]}>
      {value ?? placeholder}
    </RNText>
  )
}

function SelectItem({
  children,
  value: itemValue,
  style,
}: {
  children?: React.ReactNode
  value: string
  style?: ViewStyle
}) {
  const { value, onValueChange } = useContext(SelectContext)
  const isSelected = value === itemValue
  return (
    <SelectItemFrame
      onPress={() => onValueChange(itemValue)}
      selected={isSelected}
      style={style}
      accessibilityRole="menuitem"
      accessibilityState={{ selected: isSelected }}
    >
      {typeof children === "string" ? (
        <RNText style={{ fontSize: 14, color: "$defaultBody" }}>{children}</RNText>
      ) : (
        children
      )}
    </SelectItemFrame>
  )
}

function SelectGroup({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return <View style={style}>{children}</View>
}

function SelectLabel({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return <SelectLabelFrame style={style}>{children}</SelectLabelFrame>
}

function SelectSeparator({ style }: { style?: ViewStyle }) {
  return <SelectSeparatorFrame style={style} />
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const Select = Object.assign(SelectRoot, {
  Item: SelectItem,
  Value: SelectValue,
  Group: SelectGroup,
  Label: SelectLabel,
  Separator: SelectSeparator,
})
