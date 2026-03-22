import {
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Pressable, Text as RNText, TextInput, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'
import { useControllableState } from '../../headless/src/useControllableState'

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

// ─── Styled ─────────────────────────────────────────────────────────────────

const GroupContainer = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
}, 'InputOTPGroup')

const SlotBox = styled(View, {
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 44,
  borderWidth: 1,
  borderColor: '$neutral6',
  borderRadius: 6,
  backgroundColor: '$surface1',
}, {
  active: {
    true: { borderColor: '$neutral9', borderWidth: 2 },
  },
  disabled: {
    true: { opacity: 0.5 },
  },
}, 'InputOTPSlot')

const SlotText = styled(RNText, {
  fontSize: 18,
  fontWeight: '500',
  color: '$defaultBody',
  textAlign: 'center',
}, 'InputOTPSlotText')

const SeparatorText = styled(RNText, {
  paddingHorizontal: 4,
  color: '$neutral7',
  fontSize: 16,
}, 'InputOTPSeparator')

// ─── Types ──────────────────────────────────────────────────────────────────

export interface InputOTPRootProps {
  maxLength: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  pattern?: string
  disabled?: boolean
  children?: ReactNode
  style?: ViewStyle
}

export interface InputOTPSlotProps {
  index: number
  style?: ViewStyle
}

// ─── Root ───────────────────────────────────────────────────────────────────

const Root = forwardRef<View, InputOTPRootProps>(
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
    const inputRef = useRef<TextInput | null>(null)
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

    const handleChangeText = useCallback((text: string) => {
      if (disabled) return
      const filtered = text.split('').filter(validateChar).slice(0, maxLength).join('')
      setValue(filtered)
    }, [disabled, validateChar, maxLength, setValue])

    const handlePress = useCallback(() => {
      if (!disabled) inputRef.current?.focus()
    }, [disabled])

    return (
      <InputOTPContext.Provider
        value={{ value: currentValue, cursorIndex, isFocused, maxLength, disabled }}
      >
        <Pressable ref={ref} onPress={handlePress} {...rest}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {children}
          </View>
          <TextInput
            ref={inputRef}
            value={currentValue}
            onChangeText={handleChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={maxLength}
            keyboardType="number-pad"
            editable={!disabled}
            autoComplete="one-time-code"
            style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}
            accessibilityLabel={`Enter ${maxLength}-digit code`}
          />
        </Pressable>
      </InputOTPContext.Provider>
    )
  },
)
Root.displayName = 'InputOTP.Root'

// ─── Group ──────────────────────────────────────────────────────────────────

const Group = forwardRef<View, { children?: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => (
    <GroupContainer ref={ref} {...rest}>
      {children}
    </GroupContainer>
  ),
)
Group.displayName = 'InputOTP.Group'

// ─── Slot ───────────────────────────────────────────────────────────────────

const Slot = forwardRef<View, InputOTPSlotProps>(
  ({ index, ...rest }, ref) => {
    const ctx = useInputOTP()
    const char = ctx.value[index]
    const isActive = index === ctx.cursorIndex && ctx.isFocused

    return (
      <SlotBox
        ref={ref}
        active={isActive || undefined}
        disabled={ctx.disabled}
        {...rest}
      >
        <SlotText>{char ?? ''}</SlotText>
      </SlotBox>
    )
  },
)
Slot.displayName = 'InputOTP.Slot'

// ─── Separator ──────────────────────────────────────────────────────────────

const Separator = forwardRef<View, { children?: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => (
    <View ref={ref} {...rest}>
      <SeparatorText>{children ?? '\u00B7'}</SeparatorText>
    </View>
  ),
)
Separator.displayName = 'InputOTP.Separator'

// ─── Export ─────────────────────────────────────────────────────────────────

export const InputOTP = Object.assign(Root, { Root, Group, Slot, Separator })
