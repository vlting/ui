import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const NotesEditorFrame = styled(YStack, {})

export type NotesEditorProps = GetProps<typeof NotesEditorFrame>

export const NotesEditor = NotesEditorFrame
