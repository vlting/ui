import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const MonetizedContentLockFrame = styled(YStack, {})

export type MonetizedContentLockProps = GetProps<typeof MonetizedContentLockFrame>

export const MonetizedContentLock = MonetizedContentLockFrame
