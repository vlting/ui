import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import type React from 'react'
import { Text, View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

const TitleH3 = styledHtml('h3', {
  fontSize: '$6',
  fontWeight: '600',
  color: '$color',
  fontFamily: '$body',
  margin: 0,
  textAlign: 'center',
} as any) as AnyFC

export interface EmptyRootProps {
  children: React.ReactNode
}

export interface EmptyTitleProps {
  children: React.ReactNode
}

export interface EmptyDescriptionProps {
  children: React.ReactNode
}

export interface EmptyMediaProps {
  children: React.ReactNode
}

export interface EmptyActionProps {
  children: React.ReactNode
}

function Root({ children }: EmptyRootProps) {
  return (
    <ViewJsx
      alignItems="center"
      justifyContent="center"
      paddingTop="$4.5"
      paddingBottom="$4.5"
      paddingLeft="$3.5"
      paddingRight="$3.5"
      gap="$1.5"
      role="status"
    >
      {children}
    </ViewJsx>
  )
}

function Media({ children }: EmptyMediaProps) {
  return (
    <ViewJsx alignItems="center" justifyContent="center" opacity={0.5} marginBottom="$0.5">
      {children}
    </ViewJsx>
  )
}

function Title({ children }: EmptyTitleProps) {
  return <TitleH3>{children}</TitleH3>
}

function Description({ children }: EmptyDescriptionProps) {
  return (
    <TextJsx
      fontSize="$4"
      fontFamily="$body"
      color="$colorSubtitle"
      textAlign="center"
      maxWidth="$dialogSm"
    >
      {children}
    </TextJsx>
  )
}

function Action({ children }: EmptyActionProps) {
  return (
    <ViewJsx alignItems="center" justifyContent="center" marginTop="$0.5">
      {children}
    </ViewJsx>
  )
}

export const Empty = { Root, Media, Title, Description, Action }
