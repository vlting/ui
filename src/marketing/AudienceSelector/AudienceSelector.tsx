import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const AudienceSelectorFrame = styled(YStack, {})

export type AudienceSelectorProps = GetProps<typeof AudienceSelectorFrame>

export const AudienceSelector = AudienceSelectorFrame
