import { View, XStack, styled } from 'tamagui'
import { useControllableState } from '../../hooks/useControllableState'

// @ts-expect-error Tamagui v2 RC
const SwitchTrack = styled(XStack, {
  width: 44,
  height: 24,
  borderRadius: 12,
  backgroundColor: '$color5',
  padding: 2,
  cursor: 'pointer',
  animation: 'fast',

  hoverStyle: {
    backgroundColor: '$color6',
  },

  focusWithinStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },

  variants: {
    checked: {
      true: {
        backgroundColor: '$color10',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
    size: {
      sm: { width: 36, height: 20 },
      md: { width: 44, height: 24 },
      lg: { width: 52, height: 28 },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const SwitchThumb = styled(View, {
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: '$background',
  animation: 'fast',

  variants: {
    checked: {
      true: {
        translateX: 20,
      },
    },
    size: {
      sm: { width: 16, height: 16, borderRadius: 8 },
      md: { width: 20, height: 20, borderRadius: 10 },
      lg: { width: 24, height: 24, borderRadius: 12 },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  name?: string
}

export function Switch({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = 'md',
  name,
}: SwitchProps) {
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked,
    onChange: onCheckedChange,
  })

  const handlePress = () => {
    if (disabled) return
    setChecked(!checked)
  }

  return (
    <>
      <button
        type="button"
        role="switch"
        aria-checked={!!checked}
        disabled={disabled}
        onClick={handlePress}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          display: 'inline-flex',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {/* @ts-expect-error Tamagui v2 RC */}
        <SwitchTrack checked={!!checked} disabled={disabled} size={size}>
          {/* @ts-expect-error Tamagui v2 RC */}
          <SwitchThumb checked={!!checked} size={size} />
        </SwitchTrack>
      </button>
      {name && (
        <input
          type="checkbox"
          aria-hidden
          tabIndex={-1}
          name={name}
          checked={!!checked}
          onChange={() => {}}
          style={{
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
            width: 0,
            height: 0,
          }}
        />
      )}
    </>
  )
}
