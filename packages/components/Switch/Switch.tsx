import type { ComponentType } from 'react'
import { Switch as TamaguiSwitch } from '@tamagui/switch'

// Tamagui v2 RC GetProps bug — cast for JSX usage
const SwitchFrame = TamaguiSwitch as ComponentType<Record<string, unknown>>
const SwitchThumb = TamaguiSwitch.Thumb as ComponentType<Record<string, unknown>>

const SIZE_MAP = { sm: '$3' as const, md: '$4' as const, lg: '$5' as const }
const THUMB_SIZE_MAP = { sm: 16, md: 20, lg: 24 }

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
      padding={2}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      animation="fast"
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
