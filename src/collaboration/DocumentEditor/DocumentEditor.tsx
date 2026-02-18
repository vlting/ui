import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const DocumentEditorFrame = styled(YStack, {})

export type DocumentEditorProps = GetProps<typeof DocumentEditorFrame>

export const DocumentEditor = DocumentEditorFrame
