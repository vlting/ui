import React, { useState, useCallback, useRef, useEffect } from "react"
import {
  View,
  Text as RNText,
  Pressable,
  Modal,
} from "react-native"
import type { ViewStyle, LayoutRectangle } from "react-native"
import { styled } from "../../stl-native/src/config/styled"

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const TooltipContentFrame = styled(
  View,
  {
    backgroundColor: "$defaultBody",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: "$3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    maxWidth: 240,
  },
  "TooltipContent",
)

const TooltipTextFrame = styled(
  RNText,
  {
    fontSize: 12,
    color: "$color1",
  },
  "TooltipText",
)

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface TooltipProps {
  children: React.ReactNode
  content: string
  delay?: number
  dismissDelay?: number
  style?: ViewStyle
}

export function Tooltip({
  children,
  content,
  delay = 0,
  dismissDelay = 2000,
  style,
}: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null)
  const triggerRef = useRef<View>(null)
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = useCallback(() => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height })
      setVisible(true)
    })
  }, [])

  const hide = useCallback(() => {
    setVisible(false)
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current)
      dismissTimer.current = null
    }
  }, [])

  useEffect(() => {
    if (visible && dismissDelay > 0) {
      dismissTimer.current = setTimeout(hide, dismissDelay)
    }
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current)
    }
  }, [visible, dismissDelay, hide])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current)
    }
  }, [])

  return (
    <>
      <Pressable
        ref={triggerRef}
        onLongPress={show}
        delayLongPress={delay || 500}
        style={style}
        accessibilityRole="button"
      >
        {children}
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={hide}
        statusBarTranslucent
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={hide}
          accessibilityRole="none"
        >
          {triggerLayout && (
            <TooltipContentFrame
              style={{
                position: "absolute",
                left: triggerLayout.x + triggerLayout.width / 2 - 60,
                top: triggerLayout.y - 40,
              }}
            >
              <TooltipTextFrame>{content}</TooltipTextFrame>
            </TooltipContentFrame>
          )}
        </Pressable>
      </Modal>
    </>
  )
}
