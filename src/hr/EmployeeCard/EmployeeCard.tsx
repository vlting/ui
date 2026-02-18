import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const EmployeeCardFrame = styled(YStack, {})

const EmployeeCardAvatar = styled(YStack, {})

const EmployeeCardName = styled(YStack, {})

const EmployeeCardRole = styled(YStack, {})

const EmployeeCardDepartment = styled(YStack, {})

export const EmployeeCard = withStaticProperties(EmployeeCardFrame, {
  Avatar: EmployeeCardAvatar,
  Name: EmployeeCardName,
  Role: EmployeeCardRole,
  Department: EmployeeCardDepartment,
})

export type EmployeeCardProps = GetProps<typeof EmployeeCardFrame>
