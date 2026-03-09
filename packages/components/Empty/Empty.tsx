import type React from 'react'
import { styled } from '../../stl-react/src/config'

const EmptyFrame = styled(
  "div",
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "18px",
    paddingBottom: "18px",
    paddingLeft: "14px",
    paddingRight: "14px",
    gap: "6px",
  },
  "Empty"
)

const EmptyMediaFrame = styled(
  "div",
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: "0.5",
    marginBottom: "2px",
  },
  "EmptyMedia"
)

const EmptyTitleText = styled(
  "h3",
  {
    fontSize: "$21",
    fontWeight: "$600",
    color: "$color",
    fontFamily: "$body",
    margin: "0px",
    textAlign: "center",
  },
  "EmptyTitle"
)

const EmptyDescriptionText = styled(
  "p",
  {
    fontSize: "$16",
    fontFamily: "$body",
    color: "$secondaryText12",
    textAlign: "center",
    maxWidth: "400px",
    margin: "0px",
  },
  "EmptyDescription"
)

const EmptyActionFrame = styled(
  "div",
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2px",
  },
  "EmptyAction"
)

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
  return <EmptyFrame role="status">{children}</EmptyFrame>
}

function Media({ children }: EmptyMediaProps) {
  return <EmptyMediaFrame>{children}</EmptyMediaFrame>
}

function Title({ children }: EmptyTitleProps) {
  return <EmptyTitleText>{children}</EmptyTitleText>
}

function Description({ children }: EmptyDescriptionProps) {
  return <EmptyDescriptionText>{children}</EmptyDescriptionText>
}

function Action({ children }: EmptyActionProps) {
  return <EmptyActionFrame>{children}</EmptyActionFrame>
}

export const Empty = { Root, Media, Title, Description, Action }
