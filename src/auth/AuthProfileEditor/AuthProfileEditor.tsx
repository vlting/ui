import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const AuthProfileEditorFrame = styled(YStack, {})

export type AuthProfileEditorProps = GetProps<typeof AuthProfileEditorFrame>

export const AuthProfileEditor = AuthProfileEditorFrame
