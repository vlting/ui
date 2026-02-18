import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const DragAndDropZoneFrame = styled(YStack, {})

export type DragAndDropZoneProps = GetProps<typeof DragAndDropZoneFrame>

export const DragAndDropZone = DragAndDropZoneFrame
