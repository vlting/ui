import type { ComponentPropsWithRef } from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Empty ──────────────────────────────────────────────────────────────────

const EmptyRoot = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: '$12',
  p: '$24',
  fontFamily: '$body',
}, {
  name: 'Empty',
  mapProps: (props) => ({
    ...props,
    role: 'status',
  }),
})

const EmptyMedia = styled('figure', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$neutralText3',
}, { name: 'EmptyMedia' })

const EmptyTitle = styled('h3', { fontWeight: '$600', fontSize: '$h4', m: '$0', color: '$neutralText3' }, { name: 'EmptyTitle' })

const EmptyDescription = styled('p', { fontSize: '$p', m: '$0', maxWidth: '$400', color: '$neutralText4' }, { name: 'EmptyDescription' })

const EmptyAction = styled('footer', { display: 'flex', gap: '$8', mt: '$4' }, { name: 'EmptyAction' })

export const Empty = {
  Root: EmptyRoot,
  Title: EmptyTitle,
  Description: EmptyDescription,
  Media: EmptyMedia,
  Action: EmptyAction,
}

export type EmptyProps = ComponentPropsWithRef<typeof EmptyRoot>
export type EmptyRootProps = EmptyProps
export type EmptyTitleProps = ComponentPropsWithRef<typeof EmptyTitle>
export type EmptyDescriptionProps = ComponentPropsWithRef<typeof EmptyDescription>
export type EmptyMediaProps = ComponentPropsWithRef<typeof EmptyMedia>
export type EmptyActionProps = ComponentPropsWithRef<typeof EmptyAction>
