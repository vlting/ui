import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const RichTextEditorFrame = styled(YStack, {})

export type RichTextEditorProps = GetProps<typeof RichTextEditorFrame>

export const RichTextEditor = RichTextEditorFrame
