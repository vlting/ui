import type { ComponentType } from 'react'
import React from 'react'
import { Text, View } from 'tamagui'
import { styledHtml } from '@tamagui/web'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

const TitleH3 = styledHtml('h3', {
  fontSize: 18,
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
      paddingTop={32}
      paddingBottom={32}
      paddingLeft={24}
      paddingRight={24}
      gap={12}
      role="status"
    >
      {children}
    </ViewJsx>
  )
}

function Media({ children }: EmptyMediaProps) {
  return (
    <ViewJsx alignItems="center" justifyContent="center" opacity={0.5} marginBottom={4}>
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
      fontSize={14}
      fontFamily="$body"
      color="$colorSubtitle"
      textAlign="center"
      style={{ maxWidth: 400 }}
    >
      {children}
    </TextJsx>
  )
}

function Action({ children }: EmptyActionProps) {
  return (
    <ViewJsx alignItems="center" justifyContent="center" marginTop={4}>
      {children}
    </ViewJsx>
  )
}

export const Empty = { Root, Media, Title, Description, Action }
