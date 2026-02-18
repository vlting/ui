import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const AuditLogViewerFrame = styled(YStack, {})

export type AuditLogViewerProps = GetProps<typeof AuditLogViewerFrame>

export const AuditLogViewer = AuditLogViewerFrame
