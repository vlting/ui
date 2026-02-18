import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const TeamMemberTableFrame = styled(YStack, {})

export type TeamMemberTableProps = GetProps<typeof TeamMemberTableFrame>

export const TeamMemberTable = TeamMemberTableFrame
