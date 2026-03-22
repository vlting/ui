import type { ReactNode } from 'react'
import { View, Text as RNText } from 'react-native'
import type { ViewStyle, TextStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'

// ─── Empty ──────────────────────────────────────────────────────────────────

const EmptyRoot = styled(View, {
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  padding: 24,
}, 'Empty')

const EmptyMedia = styled(View, {
  alignItems: 'center',
  justifyContent: 'center',
}, 'EmptyMedia')

const EmptyTitle = styled(RNText, {
  fontWeight: '600',
  fontSize: 20,
  color: '$neutralText3',
  textAlign: 'center',
}, 'EmptyTitle')

const EmptyDescription = styled(RNText, {
  fontSize: 16,
  color: '$neutralText4',
  textAlign: 'center',
  maxWidth: 400,
}, 'EmptyDescription')

const EmptyAction = styled(View, {
  flexDirection: 'row',
  gap: 8,
  marginTop: 4,
}, 'EmptyAction')

// ─── Export ─────────────────────────────────────────────────────────────────

export interface EmptyProps {
  children?: ReactNode
  style?: ViewStyle
}

export interface EmptyRootProps extends EmptyProps {}
export interface EmptyTitleProps { children?: ReactNode; style?: TextStyle }
export interface EmptyDescriptionProps { children?: ReactNode; style?: TextStyle }
export interface EmptyMediaProps { children?: ReactNode; style?: ViewStyle }
export interface EmptyActionProps { children?: ReactNode; style?: ViewStyle }

export const Empty = {
  Root: EmptyRoot,
  Title: EmptyTitle,
  Description: EmptyDescription,
  Media: EmptyMedia,
  Action: EmptyAction,
}
