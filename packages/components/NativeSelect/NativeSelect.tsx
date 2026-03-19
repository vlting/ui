import { type ComponentPropsWithRef, type ReactNode, forwardRef } from 'react'
import { styled } from '../../stl-react/src/config'

// ─── NativeSelect ───────────────────────────────────────────────────────────

const chevronSvg = (stroke: string) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='${stroke}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`

const SelectRoot = styled('select', {
  fontFamily: '$body',
  fontSize: '$field',
  color: '$neutralText3',
  bg: '$neutral1',
  border: '$neutralMin',
  borderColor: '$neutral4',
  borderRadius: '$field',
  width: '100%',
  outline: 'none',
  appearance: 'none',
  cursor: 'pointer',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12rem center',
  backgroundSize: '16rem',
  light: { backgroundImage: chevronSvg('%239ca3af') },
  dark: { backgroundImage: chevronSvg('%23d1d5db') },
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, {
  name: 'NativeSelect',
  variants: {
    size: {
      sm: { height: '$28', px: '$8', paddingRight: '$28', fontSize: '$buttonSmall' },
      md: { height: '$32', px: '$12', paddingRight: '$36', fontSize: '$button' },
      lg: { height: '$40', px: '$16', paddingRight: '$40', fontSize: '$button' },
    },
    error: {
      true: {
        border: '$error',
        ':focus': { outline: '$error' },
      },
    },
    disabled: {
      true: { opacity: '0.5', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
  defaultVariants: { size: 'md' },
  mapProps: (props: any) => ({
    ...props,
    disabled: props.disabled === 'true' || props.disabled === true ? true : undefined,
    'aria-invalid': props.error === 'true' || props.error === true ? 'true' : undefined,
  }),
})

const SelectOption = styled('option', {}, { name: 'NativeSelectOption' })

export type NativeSelectRootProps = Omit<ComponentPropsWithRef<typeof SelectRoot>, 'onChange'> & {
  onValueChange?: (value: string) => void
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  placeholder?: string
  children?: ReactNode
}

export type NativeSelectOptionProps = ComponentPropsWithRef<typeof SelectOption>

const NativeSelectRoot = forwardRef<HTMLSelectElement, NativeSelectRootProps>(
  ({ onValueChange, onChange, placeholder, children, ...rest }, ref) => (
    <SelectRoot
      ref={ref}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        onValueChange?.(e.target.value)
        onChange?.(e)
      }}
      {...rest}
    >
      {placeholder && (
        <SelectOption value="" disabled hidden>{placeholder}</SelectOption>
      )}
      {children}
    </SelectRoot>
  ),
)
NativeSelectRoot.displayName = 'NativeSelect.Root'

export const NativeSelect = {
  Root: NativeSelectRoot,
  Option: SelectOption,
}
