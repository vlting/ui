import React from 'react'
import { Text } from '../_jsx-compat'

export type InlineErrorProps = {
  id?: string
  testID?: string
  children?: React.ReactNode
}

export function InlineError({ id, testID, children }: InlineErrorProps) {
  return (
    <Text
      id={id}
      testID={testID}
      fontSize="$3"
      color="$color"
      lineHeight="$3"
      theme="red"
      role="alert"
      aria-live="assertive"
    >
      {children}
    </Text>
  )
}
