import type React from 'react'
import { createContext, useContext } from 'react'
import { Text, YStack, styled } from 'tamagui'

interface FormFieldContextValue {
  error?: boolean
  disabled?: boolean
}

const FormFieldContext = createContext<FormFieldContextValue>({})

function useFormFieldContext() {
  return useContext(FormFieldContext)
}

// @ts-expect-error Tamagui v2 RC
const FormFrameVisual = styled(YStack, {
  gap: '$4',
  width: '100%',
})

// @ts-expect-error Tamagui v2 RC
const FieldFrame = styled(YStack, {
  gap: '$1.5',
})

// @ts-expect-error Tamagui v2 RC
const FieldLabel = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$3',
  fontSize: '$3',
  color: '$color',
})

// @ts-expect-error Tamagui v2 RC
const FieldDescription = styled(Text, {
  fontFamily: '$body',
  fontSize: '$2',
  color: '$colorSubtitle',
})

// @ts-expect-error Tamagui v2 RC
const FieldError = styled(Text, {
  fontFamily: '$body',
  fontSize: '$2',
  color: '$red10',
})

export interface FormRootProps {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent) => void
}

function Root({ children, onSubmit }: FormRootProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* @ts-expect-error Tamagui v2 RC */}
      <FormFrameVisual>{children}</FormFrameVisual>
    </form>
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
      {/* @ts-expect-error Tamagui v2 RC */}
      <FieldFrame>{children}</FieldFrame>
    </FormFieldContext.Provider>
  )
}

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor}>
      {/* @ts-expect-error Tamagui v2 RC */}
      <FieldLabel>{children}</FieldLabel>
    </label>
  )
}

function Description({ children }: { children: React.ReactNode }) {
  // @ts-expect-error Tamagui v2 RC
  return <FieldDescription>{children}</FieldDescription>
}

function ErrorMessage({ children }: { children: React.ReactNode }) {
  const { error } = useFormFieldContext()
  if (!error) return null
  // @ts-expect-error Tamagui v2 RC
  return <FieldError role="alert">{children}</FieldError>
}

export const Form = { Root, Field, Label, Description, ErrorMessage }
