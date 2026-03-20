import {
  type ComponentPropsWithRef,
  type ReactNode,
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useId,
} from 'react'
import { styled } from '../../stl-react/src/config'
import { Label } from '../../stl-react/src/primitives/Label/Label'

// ─── Context ────────────────────────────────────────────────────────────────

interface FieldContextValue {
  id: string
  descriptionId: string
  errorId: string
  error?: boolean
  disabled?: boolean
  required?: boolean
}

const FieldContext = createContext<FieldContextValue | null>(null)

function useFieldContext() {
  const ctx = useContext(FieldContext)
  if (!ctx) throw new Error('Field.Label must be used within Field.Root')
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

const RootFrame = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
}, { name: 'Field' })

export type FieldRootProps = ComponentPropsWithRef<typeof RootFrame> & {
  error?: boolean
  disabled?: boolean
  required?: boolean
  children?: ReactNode
}

const FieldRoot = forwardRef<HTMLDivElement, FieldRootProps>(
  ({ error, disabled, required, children, ...rest }, ref) => {
    const id = useId()
    return (
      <FieldContext.Provider
        value={{
          id,
          descriptionId: `${id}-desc`,
          errorId: `${id}-error`,
          error,
          disabled,
          required,
        }}
      >
        <RootFrame ref={ref} {...rest}>
          {children}
        </RootFrame>
      </FieldContext.Provider>
    )
  },
)
FieldRoot.displayName = 'Field'

// ─── Label ──────────────────────────────────────────────────────────────────

export type FieldLabelProps = {
  children?: ReactNode
}

function FieldLabel({ children }: FieldLabelProps) {
  const ctx = useFieldContext()
  return (
    <Label htmlFor={ctx.id} required={ctx.required}>
      {children}
    </Label>
  )
}
FieldLabel.displayName = 'Field.Label'

// ─── Control ────────────────────────────────────────────────────────────────

export type FieldControlProps = {
  children: React.ReactElement
}

function FieldControl({ children }: FieldControlProps) {
  const ctx = useFieldContext()
  const child = Children.only(children)
  if (!isValidElement(child)) {
    throw new Error('Field.Control expects a single valid React element as its child')
  }

  const describedBy = [
    ctx.error ? ctx.errorId : undefined,
    ctx.descriptionId,
  ].filter(Boolean).join(' ') || undefined

  return cloneElement(child as React.ReactElement<any>, {
    id: ctx.id,
    'aria-invalid': ctx.error ? 'true' : undefined,
    'aria-describedby': describedBy,
    'aria-required': ctx.required ? 'true' : undefined,
    disabled: ctx.disabled || undefined,
  })
}
FieldControl.displayName = 'Field.Control'

// ─── Description ────────────────────────────────────────────────────────────

const DescriptionFrame = styled('p', {
  fontSize: '$small',
  color: '$neutralText4',
  m: '$0',
}, { name: 'FieldDescription' })

export type FieldDescriptionProps = ComponentPropsWithRef<typeof DescriptionFrame> & {
  children?: ReactNode
}

const FieldDescription = forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  ({ children, ...rest }, ref) => {
    const ctx = useFieldContext()
    return (
      <DescriptionFrame ref={ref} id={ctx.descriptionId} {...rest}>
        {children}
      </DescriptionFrame>
    )
  },
)
FieldDescription.displayName = 'Field.Description'

// ─── Error ──────────────────────────────────────────────────────────────────

const ErrorFrame = styled('p', {
  fontSize: '$small',
  color: '$error9',
  m: '$0',
}, { name: 'FieldError' })

export type FieldErrorProps = ComponentPropsWithRef<typeof ErrorFrame> & {
  children?: ReactNode
}

const FieldError = forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ children, ...rest }, ref) => {
    const ctx = useFieldContext()
    if (!ctx.error) return null
    return (
      <ErrorFrame ref={ref} id={ctx.errorId} role="alert" {...rest}>
        {children}
      </ErrorFrame>
    )
  },
)
FieldError.displayName = 'Field.Error'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Field = Object.assign(FieldRoot, {
  Root: FieldRoot,
  Label: FieldLabel,
  Control: FieldControl,
  Description: FieldDescription,
  Error: FieldError,
})
