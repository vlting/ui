import { styled } from '../../stl-react/src/config'

export type ButtonGroupRootProps = {
  orientation?: 'horizontal' | 'vertical'
}

const ButtonGroupRoot = styled('div', {
  display: 'inline-flex',
  gap: '$4',
  overflow: 'visible',
}, {
  name: 'ButtonGroup',
  variants: {
    orientation: {
      horizontal: { flexDirection: 'row' },
      vertical: { flexDirection: 'column' },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
  mapProps: (p: any) => ({
    ...p,
    role: 'group',
  }),
})

export const ButtonGroup = Object.assign(ButtonGroupRoot, {
  Root: ButtonGroupRoot,
})
