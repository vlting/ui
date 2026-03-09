import type { ReactNode } from 'react'
import React, { createContext, useContext, useId } from 'react'
import { styled } from '../../stl-react/src/config'

// --- Styled Frames ---

const FieldRoot = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
}, "FieldRoot")

const LabelText = styled("span", {
  fontFamily: "$body",
  fontWeight: "$500",
  fontSize: "$p",
  color: "$defaultBody",
}, "FieldLabelText")

const DescriptionText = styled("span", {
  fontFamily: "$body",
  fontSize: "$14",
  color: "$tertiary7",
}, "FieldDescription")

const ErrorText = styled("span", {
  fontFamily: "$body",
  fontSize: "$14",
  color: "red",
}, "FieldError")

// --- Context ---

interface FieldContextValue {
  id: string
  descriptionId: string
  errorId: string
  error?: boolean
  disabled?: boolean
}

const FieldContext = createContext<FieldContextValue>({
  id: '',
  descriptionId: '',
  errorId: '',
})

function useFieldContext() {
  return useContext(FieldContext)
}

// --- Props ---

export interface FieldRootProps {
  children: ReactNode
  error?: boolean
  disabled?: boolean
}

export interface FieldLabelProps {
  children: ReactNode
}

export interface FieldDescriptionProps {
  children: ReactNode
}

export interface FieldErrorProps {
  children: ReactNode
}

export interface FieldControlProps {
  children: ReactNode
}

// --- Components ---

function Root({ children, error, disabled }: FieldRootProps) {
  const id = useId()
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  return (
    <FieldContext.Provider value={{ id, descriptionId, errorId, error, disabled }}>
      <FieldRoot>{children}</FieldRoot>
    </FieldContext.Provider>
  )
}

function Label({ children }: FieldLabelProps) {
  const { id } = useFieldContext()

  return (
    <label htmlFor={id} style={{ display: 'block' }}>
      <LabelText>{children}</LabelText>
    </label>
  )
}

function Control({ children }: FieldControlProps) {
  const { id, descriptionId, errorId, error, disabled } = useFieldContext()

  return (
    <>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child
        return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          id,
          'aria-describedby': error ? errorId : descriptionId,
          'aria-invalid': error ? 'true' : undefined,
          disabled,
        })
      })}
    </>
  )
}

function Description({ children }: FieldDescriptionProps) {
  const { descriptionId, error } = useFieldContext()

  if (error) return null

  return (
    <DescriptionText id={descriptionId}>
      {children}
    </DescriptionText>
  )
}

function Error({ children }: FieldErrorProps) {
  const { errorId, error } = useFieldContext()

  if (!error) return null

  return (
    <ErrorText id={errorId} role="alert">
      {children}
    </ErrorText>
  )
}

export const Field = { Root, Label, Control, Description, Error }
