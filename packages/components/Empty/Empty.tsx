import type { ComponentPropsWithRef } from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Empty ──────────────────────────────────────────────────────────────────

const EmptyRoot = styled('div', {
  stl: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: '$12',
    p: '$24',
    fontFamily: '$body',
  },
  mapProps: (props) => ({
    ...props,
    role: 'status',
  }),
  styleName: 'Empty',
})

const EmptyMedia = styled('div', {
  stl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0.6',
    color: '$tertiaryText3',
  },
  styleName: 'EmptyMedia',
})

const EmptyTitle = styled('h3', {
  stl: { fontWeight: '$600', fontSize: '$h4', m: '$0', color: '$tertiaryText3' },
  styleName: 'EmptyTitle',
})

const EmptyDescription = styled('p', {
  stl: { fontSize: '$p', m: '$0', maxWidth: '400px', color: '$tertiaryText4' },
  styleName: 'EmptyDescription',
})

const EmptyAction = styled('div', {
  stl: { display: 'flex', gap: '$8', mt: '$4' },
  styleName: 'EmptyAction',
})

export const Empty = {
  Root: EmptyRoot,
  Title: EmptyTitle,
  Description: EmptyDescription,
  Media: EmptyMedia,
  Action: EmptyAction,
}

export type EmptyProps = ComponentPropsWithRef<typeof EmptyRoot>
