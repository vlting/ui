import React, { useContext } from 'react'
import type { ComponentType } from 'react'
import { View, XStack, styled, withStaticProperties } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC

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
      <ViewJsx display="inline-flex">
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
        <ViewJsx
          role="group"
          aria-label={ariaLabel}
          flexDirection={isHorizontal ? 'row' : 'column'}
          display="inline-flex"
          className={className}
        >
          {children}
        </ViewJsx>
      </ViewJsx>
    </InputGroupContext.Provider>
  )
}

// --- Addon ---

const InputGroupAddonFrame = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: '$2',
  backgroundColor: '$color3',
  borderWidth: 1,
  borderColor: '$borderColor',

  variants: {
    size: {
      // @ts-expect-error Tamagui v2 RC
      sm: { borderRadius: '$3', paddingHorizontal: '$1.5' },
      // @ts-expect-error Tamagui v2 RC
      md: { borderRadius: '$4', paddingHorizontal: '$2' },
      // @ts-expect-error Tamagui v2 RC
      lg: { borderRadius: '$5', paddingHorizontal: '$2.5' },
    },
  } as const,

  defaultVariants: {
    // @ts-expect-error Tamagui v2 RC
    size: 'md',
  },
})

const InputGroupAddonJsx = InputGroupAddonFrame as AnyFC

export interface InputGroupAddonProps {
  children: React.ReactNode
}

function InputGroupAddon({ children }: InputGroupAddonProps) {
  const { size } = useInputGroupContext()
  return <InputGroupAddonJsx size={size}>{children}</InputGroupAddonJsx>
}

// --- Element ---

const InputGroupElementFrame = styled(XStack, {
  position: 'absolute',
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: '$2',
  zIndex: 1,
  pointerEvents: 'none',

  variants: {
    placement: {
      // @ts-expect-error Tamagui v2 RC
      left: { left: 0 },
      // @ts-expect-error Tamagui v2 RC
      right: { right: 0 },
    },
  } as const,

  defaultVariants: {
    // @ts-expect-error Tamagui v2 RC
    placement: 'left',
  },
})

const InputGroupElementJsx = InputGroupElementFrame as AnyFC

export interface InputGroupElementProps {
  children: React.ReactNode
  placement?: 'left' | 'right'
}

function InputGroupElement({
  children,
  placement = 'left',
}: InputGroupElementProps) {
  return (
    <InputGroupElementJsx placement={placement}>
      {children}
    </InputGroupElementJsx>
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

export const InputGroup = withStaticProperties(InputGroupRoot, {
  Addon: InputGroupAddon,
  Element: InputGroupElement,
  Input: InputGroupInput,
})
