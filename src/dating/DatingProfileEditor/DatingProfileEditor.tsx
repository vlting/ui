import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const DatingProfileEditorFrame = styled(YStack, {})

export type DatingProfileEditorProps = GetProps<typeof DatingProfileEditorFrame>

export const DatingProfileEditor = DatingProfileEditorFrame
