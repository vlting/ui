import { type ReactNode, createContext, forwardRef, useContext } from 'react'
import { View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

interface FormContextValue {
  onSubmit?: () => void
}

const FormContext = createContext<FormContextValue>({})

export function useFormContext() {
  return useContext(FormContext)
}

// ─── Styled ─────────────────────────────────────────────────────────────────

const FormFrame = styled(View, {
  flexDirection: 'column',
  gap: 16,
}, 'Form')

// ─── Types ──────────────────────────────────────────────────────────────────

export interface FormRootProps {
  children?: ReactNode
  onSubmit?: () => void
  style?: ViewStyle
}

// ─── Form ───────────────────────────────────────────────────────────────────

const FormRoot = forwardRef<View, FormRootProps>(
  ({ onSubmit, children, ...rest }, ref) => (
    <FormContext.Provider value={{ onSubmit }}>
      <FormFrame ref={ref} {...rest}>
        {children}
      </FormFrame>
    </FormContext.Provider>
  ),
)
FormRoot.displayName = 'Form'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Form = Object.assign(FormRoot, {
  Root: FormRoot,
})
