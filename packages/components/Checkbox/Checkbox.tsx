import type React from 'react'
import { Text, View, styled } from 'tamagui'
import { Checkbox as HeadlessCheckbox } from '../../headless/Checkbox'
import type { CheckboxRootProps } from '../../headless/Checkbox'

// @ts-expect-error Tamagui v2 RC
const StyledRoot = styled(View, {
  width: 20,
  height: 20,
  borderRadius: '$2',
  borderWidth: 1,
  borderColor: '$borderColor',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  cursor: 'pointer',

  variants: {
    checked: {
      true: {
        backgroundColor: '$color10',
        borderColor: '$color10',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
    size: {
      sm: { width: 16, height: 16 },
      md: { width: 20, height: 20 },
      lg: { width: 24, height: 24 },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const CheckIcon = styled(Text, {
  color: '$color1',
  fontSize: 14,
  fontWeight: '700',
  lineHeight: 14,
})

interface StyledCheckboxProps extends Omit<CheckboxRootProps, 'className'> {
  size?: 'sm' | 'md' | 'lg'
}

function Root({
  children,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  size = 'md',
  ...props
}: StyledCheckboxProps) {
  return (
    <HeadlessCheckbox.Root
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      {...props}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <StyledRoot checked={!!checked} disabled={disabled} size={size}>
        <HeadlessCheckbox.Indicator>
          {/* @ts-expect-error Tamagui v2 RC */}
          <CheckIcon>✓</CheckIcon>
        </HeadlessCheckbox.Indicator>
      </StyledRoot>
      {children}
    </HeadlessCheckbox.Root>
  )
}

function Indicator({ children }: { children?: React.ReactNode }) {
  return <HeadlessCheckbox.Indicator>{children}</HeadlessCheckbox.Indicator>
}

export const Checkbox = { Root, Indicator }
