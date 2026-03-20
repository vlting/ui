import { type ComponentPropsWithRef, forwardRef } from 'react'
import { styled } from '../../stl-react/src/config'
import type { FieldRootProps } from '../Field/Field'

// ─── Root ───────────────────────────────────────────────────────────────────

const FormFrame = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$16',
}, { name: 'Form' })

export type FormRootProps = ComponentPropsWithRef<typeof FormFrame> & {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  noValidate?: boolean
}

export type FormFieldProps = FieldRootProps

const FormRoot = forwardRef<HTMLFormElement, FormRootProps>(
  ({ onSubmit, children, ...rest }, ref) => (
    <FormFrame
      ref={ref}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit?.(e)
      }}
      {...rest}
    >
      {children}
    </FormFrame>
  ),
)
FormRoot.displayName = 'Form'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Form = Object.assign(FormRoot, {
  Root: FormRoot,
})
