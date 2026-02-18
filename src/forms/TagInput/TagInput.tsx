import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const TagInputFrame = styled(YStack, {})

export type TagInputProps = GetProps<typeof TagInputFrame>

export const TagInput = TagInputFrame
