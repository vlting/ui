import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const NotesListFrame = styled(YStack, {})

export type NotesListProps = GetProps<typeof NotesListFrame>

export const NotesList = NotesListFrame
