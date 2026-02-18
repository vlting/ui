import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const ContactCardFrame = styled(YStack, {})

const ContactCardAvatar = styled(YStack, {})

const ContactCardName = styled(YStack, {})

const ContactCardDetails = styled(YStack, {})

const ContactCardActions = styled(YStack, {})

export const ContactCard = withStaticProperties(ContactCardFrame, {
  Avatar: ContactCardAvatar,
  Name: ContactCardName,
  Details: ContactCardDetails,
  Actions: ContactCardActions,
})

export type ContactCardProps = GetProps<typeof ContactCardFrame>
