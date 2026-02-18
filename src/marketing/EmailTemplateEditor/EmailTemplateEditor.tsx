import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const EmailTemplateEditorFrame = styled(YStack, {})

export type EmailTemplateEditorProps = GetProps<typeof EmailTemplateEditorFrame>

export const EmailTemplateEditor = EmailTemplateEditorFrame
