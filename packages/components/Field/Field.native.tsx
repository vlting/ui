import {
  type ReactNode,
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
} from 'react'
import { Text as RNText, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

interface FieldContextValue {
  error?: boolean
  disabled?: boolean
  required?: boolean
}

const FieldContext = createContext<FieldContextValue | null>(null)

function useFieldContext() {
  const ctx = useContext(FieldContext)
  if (!ctx) throw new Error('Field sub-components must be used within Field.Root')
  return ctx
}

// ─── Styled ─────────────────────────────────────────────────────────────────

const RootFrame = styled(View, {
  flexDirection: 'column',
  gap: 6,
}, 'Field')

const LabelText = styled(RNText, {
  fontSize: 14,
  fontWeight: '500',
  color: '$defaultBody',
}, 'FieldLabel')

const RequiredMark = styled(RNText, {
  color: '$error9',
  fontSize: 14,
}, 'FieldRequired')

const DescriptionText = styled(RNText, {
  fontSize: 13,
  color: '$neutral7',
}, 'FieldDescription')

const ErrorText = styled(RNText, {
  fontSize: 13,
  color: '$error9',
}, 'FieldError')

// ─── Types ──────────────────────────────────────────────────────────────────

export interface FieldRootProps {
  error?: boolean
  disabled?: boolean
  required?: boolean
  children?: ReactNode
  style?: ViewStyle
}

export type FieldLabelProps = {
  children?: ReactNode
}

export type FieldControlProps = {
  children: React.ReactElement
}

export type FieldDescriptionProps = {
  children?: ReactNode
}

export type FieldErrorProps = {
  children?: ReactNode
}

// ─── Root ───────────────────────────────────────────────────────────────────

const FieldRoot = forwardRef<View, FieldRootProps>(
  ({ error, disabled, required, children, ...rest }, ref) => (
    <FieldContext.Provider value={{ error, disabled, required }}>
      <RootFrame ref={ref} {...rest}>
        {children}
      </RootFrame>
    </FieldContext.Provider>
  ),
)
FieldRoot.displayName = 'Field'

// ─── Label ──────────────────────────────────────────────────────────────────

function FieldLabel({ children }: FieldLabelProps) {
  const ctx = useFieldContext()
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      <LabelText>{children}</LabelText>
      {ctx.required && <RequiredMark> *</RequiredMark>}
    </View>
  )
}
FieldLabel.displayName = 'Field.Label'

// ─── Control ────────────────────────────────────────────────────────────────

function FieldControl({ children }: FieldControlProps) {
  const ctx = useFieldContext()
  const child = Children.only(children)
  if (!isValidElement(child)) {
    throw new Error('Field.Control expects a single valid React element as its child')
  }

  return cloneElement(child as React.ReactElement<any>, {
    error: ctx.error || undefined,
    disabled: ctx.disabled || undefined,
  })
}
FieldControl.displayName = 'Field.Control'

// ─── Description ────────────────────────────────────────────────────────────

function FieldDescription({ children }: FieldDescriptionProps) {
  return <DescriptionText>{children}</DescriptionText>
}
FieldDescription.displayName = 'Field.Description'

// ─── Error ──────────────────────────────────────────────────────────────────

function FieldError({ children }: FieldErrorProps) {
  const ctx = useFieldContext()
  if (!ctx.error) return null
  return (
    <ErrorText accessibilityRole="alert">{children}</ErrorText>
  )
}
FieldError.displayName = 'Field.Error'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Field = Object.assign(FieldRoot, {
  Root: FieldRoot,
  Label: FieldLabel,
  Control: FieldControl,
  Description: FieldDescription,
  Error: FieldError,
})
