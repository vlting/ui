import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const EmojiPickerFrame = styled(YStack, {})

export type EmojiPickerProps = GetProps<typeof EmojiPickerFrame>

export const EmojiPicker = EmojiPickerFrame
