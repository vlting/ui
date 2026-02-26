import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import React, { useCallback, useRef, useState } from 'react'
import { View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC

const HiddenInput = styledHtml('input', {
  position: 'absolute',
  opacity: 0,
  width: 1,
  height: 1,
  overflow: 'hidden',
} as any)

const HiddenInputJsx = HiddenInput as AnyFC

export interface InputOTPRootProps {
  children: React.ReactNode
  maxLength?: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  disabled?: boolean
  pattern?: string
}

export interface InputOTPSlotProps {
  index: number
}

const InputOTPContext = React.createContext<{
  value: string
  activeIndex: number
  maxLength: number
  focus: () => void
}>({
  value: '',
  activeIndex: -1,
  maxLength: 6,
  focus: () => {},
})

function Root({
  children,
  maxLength = 6,
  value: controlledValue,
  onChange,
  onComplete,
  disabled,
  pattern,
}: InputOTPRootProps) {
  const [internalValue, setInternalValue] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const value = controlledValue ?? internalValue
  const regex = pattern ? new RegExp(pattern) : null

  const handleChange = useCallback(
    (e: any) => {
      let newValue = e.target.value.slice(0, maxLength)
      if (regex) {
        newValue = newValue
          .split('')
          .filter((ch: string) => regex.test(ch))
          .join('')
      }
      setInternalValue(newValue)
      onChange?.(newValue)
      setActiveIndex(Math.min(newValue.length, maxLength - 1))
      if (newValue.length === maxLength) {
        onComplete?.(newValue)
      }
    },
    [maxLength, onChange, onComplete, regex],
  )

  const focus = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const handleFocus = useCallback(() => {
    setActiveIndex(Math.min(value.length, maxLength - 1))
  }, [value.length, maxLength])

  const handleBlur = useCallback(() => {
    setActiveIndex(-1)
  }, [])

  return (
    <InputOTPContext.Provider value={{ value, activeIndex, maxLength, focus }}>
      <ViewJsx
        position="relative"
        display="inline-flex"
        flexDirection="row"
        alignItems="center"
      >
        <HiddenInputJsx
          ref={inputRef}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={maxLength}
          disabled={disabled || undefined}
          aria-label={`Enter ${maxLength}-digit code`}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        />
        <ViewJsx flexDirection="row" alignItems="center" onPress={focus} cursor="text">
          {children}
        </ViewJsx>
      </ViewJsx>
    </InputOTPContext.Provider>
  )
}

function Group({ children }: { children: React.ReactNode }) {
  return (
    <ViewJsx flexDirection="row" alignItems="center" gap={6}>
      {children}
    </ViewJsx>
  )
}

function Slot({ index }: InputOTPSlotProps) {
  const { value, activeIndex, focus } = React.useContext(InputOTPContext)
  const char = value[index] ?? ''
  const isActive = index === activeIndex

  return (
    <ViewJsx
      width={40}
      height={44}
      borderWidth={1}
      borderColor={isActive ? '$color' : '$borderColor'}
      borderRadius="$4"
      alignItems="center"
      justifyContent="center"
      backgroundColor="$background"
      onPress={focus}
      style={isActive ? { boxShadow: '0 0 0 2px var(--outlineColor)' } : undefined}
    >
      <ViewJsx
        fontSize={20}
        fontFamily="$body"
        fontWeight="500"
        color="$color"
        textAlign="center"
        lineHeight={28}
      >
        {char}
      </ViewJsx>
    </ViewJsx>
  )
}

function Separator() {
  return (
    <ViewJsx
      width={8}
      height={2}
      backgroundColor="$color6"
      borderRadius={9999}
      marginLeft={2}
      marginRight={2}
    />
  )
}

export const InputOTP = { Root, Group, Slot, Separator }
