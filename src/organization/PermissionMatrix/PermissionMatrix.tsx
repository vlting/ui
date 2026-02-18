import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PermissionMatrixFrame = styled(YStack, {})

export type PermissionMatrixProps = GetProps<typeof PermissionMatrixFrame>

export const PermissionMatrix = PermissionMatrixFrame
