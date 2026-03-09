import React, { useCallback, useRef, useState } from 'react'
import { styled } from '../../stl-react/src/config'

const OTPRoot = styled(
  "div",
  { position: "relative", display: "inline-flex", flexDirection: "row", alignItems: "center" },
  "InputOTP"
)

const OTPGroup = styled(
  "div",
  { display: "flex", flexDirection: "row", alignItems: "center", gap: "6px" },
  "InputOTPGroup"
)

const OTPSlotFrame = styled(
  "div",
  {
    width: "40px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--borderColor)",
    borderRadius: "8px",
    backgroundColor: "var(--background, #fff)",
    fontSize: "var(--fontSize-7, 24px)",
    fontFamily: "var(--font-body)",
    fontWeight: "500",
    color: "var(--color)",
    cursor: "text",
  },
  "InputOTPSlot"
)

const OTPSeparator = styled(
  "div",
  {
    width: "6px",
    height: "2px",
    backgroundColor: "var(--color6)",
    borderRadius: "9999px",
    marginLeft: "2px",
    marginRight: "2px",
  },
  "InputOTPSeparator"
)

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
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <OTPRoot>
        <input
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
          style={{ position: 'absolute', opacity: 0, width: 1, height: 1, overflow: 'hidden', pointerEvents: 'none' }}
        />
        <div
          onClick={focus}
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'text' }}
        >
          {children}
        </div>
      </OTPRoot>
    </InputOTPContext.Provider>
  )
}

function Group({ children }: { children: React.ReactNode }) {
  return <OTPGroup>{children}</OTPGroup>
}

function Slot({ index }: InputOTPSlotProps) {
  const { value, activeIndex, focus } = React.useContext(InputOTPContext)
  const char = value[index] ?? ''
  const isActive = index === activeIndex

  return (
    <OTPSlotFrame
      onClick={focus}
      style={{
        borderColor: isActive ? 'var(--color)' : undefined,
        boxShadow: isActive ? '0 0 0 2px var(--outlineColor)' : undefined,
      }}
    >
      {char}
    </OTPSlotFrame>
  )
}

function Separator() {
  return <OTPSeparator />
}

export const InputOTP = { Root, Group, Slot, Separator }
