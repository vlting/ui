import type React from 'react'
import { styled } from '../stl-react/src/config'

const srOnlyStyle: React.CSSProperties = {
  clip: 'rect(0, 0, 0, 0)',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
}

const VisuallyHiddenFrame = styled(
  "span",
  {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    borderWidth: "0",
  },
  "VisuallyHidden"
)

export interface VisuallyHiddenProps {
  children?: React.ReactNode
}

export function VisuallyHidden({ children, ...props }: VisuallyHiddenProps) {
  return (
    <VisuallyHiddenFrame style={srOnlyStyle} {...props}>
      {children}
    </VisuallyHiddenFrame>
  )
}
