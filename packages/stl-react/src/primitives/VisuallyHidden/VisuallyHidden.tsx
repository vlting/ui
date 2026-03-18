import { styled } from '../../config'

export const VisuallyHidden = styled('span', {
  position: 'absolute',
  width: '1px',
  height: '1px',
  p: '0',
  margin: '-1px',
  overflow: 'hidden',
  borderWidth: 'initial',
}, {
  name: 'VisuallyHidden',
  mapProps: (props) => ({
    ...props,
    style: {
      ...props.style,
      clip: 'rect(0, 0, 0, 0)',
      clipPath: 'inset(50%)',
      whiteSpace: 'nowrap',
      borderWidth: 0,
    },
  }),
})

export type VisuallyHiddenProps = { children?: React.ReactNode }
