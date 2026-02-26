import type { ComponentType, ReactNode } from 'react'
import React, { createContext, useContext, useId } from 'react'
import { Text, View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

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
      <ViewJsx gap={4}>{children}</ViewJsx>
    </FieldContext.Provider>
  )
}

function Label({ children }: FieldLabelProps) {
  const { id } = useFieldContext()

  return (
    <label htmlFor={id} style={{ display: 'block' }}>
      <TextJsx fontSize={14} fontWeight="500" fontFamily="$body" color="$color">
        {children}
      </TextJsx>
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

  // Hide description when error is shown (error takes precedence for aria-describedby)
  if (error) return null

  return (
    <TextJsx id={descriptionId} fontSize={12} fontFamily="$body" color="$colorSubtitle">
      {children}
    </TextJsx>
  )
}

function Error({ children }: FieldErrorProps) {
  const { errorId, error } = useFieldContext()

  if (!error) return null

  return (
    <TextJsx id={errorId} fontSize={12} fontFamily="$body" color="$red10" role="alert">
      {children}
    </TextJsx>
  )
}

export const Field = { Root, Label, Control, Description, Error }
