import type React from 'react'
import { createContext, useContext } from 'react'
import { styled } from '../../stl-react/src/config'

interface FormFieldContextValue {
  error?: boolean
  disabled?: boolean
}

const FormFieldContext = createContext<FormFieldContextValue>({})

function useFormFieldContext() {
  return useContext(FormFieldContext)
}

const FormFrame = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
}, "Form")

const FieldFrame = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
}, "FormField")

const FieldLabel = styled("span", {
  fontFamily: "$body",
  fontWeight: "$500",
  fontSize: "$p",
  color: "$defaultBody",
}, "FormFieldLabel")

const FieldDescription = styled("span", {
  fontFamily: "$body",
  fontSize: "$14",
  color: "$tertiary7",
}, "FormFieldDescription")

const FieldError = styled("span", {
  fontFamily: "$body",
  fontSize: "$14",
  color: "red",
}, "FormFieldError")

export interface FormRootProps {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent) => void
}

function Root({ children, onSubmit }: FormRootProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  return (
    <FormFrame onSubmit={handleSubmit}>
      {children}
    </FormFrame>
  )
}

export interface FormFieldProps {
  children: React.ReactNode
  error?: boolean
  disabled?: boolean
}

function Field({ children, error, disabled }: FormFieldProps) {
  return (
    <FormFieldContext.Provider value={{ error, disabled }}>
      <FieldFrame>{children}</FieldFrame>
    </FormFieldContext.Provider>
  )
}

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor}>
      <FieldLabel>{children}</FieldLabel>
    </label>
  )
}

function Description({ children }: { children: React.ReactNode }) {
  return <FieldDescription>{children}</FieldDescription>
}

function ErrorMessage({ children }: { children: React.ReactNode }) {
  const { error } = useFormFieldContext()
  if (!error) return null
  return <FieldError role="alert">{children}</FieldError>
}

export const Form = { Root, Field, Label, Description, ErrorMessage }
