import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const IceBreakerCardFrame = styled(YStack, {})

const IceBreakerCardPrompt = styled(YStack, {})

const IceBreakerCardResponseList = styled(YStack, {})

const IceBreakerCardInput = styled(YStack, {})

export const IceBreakerCard = withStaticProperties(IceBreakerCardFrame, {
  Prompt: IceBreakerCardPrompt,
  ResponseList: IceBreakerCardResponseList,
  Input: IceBreakerCardInput,
})

export type IceBreakerCardProps = GetProps<typeof IceBreakerCardFrame>
