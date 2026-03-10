import type React from 'react'
import { styled } from '../../stl-react/src/config'

const AlertFrame = styled(
  'section',
  {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '$3',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '$borderColor',
    padding: '$3',
    gap: '$2',
    alignItems: 'flex-start',
  },
  {
    variant: {
      default: { backgroundColor: '$surface1' },
      destructive: { borderColor: '$red8', backgroundColor: '$red2' },
    },
  },
  'Alert',
)

const AlertTitle = styled(
  'span',
  { fontFamily: '$body', fontWeight: '$600', fontSize: '$16', color: '$color' },
  'AlertTitle',
)

const AlertDescription = styled(
  'span',
  { fontFamily: '$body', fontSize: '$14', color: '$secondaryText12' },
  'AlertDescription',
)

const AlertIconFrame = styled(
  'div',
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '16px',
    height: '16px',
    marginTop: '2px',
  },
  'AlertIcon',
)

export interface AlertProps {
  children: React.ReactNode
  variant?: 'default' | 'destructive'
}

function Root({ children, variant = 'default' }: AlertProps) {
  return (
    <AlertFrame variant={variant} role={variant === 'destructive' ? 'alert' : 'status'}>
      {children}
    </AlertFrame>
  )
}

function Title({ children }: { children: React.ReactNode }) {
  return <AlertTitle>{children}</AlertTitle>
}

function Description({ children }: { children: React.ReactNode }) {
  return <AlertDescription>{children}</AlertDescription>
}

function Icon({ children }: { children: React.ReactNode }) {
  return <AlertIconFrame>{children}</AlertIconFrame>
}

export const Alert = { Root, Title, Description, Icon }
