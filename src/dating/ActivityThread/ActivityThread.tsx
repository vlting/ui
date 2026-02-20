import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const ActivityThreadFrame = styled(YStack, {})

const ActivityThreadHeader = styled(YStack, {})

const ActivityThreadMessages = styled(YStack, {})

const ActivityThreadInput = styled(YStack, {})

export const ActivityThread = withStaticProperties(ActivityThreadFrame, {
  Header: ActivityThreadHeader,
  Messages: ActivityThreadMessages,
  Input: ActivityThreadInput,
})

export type ActivityThreadProps = GetProps<typeof ActivityThreadFrame>
