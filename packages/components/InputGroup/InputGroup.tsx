import React, { useContext } from 'react'
import { styled } from '../../stl-react/src/config'

type InputGroupSize = 'sm' | 'md' | 'lg'

const InputGroupContext = React.createContext<{ size: InputGroupSize }>({
  size: 'md',
})

function useInputGroupContext() {
  return useContext(InputGroupContext)
}

// --- Root ---

export interface InputGroupProps {
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  size?: InputGroupSize
  'aria-label'?: string
}

const InputGroupWrapper = styled("div", {
  display: "inline-flex",
}, "InputGroupWrapper")

function InputGroupRoot({
  children,
  orientation = 'horizontal',
  size = 'md',
  'aria-label': ariaLabel,
}: InputGroupProps) {
  const isHorizontal = orientation === 'horizontal'
  const className = isHorizontal
    ? 'vlting-input-group-h'
    : 'vlting-input-group-v'

  return (
    <InputGroupContext.Provider value={{ size }}>
      <InputGroupWrapper>
        <style
          dangerouslySetInnerHTML={{
            __html: isHorizontal
              ? `
              .vlting-input-group-h > *:not(:first-child):not(:last-child) { border-radius: 0; }
              .vlting-input-group-h > *:first-child { border-top-right-radius: 0; border-bottom-right-radius: 0; }
              .vlting-input-group-h > *:last-child { border-top-left-radius: 0; border-bottom-left-radius: 0; }
              .vlting-input-group-h > *:not(:first-child) { margin-left: -1px; }
            `
              : `
              .vlting-input-group-v > *:not(:first-child):not(:last-child) { border-radius: 0; }
              .vlting-input-group-v > *:first-child { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
              .vlting-input-group-v > *:last-child { border-top-left-radius: 0; border-top-right-radius: 0; }
              .vlting-input-group-v > *:not(:first-child) { margin-top: -1px; }
            `,
          }}
        />
        <div
          role="group"
          aria-label={ariaLabel}
          className={className}
          style={{
            display: 'inline-flex',
            flexDirection: isHorizontal ? 'row' : 'column',
          }}
        >
          {children}
        </div>
      </InputGroupWrapper>
    </InputGroupContext.Provider>
  )
}

// --- Addon ---

const InputGroupAddonFrame = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: "8px",
  paddingRight: "8px",
  backgroundColor: "$surface3",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "$borderColor",
  borderRadius: "$4",
}, {
  size: {
    sm: { borderRadius: "$2", paddingLeft: "6px", paddingRight: "6px" },
    md: { borderRadius: "$4", paddingLeft: "8px", paddingRight: "8px" },
    lg: { borderRadius: "$4", paddingLeft: "10px", paddingRight: "10px" },
  },
}, "InputGroupAddon")

export interface InputGroupAddonProps {
  children: React.ReactNode
}

function InputGroupAddon({ children }: InputGroupAddonProps) {
  const { size } = useInputGroupContext()
  return <InputGroupAddonFrame size={size}>{children}</InputGroupAddonFrame>
}

// --- Element ---

const InputGroupElementFrame = styled("div", {
  position: "absolute",
  top: "0",
  bottom: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: "8px",
  paddingRight: "8px",
  zIndex: "1",
  pointerEvents: "none",
}, {
  placement: {
    left: { left: "0" },
    right: { right: "0" },
  },
}, "InputGroupElement")

export interface InputGroupElementProps {
  children: React.ReactNode
  placement?: 'left' | 'right'
}

function InputGroupElement({
  children,
  placement = 'left',
}: InputGroupElementProps) {
  return (
    <InputGroupElementFrame placement={placement}>
      {children}
    </InputGroupElementFrame>
  )
}

// --- Input (thin wrapper forwarding size context) ---

export interface InputGroupInputProps {
  children: React.ReactNode
}

function InputGroupInput({ children }: InputGroupInputProps) {
  return <>{children}</>
}

// --- Compound Export ---

export const InputGroup = Object.assign(InputGroupRoot, {
  Addon: InputGroupAddon,
  Element: InputGroupElement,
  Input: InputGroupInput,
})
