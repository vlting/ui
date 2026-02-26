import { Switch as TamaguiSwitch } from '@tamagui/switch'
import type { ComponentType } from 'react'

// Tamagui v2 RC GetProps bug — cast for JSX usage
const SwitchFrame = TamaguiSwitch as ComponentType<Record<string, unknown>>
const SwitchThumb = TamaguiSwitch.Thumb as ComponentType<Record<string, unknown>>

const SIZE_MAP = { sm: '$3' as const, md: '$4' as const, lg: '$5' as const }
const WIDTH_MAP: Record<string, string | number> = { sm: '$4.5', md: 60, lg: 72 }
const THUMB_SIZE_MAP: Record<string, string | number> = { sm: 16, md: '$1', lg: '$1.5' }

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  name?: string
}

export function Switch({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  size = 'md',
  name,
}: SwitchProps) {
  return (
    <SwitchFrame
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      size={SIZE_MAP[size]}
      name={name}
      backgroundColor="$color5"
      borderRadius={999}
      padding={3}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      animation="fast"
      alignItems="center"
      width={WIDTH_MAP[size]}
      focusVisibleStyle={{
        outlineWidth: 2,
        outlineOffset: 1,
        outlineColor: '$color10',
        outlineStyle: 'solid',
      }}
    >
      <SwitchThumb
        animation="fast"
        backgroundColor="$background"
        borderRadius={999}
        width={THUMB_SIZE_MAP[size]}
        height={THUMB_SIZE_MAP[size]}
      />
    </SwitchFrame>
  )
}
