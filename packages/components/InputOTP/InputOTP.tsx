import {
  type ComponentPropsWithRef,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useControllableState } from '../../headless/src/useControllableState'
import { styled } from '../../stl-react/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

interface InputOTPContextValue {
  value: string
  cursorIndex: number
  isFocused: boolean
  maxLength: number
  disabled?: boolean
}

const InputOTPContext = createContext<InputOTPContextValue | null>(null)

function useInputOTP() {
  const ctx = useContext(InputOTPContext)
  if (!ctx) throw new Error('InputOTP.Slot must be used within InputOTP.Root')
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const RootContainer = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  position: 'relative',
}, { name: 'InputOTPRoot' })

const HiddenInput = styled('input', {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  opacity: '0',
  margin: '0',
  padding: '0',
  border: 'none',
  cursor: 'pointer',
}, {
  name: 'InputOTPHiddenInput',
  variants: {
    disabled: {
      true: { cursor: 'not-allowed' },
    },
  },
})

const GroupContainer = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$4',
}, { name: 'InputOTPGroup' })

const SlotBox = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '$40',
  height: '$44',
  border: '$neutralMin',
  radius: '$4',
  bg: '$surface1',
  fontFamily: '$body',
  fontSize: '$fieldLarge',
  color: '$neutralText3',
  userSelect: 'none',
}, {
  name: 'InputOTPSlot',
  variants: {
    active: {
      true: { outline: '$neutral', outlineOffset: '$offsetDefault' },
    },
    filled: {
      true: {},
    },
    disabled: {
      true: { opacity: '0.5' },
    },
  },
})

const SeparatorElement = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: '$4',
  color: '$neutral6',
  fontSize: '$body',
  userSelect: 'none',
}, { name: 'InputOTPSeparator' })

// ─── Root ───────────────────────────────────────────────────────────────────

export interface InputOTPRootProps extends Omit<ComponentPropsWithRef<typeof RootContainer>, 'onChange'> {
  maxLength: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  pattern?: string
  disabled?: boolean
}

const Root = forwardRef<HTMLDivElement, InputOTPRootProps>(
  ({
    maxLength,
    value: valueProp,
    onChange,
    onComplete,
    pattern = '[0-9]',
    disabled,
    children,
    ...rest
  }, ref) => {
    const [value, setValue] = useControllableState<string>({
      prop: valueProp,
      defaultProp: '',
      onChange,
    })

    const currentValue = value ?? ''
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const onCompleteRef = useRef(onComplete)
    onCompleteRef.current = onComplete

    const cursorIndex = Math.min(currentValue.length, maxLength - 1)

    useEffect(() => {
      if (currentValue.length === maxLength) {
        onCompleteRef.current?.(currentValue)
      }
    }, [currentValue, maxLength])

    const validateChar = useCallback((char: string): boolean => {
      try {
        return new RegExp(`^${pattern}$`).test(char)
      } catch {
        return false
      }
    }, [pattern])

    const handleInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
      if (disabled) return
      const input = e.currentTarget
      const newValue = input.value

      // Filter to valid chars and limit to maxLength
      const filtered = newValue.split('').filter(validateChar).slice(0, maxLength).join('')
      setValue(filtered)
    }, [disabled, validateChar, maxLength, setValue])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return

      if (e.key === 'Backspace') {
        e.preventDefault()
        setValue((prev) => (prev ?? '').slice(0, -1))
      }
    }, [disabled, setValue])

    const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
      if (disabled) return
      e.preventDefault()
      const pasted = e.clipboardData.getData('text')
      const validChars = pasted.split('').filter(validateChar).slice(0, maxLength).join('')
      if (validChars) setValue(validChars)
    }, [disabled, validateChar, maxLength, setValue])

    const handleContainerClick = useCallback(() => {
      if (!disabled) inputRef.current?.focus()
    }, [disabled])

    return (
      <InputOTPContext.Provider
        value={{ value: currentValue, cursorIndex, isFocused, maxLength, disabled }}
      >
        <RootContainer
          ref={ref}
          onClick={handleContainerClick}
          {...rest}
        >
          <HiddenInput
            ref={inputRef}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={currentValue}
            maxLength={maxLength}
            disabled={disabled}
            aria-label={`Enter ${maxLength}-digit code`}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {children}
        </RootContainer>
      </InputOTPContext.Provider>
    )
  },
)
Root.displayName = 'InputOTP.Root'

// ─── Group ──────────────────────────────────────────────────────────────────

const Group = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof GroupContainer>>(
  ({ children, ...rest }, ref) => (
    <GroupContainer ref={ref} {...rest}>
      {children}
    </GroupContainer>
  ),
)
Group.displayName = 'InputOTP.Group'

// ─── Slot ───────────────────────────────────────────────────────────────────

export interface InputOTPSlotProps extends Omit<ComponentPropsWithRef<typeof SlotBox>, 'active' | 'filled' | 'disabled'> {
  index: number
}

const Slot = forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, ...rest }, ref) => {
    const ctx = useInputOTP()
    const char = ctx.value[index]
    const isActive = index === ctx.cursorIndex && ctx.isFocused

    return (
      <SlotBox
        ref={ref}
        active={isActive || undefined}
        filled={!!char || undefined}
        disabled={ctx.disabled}
        {...rest}
      >
        {char ?? ''}
      </SlotBox>
    )
  },
)
Slot.displayName = 'InputOTP.Slot'

// ─── Separator ──────────────────────────────────────────────────────────────

const Separator = forwardRef<HTMLSpanElement, ComponentPropsWithRef<typeof SeparatorElement>>(
  ({ children, ...rest }, ref) => (
    <SeparatorElement ref={ref} aria-hidden="true" {...rest}>
      {children ?? '·'}
    </SeparatorElement>
  ),
)
Separator.displayName = 'InputOTP.Separator'

// ─── Export ─────────────────────────────────────────────────────────────────

export const InputOTP = Object.assign(Root, { Root, Group, Slot, Separator })
